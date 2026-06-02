import { Stethoscope, Sparkles, ClipboardList, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-bold text-violet-600 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4" />
          Outil éducatif IA pour futures infirmières
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-400 shadow-xl shadow-pink-200/60">
            <Stethoscope className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Repère PT
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              I
            </span>
          </h1>
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Transforme une situation clinique en plan thérapeutique infirmier (PTI)
          clair, structuré et facile à comprendre.
        </p>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Créé par une infirmière • Propulsé par l’IA
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="/generer"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Générer un PTI
          </a>

          <a
            href="/mes-pti"
            className="rounded-2xl bg-white/80 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Mes PTI
          </a>

          <a
            href="/quiz"
            className="rounded-2xl bg-white/80 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Quiz clinique
          </a>

          <a
            href="/ressources"
            className="rounded-2xl bg-white/80 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Ressources
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
          <span className="inline-flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-violet-500" />
            PTI structurés
          </span>

          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-500" />
            Raisonnement clinique
          </span>

          <span className="inline-flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-violet-500" />
            Quiz clinique
          </span>

          <span className="inline-flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-fuchsia-500" />
            Pensé pour les stages
          </span>
        </div>

        <a
          href="/login"
          className="mt-9 text-sm font-semibold text-violet-600 transition hover:text-pink-500"
        >
          Connexion / Créer un compte
        </a>

        <div className="mt-12 flex justify-center gap-6 text-black text-slate-500">
  <a href="/politique-confidentialite">
    Politique de confidentialité
  </a>

  <a href="/conditions-utilisation">
    Conditions d'utilisation
  </a>
</div> 

      </section>
    </main>

  );
}