import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Brain,
  CheckCircle,
  ClipboardList,
  GraduationCap,
  Lightbulb,
  PencilLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Timer,
  BookOpen,
  HelpCircle,
  ArrowRight,
  WandSparkles,
} from "lucide-react";

export const metadata = {
  title: "Étudier pour un examen en soins infirmiers | Repère PTI",
  description:
    "Trucs et astuces pour étudier efficacement en soins infirmiers, réussir les examens, répondre aux mises en situation et développer son raisonnement clinique.",
};

const sections = [
  {
    title: "1. Comprendre avant d’apprendre par cœur",
    icon: Brain,
    items: [
      "Demande-toi toujours pourquoi un signe est important.",
      "Fais des liens entre la pathologie, les symptômes, les surveillances et les interventions.",
      "Évite d’apprendre des listes isolées sans comprendre le contexte.",
      "Essaie d’expliquer la matière comme si tu l’enseignais à une autre personne.",
    ],
  },
  {
    title: "2. Étudier par systèmes",
    icon: Stethoscope,
    items: [
      "Regroupe tes notions par système : respiratoire, cardiovasculaire, neurologique, digestif, rénal, endocrinien.",
      "Pour chaque système, révise les signes d’alarme, les surveillances et les interventions prioritaires.",
      "Fais des fiches courtes : signes, risques, quoi surveiller, quand aviser.",
      "Compare les pathologies qui se ressemblent pour mieux les différencier.",
    ],
  },
  {
    title: "3. Utiliser la méthode données → problème → priorité → intervention",
    icon: Target,
    items: [
      "Repère les données anormales dans la question.",
      "Identifie le problème, le besoin ou le risque principal.",
      "Demande-toi ce qui menace le plus la sécurité ou l’état clinique maintenant.",
      "Choisis l’intervention qui répond directement à cette priorité.",
    ],
  },
  {
    title: "4. S’entraîner avec des mises en situation",
    icon: ClipboardList,
    items: [
      "Pratique avec des cas cliniques, pas seulement avec tes notes de cours.",
      "Pour chaque situation, demande-toi : qu’est-ce qui est prioritaire?",
      "Repère les mots clés : soudain, détresse, confusion, douleur thoracique, désaturation, hypotension.",
      "Explique pourquoi une réponse est meilleure qu’une autre.",
    ],
  },
  {
    title: "5. Prioriser avec ABCDE",
    icon: ShieldCheck,
    items: [
      "A — Airway : les voies respiratoires sont-elles dégagées?",
      "B — Breathing : la respiration est-elle efficace?",
      "C — Circulation : perfusion, saignement, tension artérielle, pouls.",
      "D — Disability : état neurologique, confusion, niveau de conscience.",
      "E — Exposure : douleur, peau, température, signes visibles ou contexte global.",
    ],
  },
  {
    title: "6. Faire des fiches intelligentes",
    icon: PencilLine,
    items: [
      "Ne recopie pas tout ton PowerPoint.",
      "Fais une fiche par notion importante.",
      "Structure tes fiches avec : définition, signes, surveillances, interventions, quand aviser.",
      "Ajoute un mini exemple clinique pour pratiquer ton raisonnement.",
    ],
  },
];

const erreurs = [
  "Relire ses notes passivement sans se questionner.",
  "Apprendre par cœur sans comprendre les liens cliniques.",
  "Négliger les signes de détérioration.",
  "Étudier seulement la théorie et pas les mises en situation.",
  "Oublier les médicaments, les surveillances et les paramètres à vérifier.",
  "Changer sa réponse sans raison solide à la fin de l’examen.",
];

const trucsExamen = [
  "Lis la question jusqu’au bout avant de regarder les choix.",
  "Souligne mentalement les mots clés : prioritaire, immédiat, d’abord, inquiétant, à aviser.",
  "Élimine les réponses qui ne répondent pas directement à la question.",
  "Reviens toujours à la sécurité du patient.",
  "Choisis l’action infirmière la plus pertinente selon le contexte.",
  "Si deux réponses semblent bonnes, demande-toi laquelle est la plus prioritaire maintenant.",
];

