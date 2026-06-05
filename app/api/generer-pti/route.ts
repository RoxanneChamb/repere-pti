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
Il doit respecter la logique suivante :
- constats d’évaluation infirmière;
- directives infirmières liées aux constats;
- directives formulées de façon courte, concrète et applicable.

Situation clinique fournie :
${situation}

RÈGLE PRIORITAIRE :
Tu dois repérer tous les risques, problèmes ou besoins explicitement mentionnés ou fortement suggérés dans la situation.

Si la situation mentionne ou suggère un risque de chute, douleur, dyspnée, désaturation, confusion, délirium, fièvre, plaie, infection, risque de saignement, hypoglycémie, hyperglycémie, déshydratation, surcharge liquidienne, altération de la mobilité, risque d’aspiration ou tout autre risque clinique important, il doit absolument apparaître dans les constats.

Ne pas inventer de données absentes.
Ne pas attribuer de diagnostic médical non fourni.
Ne pas prescrire de nouveau médicament, traitement médical ou examen.
Ne pas formuler d’ordonnance médicale.
Si une information manque, l’indiquer dans la section "Éléments à valider".

RÈGLE SPÉCIALE POUR LES DIRECTIVES :
Les directives doivent ressembler à des directives de PTI, pas à de longues interventions théoriques.

Chaque directive doit contenir, quand pertinent :
- Objet de la directive : ce sur quoi elle porte.
- Type : activité de surveillance clinique, soin/traitement déjà prévu, intervention de sécurité, enseignement ou communication.
- Cible : à qui elle s’adresse, si pertinent.
- Durée ou fréquence : si pertinent.
- Responsable ou destination : infirmière, équipe de soins, PAB, plan de travail, enseignante, préceptrice, etc.
- Élément à rapporter ou aviser : si pertinent.

Les directives doivent être formulées en phrases courtes et concrètes.

Exemples de style attendu :
- Évaluer la douleur q 4 h et PRN — infirmière.
- Surveiller SpO₂, dyspnée et effort respiratoire q 4 h — infirmière; aviser si détérioration.
- Maintenir mesures de prévention des chutes en tout temps — équipe de soins/PAB.
- Alterner position q 2 h si toléré — équipe de soins/PAB.
- Documenter l’évolution de la plaie selon le protocole du milieu — infirmière.
- Renforcer l’enseignement sur les signes à rapporter avant le congé — infirmière.

Ne pas écrire :
- "Surveiller l’état général" sans préciser quoi surveiller.
- "Assurer la sécurité" sans préciser la mesure.
- "Faire les soins nécessaires" sans préciser l’objet.
- Une longue phrase vague qui ressemble à un paragraphe de théorie.

FORMAT OBLIGATOIRE À RESPECTER :

# Résumé de la situation
Écris un court titre clinique de 1 ligne.

# Données significatives
Présente les données importantes en puces courtes.

Sépare si possible :
- Données subjectives :
- Données objectives :
- Facteurs de risque ou contexte :

# PTI suggéré

## 1. Constat prioritaire : [titre court du constat]
Directives liées au constat 1 :

1.1 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]

1.2 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]


1.3 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]


## 2. Constat prioritaire : [titre court du constat]
Données qui appuient le constat :
- ...


Directives liées au constat 2 :

2.1 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]

2.2 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]


2.3 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]

## 3. Constat prioritaire : [titre court du constat]

Directives liées au constat 3 :

3.1 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]


3.2 [objet précis de la directive]
- Directive : [phrase courte et concrète]
- Cible : [client / famille / équipe de soins / PAB / infirmière / infirmière auxiliaire / autre, si pertinent]
- Fréquence ou durée : [si pertinent]

Important :
- Génère généralement 2 à 4 constats prioritaires.
- Chaque constat doit avoir ses propres directives numérotées.
- Les directives doivent être directement liées au constat.
- Les directives doivent être courtes, concrètes, applicables et utiliser des échelles de mesures fiable (lorsqu'applicable)
- Les directives doivent être basées sur des données probantes et des sites internet fiables.
- Les directivent peuvent comporter des échelles d'évaluation lorsque applicable.
- Les directives doivent nommer l’objet, la cible et la fréquence/durée quand pertinent.
- Ne pas mélanger toutes les interventions ensemble.
- Ne pas faire une longue liste vague.
- Ne pas écrire seulement "surveiller l’état général".
- Précise toujours quoi surveiller.

# Justification clinique globale
Explique brièvement pourquoi ces constats sont prioritaires.
Fais les liens entre les données, les risques et les directives.

# Éléments à valider
Liste ce qui devrait être validé avec :
- l’enseignante;
- la préceptrice;
- les protocoles du milieu;
- les outils officiels;
- les normes professionnelles applicables;
- le plan de travail ou plan de traitement si applicable.

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
- Oublier de relier une directive à un constat.
- Écrire une directive trop vague.
- Oublier l’objet ou la fréquence d’une directive.
- Confondre une intervention générale avec une directive au PTI.
- Oublier un risque explicitement nommé dans la situation.

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
- Directives numérotées selon le constat : 1.1, 1.2, 2.1, 2.2, etc.
- Directives courtes, concrètes et individualisées.
- Phrases courtes.
- Pas de paragraphe interminable.
- Ne pas être vague.
- Ne pas mélanger les sections.
- Si un risque est écrit ou fortement suggéré dans la situation, il doit absolument apparaître.
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      max_output_tokens: modeComplexe ? 1700 : 1300,
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