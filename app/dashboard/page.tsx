"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("Étudiante Repère PTI");
  const [avatarImage, setAvatarImage] = useState("/avatars/avatar1.png");
  const [ptiCount, setPtiCount] = useState(0);
  const [savedPti, setSavedPti] = useState(0);
  const [score, setScore] = useState(0);
  const [bonnes, setBonnes] = useState(0);
  const [mauvaises, setMauvaises] = useState(0);
  const [userId, setUserId] = useState("");
  const [premium, setPremium] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
  ];

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
        .select("pti_count, avatar_image, display_name, premium")
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
      setAvatarImage(profile?.avatar_image || "/avatars/avatar1.png");
      setDisplayName(profile?.display_name || "Étudiante Repère PTI");
      setPremium(profile?.premium === true);
      setSavedPti(ptis?.length || 0);
      setScore(stats?.score || 0);
      setBonnes(stats?.bonnes_reponses || 0);
      setMauvaises(stats?.mauvaises_reponses || 0);
    };

    chargerDashboard();
  }, []);

  const changerAvatar = async (image: string) => {
    setAvatarImage(image);

    if (!userId) return;

    await supabase
      .from("profiles")
      .update({ avatar_image: image })
      .eq("id", userId);
  };

  const sauvegarderNom = async () => {
    if (!userId) return;

    await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("id", userId);
  };

  const supprimerCompte = async () => {
    const confirmation = confirm(
      "Cette action supprimera définitivement ton compte et tes données enregistrées. Continuer ?"
    );

    if (!confirmation) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("Tu dois être connectée pour supprimer ton compte.");
      return;
    }

    const response = await fetch("/api/delete-account", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Erreur lors de la suppression du compte.");
      return;
    }

    alert("Compte supprimé.");
    window.location.href = "/";
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

        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Tableau de bord
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600">
              Suis ta progression clinique, ton score, tes badges et ton
              utilisation de Repère PTI.
            </p>
          </div>

          {premium && (
            <div className="rounded-3xl border border-violet-100 bg-white/85 px-6 py-4 shadow-xl">
              <p className="text-lg font-extrabold text-violet-700">
                👑 Utilisatrice Premium
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="overflow-hidden rounded-[34px] border border-white bg-white/90 shadow-xl">
            <div className="grid md:grid-cols-[190px_1fr]">
              <div className="flex flex-col justify-between bg-gradient-to-br from-violet-100 via-pink-50 to-white p-7">
                <div className="flex items-center gap-3">
                  <img
                    src="/icon-192.png"
                    alt="Logo Repère PTI"
                    className="h-12 w-12 rounded-2xl shadow-sm"
                  />

                  <p className="text-xl font-extrabold leading-5">
                    Repère
                    <br />
                    PTI
                  </p>
                </div>

                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-violet-600">
                    Carte
                    <br />
                    étudiante
                  </p>

                  <div className="mt-5 h-10 w-32 rounded bg-[repeating-linear-gradient(90deg,#111_0px,#111_2px,transparent_2px,transparent_5px)] opacity-80" />

                  <p className="mt-5 text-sm font-bold uppercase text-slate-600">
                    Étudiante infirmière
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-white via-violet-50 to-pink-50 p-8">
                <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full border border-pink-200/60" />
                <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border border-violet-200/50" />
                <div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full border border-pink-100/70" />

                <div className="relative mt-4 flex flex-col gap-8 md:flex-row md:items-center">
                  <div className="rounded-full bg-gradient-to-br from-violet-100 to-pink-100 p-3 shadow-inner">
                    <img
                      src={avatarImage}
                      alt="Avatar"
                      className="h-44 w-44 rounded-full object-cover shadow-lg"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      onBlur={sauvegarderNom}
                      className="w-full max-w-md rounded-2xl border border-violet-100 bg-white/80 px-4 py-3 text-4xl font-extrabold tracking-tight outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />

                    <p className="mt-3 truncate text-lg font-medium text-slate-600">
                      {email}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="rounded-full bg-violet-100 px-5 py-2 text-sm font-extrabold text-violet-700">
                        {niveau}
                      </span>

                      <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-extrabold text-pink-700">
                        {premium ? "👑 Premium" : "✨ Gratuit"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 grid gap-6 border-t border-violet-100 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      ID étudiante
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-violet-700">
                      {userId
                        ? `RPTI-${userId.slice(0, 4).toUpperCase()}-${userId
                            .slice(4, 8)
                            .toUpperCase()}`
                        : "RPTI"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Programme
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-700">
                      Soins infirmiers
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Membre depuis
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-700">
                      Juin 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] bg-white/90 p-6 shadow-xl">
              <p className="text-lg font-extrabold text-violet-700">
                Personnalise ton avatar
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {avatars.map((image) => (
                  <button
                    key={image}
                    onClick={() => changerAvatar(image)}
                    className={`rounded-full p-1 transition ${
                      avatarImage === image
                        ? "bg-violet-100 ring-2 ring-violet-400"
                        : "bg-slate-50 hover:bg-pink-50"
                    }`}
                  >
                    <img
                      src={image}
                      alt="avatar"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Choisis l'avatar qui te représente le mieux.
              </p>
            </div>

            {premium ? (
              <div className="rounded-[32px] border border-amber-100 bg-white/90 p-6 shadow-xl">
  <p className="text-2xl font-extrabold text-violet-700">
    👑 Premium actif
  </p>

  <div className="mt-4 space-y-2 text-sm text-slate-600">
    <p>
      <span className="font-bold text-slate-800">Abonnement :</span>{" "}
      2,99 $ / mois
    </p>

    <p>
      <span className="font-bold text-slate-800">Renouvellement :</span>{" "}
      Mensuel
    </p>
  </div>

  <a
    href="/premium"
    className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-3 text-sm font-bold text-white"
  >
    Gérer mon abonnement
  </a>
</div>
            ) : (
              <div className="rounded-[32px] bg-gradient-to-br from-violet-100 via-pink-50 to-white p-6 shadow-xl">
                <p className="text-2xl font-extrabold text-violet-700">
                  Découvre Premium ✨
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  PTI illimités, cas avancés et export PDF.
                </p>

                <a
                  href="/premium"
                  className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-violet-700 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg"
                >
                  Explorer Premium
                </a>
              </div>
            )}
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

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-sm font-bold text-red-600">
              Suppression du compte
            </p>

            <p className="mt-2 text-sm text-slate-500">
              La suppression est permanente et effacera vos PTI, statistiques et
              données enregistrées.
            </p>

            <button
              onClick={supprimerCompte}
              className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-bold text-red-600 hover:bg-red-100"
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}