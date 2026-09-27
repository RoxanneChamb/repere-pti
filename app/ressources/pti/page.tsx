import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle,
  ClipboardList,
  FileText,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export const metadata = {
  title:
    "PTI en soins infirmiers | Plan thérapeutique infirmier et raisonnement clinique",
  description:
    "Guide éducatif pour comprendre le PTI en soins infirmiers : constats d’évaluation, directives infirmières, priorités cliniques, exemples et erreurs fréquentes.",
};

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

export default function PTIPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none fixed -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/ressources"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 transition hover:text-violet-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux ressources
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[36px] border border-white/80 bg-white/80 p-7 shadow-xl shadow-violet-100 backdrop-blur md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              <ClipboardList className="h-4 w-4" />
              Guide PTI
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              PTI et{" "}
              <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                raisonnement clinique
              </span>
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Le Plan thérapeutique infirmier regroupe des constats
              d’évaluation et des directives infirmières nécessaires au suivi
              clinique. Cette page t’aide à structurer un PTI clair, pertinent
              et centré sur les priorités.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <Stethoscope className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Constats
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Problèmes, besoins ou risques.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <FileText className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Directives
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Actions claires et liées.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <Brain className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Raisonnement
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Données, risques et priorités.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-800 text-white shadow-lg shadow-violet-100">
              <Brain className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Point clé
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Un bon PTI ne part pas d’une liste d’interventions. Il part des
              données significatives, puis d’un constat prioritaire. Les
              directives doivent ensuite être liées à ce constat.
            </p>

            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5">
              <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                Outil éducatif
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                À valider avec les consignes de ton programme, les outils
                officiels, les protocoles du milieu et l’encadrement
                professionnel.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-[36px] border border-amber-100 bg-amber-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                Important
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Ce guide ne remplace pas les outils officiels
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Cette page est un guide éducatif. Elle ne remplace pas les
                consignes de ton programme, les outils officiels de ton milieu,
                les normes professionnelles, l’évaluation infirmière ni la
                validation par une personne enseignante, préceptrice ou
                professionnelle qualifiée.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5">
          {etapes.map((etape) => (
            <article
              key={etape.titre}
              className="rounded-[36px] border border-white/80 bg-white/85 p-6 shadow-xl shadow-violet-100/70 backdrop-blur md:p-8"
            >
              <h2 className="text-2xl font-black text-slate-950">
                {etape.titre}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                {etape.texte}
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {etape.items.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-xl shadow-violet-100 backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
              <Lightbulb className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Formulation
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Comment formuler une directive de PTI?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Une bonne directive doit être courte, précise et utile pour le
                suivi clinique. Elle devrait indiquer ce qui est à faire ou à
                surveiller, auprès de qui, par qui, et à quelle fréquence lorsque
                c’est pertinent.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Objet de la directive",
              "Cible de la directive",
              "Fréquence ou durée",
              "Éléments à rapporter",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-violet-50 p-4 text-center text-sm font-black leading-6 text-violet-800"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Exemples de constats et directives infirmières
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Les exemples suivants montrent comment relier un constat prioritaire
            à des directives concrètes et numérotées.
          </p>

          <div className="mt-6 space-y-5">
            {exemplesDirectives.map((exemple, index) => (
              <div
                key={exemple.constat}
                className="rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-pink-50 p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                  Constat {index + 1}
                </p>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  {exemple.constat}
                </h3>

                <div className="mt-4 grid gap-3">
                  {exemple.directives.map((directive) => (
                    <div
                      key={directive}
                      className="rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700 shadow-sm"
                    >
                      {directive}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-xl shadow-violet-100 backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
              <Brain className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Exemple clinique
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Passer des données au constat
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Voici un exemple simplifié qui montre comment passer des données
                cliniques vers un constat prioritaire et des directives
                infirmières.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-[28px] bg-slate-50 p-5">
              <p className="text-sm font-black text-slate-950">Données</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Dyspnée, crépitants, SpO₂ à 88 %, œdèmes aux membres inférieurs,
                fatigue et antécédent d’insuffisance cardiaque.
              </p>
            </div>

            <div className="rounded-[28px] bg-violet-50 p-5">
              <p className="text-sm font-black text-violet-800">Analyse</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Les données suggèrent un risque de détérioration respiratoire et
                une surcharge liquidienne possible. La respiration devient une
                priorité clinique.
              </p>
            </div>

            <div className="rounded-[28px] bg-pink-50 p-5">
              <p className="text-sm font-black text-pink-800">
                Constat prioritaire
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Risque de détérioration respiratoire lié à une dyspnée, une
                désaturation et des signes de surcharge.
              </p>
            </div>

            <div className="rounded-[28px] bg-white p-5 shadow-sm">
              <p className="text-sm font-black text-slate-950">
                Directives possibles au PTI
              </p>

              <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
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

        <section className="mt-8 rounded-[36px] border border-red-100 bg-red-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">
                Erreurs fréquentes
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                À éviter dans un PTI
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {erreurs.map((erreur) => (
              <div
                key={erreur}
                className="rounded-2xl border border-red-100 bg-white/75 p-4 text-sm font-bold leading-6 text-red-900"
              >
                {erreur}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-violet-100 bg-white/80 p-6 shadow-xl shadow-violet-100 backdrop-blur md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                <Sparkles className="h-4 w-4" />
                Astuce examen et stage
              </p>

              <h2 className="mt-3 text-2xl font-black text-slate-950">
                La question à te poser avant d’écrire ton PTI
              </h2>

              <div className="mt-5 rounded-[28px] bg-violet-50 p-5 text-base font-black leading-8 text-violet-800 md:text-lg">
                « Quel est le problème, besoin ou risque le plus important pour
                ce patient maintenant? »
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                La réponse t’aide souvent à choisir le premier constat
                prioritaire, puis à formuler des directives infirmières
                cohérentes.
              </p>
            </div>

            <Link
              href="/generer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-800 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-900 md:w-auto"
            >
              Générer un PTI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Questions fréquentes sur le PTI
          </h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Qu’est-ce qu’un PTI en soins infirmiers?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Le PTI est un outil de suivi clinique qui regroupe des constats
                d’évaluation infirmière et des directives infirmières permettant
                d’assurer une continuité des soins.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Quelle est la différence entre une donnée et un constat?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Une donnée est une information observée ou rapportée. Un constat
                est l’interprétation infirmière de données significatives qui
                permet d’identifier un problème, un besoin ou un risque.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Une directive doit-elle toujours avoir une fréquence?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Non. La fréquence ou la durée doit être indiquée lorsqu’elle est
                pertinente pour assurer le suivi clinique. Certaines directives
                peuvent plutôt préciser une cible, un responsable ou un élément
                à rapporter.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Puis-je utiliser l’IA pour faire un PTI?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                L’IA peut aider à pratiquer et à structurer le raisonnement
                clinique, mais le résultat doit toujours être validé avec les
                consignes du programme, les outils officiels, les protocoles du
                milieu et le jugement clinique.
              </p>
            </details>
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          Repère PTI est un outil éducatif. Il ne remplace pas le jugement
          clinique, l’évaluation complète, les ordonnances, les protocoles du
          milieu ou l’encadrement professionnel.
        </p>
      </div>
    </main>
  );
}