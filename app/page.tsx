"use client";

import { useEffect, useState } from "react";
import {
  Stethoscope,
  Sparkles,
  ClipboardList,
  Brain,
  GraduationCap,
  Smartphone,
  ArrowRight,
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
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6">
        <header className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-lg shadow-pink-100">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-extrabold leading-4">Repère PTI</p>
              <p className="text-xs text-slate-400">Outil éducatif</p>
            </div>
          </a>

          <a
            href={connecte ? "/dashboard" : "/login"}
            className="rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm ring-1 ring-violet-100 transition hover:bg-white hover:text-pink-500 sm:text-sm"
          >
            {connecte ? "Dashboard" : "Connexion"}
          </a>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Outil IA éducatif pour futures infirmières
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl md:text-7xl">
            Structure tes{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              PTI
            </span>{" "}
            plus facilement.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Transforme une situation clinique anonymisée en ébauche de plan
            thérapeutique infirmier clair, structuré et utile pour pratiquer ton
            raisonnement clinique.
          </p>

          <div className="mt-5 rounded-full bg-white/80 px-5 py-3 text-sm font-bold text-violet-700 shadow-sm ring-1 ring-violet-100">
            ✨ Plus de 600 étudiantes ont découvert Repère PTI
          </div>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href="/generer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Générer un PTI
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="/ressources/exemple-pti"
              className="rounded-2xl bg-white/85 px-7 py-4 text-sm font-extrabold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Voir des exemples
            </a>

            <a
              href="/quiz"
              className="rounded-2xl bg-white/85 px-7 py-4 text-sm font-extrabold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Quiz clinique
            </a>
          </div>

          <div className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/75 p-5 shadow-sm">
              <ClipboardList className="mx-auto h-6 w-6 text-violet-600" />
              <p className="mt-3 font-extrabold">PTI structurés</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Constats, directives et justification.
              </p>
            </div>

            <div className="rounded-3xl bg-white/75 p-5 shadow-sm">
              <Brain className="mx-auto h-6 w-6 text-pink-600" />
              <p className="mt-3 font-extrabold">Raisonnement clinique</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Pour faire des liens entre données et priorités.
              </p>
            </div>

            <div className="rounded-3xl bg-white/75 p-5 shadow-sm">
              <GraduationCap className="mx-auto h-6 w-6 text-fuchsia-600" />
              <p className="mt-3 font-extrabold">Pensé pour les stages</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Un support éducatif simple et rapide.
              </p>
            </div>
          </div>

          <p className="mt-9 max-w-2xl rounded-2xl bg-white/70 px-4 py-3 text-xs leading-6 text-slate-400 shadow-sm">
            🔒 N'inscris jamais le nom, la date de naissance ou toute autre
            information permettant d'identifier un patient.
          </p>

          <a
            href="/installer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-100/80 px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-200/80 hover:text-pink-600"
          >
            <Smartphone className="h-4 w-4" />
            Installer sur mon téléphone
          </a>
        </div>

        <footer className="border-t border-slate-200 py-6 text-center">
          <p className="text-xs leading-5 text-slate-400">
            © 2026 Repère PTI • Outil éducatif destiné au développement du
            raisonnement clinique.
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row sm:gap-6">
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