export default function EtudierExamenSoinsInfirmiersPage() {
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
              <GraduationCap className="h-4 w-4" />
              Guide d’étude
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Étudier pour un examen en{" "}
              <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                soins infirmiers
              </span>
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Trucs simples pour réviser efficacement, répondre aux mises en
              situation, reconnaître les priorités et développer ton raisonnement
              clinique avant un examen.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <Brain className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Comprendre
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Faire des liens cliniques.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <Target className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Prioriser
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Choisir ce qui est urgent.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <ClipboardList className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Pratiquer
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Cas cliniques et questions.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-800 text-white shadow-lg shadow-violet-100">
              <Lightbulb className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Point clé
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              En soins infirmiers, les examens évaluent souvent plus que la
              mémoire : ils évaluent ta capacité à reconnaître les données
              significatives, prioriser et choisir l’intervention la plus
              sécuritaire.
            </p>

            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5">
              <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                Astuce rapide
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quand tu hésites, reviens à cette question : qu’est-ce qui peut
                se détériorer le plus rapidement si je n’agis pas?
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-[36px] border border-amber-100 bg-amber-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Timer className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                Avant de commencer
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Étudier plus longtemps ne veut pas toujours dire mieux étudier
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Le but n’est pas de relire tes notes pendant des heures. Le but
                est d’être capable d’utiliser tes connaissances dans une
                situation clinique : reconnaître les signes importants, prioriser
                et expliquer ton choix.
              </p>
            </div>
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

        <section className="mt-8 rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-xl shadow-violet-100 backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
              <HelpCircle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Pendant l’examen
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Comment répondre aux questions à choix multiples
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Les questions en soins infirmiers contiennent souvent des indices
                dans la formulation. Ton travail est de repérer la priorité et
                de choisir l’action la plus sécuritaire selon le contexte.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trucsExamen.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-violet-50 p-4 text-sm font-bold leading-6 text-violet-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-red-100 bg-red-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">
                Erreurs fréquentes
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                À éviter pendant tes révisions
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {erreurs.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-red-100 bg-white/75 p-4 text-sm font-bold leading-6 text-red-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
              <BookOpen className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Exemple de fiche efficace
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Une fiche de révision devrait répondre à ces questions
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Quels sont les signes et symptômes importants?",
              "Quelles données dois-je surveiller?",
              "Quelles interventions sont prioritaires?",
              "Quand dois-je aviser rapidement?",
              "Quels médicaments ou paramètres sont liés à cette notion?",
              "Quelle complication dois-je prévenir?",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                <p>{item}</p>
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
                Étudie avec des cas cliniques
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Utilise Repère PTI pour transformer une situation clinique en
                données significatives, constats, priorités et interventions.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <Link
                href="/generer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-800 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-900"
              >
                Générer un PTI
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/corriger"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-white px-6 py-4 text-sm font-extrabold text-violet-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Corriger mon PTI
                <WandSparkles className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Questions fréquentes
          </h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Est-ce que je dois tout apprendre par cœur?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Non. Certaines connaissances doivent être mémorisées, mais les
                examens en soins infirmiers demandent souvent d’appliquer les
                connaissances dans une situation clinique. La compréhension des
                liens est essentielle.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Comment savoir quoi prioriser?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Commence par la sécurité et les fonctions vitales : respiration,
                circulation, état neurologique, douleur importante, signes de
                détérioration ou risque immédiat.
              </p>
            </details>

            <details className="rounded-2xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-black text-slate-900">
                Quelle est la meilleure façon de réviser une pathologie?
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Révise avec une structure stable : définition rapide, signes et
                symptômes, surveillances, interventions, complications, quand
                aviser et exemple de mise en situation.
              </p>
            </details>
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          Repère PTI est un outil éducatif. Il ne remplace pas les consignes de
          ton programme, l’encadrement pédagogique ou les exigences de ton
          établissement.
        </p>
      </div>
    </main>
  );
}