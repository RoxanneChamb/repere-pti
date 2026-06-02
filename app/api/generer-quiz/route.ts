import OpenAI from "openai";

export async function POST() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY introuvable." },
        { status: 500 }
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

Thèmes possibles : sepsis, AVC, diabète, MPOC, insuffisance cardiaque, médicaments, priorisation.
Niveau : étudiant en soins infirmiers.
Langue : français.
`,
    });

    const texte = response.output_text;
    const quiz = JSON.parse(texte);

    return Response.json({ quiz });
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "Erreur lors de la génération du quiz." },
      { status: 500 }
    );
  }
}