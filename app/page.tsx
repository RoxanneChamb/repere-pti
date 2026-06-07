"use client";

import { useEffect, useState } from "react";
import {
  Stethoscope,
  Sparkles,
  ClipboardList,
  GraduationCap,
  Brain,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  CheckCircle,
  FileText,
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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#f5d0fe_0,#f5f3ff_32%,#fff_70%)] text-slate-900">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-16 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />

        <header className="relative z-10 flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur md:px-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 shadow-lg shadow-pink-200">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>

            <div className="text-left">
              <p className="text-sm font-extrabold leading-4">Repère PTI</p>
              <p className="text-xs text-slate-400">Outil éducatif</p>
            </div>
          </a>

          <div className="hidden items-center gap-5 text-sm font-bold text-slate-600 md:flex">
            <a href="/ressources" className="transition hover:text-violet-600">
              Ressources
            </a>
            <a href="/quiz" className="transition hover:text-violet-600">
              Quiz
            </a>
            <a href="/premium" className="transition hover:text-violet-600">
              Premium
            </a>
          </div>

          <a
            href={connecte ? "/dashboard" : "/login"}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-700 md:text-sm"
          >
            {connecte ? "Dashboard" : "Connexion"}
          </a>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold text-violet-700 shadow-sm backdrop-blur md:text-sm">
              <Sparkles className="h-4 w-4" />
              Outil IA éducatif pour futures infirmières
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Structure tes{" "}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                PTI
              </span>
              <br className="hidden sm:block" />
              plus clairement.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              Transforme une situation clinique anonymisée en ébauche de plan
              thérapeutique infirmier, pratique ton raisonnement clinique et
              révise avec des quiz inspirés des stages.
            </p>

            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="/generer"
                className="group inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-pink-200 transition hover:-translate-y-1 hover:shadow-2xl sm:w-auto"
              >
                Générer un PTI
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>

              <a
                href="/ressources/exemple-pti"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-white/85 px-7 py-4 text-sm font-extrabold text-violet-700 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:w-auto"
              >
                Voir des exemples
              </a>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-bold text-violet-700 shadow-sm ring-1 ring-violet-100">
              ✨ Plus de 600 étudiantes ont découvert Repère PTI
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <ClipboardList className="h-5 w-5 text-violet-600" />
                  <p className="font-extrabold">PTI structurés</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Constats, directives et justification clinique.
                </p>
              </div>

              <div className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Brain className="h-5 w-5 text-pink-600" />
                  <p className="font-extrabold">Raisonnement</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Aide à faire les liens entre données et priorités.
                </p>
              </div>

              <div className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <GraduationCap className="h-5 w-5 text-fuchsia-600" />
                  <p className="font-extrabold">Quiz clinique</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Pratique avec correction instantanée.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-violet-300/40 via-pink-300/30 to-white blur-2xl" />

            <div className="relative rounded-[36px] border border-white/70 bg-white/85 p-5 shadow-2xl shadow-violet-100 backdrop-blur md:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-500">
                    Aperçu
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold">
                    PTI suggéré
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-white shadow-lg">
                  <FileText className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 p-5">
                <p className="text-sm font-extrabold text-violet-700">
                  Résumé de la situation
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Patient avec dyspnée, SpO₂ diminuée et risque de
                  détérioration respiratoire.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-extrabold text-slate-900">
                    1. Constat prioritaire
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Risque de détérioration respiratoire.
                  </p>

                  <div className="mt-3 rounded-2xl bg-violet-50 p-3 text-sm text-violet-800">
                    1.1 Surveiller SpO₂, dyspnée et effort respiratoire.
                  </div>
                </div>

                <div className="rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-extrabold text-slate-900">
                    2. Directive liée
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Aviser si désaturation, confusion ou fatigue marquée.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-slate-50 p-3 text-center">
                  <p className="text-lg font-black text-violet-700">PTI</p>
                  <p className="text-xs text-slate-400">structuré</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 text-center">
                  <p className="text-lg font-black text-pink-700">Quiz</p>
                  <p className="text-xs text-slate-400">clinique</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 text-center">
                  <p className="text-lg font-black text-fuchsia-700">PDF</p>
                  <p className="text-xs text-slate-400">premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="relative z-10 grid gap-4 pb-10 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100">
              <CheckCircle className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="mt-4 font-extrabold">Pensé pour les stages</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Pour t’aider à organiser tes idées avant de valider avec ton
              enseignante ou ton milieu.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100">
              <ShieldCheck className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="mt-4 font-extrabold">Sécurité d’abord</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Rappel clair : aucune donnée nominative ou identifiable ne doit
              être inscrite.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-100">
              <Smartphone className="h-6 w-6 text-fuchsia-600" />
            </div>
            <h3 className="mt-4 font-extrabold">Accessible sur mobile</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Ajoute Repère PTI à ton téléphone pour y accéder rapidement.
            </p>
          </div>
        </section>

        <section className="relative z-10 mb-10 rounded-[32px] border border-violet-100 bg-white/80 p-5 text-center shadow-sm backdrop-blur md:p-7">
          <p className="text-xs leading-6 text-slate-500">
            🔒 N'inscris jamais le nom, la date de naissance ou toute autre
            information permettant d'identifier un patient.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={connecte ? "/dashboard" : "/login"}
              className="inline-flex w-full justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-700 sm:w-auto"
            >
              {connecte
                ? "Accéder à mon tableau de bord"
                : "Connexion / Créer un compte"}
            </a>

            <a
              href="/installer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-100 px-6 py-3 text-sm font-bold text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-200 sm:w-auto"
            >
              <Smartphone className="h-4 w-4" />
              Installer sur mon téléphone
            </a>
          </div>
        </section>

        <footer className="relative z-10 border-t border-slate-200 py-6 text-center">
          <p className="text-xs leading-5 text-slate-400">
            © 2026 Repère PTI • Outil éducatif destiné au développement du
            raisonnement clinique.
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href="/politique-confidentialite"
              className="transition hover:text-violet-600"
            >
              Politique de confidentialité
            </a>

            <a
              href="/conditions-utilisation"
              className="transition hover:text-violet-600"
            >
              Conditions d'utilisation
            </a>

            <a href="/contact" className="transition hover:text-violet-600">
              Contact
            </a>

            <a href="/installer" className="transition hover:text-violet-600">
              Installer l’app
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}