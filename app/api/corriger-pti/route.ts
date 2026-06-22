import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { pti } = await req.json();

    if (!pti || pti.trim().length < 20) {
      return NextResponse.json(
        { error: "Le PTI est trop court pour être corrigé." },
        { status: 400 }
      );
    }

    const prompt = `
Tu es une infirmière enseignante au collégial au Québec.
Tu corriges un PTI rédigé par une étudiante en soins infirmiers.

Objectif :
Donner une rétroaction pédagogique, claire, bienveillante et utile.

Important :
- Ne pas remplacer le jugement clinique de l’étudiante ou de l’enseignante.
- Garder un ton encourageant.
- Se baser sur le raisonnement clinique infirmier.
- Ne pas inventer de données absentes.
- Identifier les éléments faibles, vagues ou non mesurables.
- Proposer une version améliorée si pertinent.

PTI à corriger :
${pti}

Réponds avec cette structure :

## Évaluation globale
Donne une note sur 10 avec une courte justification.

## Points forts
Liste les bons éléments du PTI.

## À améliorer
Explique ce qui est vague, incomplet, non prioritaire ou mal formulé.

## Constats infirmiers
Dis si les constats sont pertinents, clairs et prioritaires.

## Interventions infirmières
Dis si les interventions sont réalistes, observables, dans le champ infirmier et liées aux constats.

## Suggestions corrigées
Propose une version améliorée des éléments problématiques.

## Mini conseil pédagogique
Termine avec un conseil simple pour aider l’étudiante à progresser.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es une infirmière enseignante spécialisée en raisonnement clinique et PTI au Québec.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const correction = completion.choices[0]?.message?.content;

    return NextResponse.json({ correction });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la correction du PTI." },
      { status: 500 }
    );
  }
}