import {
  AlertTriangle,
  ArrowRight,
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
  title: "Exemples de PTI en soins infirmiers | Repère PTI",
  description:
    "Exemples éducatifs de PTI en soins infirmiers : risque de chute, douleur, dyspnée, diabète, plaie et raisonnement clinique.",
};

export default function ExemplePTIPage() {
  const exemples = [
    {
      titre: "Exemple 1 — PTI : risque de chute",
      contexte:
        "Patient âgé hospitalisé, faiblesse aux membres inférieurs, étourdissements au lever, antécédent de chute récente et besoin d’aide pour les déplacements.",
      donnees: [
        "Faiblesse observée lors des transferts.",
        "Étourdisssements rapportés au lever.",
        "Antécédent de chute récente.",
        "Besoin d’assistance pour la marche.",
      ],
      constat:
        "Risque de chute lié à une mobilité réduite, des étourdissements et un antécédent de chute.",
      directives: [
        "1.1 Prévention des chutes — Maintenir les mesures de prévention des chutes en tout temps — équipe de soins/PAB.",
        "1.2 Mobilité — Accompagner lors des transferts et déplacements selon le niveau d’aide requis — équipe de soins/PAB.",
        "1.3 Surveillance — Aviser l’infirmière si chute, quasi-chute, faiblesse nouvelle, étourdissement ou confusion accrue.",
      ],
      justification:
        "La priorité est la sécurité. Les données suggèrent un risque élevé de chute et nécessitent des directives claires pour l’équipe de soins.",
    },
    {
      titre: "Exemple 2 — PTI : dyspnée et désaturation",
      contexte:
        "Patient présentant dyspnée à l’effort, SpO₂ à 89 %, respiration rapide et fatigue importante.",
      donnees: [
        "SpO₂ diminuée.",
        "Dyspnée à l’effort.",
        "Respiration rapide.",
        "Fatigue rapportée.",
      ],
      constat:
        "Risque de détérioration respiratoire lié à une désaturation et une dyspnée.",
      directives: [
        "2.1 Respiration — Surveiller SpO₂, dyspnée, fréquence respiratoire et effort respiratoire q 4 h et PRN — infirmière.",
        "2.2 Signes de détérioration — Aviser si SpO₂ diminue, dyspnée augmente, cyanose, confusion ou fatigue marquée.",
        "2.3 Positionnement — Favoriser une position facilitant la respiration selon tolérance — équipe de soins.",
      ],
      justification:
        "La respiration est une priorité clinique. Une désaturation ou une dyspnée qui s’aggrave peut indiquer une détérioration nécessitant une réévaluation rapide.",
    },
    {
      titre: "Exemple 3 — PTI : douleur aiguë",
      contexte:
        "Patiente postopératoire rapportant une douleur à 8/10, difficulté à se mobiliser et grimace lors des changements de position.",
      donnees: [
        "Douleur rapportée à 8/10.",
        "Grimace observée aux mouvements.",
        "Mobilisation limitée.",
        "Contexte postopératoire.",
      ],
      constat:
        "Douleur aiguë se manifestant par une douleur intense, une limitation de la mobilité et des signes non verbaux de douleur.",
      directives: [
        "3.1 Douleur — Évaluer intensité, localisation, caractéristiques et effet sur la mobilité q 4 h et PRN — infirmière.",
        "3.2 Efficacité des mesures — Réévaluer la douleur après les interventions selon les délais du milieu — infirmière.",
        "3.3 Détérioration — Aviser si douleur non soulagée, nouvelle douleur, douleur thoracique ou détérioration fonctionnelle.",
      ],
      justification:
        "La douleur influence la mobilisation, le repos, la respiration et la récupération. Elle doit être évaluée et réévaluée de façon structurée.",
    },
    {
      titre: "Exemple 4 — PTI : risque d’hypoglycémie ou d’hyperglycémie",
      contexte:
        "Patient diabétique avec glycémies variables, diminution de l’appétit et fatigue. Médication antidiabétique selon ordonnance.",
      donnees: [
        "Diabète connu.",
        "Glycémies variables.",
        "Diminution de l’appétit.",
        "Fatigue rapportée.",
      ],
      constat:
        "Risque de déséquilibre glycémique lié à des apports alimentaires diminués et des glycémies variables.",
      directives: [
        "4.1 Glycémie — Surveiller les glycémies selon le protocole du milieu — infirmière.",
        "4.2 Signes cliniques — Observer signes d’hypoglycémie ou d’hyperglycémie et aviser selon les paramètres du milieu.",
        "4.3 Enseignement — Renforcer l’enseignement sur les signes à rapporter et l’importance de l’alimentation selon la situation.",
      ],
      justification:
        "Les variations glycémiques peuvent entraîner des symptômes importants et nécessitent une surveillance adaptée au contexte clinique.",
    },
    {
      titre: "Exemple 5 — PTI : plaie et risque infectieux",
      contexte:
        "Patient avec plaie au membre inférieur, rougeur autour de la plaie, douleur locale et écoulement léger observé au pansement.",
      donnees: [
        "Plaie au membre inférieur.",
        "Rougeur périphérique.",
        "Douleur locale.",
        "Écoulement léger observé.",
      ],
      constat:
        "Risque d’infection ou d’aggravation de la plaie lié à des signes locaux d’inflammation.",
      directives: [
        "5.1 Plaie — Observer l’apparence de la plaie, rougeur, chaleur, douleur, écoulement et odeur selon le protocole du milieu — infirmière.",
        "5.2 Pansement — Effectuer ou vérifier le pansement selon le plan de traitement et les consignes du milieu — infirmière.",
        "5.3 Détérioration — Aviser si augmentation rougeur, douleur, écoulement, fièvre ou détérioration de l’état général.",
      ],
      justification:
        "Les signes locaux peuvent indiquer une évolution défavorable. Le suivi clinique doit être précis et documenté pour assurer la continuité des soins.",
    },
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
            <FileText className="h-4 w-4" />
            Exemples éducatifs de PTI
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Exemples de{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              PTI
            </span>{" "}
            en soins infirmiers
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Voici des exemples éducatifs de Plans thérapeutiques infirmiers pour
            t’aider à comprendre comment passer d’une situation clinique à des
            constats d’évaluation et à des directives infirmières concrètes.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm">
              <ClipboardList className="h-7 w-7 text-violet-600" />
              <p className="mt-4 font-bold">Constats numérotés</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Chaque exemple présente un constat prioritaire clair.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-white p-5 shadow-sm">
              <Stethoscope className="h-7 w-7 text-pink-600" />
              <p className="mt-4 font-bold">Directives liées</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Les directives sont associées directement au constat.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-fuchsia-50 to-white p-5 shadow-sm">
              <Brain className="h-7 w-7 text-fuchsia-600" />
              <p className="mt-4 font-bold">Raisonnement clinique</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Chaque exemple inclut une justification clinique courte.
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
                Ces exemples sont fournis à des fins éducatives seulement. Ils
                ne remplacent pas les consignes de ton programme, les outils
                officiels, les protocoles de ton milieu, les normes
                professionnelles ni la validation par une personne qualifiée.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 space-y-6">
          {exemples.map((exemple, index) => (
            <section
              key={exemple.titre}
              className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-lg md:p-8"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-sm font-bold text-violet-600">
                    Exemple {index + 1}
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                    {exemple.titre}
                  </h2>
                </div>

                <div className="w-fit rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700">
                  PTI éducatif
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 p-5">
                <p className="font-bold text-violet-800">Situation clinique</p>
                <p className="mt-2 leading-7 text-slate-700">
                  {exemple.contexte}
                </p>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="font-bold text-slate-900">
                    Données significatives
                  </p>

                  <div className="mt-4 space-y-3">
                    {exemple.donnees.map((donnee) => (
                      <div
                        key={donnee}
                        className="flex gap-3 rounded-2xl bg-white p-3 text-sm leading-6 text-slate-600"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                        <p>{donnee}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-violet-100">
                  <p className="font-bold text-violet-800">
                    Constat prioritaire
                  </p>

                  <p className="mt-3 text-lg font-extrabold leading-8 text-slate-900">
                    {exemple.constat}
                  </p>

                  <div className="mt-4 rounded-2xl bg-violet-50 p-4 text-sm leading-6 text-slate-600">
                    <span className="font-bold text-violet-700">
                      Priorité :
                    </span>{" "}
                    à déterminer selon la situation complète, les signes de
                    détérioration et les consignes du milieu.
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-pink-100 bg-pink-50/60 p-5">
                <p className="font-bold text-pink-800">
                  Directives infirmières possibles
                </p>

                <div className="mt-4 space-y-3">
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

              <div className="mt-5 rounded-3xl bg-slate-50 p-5">
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <Lightbulb className="h-5 w-5 text-violet-600" />
                  Justification clinique
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  {exemple.justification}
                </p>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
              <GraduationCap className="h-6 w-6 text-violet-600" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Comment utiliser ces exemples?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Les exemples ne doivent pas être copiés tels quels. Ils servent
                à comprendre la logique : identifier les données importantes,
                formuler un constat, puis écrire des directives concrètes,
                liées au constat et adaptées à la situation.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "Repère les données significatives.",
              "Formule un constat clair et individualisé.",
              "Relie chaque directive au constat prioritaire.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 p-5 text-sm font-bold leading-6 text-violet-800"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[32px] border border-red-100 bg-red-50 p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100">
              <ShieldCheck className="h-6 w-6 text-red-600" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-red-900">
                Erreurs fréquentes dans les exemples de PTI
              </h2>

              <div className="mt-5 grid gap-3">
                {[
                  "Copier un exemple sans l’adapter au patient.",
                  "Écrire des directives trop générales.",
                  "Oublier le risque principal de la situation.",
                  "Mélanger les interventions sans les relier aux constats.",
                  "Ne pas préciser quoi surveiller ou quoi rapporter.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/80 p-4 text-sm leading-6 text-red-900"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[32px] border border-violet-200 bg-violet-50 p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-violet-700">
                Pratique ton raisonnement clinique
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Génère ton propre PTI éducatif
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Tu peux maintenant utiliser Repère PTI pour pratiquer avec tes
                propres situations cliniques anonymisées.
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
            Questions fréquentes sur les exemples de PTI
          </h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-bold">
                Puis-je utiliser ces exemples dans un travail scolaire?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Tu peux t’en inspirer pour comprendre la logique du PTI, mais tu
                dois toujours respecter les consignes de ton programme et
                adapter ton raisonnement à la situation clinique réelle.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-bold">
                Est-ce que ces exemples sont des PTI officiels?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Non. Ce sont des exemples éducatifs pour soutenir
                l’apprentissage. Ils doivent être validés avec les outils
                officiels, les protocoles du milieu et une personne qualifiée.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-bold">
                Comment choisir le bon constat?
              </summary>
              <p className="mt-3 leading-7 text-slate-600">
                Commence par identifier le problème, besoin ou risque le plus
                prioritaire pour le patient maintenant. Les signes de
                détérioration, la sécurité, la respiration, la circulation et la
                douleur sont souvent des repères utiles.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}