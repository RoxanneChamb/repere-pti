"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("Étudiante Repère PTI");
  const [avatar, setAvatar] = useState("🩺");
  const [ptiCount, setPtiCount] = useState(0);
  const [savedPti, setSavedPti] = useState(0);
  const [score, setScore] = useState(0);
  const [bonnes, setBonnes] = useState(0);
  const [mauvaises, setMauvaises] = useState(0);
  const [userId, setUserId] = useState("");
  const [premium, setPremium] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const avatars = ["🩺", "💜", "🌸", "🧠", "⭐", "👩‍⚕️", "🦋"];

  const totalQuiz = bonnes + mauvaises;
  const precision =
    totalQuiz > 0 ? Math.round((bonnes / totalQuiz) * 100) : 0;

  let niveau = "🌱 Junior";
  let prochainPalier = 15;

  if (ptiCount >= 15 && ptiCount < 30) {
    niveau = "🌸 Intermédiaire";
    prochainPalier = 30;
  } else if (ptiCount >= 30 && ptiCount < 60) {
    niveau = "⭐ Sénior";
    prochainPalier = 60;
  } else if (ptiCount >= 60) {
    niveau = "👑 Experte";
    prochainPalier = 60;
  }

  const progression =
    ptiCount >= 60 ? 100 : Math.min((ptiCount / prochainPalier) * 100, 100);

  useEffect(() => {
    const chargerDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
      setUserId(user.id);
      setEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("pti_count, avatar_emoji, display_name, premium")
        .eq("id", user.id)
        .single();

      const { data: ptis } = await supabase
        .from("ptis")
        .select("id")
        .eq("user_id", user.id);

      const { data: stats } = await supabase
        .from("quiz_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setPtiCount(profile?.pti_count || 0);
      setAvatar(profile?.avatar_emoji || "🩺");
      setDisplayName(profile?.display_name || "Étudiante Repère PTI");
      setPremium(profile?.premium === true);
      setSavedPti(ptis?.length || 0);
      setScore(stats?.score || 0);
      setBonnes(stats?.bonnes_reponses || 0);
      setMauvaises(stats?.mauvaises_reponses || 0);
    };

    chargerDashboard();
  }, []);

  const changerAvatar = async (emoji: string) => {
    setAvatar(emoji);

    if (!userId) return;

    await supabase
      .from("profiles")
      .update({ avatar_emoji: emoji })
      .eq("id", userId);
  };

  const sauvegarderNom = async () => {
    if (!userId) return;

    await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("id", userId);
  };

  if (isLoggedIn === null) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
        <div className="mx-auto mt-20 max-w-xl rounded-[32px] bg-white/85 p-8 text-center shadow-xl">
          <p className="font-bold text-violet-600">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
        <div className="mx-auto mt-20 max-w-xl rounded-[32px] bg-white/85 p-8 text-center shadow-xl">
          <h1 className="text-4xl font-extrabold">Connexion requise</h1>

          <p className="mt-4 text-slate-600">
            Tu dois être connectée pour accéder à ton tableau de bord étudiant.
          </p>

          <a
            href="/login"
            className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 font-bold text-white"
          >
            Me connecter
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Tableau de bord
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600">
              Suis ta progression clinique, ton score, tes badges et ton
              utilisation de Repère PTI.
            </p>
          </div>

          <div className="rounded-[34px] bg-white/90 p-6 shadow-xl">
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 p-6 text-white shadow-lg">
              <div className="absolute right-4 top-4">
                {premium ? (
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                    👑 Utilisatrice Premium
                  </span>
                ) : (
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                    ✨ Version gratuite
                  </span>
                )}
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 text-5xl shadow-inner backdrop-blur">
                  {avatar}
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                    Carte étudiante
                  </p>

                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    onBlur={sauvegarderNom}
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-lg font-extrabold text-white outline-none placeholder:text-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/10"
                  />

                  <p className="mt-2 truncate text-sm text-white/90">{email}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                      {niveau}
                    </span>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                      {ptiCount} PTI générés
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/75">
                    Plateforme
                  </p>
                  <p className="mt-1 text-lg font-bold">Repère PTI</p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2 backdrop-blur">
                  <img
                    src="/icon-192.png"
                    alt="Logo Repère PTI"
                    className="h-8 w-8 rounded-xl bg-white object-cover"
                  />
                  <span className="text-sm font-bold">Repère PTI</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-3 text-sm font-bold text-violet-600">
                Choisir un avatar
              </p>

              <div className="flex flex-wrap gap-2">
                {avatars.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => changerAvatar(emoji)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg transition ${
                      avatar === emoji
                        ? "bg-violet-100 ring-2 ring-violet-400"
                        : "bg-slate-50 hover:bg-pink-50"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {!premium && (
                <div className="mt-4 rounded-2xl bg-violet-50 p-4">
                  <p className="text-sm font-bold text-violet-700">
                    ✨ Version gratuite
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Passe à Premium pour débloquer les PTI illimités et les
                    outils avancés.
                  </p>

                  <a
                    href="/premium"
                    className="mt-3 inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-bold text-white"
                  >
                    Découvrir Premium
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[32px] bg-white/85 p-8 shadow-xl">
          <p className="text-sm font-bold text-violet-600">
            Bulletin clinique
          </p>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-extrabold">{niveau}</h2>

              <p className="mt-2 text-slate-600">
                {ptiCount} PTI générés au total
              </p>
            </div>

            <p className="text-sm font-medium text-slate-500">
              {ptiCount < 60
                ? `Encore ${prochainPalier - ptiCount} PTI avant le prochain niveau ✨`
                : "Niveau maximal atteint 👑"}
            </p>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-violet-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500"
              style={{ width: `${progression}%` }}
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-bold text-violet-600">
              Badges obtenus
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {ptiCount >= 1 && (
                <div className="rounded-2xl bg-amber-50 px-4 py-2 text-sm font-bold">
                  🏅 Premier PTI
                </div>
              )}

              {ptiCount >= 15 && (
                <div className="rounded-2xl bg-pink-50 px-4 py-2 text-sm font-bold">
                  🌸 Intermédiaire
                </div>
              )}

              {ptiCount >= 30 && (
                <div className="rounded-2xl bg-violet-50 px-4 py-2 text-sm font-bold">
                  ⭐ Sénior
                </div>
              )}

              {ptiCount >= 60 && (
                <div className="rounded-2xl bg-purple-50 px-4 py-2 text-sm font-bold">
                  👑 Experte
                </div>
              )}

              {totalQuiz >= 1 && (
                <div className="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-bold">
                  🧠 Premier quiz
                </div>
              )}

              {score >= 100 && (
                <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-sm font-bold">
                  💡 Esprit clinique
                </div>
              )}

              {score >= 500 && (
                <div className="rounded-2xl bg-fuchsia-50 px-4 py-2 text-sm font-bold">
                  ✨ Pro du raisonnement
                </div>
              )}

              {ptiCount === 0 && totalQuiz === 0 && score === 0 && (
                <p className="text-sm text-slate-500">
                  Aucun badge pour l'instant. Génère un PTI ou fais un quiz pour
                  débloquer ton premier badge.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-bold text-violet-600">
              📄 PTI générés
            </p>
            <p className="mt-3 text-4xl font-extrabold">{ptiCount}</p>
          </div>

          <div className="rounded-3xl bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-bold text-violet-600">
              💾 PTI enregistrés
            </p>
            <p className="mt-3 text-4xl font-extrabold">{savedPti}</p>
          </div>

          <div className="rounded-3xl bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-bold text-violet-600">
              ⭐ Score clinique
            </p>
            <p className="mt-3 text-4xl font-extrabold">{score}</p>
          </div>

          <div className="rounded-3xl bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-bold text-violet-600">
              🎯 Précision quiz
            </p>
            <p className="mt-3 text-4xl font-extrabold">{precision}%</p>
          </div>
        </div>

        <div className="mt-6 rounded-[32px] bg-white/85 p-8 shadow-xl">
          <h2 className="text-2xl font-extrabold">🧠 Statistiques quiz</h2>

          <p className="mt-4 text-slate-600">
            ✅ {bonnes} bonnes réponses • ❌ {mauvaises} mauvaises réponses
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/generer"
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white"
            >
              Générer un PTI
            </a>

            <a
              href="/quiz"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200"
            >
              Faire un quiz
            </a>

            <a
              href="/ressources"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200"
            >
              Voir les ressources
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}