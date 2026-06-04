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
        { error: "Tu dois être connectée pour générer un PTI." },
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

    const { situation, modeComplexe } = await request.json();

    if (!situation) {
      return Response.json(
        { error: "Aucune situation clinique fournie." },
        { status: 400 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("premium")
      .eq("id", user.id)
      .single();

    const isPremium = profile?.premium === true;

    if (modeComplexe && !isPremium) {
      return Response.json(
        {
          error:
            "Les cas complexes sont réservés aux utilisateurs Premium.",
        },
        { status: 403 }
      );
    }

    const debutJournee = new Date();
    debutJournee.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("ptis")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", debutJournee.toISOString());

    if (!isPremium && (count || 0) >= 5) {
      return Response.json(
        {
          error:
            "Limite gratuite atteinte : 5 PTI par jour. Passe Premium pour générer des PTI illimités.",
        },
        { status: 403 }
      );
    }

    const client = new OpenAI({ apiKey });

    const response = await client.responses.create({
      model: "gpt-4.1-nano",
      max_output_tokens: modeComplexe ? 900 : 600,
      input: `
Tu es un outil éducatif pour étudiantes en soins infirmiers.

À partir de la situation clinique suivante, génère un PTI structuré.

Situation :
${situation}

Le résultat doit inclure :
1. Données significatives
2. Problèmes ou constats prioritaires
3. Besoins ou risques cliniques
4. Interventions infirmières pertinentes
5. Surveillance clinique
6. Enseignement au patient/famille si applicable
7. Justification clinique brève

${
  modeComplexe
    ? `
Mode Premium — Cas complexe :
Ajoute une analyse clinique plus approfondie avec :
- les priorités d'intervention;
- les complications possibles;
- les signes de détérioration à surveiller;
- les éléments de surveillance avancée;
- les liens entre les données cliniques et les risques;
- les interventions prioritaires selon l'urgence clinique;
- une section "À surveiller dans les prochaines heures";
- une section "Pièges cliniques fréquents chez l'étudiante".
`
    : ""
}

Important :
- Réponses concises.
- Titres clair et structuré.
- Ajoute des emojis pertinents.
- Reste dans un cadre éducatif et infirmier.
- Ne donne pas d'ordonnance médicale.
- Utilise un langage clair, professionnel et adapté aux étudiantes.
`,
    });

    return Response.json({
      resultat: response.output_text,
    });
  } catch (error: any) {
    console.error("ERREUR GENERER PTI :", error?.message);

    return Response.json(
      { error: error?.message || "Erreur lors de la génération." },
      { status: 500 }
    );
  }
}