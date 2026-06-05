"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Stethoscope, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const creerProfilSiBesoin = async (userId: string) => {
    await supabase.from("profiles").upsert({
      id: userId,
      pti_count: 0,
      display_name: "Étudiante Repère PTI",
      avatar_image: "/avatars/avatar1.png",
      premium: false,
    });

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
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white px-4 py-6 text-slate-900 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col">
        <a href="/" className="w-fit text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_420px]">
            <div className="hidden lg:block">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-bold text-violet-600 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Ton espace clinique personnel
              </div>

              <h1 className="mt-6 text-6xl font-extrabold tracking-tight">
                Bienvenue sur{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                  Repère PTI
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Connecte-toi pour accéder à ton tableau de bord, générer des
                PTI, pratiquer avec les quiz cliniques et suivre ta progression.
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
                <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                  <p className="text-2xl">🩺</p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    PTI structurés
                  </p>
                </div>

                <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                  <p className="text-2xl">🧠</p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    Quiz clinique
                  </p>
                </div>

                <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                  <p className="text-2xl">👑</p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    Premium
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-xl backdrop-blur md:p-8">
              <div className="mb-7 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-[28px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-400 shadow-xl shadow-pink-200/60">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>

                <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
                  Connexion
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Connecte-toi ou crée ton compte Repère PTI.
                </p>
              </div>

              {erreur && (
                <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
                  {erreur}
                </div>
              )}

              {message && (
                <div className="mb-5 rounded-2xl bg-green-50 p-4 text-sm font-medium text-green-700">
                  {message}
                </div>
              )}

              <label className="text-sm font-bold text-slate-700">
                Courriel
              </label>

              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 text-base outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                placeholder="exemple@email.com"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="mt-5 block text-sm font-bold text-slate-700">
                Mot de passe
              </label>

              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 text-base outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
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

              <button
                type="button"
                onClick={signIn}
                disabled={chargement}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 p-4 font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {chargement ? "Chargement..." : "Me connecter"}
              </button>

              <button
                type="button"
                onClick={signUp}
                disabled={chargement}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-4 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {chargement ? "Chargement..." : "Créer mon compte"}
              </button>

              <p className="mt-5 rounded-2xl bg-violet-50 p-4 text-center text-xs leading-5 text-violet-700">
                🔒 N'inscris jamais d'information permettant d'identifier un
                patient dans l'application.
              </p>

              <div className="mt-6 flex justify-center gap-4 text-xs text-slate-400">
                <a
                  href="/politique-confidentialite"
                  className="hover:text-violet-600"
                >
                  Confidentialité
                </a>

                <a
                  href="/conditions-utilisation"
                  className="hover:text-violet-600"
                >
                  Conditions
                </a>

                <a href="/contact" className="hover:text-violet-600">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}