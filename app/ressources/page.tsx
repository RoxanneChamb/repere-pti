import { Stethoscope } from "lucide-react";

export default function RessourcesPage() {
  const ressources = [
    {
      titre: "❤️ Insuffisance cardiaque",
      description: "Signes, symptômes, surveillances et interventions prioritaires.",
      lien: "/ressources/insuffisance-cardiaque",
    },
    {
      titre: "🍬 Diabète",
      description: "Hypoglycémie, hyperglycémie, surveillance et enseignement.",
      lien: "/ressources/diabete",
    },
    {
      titre: "🫁 MPOC",
      description: "Évaluation respiratoire et interventions infirmières.",
      lien: "/ressources/mpoc",
    },
    {
      titre: "🧠 AVC",
      description: "Reconnaissance rapide et priorités de soins.",
      lien: "/ressources/avc",
    },
    {
      titre: "🦠 Sepsis",
      description: "Signes d'alarme, surveillance et prise en charge.",
      lien: "/ressources/sepsis",
    },
    {
      titre: "📋 PTI et raisonnement clinique",
      description: "Guide rapide pour construire un PTI efficace.",
      lien: "/ressources/pti",
    },
    {
      titre: "💊 Médicaments",
      description: "Administration sécuritaire et surveillance.",
      lien: "/ressources/medicaments",
    },
    {
      titre: "🩺 Évaluation clinique",
      description: "Collecte de données et examen physique.",
      lien: "/ressources/evaluation-clinique",
    },
    {
      titre: "📚 Sources fiables",
      description: "OIIQ, INESSS, MSSS, INSPQ, CDC et autres références reconnues.",
      lien: "/ressources/sources-fiables",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <header className="border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <a href="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-400 shadow-lg">
              <Stethoscope className="h-7 w-7 text-white" />
            </div>

            <div>
              <p className="text-2xl font-extrabold tracking-tight">
                Repère PT
                <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  I
                </span>
              </p>
              <p className="text-xs font-medium text-slate-500">
                Votre allié pour le raisonnement clinique
              </p>
            </div>
          </a>

          <nav className="hidden gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="/generer" className="hover:text-violet-600">
              Générer un PTI
            </a>
            <a href="/mes-pti" className="hover:text-violet-600">
              Mes PTI
            </a>
            <a href="/ressources" className="text-violet-600">
              Ressources
            </a>
            <a href="/a-propos" className="hover:text-violet-600">
              À propos
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-12">
        
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-bold text-violet-600 shadow-sm backdrop-blur">
  ✨ Aide-mémoires cliniques
</div>
<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
  Ressources cliniques
</h1> 
        
<p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
  Des fiches simples, visuelles et rapides pour réviser les priorités,
  les surveillances et les interventions infirmières.
</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ressources.map((ressource) => (
            <a
              key={ressource.lien}
              href={ressource.lien}
              className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-bold">
                {ressource.titre}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {ressource.description}
              </p>

              <p className="mt-5 text-sm font-bold text-violet-600">
                Ouvrir →
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}