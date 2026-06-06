"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

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
  const [messageSauvegarde, setMessageSauvegarde] = useState("");

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
  let prochainNiveau = "Intermédiaire";

  if (ptiCount >= 15 && ptiCount < 30) {
    niveau = "🌸 Intermédiaire";
    prochainPalier = 30;
    prochainNiveau = "Sénior";
  } else if (ptiCount >= 30 && ptiCount < 60) {
    niveau = "⭐ Sénior";
    prochainPalier = 60;
    prochainNiveau = "Experte";
  } else if (ptiCount >= 60) {
    niveau = "👑 Experte";
    prochainPalier = 60;
    prochainNiveau = "Max";
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
        .maybeSingle();

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          pti_count: 0,
          avatar_image: "/avatars/avatar1.png",
          display_name: "Étudiante Repère PTI",
          premium: false,
        });

        setPtiCount(0);
        setAvatarImage("/avatars/avatar1.png");
        setDisplayName("Étudiante Repère PTI");
        setPremium(false);
      } else {
        setPtiCount(profile.pti_count || 0);
        setAvatarImage(profile.avatar_image || "/avatars/avatar1.png");
        setDisplayName(profile.display_name || "Étudiante Repère PTI");
        setPremium(profile.premium === true);
      }

      const { data: ptis } = await supabase
        .from("ptis")
        .select("id")
        .eq("user_id", user.id);

      setSavedPti(ptis?.length || 0);

      const { data: stats } = await supabase
        .from("quiz_stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (stats) {
        setScore(stats.score || 0);
        setBonnes(stats.bonnes_reponses || 0);
        setMauvaises(stats.mauvaises_reponses || 0);
      }
    };

    chargerDashboard();
  }, []);

  const sauvegarderNom = async () => {
    if (!userId) return;

    const nom = displayName.trim() || "Étudiante Repère PTI";

    setDisplayName(nom);
    setMessageSauvegarde("");

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: nom,
      })
      .eq("id", userId);

    if (error) {
      console.error("Erreur sauvegarde nom :", error.message);
      alert("Le nom n’a pas pu être sauvegardé.");
      return;
    }

    setMessageSauvegarde("Nom sauvegardé ✅");

    setTimeout(() => {
      setMessageSauvegarde("");
    }, 2500);
  };

  const changerAvatar = async (image: string) => {
    setAvatarImage(image);

    if (!userId) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        avatar_image: image,
      })
      .eq("id", userId);

    if (error) {
      console.error("Erreur sauvegarde avatar :", error.message);
      alert("L’avatar n’a pas pu être sauvegardé.");
    }
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
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
        <Navbar />
        <div className="mx-auto mt-20 max-w-xl rounded-3xl bg-white/85 p-8 text-center shadow-xl">
          <p className="font-bold text-violet-600">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
        <Navbar />
        <div className="mx-auto mt-20 max-w-xl rounded-3xl bg-white/85 p-8 text-center shadow-xl">
          <h1 className="text-3xl font-extrabold">Connexion requise</h1>

          <p className="mt-4 text-slate-600">
            Tu dois être connectée pour accéder à ton tableau de bord.
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
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white px-4 py-6 text-slate-900 md:p-8">
      <Navbar />

      <div className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Tableau de bord
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Suis ta progression clinique, ton score, tes badges et ton statut
              Repère PTI.
            </p>
          </div>

          <div
            className={`w-fit rounded-2xl px-4 py-3 shadow-lg ${
              premium
                ? "bg-violet-700 text-white"
                : "bg-white/85 text-slate-700"
            }`}
          >
            <p className="text-sm font-extrabold">
              {premium ? "👑 Premium actif" : "✨ Version gratuite"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="overflow-hidden rounded-[34px] border border-white bg-white/90 shadow-xl">
            <div className="grid md:grid-cols-[190px_1fr]">
              <div className="flex flex-col justify-between bg-gradient-to-br from-violet-100 via-pink-50 to-white p-7">
                <div>
                  <p className="text-xl font-extrabold leading-5">
                    Repère
                    <br />
                    PTI
                  </p>

                  <p className="mt-4 text-sm font-bold text-violet-600">
                    Carte étudiante
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold uppercase text-slate-600">
                    Soins infirmiers
                  </p>

                  <div className="mt-5 h-10 w-32 rounded bg-[repeating-linear-gradient(90deg,#111_0px,#111_2px,transparent_2px,transparent_5px)] opacity-80" />
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-white via-violet-50 to-pink-50 p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 p-2 shadow-inner md:h-52 md:w-52">
                    <img
                      src={avatarImage}
                      alt="Avatar"
                      className="h-full w-full rounded-full object-cover shadow-lg"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <label className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Nom affiché
                    </label>

                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      onBlur={sauvegarderNom}
                      className="mt-2 w-full rounded-2xl border border-violet-100 bg-white/80 px-4 py-3 text-2xl font-extrabold tracking-tight outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 md:text-4xl"
                    />

                    <button
                      onClick={sauvegarderNom}
                      className="mt-3 rounded-2xl bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700 hover:bg-violet-200"
                    >
                      Sauvegarder le nom
                    </button>

                    {messageSauvegarde && (
                      <p className="mt-2 text-sm font-bold text-green-600">
                        {messageSauvegarde}
                      </p>
                    )}

                    <p className="mt-3 truncate text-sm font-medium text-slate-500 md:text-lg">
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

                <div className="mt-8 grid gap-5 border-t border-violet-100 pt-6 sm:grid-cols-3">
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
                      Niveau
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-700">
                      {niveau}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Statut
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-700">
                      {premium ? "Premium" : "Gratuit"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-white/90 p-5 shadow-lg md:p-6">
              <p className="text-lg font-extrabold text-violet-700">
                Personnalise ton avatar
              </p>

              <div className="mt-4 grid grid-cols-5 gap-2 sm:flex sm:flex-wrap">
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
                      className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
                    />
                  </button>
                ))}
              </div>
            </div>

            {premium ? (
              <div className="rounded-3xl border border-amber-100 bg-white/90 p-5 shadow-lg md:p-6">
                <p className="text-2xl font-extrabold text-violet-700">
                  👑 Premium actif
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Tu as accès aux PTI illimités, quiz illimités, cas complexes
                  et export PDF.
                </p>

                <a
                  href="/premium"
                  className="mt-5 inline-flex w-full justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-3 text-sm font-bold text-white sm:w-auto"
                >
                  Gérer mon abonnement
                </a>
              </div>
            ) : (
              <div className="rounded-3xl bg-gradient-to-br from-violet-100 via-pink-50 to-white p-5 shadow-lg md:p-6">
                <p className="text-2xl font-extrabold text-violet-700">
                  Découvre Premium ✨
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  PTI illimités, cas complexes, quiz illimités et export PDF.
                </p>

                <a
                  href="/premium"
                  className="mt-5 inline-flex w-full justify-center rounded-2xl bg-gradient-to-r from-violet-700 to-pink-500 px-6 py-3 text-sm font-bold text-white sm:w-auto"
                >
                  Explorer Premium
                </a>
              </div>
            )}
          </aside>
        </div>

        <section className="mt-6 rounded-3xl bg-white/85 p-5 shadow-lg md:p-8">
          <p className="text-sm font-bold text-violet-600">
            Bulletin clinique
          </p>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">
                {niveau}
              </h2>

              <p className="mt-2 text-sm text-slate-600 md:text-base">
                {ptiCount} PTI générés au total
              </p>
            </div>

            <p className="text-sm font-medium text-slate-500">
              {ptiCount < 60
                ? `Encore ${prochainPalier - ptiCount} PTI avant le niveau ${prochainNiveau} ✨`
                : "Niveau maximal atteint 👑"}
            </p>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-violet-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500"
              style={{ width: `${progression}%` }}
            />
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <div className="rounded-3xl bg-white/85 p-4 shadow-sm md:p-6">
            <p className="text-xs font-bold text-violet-600 md:text-sm">
              📄 PTI générés
            </p>
            <p className="mt-3 text-3xl font-extrabold md:text-4xl">
              {ptiCount}
            </p>
          </div>

          <div className="rounded-3xl bg-white/85 p-4 shadow-sm md:p-6">
            <p className="text-xs font-bold text-violet-600 md:text-sm">
              💾 PTI enregistrés
            </p>
            <p className="mt-3 text-3xl font-extrabold md:text-4xl">
              {savedPti}
            </p>
          </div>

          <div className="rounded-3xl bg-white/85 p-4 shadow-sm md:p-6">
            <p className="text-xs font-bold text-violet-600 md:text-sm">
              ⭐ Score clinique
            </p>
            <p className="mt-3 text-3xl font-extrabold md:text-4xl">
              {score}
            </p>
          </div>

          <div className="rounded-3xl bg-white/85 p-4 shadow-sm md:p-6">
            <p className="text-xs font-bold text-violet-600 md:text-sm">
              🎯 Précision quiz
            </p>
            <p className="mt-3 text-3xl font-extrabold md:text-4xl">
              {precision}%
            </p>
          </div>
        </div>

        <section className="mt-5 rounded-3xl bg-white/85 p-5 shadow-lg md:p-8">
          <h2 className="text-xl font-extrabold md:text-2xl">
            🧠 Statistiques quiz
          </h2>

          <p className="mt-4 text-sm text-slate-600 md:text-base">
            ✅ {bonnes} bonnes réponses • ❌ {mauvaises} mauvaises réponses
          </p>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href="/generer"
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-center text-sm font-bold text-white sm:w-auto"
            >
              Générer un PTI
            </a>

            <a
              href="/quiz"
              className="w-full rounded-2xl bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 ring-1 ring-slate-200 sm:w-auto"
            >
              Faire un quiz
            </a>

            <a
              href="/ressources"
              className="w-full rounded-2xl bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 ring-1 ring-slate-200 sm:w-auto"
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
              className="mt-4 w-full rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-bold text-red-600 hover:bg-red-100 sm:w-auto"
            >
              Supprimer mon compte
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}