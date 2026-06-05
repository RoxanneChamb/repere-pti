import {
  AlertTriangle,
  Brain,
  CheckCircle,
  ClipboardList,
  FileText,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export const metadata = {
  title: "PTI en soins infirmiers | Plan thérapeutique infirmier et raisonnement clinique",
  description:
    "Guide éducatif pour comprendre le PTI en soins infirmiers : constats d’évaluation, directives infirmières, priorités cliniques, exemples et erreurs fréquentes.",
};

export default function PTIPage() {
  const etapes = [
    {
      titre: "1. Recueillir les données significatives",
      texte:
        "Un PTI pertinent commence toujours par une évaluation infirmière structurée. Il faut repérer les données importantes, mais aussi distinguer ce qui est prioritaire de ce qui est secondaire.",
      items: [
        "Données subjectives : douleur, dyspnée, fatigue, inquiétudes du patient.",
        "Données objectives : signes vitaux, SpO₂, glycémie, état de conscience, mobilité.",
        "Antécédents pertinents : MPOC, insuffisance cardiaque, diabète, risque de chute.",
        "Résultats utiles : laboratoire, imagerie, notes cliniques ou observations.",
        "Contexte : retour à domicile, isolement, capacité d’autosoins, famille présente.",
      ],
    },
    {
      titre: "2. Analyser et interpréter les données",
      texte:
        "Le raisonnement clinique ne consiste pas seulement à recopier les données. Il faut faire des liens entre les signes, les symptômes, les risques et l’évolution possible de la situation.",
      items: [
        "Qu’est-ce qui est anormal ou préoccupant?",
        "Qu’est-ce qui peut se détériorer rapidement?",
        "Quel risque est clairement présent?",
        "Qu’est-ce qui nécessite une surveillance infirmière?",
        "Qu’est-ce qui doit être communiqué à l’équipe?",
      ],
    },
    {
      titre: "3. Identifier les constats d’évaluation infirmière",
      texte:
        "Le constat d’évaluation décrit un problème, un besoin ou un risque qui découle des données cliniques. Il doit être clair, individualisé et lié à la situation réelle du patient.",
      items: [
        "Risque de chute lié à une faiblesse, confusion ou mobilité réduite.",
        "Douleur aiguë se manifestant par une plainte verbale et une limitation fonctionnelle.",
        "Risque de détérioration respiratoire lié à une dyspnée et une SpO₂ diminuée.",
        "Risque d’hypoglycémie ou d’hyperglycémie selon la situation diabétique.",
        "Risque d’infection lié à une plaie, fièvre ou dispositif invasif.",
      ],
    },
    {
      titre: "4. Formuler des directives infirmières liées aux constats",
      texte:
        "Une directive au PTI doit être concrète. Elle précise ce qui doit être surveillé, fait, rapporté ou poursuivi pour assurer le suivi clinique.",
      items: [
        "Objet de la directive : ce sur quoi elle porte.",
        "Type : surveillance clinique, soins, traitement déjà prévu, sécurité, enseignement ou communication.",
        "Cible : patient, famille, PAB, équipe de soins, infirmière, préceptrice.",
        "Fréquence ou durée : seulement si pertinent.",
        "Éléments à rapporter : signes de détérioration ou changements importants.",
      ],
    },
  ];

  const exemplesDirectives = [
    {
      constat: "Risque de chute",
      directives: [
        "1.1 Prévention des chutes — Maintenir les mesures de prévention des chutes en tout temps — équipe de soins/PAB.",
        "1.2 Mobilité — Surveiller la démarche, les étourdissements et les transferts à chaque mobilisation — infirmière/PAB.",
        "1.3 Sécurité — Aviser l’infirmière si chute, quasi-chute, faiblesse nouvelle ou confusion accrue.",
      ],
    },
    {
      constat: "Risque de détérioration respiratoire",
      directives: [
        "2.1 Respiration — Surveiller SpO₂, dyspnée, fréquence respiratoire et effort respiratoire q 4 h et PRN — infirmière.",
        "2.2 Signes de détérioration — Aviser si SpO₂ diminue, dyspnée augmente ou changement de l’état général.",
        "2.3 Positionnement — Favoriser une position facilitant la respiration selon tolérance — équipe de soins.",
      ],
    },
    {
      constat: "Douleur aiguë",
      directives: [
        "3.1 Douleur — Évaluer l’intensité, la localisation et l’effet sur les activités q 4 h et PRN — infirmière.",
        "3.2 Efficacité des mesures — Réévaluer la douleur après les interventions selon le délai approprié.",
        "3.3 Communication — Aviser si douleur non soulagée, nouvelle douleur ou détérioration fonctionnelle.",
      ],
    },
  ];

  const erreurs = [
    "Écrire des directives trop vagues comme « surveiller l’état général ».",
    "Ne pas relier les interventions au constat prioritaire.",
    "Oublier un risque clairement nommé dans la situation, comme un risque de chute.",
    "Confondre une donnée clinique avec un constat d’évaluation.",
    "Faire une longue liste d’interventions génériques non individualisées.",
    "Oublier d’indiquer quoi rapporter ou quand aviser.",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white px-4 py-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-6xl">
        <a
          href="/ressources"
          className="text-sm font-semibold text-violet-600 hover:text-pink-500"
        >
          ← Retour aux ressources
        </a>

        <section className="mt-8 rounded-[32px] bg-white/85 p-6 shadow-xl backdrop-blur md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700 md:text-sm">
            <ClipboardList className="h-4 w-4" />
            Guide PTI pour étudiantes en soins infirmiers
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            PTI et{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              raisonnement clinique
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Le Plan thérapeutique infirmier, souvent appelé PTI, est un outil
            utilisé en soins infirmiers pour regrouper les constats d’évaluation
            et les directives infirmières nécessaires au suivi clinique d’un
            patient. Cette page t’aide à comprendre comment structurer un PTI
            clair, pertinent et centré sur les priorités.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm">
              <Stethoscope className="h-7 w-7 text-violet-600" />
              <p className="mt-4 font-bold">Constats d’évaluation</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Identifier les problèmes, besoins ou risques prioritaires.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-white p-5 shadow-sm">
              <FileText className="h-7 w-7 text-pink-600" />
              <p className="mt-4 font-bold">Directives infirmières</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Formuler des directives concrètes liées aux constats.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-fuchsia-50 to-white p-5 shadow-sm">
              <Brain className="h-7 w-7 text-fuchsia-600" />
              <p className="mt-4 font-bold">Raisonnement clinique</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Faire des liens entre les données, les risques et les priorités.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[32px] border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100">
              <AlertTriangle className="h-6 w-6 text-amber-700" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-amber-900">
                Important
              </h2>

              <p className="mt-3 leading-7 text-amber-900">
                Cette page est un guide éducatif. Elle ne remplace pas les
                consignes de ton programme, les outils officiels de ton milieu,
                les normes professionnelles, l’évaluation infirmière ni la
                validation par une personne enseignante, préceptrice ou
                professionnelle qualifiée.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-5">
          {etapes.map((etape) => (
            <section
              key={etape.titre}
              className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg md:p-8"
            >
              <h2 className="text-2xl font-extrabold">{etape.titre}</h2>

              <p className="mt-4 leading-7 text-slate-600">{etape.texte}</p>

              <div className="mt-5 grid gap-3">
                {etape.items.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
              <Lightbulb className="h-6 w-6 text-violet-600" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Comment formuler une directive de PTI?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Une bonne directive doit être courte, précise et utile pour le
                suivi clinique. Elle devrait indiquer ce qui est à faire ou à
                surveiller, auprès de qui, par qui, et à quelle fréquence lorsque
                c’est pertinent.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "Objet de la directive",
              "Cible de la directive",
              "Fréquence ou durée",
              "Éléments à rapporter",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 p-5 text-center"
              >
                <p className="font-bold text-violet-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
          <h2 className="text-2xl font-extrabold">
            Exemples de constats et directives infirmières
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Les exemples suivants montrent comment relier un constat prioritaire
            à des directives concrètes et numérotées.
          </p>

          <div className="mt-6 space-y-5">
            {exemplesDirectives.map((exemple, index) => (
              <div
                key={exemple.constat}
                className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5"
              >
                <p className="text-sm font-bold text-violet-600">
                  Constat {index + 1}
                </p>

                <h3 className="mt-1 text-xl font-extrabold">
                  {exemple.constat}
                </h3>

                <div className="mt-4 grid gap-3">
                  {exemple.directives.map((directive) => (
                    <div
                      key={directive}
                      className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm"
                    >
                      {directive}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100">
              <Brain className="h-6 w-6 text-pink-600" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Exemple de raisonnement clinique
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Voici un exemple simplifié qui montre comment passer des données
                cliniques vers un constat prioritaire et des directives
                infirmières.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="font-bold text-slate-900">Données</p>
              <p className="mt-2 leading-7 text-slate-600">
                Dyspnée, crépitants, SpO₂ à 88 %, œdèmes aux membres inférieurs,
                fatigue et antécédent d’insuffisance cardiaque.
              </p>
            </div>

            <div className="rounded-3xl bg-violet-50 p-5">
              <p className="font-bold text-violet-800">Analyse</p>
              <p className="mt-2 leading-7 text-slate-600">
                Les données suggèrent un risque de détérioration respiratoire et
                une surcharge liquidienne possible. La respiration devient une
                priorité clinique.
              </p>
            </div>

            <div className="rounded-3xl bg-pink-50 p-5">
              <p className="font-bold text-pink-800">Constat prioritaire</p>
              <p className="mt-2 leading-7 text-slate-600">
                Risque de détérioration respiratoire lié à une dyspnée, une
                désaturation et des signes de surcharge.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="font-bold text-slate-900">
                Directives possibles au PTI
              </p>

              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <li>
                  <strong>1.1 Objet : respiration</strong> — Surveiller SpO₂,
                  dyspnée, fréquence respiratoire et effort respiratoire q 4 h
                  et PRN — infirmière.
                </li>
                <li>
                  <strong>1.2 Objet : détérioration</strong> — Aviser si SpO₂
                  diminue, dyspnée augmente, cyanose, confusion ou fatigue
                  marquée.
                </li>
                <li>
                  <strong>1.3 Objet : suivi clinique</strong> — Documenter
                  l’évolution respiratoire et la réponse aux interventions selon
                  les outils du milieu.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[32px] border border-red-100 bg-red-50 p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100">
              <ShieldCheck className="h-6 w-6 text-red-600" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-red-900">
                Erreurs fréquentes à éviter
              </h2>

              <div className="mt-5 grid gap-3">
                {erreurs.map((erreur) => (
                  <div
                    key={erreur}
                    className="rounded-2xl bg-white/80 p-4 text-sm leading-6 text-red-900"
                  >
                    {erreur}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[32px] border border-violet-200 bg-violet-50 p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-violet-700">
                <GraduationCap className="h-5 w-5" />
                Astuce examen et stage
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                La question à te poser avant d’écrire ton PTI
              </h2>

              <div className="mt-5 rounded-3xl bg-white p-5 text-lg font-extrabold leading-8 text-violet-800">
                « Quel est le problème, besoin ou risque le plus important pour
                ce patient maintenant? »
              </div>

              <p className="mt-4 leading-7 text-slate-600">
                La réponse t’aide souvent à choisir le premier constat
                prioritaire, puis à formuler des directives infirmières
                cohérentes.
              </p>
            </div>

            <a
              href="/generer"
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-pink-200 md:w-auto"
            >
              Générer un PTI
            </a>
          </div>
        </section>

        <section className="mt-6 rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
          <h2 className="text-2xl font-extrabold">
            Questions fréquentes sur le PTI
          </h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-bold">
                Qu’est-ce qu’un PTI en soins infirmiers?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Le PTI est un outil de suivi clinique qui regroupe des constats
                d’évaluation infirmière et des directives infirmières permettant
                d’assurer une continuité des soins.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-bold">
                Quelle est la différence entre une donnée et un constat?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Une donnée est une information observée ou rapportée. Un constat
                est l’interprétation infirmière de données significatives qui
                permet d’identifier un problème, un besoin ou un risque.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-bold">
                Une directive doit-elle toujours avoir une fréquence?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Non. La fréquence ou la durée doit être indiquée lorsqu’elle est
                pertinente pour assurer le suivi clinique. Certaines directives
                peuvent plutôt préciser une cible, un responsable ou un élément
                à rapporter.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-bold">
                Puis-je utiliser l’IA pour faire un PTI?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                L’IA peut aider à pratiquer et à structurer le raisonnement
                clinique, mais le résultat doit toujours être validé avec les
                consignes du programme, les outils officiels, les protocoles du
                milieu et le jugement clinique.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}