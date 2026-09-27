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
  title: "Exemples de PTI en soins infirmiers | Repère PTI",
  description:
    "Exemples éducatifs de PTI en soins infirmiers : risque de chute, douleur, dyspnée, diabète, plaie et raisonnement clinique.",
};

const exemples = [
  {
    titre: "Risque de chute",
    contexte:
      "Patient âgé hospitalisé, faiblesse aux membres inférieurs, étourdissements au lever, antécédent de chute récente et besoin d’aide pour les déplacements.",
    donnees: [
      "Faiblesse observée lors des transferts.",
      "Étourdissements rapportés au lever.",
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
    titre: "Dyspnée et désaturation",
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
    titre: "Douleur aiguë",
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
    titre: "Risque d’hypoglycémie ou d’hyperglycémie",
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
    titre: "Plaie et risque infectieux",
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

export default function ExemplePTIPage() {
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
              <FileText className="h-4 w-4" />
              Exemples éducatifs
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Exemples de{" "}
              <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                PTI
              </span>
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Des exemples éducatifs pour t’aider à comprendre comment passer
              d’une situation clinique à des données significatives, un constat
              prioritaire et des directives infirmières concrètes.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <ClipboardList className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Constats
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Formulation claire et ciblée.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <Stethoscope className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Directives
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Actions liées au constat.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <Brain className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Raisonnement
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Justification clinique courte.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-800 text-white shadow-lg shadow-violet-100">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Comment les utiliser?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Ne les copie pas tels quels. Utilise-les pour comprendre la logique
              : identifier les données significatives, formuler un constat, puis
              rédiger des directives concrètes et adaptées au patient.
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
                Ces exemples ne sont pas des PTI officiels
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Ils servent à soutenir l’apprentissage et le raisonnement
                clinique. Ils doivent toujours être adaptés à la situation réelle
                et validés selon les consignes du programme et du milieu.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 space-y-6">
          {exemples.map((exemple, index) => (
            <article
              key={exemple.titre}
              className="rounded-[36px] border border-white/80 bg-white/85 p-6 shadow-xl shadow-violet-100/70 backdrop-blur md:p-8"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                    Exemple {index + 1}
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">
                    PTI : {exemple.titre}
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-violet-100 px-4 py-2 text-xs font-black text-violet-800">
                  PTI éducatif
                </span>
              </div>

              <div className="mt-6 rounded-[28px] bg-gradient-to-br from-violet-50 via-white to-pink-50 p-5">
                <p className="text-sm font-black text-violet-800">
                  Situation clinique
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {exemple.contexte}
                </p>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[28px] bg-slate-50 p-5">
                  <p className="text-sm font-black text-slate-950">
                    Données significatives
                  </p>

                  <div className="mt-4 space-y-3">
                    {exemple.donnees.map((donnee) => (
                      <div
                        key={donnee}
                        className="flex gap-3 rounded-2xl bg-white p-3 text-sm leading-6 text-slate-600 shadow-sm"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-700" />
                        <p>{donnee}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-violet-100 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black text-violet-800">
                    Constat prioritaire
                  </p>

                  <p className="mt-3 text-lg font-black leading-8 text-slate-950">
                    {exemple.constat}
                  </p>

                  <div className="mt-4 rounded-2xl bg-violet-50 p-4 text-sm leading-6 text-slate-600">
                    <span className="font-black text-violet-800">
                      Priorité :
                    </span>{" "}
                    à déterminer selon la situation complète, les signes de
                    détérioration et les consignes du milieu.
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[28px] border border-violet-100 bg-violet-50/70 p-5">
                <p className="text-sm font-black text-violet-800">
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

              <div className="mt-5 rounded-[28px] bg-slate-50 p-5">
                <p className="flex items-center gap-2 text-sm font-black text-slate-950">
                  <Lightbulb className="h-5 w-5 text-violet-700" />
                  Justification clinique
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {exemple.justification}
                </p>
              </div>
            </article>
          ))}
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
            {[
              "Copier un exemple sans l’adapter au patient.",
              "Écrire des directives trop générales.",
              "Oublier le risque principal de la situation.",
              "Mélanger les interventions sans les relier aux constats.",
              "Ne pas préciser quoi surveiller ou quoi rapporter.",
              "Formuler un constat sans données significatives.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-red-100 bg-white/75 p-4 text-sm font-bold leading-6 text-red-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-violet-100 bg-white/80 p-6 shadow-xl shadow-violet-100 backdrop-blur md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                <Sparkles className="h-4 w-4" />
                Pratique ton raisonnement clinique
              </p>

              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Génère ton propre PTI éducatif
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Utilise Repère PTI pour pratiquer avec tes propres situations
                cliniques anonymisées et améliorer ta structure.
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
            Questions fréquentes
          </h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Puis-je utiliser ces exemples dans un travail scolaire?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Tu peux t’en inspirer pour comprendre la logique du PTI, mais tu
                dois toujours respecter les consignes de ton programme et
                adapter ton raisonnement à la situation clinique réelle.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Est-ce que ces exemples sont des PTI officiels?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Non. Ce sont des exemples éducatifs pour soutenir
                l’apprentissage. Ils doivent être validés avec les outils
                officiels, les protocoles du milieu et une personne qualifiée.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Comment choisir le bon constat?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Commence par identifier le problème, besoin ou risque le plus
                prioritaire pour le patient maintenant. Les signes de
                détérioration, la sécurité, la respiration, la circulation et la
                douleur sont souvent des repères utiles.
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