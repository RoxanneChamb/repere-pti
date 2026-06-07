import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY introuvable." },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return Response.json(
        { error: "Configuration Supabase introuvable." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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

    const body = await request.json().catch(() => ({}));
    const specialite = body?.specialite || "Général";

    const { data: profile } = await supabase
      .from("profiles")
      .select("premium")
      .eq("id", user.id)
      .maybeSingle();

    const isPremium = profile?.premium === true;

    if (specialite !== "Général" && !isPremium) {
      return Response.json(
        {
          error:
            "Les quiz par spécialité sont réservés aux utilisateurs Premium.",
        },
        { status: 403 }
      );
    }

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
            "Limite gratuite atteinte : 2 quiz par jour. Passe Premium pour les quiz illimités et les quiz par spécialité.",
        },
        { status: 403 }
      );
    }

    const themesGeneraux =
      "sepsis, AVC, diabète, MPOC, insuffisance cardiaque, médicaments, priorisation, douleur, risque de chute";

    const themeChoisi =
      specialite === "Général"
        ? themesGeneraux
        : `spécialité : ${specialite}`;

    const client = new OpenAI({ apiKey });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      max_output_tokens: 900,
      input: `
Crée un quiz clinique pour une étudiante en soins infirmiers au Québec.

Spécialité ou thème demandé :
${themeChoisi}

Retourne UNIQUEMENT un JSON valide avec ce format exact :
{
  "categorie": "${specialite}",
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

Règles :
- Le quiz doit être réaliste et adapté à une étudiante en soins infirmiers.
- La question doit tester le raisonnement clinique, la priorisation, la surveillance ou la sécurité.
- Une seule bonne réponse.
- L'explication doit être claire, pédagogique et concise.
- Ne pas donner d’ordonnance médicale.
- Ne pas remplacer le jugement clinique.
- Langue : français québécois professionnel.
`,
    });

    const texte = response.output_text.trim();
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