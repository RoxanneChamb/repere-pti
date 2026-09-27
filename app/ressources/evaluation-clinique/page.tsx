import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  Brain,
  ClipboardList,
  Eye,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Wind,
  Utensils,
  Droplets,
  Dumbbell,
  Scan,
  Smile,
  Lightbulb,
} from "lucide-react";

const sections = [
  {
    title: "1. Apparence générale",
    icon: Activity,
    items: [
      "Niveau de conscience",
      "Position dans le lit ou au fauteuil",
      "Coloration de la peau",
      "Signes de détresse respiratoire ou de douleur",
      "Mobilité spontanée",
      "Présence de cathéters, drains, solutés ou oxygène",
    ],
  },
  {
    title: "2. Signes vitaux",
    icon: Thermometer,
    items: [
      "Température",
      "Fréquence cardiaque",
      "Fréquence respiratoire",
      "Tension artérielle",
      "Saturation en oxygène",
      "Douleur",
      "Glycémie capillaire si pertinente",
    ],
  },
  {
    title: "3. Neurologique",
    icon: Brain,
    items: [
      "Orientation : personne, lieu, temps, situation",
      "État de conscience / Glasgow si indiqué",
      "Pupilles : taille, égalité, réaction à la lumière",
      "Langage : clair, confus, aphasie, dysarthrie",
      "Force motrice aux quatre membres",
      "Sensibilité",
      "Équilibre et démarche si mobilisable",
      "Signes d’AVC : visage, bras, parole, temps",
    ],
  },
  {
    title: "4. Tête, yeux, oreilles, nez, gorge",
    icon: Eye,
    items: [
      "Céphalée, étourdissements, vision trouble",
      "Muqueuses buccales : hydratation, lésions",
      "Déglutition",
      "Dentition ou prothèses",
      "Écoulement nasal ou congestion",
      "Audition, lunettes ou appareils auditifs",
    ],
  },
  {
    title: "5. Respiratoire",
    icon: Wind,
    items: [
      "Fréquence et rythme respiratoire",
      "Travail respiratoire : tirage, muscles accessoires",
      "Dyspnée au repos ou à l’effort",
      "Toux sèche ou productive",
      "Expectoration : couleur, quantité, consistance",
      "SpO₂ et besoin en oxygène",
      "Auscultation : murmure vésiculaire, crépitants, sibilances",
      "Douleur thoracique à la respiration",
    ],
  },
  {
    title: "6. Cardiovasculaire",
    icon: HeartPulse,
    items: [
      "Fréquence et rythme cardiaque",
      "Tension artérielle",
      "Douleur thoracique",
      "Coloration, chaleur et perfusion des extrémités",
      "Temps de remplissage capillaire",
      "Œdèmes : localisation et godet",
      "Pouls périphériques",
      "Palpitations, étourdissements ou fatigue",
    ],
  },
  {
    title: "7. Gastro-intestinal",
    icon: Utensils,
    items: [
      "Appétit et tolérance alimentaire",
      "Nausées ou vomissements",
      "Douleur abdominale",
      "Abdomen : souple, distendu, sensible",
      "Bruits intestinaux si indiqué",
      "Dernière selle",
      "Constipation, diarrhée ou sang dans les selles",
      "Hydratation et apport liquidien",
    ],
  },
  {
    title: "8. Génito-urinaire",
    icon: Droplets,
    items: [
      "Diurèse : quantité, fréquence, couleur, odeur",
      "Douleur ou brûlure mictionnelle",
      "Urgence ou incontinence",
      "Rétention urinaire",
      "Sonde urinaire : perméabilité, fixation, drainage",
      "Bilan ingesta/excreta si prescrit ou pertinent",
    ],
  },
  {
    title: "9. Musculosquelettique et mobilité",
    icon: Dumbbell,
    items: [
      "Force et amplitude des mouvements",
      "Douleur à la mobilisation",
      "Aide technique : marchette, canne, fauteuil",
      "Risque de chute",
      "Autonomie aux AVQ",
      "Tolérance à l’effort",
      "Besoin d’assistance pour les transferts",
    ],
  },
  {
    title: "10. Peau et intégrité tégumentaire",
    icon: Scan,
    items: [
      "Couleur, chaleur, humidité",
      "Rougeurs, plaies, ecchymoses ou lésions",
      "Points de pression : sacrum, talons, coudes",
      "Pansements : propreté, saturation, écoulement",
      "Sites IV : rougeur, douleur, infiltration, phlébite",
      "Œdème ou sécheresse cutanée",
      "Risque de plaies de pression",
    ],
  },
  {
    title: "11. Douleur",
    icon: Stethoscope,
    items: [
      "Localisation",
      "Intensité sur 0 à 10",
      "Qualité : brûlure, pression, crampe, élancement",
      "Début et durée",
      "Facteurs aggravants ou soulageants",
      "Effet de la médication",
      "Impact sur sommeil, mobilité, respiration ou humeur",
    ],
  },
  {
    title: "12. Psychosocial et sécurité",
    icon: Smile,
    items: [
      "Humeur, anxiété, collaboration",
      "Compréhension de la situation",
      "Réseau de soutien",
      "Risque de chute",
      "Capacité à demander de l’aide",
      "Besoin d’enseignement",
      "Barrières linguistiques ou cognitives",
    ],
  },
];

