import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY introuvable." },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return Response.json(
        { error: "Tu dois être connectée pour générer un quiz." },
        { status: 401 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (!user) {
      return Response.json(
        { error: "Utilisateur introuvable." },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("premium")
      .eq("id", user.id)
      .single();

    const isPremium = profile?.premium === true;

    const debutJournee = new Date();
    debutJournee.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("quiz_history")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", debutJournee.toISOString());

    if (!isPremium && (count || 0) >= 2) {
      return Response.json(
        {
          error:
            "Limite gratuite atteinte : 2 quiz par jour. Passe Premium pour pratiquer sans limite.",
        },
        { status: 403 }
      );
    }

    const client = new OpenAI({ apiKey });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Crée un quiz clinique pour une étudiante en soins infirmiers.

Retourne UNIQUEMENT un JSON valide avec ce format :
{
  "situation": "...",
  "question": "...",
  "choix": {
    "A": "...",
    "B": "...",
    "C": "...",
    "D": "..."
  },
  "bonneReponse": "A",
  "explication": "..."
}

IMPORTANT :
- La bonne réponse doit varier entre A, B, C et D.
- Ne mets pas toujours la bonne réponse en A.
- Les mauvaises réponses doivent être plausibles.
- Le quiz doit tester la priorisation ou le raisonnement clinique.
- Les questions doivent être adaptées à une étudiante en soins infirmiers.
- Ne retourne aucun texte hors du JSON.

Thèmes possibles : sepsis, AVC, diabète, MPOC, insuffisance cardiaque, médicaments, priorisation.
Niveau : étudiant en soins infirmiers.
Langue : français.
`,
    });

    const texte = response.output_text;
    const quiz = JSON.parse(texte);

    return Response.json({ quiz });
  } catch (error: any) {
    console.error("ERREUR GENERER QUIZ :", error?.message);

    return Response.json(
      { error: error?.message || "Erreur lors de la génération du quiz." },
      { status: 500 }
    );
  }
}