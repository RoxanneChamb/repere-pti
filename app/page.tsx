"use client";

import {
  Sparkles,
  ClipboardList,
  Brain,
  GraduationCap,
  Smartphone,
  ArrowRight,
  CheckCircle,
  WandSparkles,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
      <section className="relative mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-10">
        <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative z-10 grid min-h-[calc(100vh-96px)] items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-14">
          <div className="text-left">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-100 bg-white/85 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-violet-700 shadow-sm backdrop-blur sm:text-xs">
              <Sparkles className="h-4 w-4 shrink-0" />
              Pour étudiantes en soins infirmiers
            </div>

            <h1 className="mt-6 max-w-3xl text-[3.25rem] font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Repère{" "}
              <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                PTI
              </span>
            </h1>

            <p className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-violet-800">
              Générateur et correcteur éducatif de PTI
            </p>

            <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-slate-600 sm:text-lg">
              Structure tes constats, directives et justifications, puis fais
              corriger ton PTI pour pratiquer ton raisonnement clinique avec
              plus de clarté.
            </p>

            <div className="mt-6 rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur sm:inline-flex sm:items-center sm:gap-2 sm:rounded-full sm:px-5 sm:py-3">
              <p className="text-sm font-bold leading-6 text-violet-800">
                ✨ Plus de 800 étudiantes ont découvert Repère PTI
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Link
                href="/generer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-800 px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-900"
              >
                Générer un PTI
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/corriger"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-white/90 px-6 py-4 text-sm font-extrabold text-violet-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Corriger mon PTI
                <WandSparkles className="h-4 w-4" />
              </Link>

              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-white/90 px-6 py-4 text-sm font-extrabold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Quiz clinique
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[26px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
                <ClipboardList className="h-6 w-6 text-violet-700" />
                <p className="mt-3 font-extrabold text-slate-900">
                  Structure
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Constats et directives claires.
                </p>
              </div>

              <div className="rounded-[26px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
                <Brain className="h-6 w-6 text-violet-700" />
                <p className="mt-3 font-extrabold text-slate-900">
                  Raisonne
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Liens entre données et priorités.
                </p>
              </div>

              <div className="rounded-[26px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
                <GraduationCap className="h-6 w-6 text-violet-700" />
                <p className="mt-3 font-extrabold text-slate-900">
                  Corrige
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Rétroaction éducative.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md lg:block lg:max-w-lg">
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

        <section className="relative z-10 rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Confidentialité
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  N’inscris jamais le nom, la date de naissance ou toute autre
                  information permettant d’identifier un patient.
                </p>
              </div>
            </div>

            <Link
              href="/installer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-100 px-5 py-3 text-sm font-extrabold text-violet-800 transition hover:bg-violet-200"
            >
              <Smartphone className="h-4 w-4" />
              Installer sur mon téléphone
            </Link>
          </div>
        </section>

        <footer className="relative z-10 mt-8 border-t border-violet-100 py-6 text-center">
          <p className="text-xs leading-5 text-slate-400">
            © 2026 Repère PTI • Outil éducatif destiné au développement du
            raisonnement clinique.
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row sm:gap-6">
            <Link
              href="/politique-confidentialite"
              className="transition hover:text-violet-700"
            >
              Politique de confidentialité
            </Link>

            <Link
              href="/conditions-utilisation"
              className="transition hover:text-violet-700"
            >
              Conditions d’utilisation
            </Link>

            <Link href="/contact" className="transition hover:text-violet-700">
              Contact
            </Link>

            <Link
              href="/installer"
              className="transition hover:text-violet-700"
            >
              Installer l’app
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}