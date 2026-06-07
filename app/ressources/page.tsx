import Navbar from "@/components/Navbar";
import {
  HeartPulse,
  Candy,
  Wind,
  Brain,
  Bug,
  ClipboardList,
  FileText,
  Pill,
  Stethoscope,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RessourcesPage() {
  const ressources = [
    {
      titre: "Insuffisance cardiaque",
      description:
        "Signes, symptômes, surveillances et interventions prioritaires.",
      lien: "/ressources/insuffisance-cardiaque",
      icon: HeartPulse,
      tag: "Cardio",
    },
    {
      titre: "Diabète",
      description:
        "Hypoglycémie, hyperglycémie, surveillance et enseignement.",
      lien: "/ressources/diabete",
      icon: Candy,
      tag: "Endocrino",
    },
    {
      titre: "MPOC",
      description: "Évaluation respiratoire et interventions infirmières.",
      lien: "/ressources/mpoc",
      icon: Wind,
      tag: "Respiratoire",
    },
    {
      titre: "AVC",
      description: "Reconnaissance rapide et priorités de soins.",
      lien: "/ressources/avc",
      icon: Brain,
      tag: "Neuro",
    },
    {
      titre: "Sepsis",
      description: "Signes d'alarme, surveillance et prise en charge.",
      lien: "/ressources/sepsis",
      icon: Bug,
      tag: "Urgence",
    },
    {
      titre: "PTI et raisonnement clinique",
      description: "Guide rapide pour construire un PTI efficace.",
      lien: "/ressources/pti",
      icon: ClipboardList,
      tag: "PTI",
    },
    {
      titre: "Exemples de PTI",
      description:
        "Exemples éducatifs : chute, dyspnée, douleur, diabète et plaie.",
      lien: "/ressources/exemple-pti",
      icon: FileText,
      tag: "Exemples",
    },
    {
      titre: "Médicaments",
      description: "Administration sécuritaire et surveillance.",
      lien: "/ressources/medicaments",
      icon: Pill,
      tag: "Pharmaco",
    },
    {
      titre: "Évaluation clinique",
      description: "Collecte de données et examen physique.",
      lien: "/ressources/evaluation-clinique",
      icon: Stethoscope,
      tag: "Évaluation",
    },
    {
      titre: "Sources fiables",
      description:
        "OIIQ, INESSS, MSSS, INSPQ, CDC et autres références reconnues.",
      lien: "/ressources/sources-fiables",
      icon: BookOpen,
      tag: "Références",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
      <Navbar />

      <section className="relative mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-14">
        <div className="pointer-events-none absolute -right-40 top-0 h-[360px] w-[360px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[320px] w-[320px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative z-10">
          <a
            href="/"
            className="mb-6 inline-flex text-sm font-bold text-violet-700 transition hover:text-violet-900"
          >
            ← Retour à l'accueil
          </a>

          <div className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Aide-mémoires cliniques
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              Ressources{" "}
              <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                cliniques
              </span>
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Des fiches simples, visuelles et rapides pour réviser les
              priorités, les surveillances et les interventions infirmières.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ressources.map((ressource) => {
              const Icon = ressource.icon;

              return (
                <a
                  key={ressource.lien}
                  href={ressource.lien}
                  className="group rounded-[30px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800 transition group-hover:bg-violet-800 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                      {ressource.tag}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-slate-950">
                    {ressource.titre}
                  </h2>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {ressource.description}
                  </p>

                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-violet-800">
                    Ouvrir
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </p>
                </a>
              );
            })}
          </div>

          <div className="mt-8 rounded-[32px] border border-violet-100 bg-white/70 p-5 text-center shadow-sm backdrop-blur md:p-6">
            <p className="text-sm leading-6 text-slate-500">
              Ces ressources sont éducatives et ne remplacent pas les politiques
              du milieu, les normes professionnelles ou la validation par une
              personne qualifiée.
            </p>

            <a
              href="/generer"
              className="mt-4 inline-flex rounded-2xl bg-violet-800 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900"
            >
              Générer un PTI
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}