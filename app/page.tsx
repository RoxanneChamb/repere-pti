"use client";

import { useEffect, useState } from "react";
import {
  Stethoscope,
  Sparkles,
  ClipboardList,
  GraduationCap,
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
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-16">
        <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-bold text-violet-600 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="truncate">
            Outil éducatif IA pour futures infirmières
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-16 w-16 items-center justify-center rounded-[28px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-400 shadow-xl shadow-pink-200/60 sm:h-14 sm:w-14 sm:rounded-3xl">
            <Stethoscope className="h-8 w-8 text-white sm:h-7 sm:w-7" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Repère PT
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              I
            </span>
          </h1>
        </div>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8">
          Transforme une situation clinique en plan thérapeutique infirmier
          clair, structuré et facile à comprendre.
        </p>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Créé par une infirmière • Propulsé par l’IA
        </p>

        <div className="mt-8 grid w-full max-w-sm gap-3 sm:mt-9 sm:max-w-none sm:grid-cols-4">
          <a
            href="/generer"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Générer un PTI
          </a>

          <a
            href="/mes-pti"
            className="rounded-2xl bg-white/85 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Mes PTI
          </a>

          <a
            href="/quiz"
            className="rounded-2xl bg-white/85 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Quiz clinique
          </a>

          <a
            href="/ressources"
            className="rounded-2xl bg-white/85 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Ressources
          </a>
        </div>

        <div className="mt-10 grid w-full max-w-sm grid-cols-2 gap-3 text-sm font-semibold text-slate-500 sm:mt-12 sm:max-w-none sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-3 py-3 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
            <ClipboardList className="h-4 w-4 text-violet-500" />
            PTI structurés
          </span>

          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-3 py-3 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
            <Sparkles className="h-4 w-4 text-pink-500" />
            Raisonnement
          </span>

          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-3 py-3 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
            <GraduationCap className="h-4 w-4 text-violet-500" />
            Quiz clinique
          </span>

          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-3 py-3 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
            <Stethoscope className="h-4 w-4 text-fuchsia-500" />
            Stages
          </span>
        </div>

        <a
          href={connecte ? "/dashboard" : "/login"}
          className="mt-8 inline-flex w-full max-w-sm justify-center rounded-2xl border border-violet-100 bg-white/80 px-6 py-3 text-sm font-bold text-violet-600 shadow-sm transition hover:text-pink-500 sm:mt-9 sm:w-auto sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none"
        >
          {connecte
            ? "Accéder à mon tableau de bord"
            : "Connexion / Créer un compte"}
        </a>

        <p className="mt-8 max-w-2xl rounded-2xl bg-white/70 px-4 py-3 text-center text-xs leading-6 text-slate-400 shadow-sm sm:mt-10 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
          🔒 N'inscris jamais le nom, la date de naissance ou toute autre
          information permettant d'identifier un patient.
        </p>

        <div className="mt-12 w-full max-w-2xl border-t border-slate-200 pt-6 sm:mt-16 sm:pt-8">
          <p className="mb-4 text-xs leading-5 text-slate-400">
            © 2026 Repère PTI • Outil éducatif destiné au développement du
            raisonnement clinique.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-6">
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
          </div>
        </div>
      </section>
    </main>
  );
}