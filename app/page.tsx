"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  ClipboardList,
  Brain,
  GraduationCap,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [connecte, setConnecte] = useState(false);

  useEffect(() => {
    const verifierConnexion = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setConnecte(!!user);
    };

    verifierConnexion();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

        <header className="relative z-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[20px] shadow-lg shadow-violet-100 ring-1 ring-violet-100/70">
  <img
    src="/icon-192.png"
    alt="Repère PTI"
    className="h-full w-full object-cover"
  />
</div>

            <div className="text-left">
              <p className="text-base font-black tracking-tight text-slate-950">
                Repère PTI
              </p>
              <p className="text-xs font-medium text-slate-400">
                Outil éducatif
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-500 md:flex">
            <a href="/ressources" className="transition hover:text-violet-700">
              Ressources
            </a>

            <a href="/quiz" className="transition hover:text-violet-700">
              Quiz
            </a>

            <a href="/premium" className="transition hover:text-violet-700">
              Premium
            </a>
          </nav>

          <a
            href={connecte ? "/dashboard" : "/login"}
            className="rounded-full border border-violet-100 bg-white/80 px-5 py-2.5 text-xs font-extrabold text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:text-sm"
          >
            {connecte ? "Tableau de bord" : "Connexion"}
          </a>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Pour étudiantes en soins infirmiers
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Repère{" "}
              <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                PTI
              </span>
            </h1>

            <div className="mx-auto mt-4 h-px w-48 bg-gradient-to-r from-transparent via-violet-300 to-transparent lg:mx-0" />

            <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.24em] text-violet-800">
              Générateur éducatif de PTI
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              Structure tes constats, directives et justifications pour
              pratiquer ton raisonnement clinique avec plus de clarté.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-5 py-3 text-sm font-bold text-violet-700 shadow-sm">
              ✨ Plus de 600 étudiantes ont découvert Repère PTI
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/generer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-800 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-900 hover:shadow-2xl"
              >
                Générer un PTI
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/ressources/exemple-pti"
                className="inline-flex items-center justify-center rounded-2xl border border-violet-100 bg-white/85 px-7 py-4 text-sm font-extrabold text-violet-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                Voir des exemples
              </a>

              <a
                href="/quiz"
                className="inline-flex items-center justify-center rounded-2xl border border-violet-100 bg-white/85 px-7 py-4 text-sm font-extrabold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                Quiz clinique
              </a>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <ClipboardList className="mx-auto h-6 w-6 text-violet-700 lg:mx-0" />
                <p className="mt-3 font-extrabold text-slate-900">
                  Structure
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Constats et directives claires.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <Brain className="mx-auto h-6 w-6 text-violet-700 lg:mx-0" />
                <p className="mt-3 font-extrabold text-slate-900">
                  Raisonne
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Liens entre données et priorités.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <GraduationCap className="mx-auto h-6 w-6 text-violet-700 lg:mx-0" />
                <p className="mt-3 font-extrabold text-slate-900">
                  Progresse
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Pensé pour les stages.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-violet-200/50 to-pink-100/60 blur-2xl" />

            <div className="relative rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-2xl shadow-violet-100 backdrop-blur">
              <div className="rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                      Aperçu
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      PTI suggéré
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-800 text-white shadow-lg">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                    <p className="text-sm font-extrabold text-violet-800">
                      1. Constat prioritaire
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Risque de détérioration respiratoire.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                    <p className="text-sm font-extrabold text-violet-800">
                      1.1 Directive
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Surveiller SpO₂, dyspnée et effort respiratoire.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                    <p className="text-sm font-extrabold text-violet-800">
                      1.2 À aviser
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Désaturation, confusion ou fatigue marquée.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <CheckCircle className="h-5 w-5 shrink-0 text-violet-700" />
                <p className="text-sm font-medium leading-6 text-slate-600">
                  Un support éducatif pour clarifier tes idées avant validation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="relative z-10 mb-8 rounded-[32px] border border-white/80 bg-white/70 p-5 text-center shadow-sm backdrop-blur md:p-6">
          <p className="text-xs leading-6 text-slate-500">
            🔒 N'inscris jamais le nom, la date de naissance ou toute autre
            information permettant d'identifier un patient.
          </p>

          <a
            href="/installer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-3 text-sm font-extrabold text-violet-800 transition hover:bg-violet-200"
          >
            <Smartphone className="h-4 w-4" />
            Installer sur mon téléphone
          </a>
        </section>

        <footer className="relative z-10 border-t border-violet-100 py-6 text-center">
          <p className="text-xs leading-5 text-slate-400">
            © 2026 Repère PTI • Outil éducatif destiné au développement du
            raisonnement clinique.
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row sm:gap-6">
            <a
              href="/politique-confidentialite"
              className="transition hover:text-violet-700"
            >
              Politique de confidentialité
            </a>

            <a
              href="/conditions-utilisation"
              className="transition hover:text-violet-700"
            >
              Conditions d'utilisation
            </a>

            <a href="/contact" className="transition hover:text-violet-700">
              Contact
            </a>

            <a href="/installer" className="transition hover:text-violet-700">
              Installer l’app
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}