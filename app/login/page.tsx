"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Stethoscope,
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  ClipboardList,
  Brain,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const creerProfilSiBesoin = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (!profile) {
      await supabase.from("profiles").insert({
        id: userId,
        pti_count: 0,
        display_name: "Étudiante Repère PTI",
        avatar_image: "/avatars/avatar1.png",
        premium: false,
      });
    }

    await supabase.from("quiz_stats").upsert({
      user_id: userId,
      score: 0,
      bonnes_reponses: 0,
      mauvaises_reponses: 0,
    });
  };

  const signUp = async () => {
    setErreur("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setErreur("Entre ton courriel et ton mot de passe.");
      return;
    }

    if (password.length < 6) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setChargement(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: "https://repere-pti.ca/login",
      },
    });

    setChargement(false);

    if (error) {
      setErreur(error.message);
      return;
    }

    if (typeof window !== "undefined") {
      // @ts-ignore
      window.gtag?.("event", "account_created");
    }

    if (data.user) {
      await creerProfilSiBesoin(data.user.id);
    }

    if (data.session) {
      window.location.href = "/dashboard";
      return;
    }

    setMessage(
      "Compte créé! Vérifie tes courriels pour confirmer ton compte avant de te connecter."
    );
  };

  const signIn = async () => {
    setErreur("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setErreur("Entre ton courriel et ton mot de passe.");
      return;
    }

    setChargement(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setChargement(false);
      setErreur(error.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await creerProfilSiBesoin(user.id);
    }

    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-40 top-0 h-[380px] w-[380px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[340px] w-[340px] rounded-full bg-pink-100/70 blur-3xl" />

        <header className="relative z-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-violet-800 shadow-lg shadow-violet-100">
              <Stethoscope className="h-6 w-6 text-white" />
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

          <a
            href="/"
            className="rounded-full border border-violet-100 bg-white/80 px-5 py-2.5 text-xs font-extrabold text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:text-sm"
          >
            Accueil
          </a>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_430px] lg:py-16">
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Ton espace clinique personnel
            </div>

            <h1 className="mt-7 text-6xl font-black tracking-tight text-slate-950">
              Bienvenue sur{" "}
              <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                Repère PTI
              </span>
            </h1>

            <div className="mt-5 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Connecte-toi pour accéder à ton tableau de bord, générer des PTI,
              pratiquer avec les quiz cliniques et suivre ta progression.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <ClipboardList className="h-6 w-6 text-violet-800" />
                <p className="mt-4 font-extrabold text-slate-900">
                  PTI structurés
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Constats et directives.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <Brain className="h-6 w-6 text-violet-800" />
                <p className="mt-4 font-extrabold text-slate-900">
                  Quiz clinique
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Pratique instantanée.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <ShieldCheck className="h-6 w-6 text-violet-800" />
                <p className="mt-4 font-extrabold text-slate-900">
                  Sécuritaire
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Données anonymisées.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-[36px] border border-white/80 bg-white/85 p-6 shadow-2xl shadow-violet-100 backdrop-blur md:p-8">
            <div className="mb-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[26px] bg-violet-800 shadow-lg shadow-violet-100">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>

              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
                Connexion
              </p>

              <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
                Accéder à mon espace
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Connecte-toi ou crée ton compte Repère PTI.
              </p>
            </div>

            {erreur && (
              <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
                {erreur}
              </div>
            )}

            {message && (
              <div className="mb-5 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
                {message}
              </div>
            )}

            <label className="text-sm font-extrabold text-slate-700">
              Courriel
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3 transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
              <Mail className="h-5 w-5 text-violet-700" />
              <input
                className="w-full bg-transparent text-base outline-none"
                placeholder="exemple@email.com"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="mt-5 block text-sm font-extrabold text-slate-700">
              Mot de passe
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3 transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
              <Lock className="h-5 w-5 text-violet-700" />
              <input
                className="w-full bg-transparent text-base outline-none"
                placeholder="Minimum 6 caractères"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    signIn();
                  }
                }}
              />
            </div>

            <button
              type="button"
              onClick={signIn}
              disabled={chargement}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-800 p-4 font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {chargement ? "Chargement..." : "Me connecter"}
              {!chargement && <ArrowRight className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={signUp}
              disabled={chargement}
              className="mt-3 w-full rounded-2xl border border-violet-100 bg-white p-4 font-extrabold text-violet-800 transition hover:-translate-y-0.5 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {chargement ? "Chargement..." : "Créer mon compte"}
            </button>

            <p className="mt-5 rounded-2xl bg-violet-50 p-4 text-center text-xs leading-5 text-violet-800">
              🔒 N'inscris jamais d'information permettant d'identifier un
              patient dans l'application.
            </p>

            <div className="mt-6 flex justify-center gap-4 text-xs text-slate-400">
              <a
                href="/politique-confidentialite"
                className="hover:text-violet-700"
              >
                Confidentialité
              </a>

              <a
                href="/conditions-utilisation"
                className="hover:text-violet-700"
              >
                Conditions
              </a>

              <a href="/contact" className="hover:text-violet-700">
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}