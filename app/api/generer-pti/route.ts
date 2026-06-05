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

    const body = await request.json();
    const situation = body?.situation;
    const modeComplexe = body?.modeComplexe === true;

    if (!situation || !situation.trim()) {
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
          error: "Les cas complexes sont réservés aux utilisateurs Premium.",
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

    const prompt = `
Tu es un outil éducatif pour étudiantes en soins infirmiers au Québec.

Ta tâche est de générer une ÉBAUCHE pédagogique de PTI claire, organisée et facile à lire.

IMPORTANT :
Le résultat doit être structuré comme un PTI pédagogique.
Il doit être lisible, logique et NON pêle-mêle.
Il doit être inspiré de la logique du PTI : constats d’évaluation infirmière + directives infirmières liées au suivi clinique.

Situation clinique fournie :
${situation}

RÈGLE PRIORITAIRE :
Tu dois repérer tous les risques, problèmes ou besoins explicitement mentionnés ou fortement suggérés dans la situation.

Si la situation mentionne ou suggère un risque de chute, douleur, dyspnée, désaturation, confusion, délirium, fièvre, plaie, infection, risque de saignement, hypoglycémie, hyperglycémie, déshydratation, surcharge liquidienne, altération de la mobilité, risque d’aspiration ou tout autre risque clinique important, il doit absolument apparaître dans les constats.

Ne pas inventer de données absentes.
Ne pas prescrire de médicament, de traitement médical ou d’examen.
Ne pas formuler d’ordonnance médicale.
Si une information manque, l’indiquer dans la section "Éléments à valider".

FORMAT OBLIGATOIRE À RESPECTER :

# Résumé de la situation
Écris un court titre clinique de 1 ligne.

Exemple :
"Patient âgé avec dyspnée, désaturation et risque de détérioration respiratoire"

# Données significatives
Présente les données importantes en puces courtes.

Sépare si possible :
- Données subjectives :
- Données objectives :
- Facteurs de risque ou contexte :

# PTI suggéré

## 1. Constat prioritaire : [titre court du constat]
Données qui appuient le constat :
- ...

Risque ou besoin associé :
- ...

Priorité :
- Élevée / Modérée / Faible

Directives et interventions liées au constat 1 :

1.1 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

1.2 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

1.3 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

## 2. Constat prioritaire : [titre court du constat]
Données qui appuient le constat :
- ...

Risque ou besoin associé :
- ...

Priorité :
- Élevée / Modérée / Faible

Directives et interventions liées au constat 2 :

2.1 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

2.2 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

2.3 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

## 3. Constat prioritaire : [titre court du constat]
Données qui appuient le constat :
- ...

Risque ou besoin associé :
- ...

Priorité :
- Élevée / Modérée / Faible

Directives et interventions liées au constat 3 :

3.1 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

3.2 [Intervention ou directive infirmière concrète]
- Quoi surveiller :
- Pourquoi :
- Quand aviser :

Important :
- Génère généralement 2 à 4 constats prioritaires.
- Chaque constat doit avoir ses propres interventions numérotées.
- Les interventions doivent être directement liées au constat.
- Ne pas mélanger toutes les interventions ensemble.
- Ne pas faire une longue liste vague.
- Ne pas écrire seulement "surveiller l'état général".
- Précise toujours quoi surveiller.
- Les directives doivent être concrètes et utiles pour assurer la continuité des soins.

# Justification clinique globale
Explique brièvement pourquoi ces constats sont prioritaires.
Fais les liens entre les données, les risques et les interventions.

# Éléments à valider
Liste ce qui devrait être validé avec :
- l’enseignante;
- la préceptrice;
- les protocoles du milieu;
- les outils officiels;
- les normes professionnelles applicables.

# À retenir pour l’étudiante
Ajoute 3 à 5 points pédagogiques courts pour aider à comprendre le raisonnement clinique.

${
  modeComplexe
    ? `
# Mode Premium — Analyse avancée

## Priorités dans les prochaines heures
1. ...
2. ...
3. ...

## Complications possibles
Pour chaque complication :
- Complication :
- Signes à surveiller :
- Pourquoi c’est important :

## Pièges fréquents chez l’étudiante
- ...
- ...
- ...

## Questions de réflexion
Ajoute 3 à 5 questions pour approfondir le raisonnement clinique.
`
    : ""
}

# Avertissement éducatif
Termine toujours par exactement cette phrase :

"Cette réponse est une ébauche éducative. Elle ne remplace pas le jugement clinique, les normes professionnelles, les politiques de l’établissement, les outils officiels ni la validation par une personne qualifiée."

STYLE :
- Français québécois professionnel.
- Format clair avec titres.
- Constats numérotés.
- Interventions numérotées selon le constat : 1.1, 1.2, 2.1, 2.2, etc.
- Phrases courtes.
- Pas de paragraphe interminable.
- Ne pas être vague.
- Ne pas mélanger les sections.
- Si un risque est écrit ou fortement suggéré dans la situation, il doit absolument apparaître.
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      max_output_tokens: modeComplexe ? 1500 : 1100,
      input: prompt,
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