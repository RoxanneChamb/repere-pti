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

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      max_output_tokens: modeComplexe ? 1500 : 1100,
      input: `
Tu es un outil éducatif pour étudiantes en soins infirmiers au Québec.

Ta tâche est de générer une ÉBAUCHE pédagogique de PTI inspirée de la logique du Plan thérapeutique infirmier et des normes de documentation des soins infirmiers de l’OIIQ.

IMPORTANT :
Le résultat doit être une aide à l’apprentissage. Il ne doit jamais prétendre être un PTI officiel, final ou validé.

Selon la logique documentaire attendue :
- Le PTI doit découler des constats d’évaluation infirmière.
- Il doit regrouper des constats et des directives infirmières pour assurer le suivi clinique.
- Les directives doivent être spécifiques à la situation du client.
- Les informations doivent être pertinentes, précises, organisées, factuelles et utiles pour assurer la continuité des soins.
- Le contenu doit refléter l’analyse et l’interprétation des données, pas seulement recopier les données.
- Les constats et directives doivent être facilement repérables.
- Les directives doivent être ajustables selon l’évolution clinique.
- Le PTI ne doit pas devenir un protocole générique applicable à tout le monde.

Situation clinique fournie :
${situation}

RÈGLE PRIORITAIRE :
Tu dois repérer tous les risques, problèmes ou besoins explicitement mentionnés ou fortement suggérés dans la situation.

Si la situation mentionne ou suggère :
- risque de chute;
- douleur;
- dyspnée;
- désaturation;
- confusion;
- délirium;
- fièvre;
- plaie;
- infection;
- risque de saignement;
- hypoglycémie;
- hyperglycémie;
- déshydratation;
- surcharge liquidienne;
- altération de la mobilité;
- risque d’aspiration;
- risque de détérioration clinique;
- non-adhésion au traitement;
- anxiété;
- difficulté d’autosoins;
- tout autre risque clinique important;

alors ce risque doit apparaître clairement dans les constats et/ou dans les directives infirmières.

Ne pas inventer de données absentes.
Ne pas attribuer de diagnostic médical non fourni.
Ne pas prescrire de médicament, de traitement médical ou d’examen.
Ne pas formuler d’ordonnance.
Si une information est manquante, l’indiquer dans la section "Éléments à valider".

FORMAT OBLIGATOIRE :

## 1. Données cliniques pertinentes
Présente seulement les données significatives fournies dans la situation.

Sépare si possible :
- Données subjectives
- Données objectives
- Données contextuelles ou facteurs de risque

Ne pas inclure d’informations inventées.

## 2. Analyse et interprétation des données
Explique brièvement ce que les données peuvent signifier sur le plan infirmier.

Inclure :
- liens entre les données;
- éléments préoccupants;
- risques de préjudice;
- évolution possible si aucune surveillance ou intervention n’est faite.

Cette section doit montrer le raisonnement clinique, pas seulement répéter la situation.

## 3. Constats d’évaluation infirmière prioritaires
Présente les constats sous forme structurée.

Pour chaque constat :
- Constat d’évaluation :
- Données qui appuient le constat :
- Risque ou besoin associé :
- Priorité : élevée, modérée ou faible
- Justification de la priorité :

Les constats doivent être explicites, clairs et directement liés aux données fournies.

## 4. Directives infirmières au PTI
Présente les directives sous forme de tableau texte.

Pour chaque directive :
- Constat associé :
- Directive infirmière spécifique :
- Surveillance ou suivi requis :
- Éléments à rapporter / aviser :
- Moment ou fréquence suggérée si pertinent :

Règles pour les directives :
- Elles doivent être spécifiques à la situation.
- Elles doivent permettre la continuité des soins.
- Elles doivent être facilement applicables par l’équipe de soins.
- Elles doivent éviter les formulations vagues comme "surveiller au besoin" sans préciser quoi surveiller.
- Elles ne doivent pas être des protocoles génériques.
- Elles ne doivent pas remplacer les politiques du milieu.

## 5. Surveillance clinique ciblée
Indique :
- signes d’amélioration;
- signes de détérioration;
- éléments qui nécessitent une réévaluation;
- ajustements possibles du suivi selon l’évolution clinique.

## 6. Interventions infirmières pertinentes
Inclure uniquement des interventions infirmières éducatives et générales, par exemple :
- mesures de prévention;
- sécurité;
- enseignement;
- communication avec l’équipe;
- soutien aux autosoins;
- collaboration interdisciplinaire.

Ne pas prescrire de traitement médical.

## 7. Documentation et continuité des soins
Indique ce qui devrait être documenté pour soutenir la continuité des soins :
- données pertinentes;
- constats;
- directives;
- surveillance réalisée;
- résultats observés;
- ajustements au plan;
- communications importantes;
- enseignement donné;
- réponse du client si applicable.

## 8. Éléments à valider avec les outils officiels
Nomme ce qui devrait être validé avec :
- les consignes de l’école;
- l’enseignante;
- la préceptrice;
- les politiques et protocoles du milieu;
- les outils officiels de documentation;
- les normes professionnelles applicables.

## 9. Avertissement éducatif
Termine toujours par exactement cette phrase :

"Cette réponse est une ébauche éducative. Elle ne remplace pas le jugement clinique, les normes professionnelles, les politiques de l’établissement, les outils officiels ni la validation par une personne qualifiée."

${
  modeComplexe
    ? `
MODE PREMIUM — CAS COMPLEXE :
Ajoute aussi :

## 10. Priorités dans les prochaines heures
- Priorité 1
- Priorité 2
- Priorité 3

## 11. Complications possibles
Pour chaque complication :
- complication possible;
- signes à surveiller;
- raison clinique.

## 12. Pièges fréquents chez l’étudiante
Inclure les oublis ou erreurs fréquentes, par exemple :
- oublier un risque explicitement nommé;
- écrire une directive trop vague;
- confondre donnée et analyse;
- inscrire une intervention générique non individualisée;
- oublier les signes de détérioration;
- ne pas prévoir d’ajustement selon l’évolution.

## 13. Questions de réflexion
Ajoute 3 à 5 questions pour pousser le raisonnement clinique.
`
    : ""
}

STYLE :
- Français québécois professionnel.
- Clair, structuré et pédagogique.
- Pas trop vague.
- Pas de ton alarmiste.
- Pas de jargon inutile.
- Utilise des titres visibles.
- Favorise des formulations individualisées.
- Si un risque est écrit ou fortement suggéré dans la situation, il doit absolument apparaître.
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