export default function EvaluationCliniquePage() {
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
              Guide structuré
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Évaluation tête-pieds
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Guide structuré pour réaliser une collecte de données et un examen
              physique complet, de la tête aux pieds, en gardant le raisonnement
              clinique au centre de l’évaluation.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <p className="text-sm font-black text-violet-800">
                  Priorité
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Repérer les données anormales.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <p className="text-sm font-black text-violet-800">
                  Méthode
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Observer, questionner, examiner.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <p className="text-sm font-black text-violet-800">
                  But clinique
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Prioriser les risques.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-800 text-white shadow-lg shadow-violet-100">
              <Stethoscope className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Point clé
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              L’évaluation tête-pieds n’est pas seulement une liste à cocher :
              elle sert à identifier les données significatives, les regrouper
              par système et cibler ce qui menace le plus la sécurité ou l’état
              clinique du patient.
            </p>

            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5">
              <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                Outil éducatif
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                À adapter selon la situation clinique, les priorités du moment,
                les consignes de stage et les politiques du milieu.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-[36px] border border-violet-100 bg-violet-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Avant de commencer
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Préparer une évaluation sécuritaire
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Vérifier l’identité du patient",
              "Expliquer l’examen et obtenir la collaboration",
              "Assurer intimité, confort et sécurité",
              "Hygiène des mains",
              "Observer l’état général dès l’entrée dans la chambre",
              "Comparer avec l’état habituel du patient",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-violet-100 bg-white/75 p-4 text-sm font-bold leading-6 text-violet-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="text-2xl font-black text-slate-950">
                    {section.title}
                  </h2>
                </div>

                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-slate-600"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-[36px] border border-amber-100 bg-amber-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Lightbulb className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                Astuce de raisonnement clinique
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Après l’évaluation
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Identifie les données anormales, regroupe-les par système, puis
                demande-toi : « Qu’est-ce qui menace le plus la sécurité ou
                l’état clinique du patient maintenant? »
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-red-100 bg-red-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">
                À prioriser rapidement
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Signes qui peuvent changer la priorité
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Une donnée anormale importante doit guider la suite de
                l’évaluation et les interventions.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Détresse respiratoire",
              "Douleur thoracique",
              "Altération de l’état de conscience",
              "Signes d’AVC",
              "Chute ou risque imminent de chute",
              "Saignement, cyanose ou détérioration rapide",
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

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          Repère PTI est un outil éducatif. Il ne remplace pas le jugement
          clinique, l’évaluation complète, les ordonnances, les protocoles du
          milieu ou l’encadrement professionnel.
        </p>
      </div>
    </main>
  );
}