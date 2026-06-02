import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY introuvable. Vérifie ton fichier .env.local." },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
    });

    const { situation } = await request.json();

    if (!situation) {
      return Response.json(
        { error: "Aucune situation clinique fournie." },
        { status: 400 }
      );
    }

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
  "bonneReponse": "B",
  "explication": "..."
}

IMPORTANT :
- La bonne réponse doit varier entre A, B, C et D.
- Ne mets pas toujours la bonne réponse en A.
- Les mauvaises réponses doivent être plausibles.
- Le quiz doit tester la priorisation ou le raisonnement clinique.
- Les questions doivent avoir la structure de l'OIIQ

Thèmes possibles : sepsis, AVC, diabète, MPOC, insuffisance cardiaque, médicaments, priorisation.
Niveau : étudiant en soins infirmiers.
Langue : français.
`,
    });

    return Response.json({
      resultat: response.output_text,
    });
  } catch (error: any) {
    console.error("ERREUR OPENAI :", error?.message);

    return Response.json(
      { error: error?.message || "Erreur lors de la génération." },
      { status: 500 }
    );
  }
}