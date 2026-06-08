"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import {
  BarChart3,
  Brain,
  CheckCircle,
  Crown,
  FileText,
  GraduationCap,
  LogOut,
  Pencil,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";

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
      <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
        <Navbar />
        <div className="mx-auto mt-20 max-w-xl rounded-[36px] border border-white/80 bg-white/75 p-8 text-center shadow-sm backdrop-blur">
          <p className="font-extrabold text-violet-800">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
        <Navbar />
        <div className="mx-auto mt-20 max-w-xl rounded-[36px] border border-white/80 bg-white/75 p-8 text-center shadow-sm backdrop-blur">
          <h1 className="text-3xl font-black text-slate-950">
            Connexion requise
          </h1>

          <p className="mt-4 text-slate-600">
            Tu dois être connectée pour accéder à ton tableau de bord.
          </p>

          <a
            href="/login"
            className="mt-6 inline-flex rounded-2xl bg-violet-800 px-6 py-3 font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900"
          >
            Me connecter
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-14">
        <div className="pointer-events-none absolute -right-40 top-0 h-[380px] w-[380px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[340px] w-[340px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative z-10">
          <a
            href="/"
            className="inline-flex text-sm font-bold text-violet-700 transition hover:text-violet-900"
          >
            ← Retour à l'accueil
          </a>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="rounded-[36px] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Tableau de bord
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                Ton espace{" "}
                <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  clinique
                </span>
              </h1>

              <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                Suis ta progression, personnalise ton profil, consulte tes
                statistiques et accède rapidement aux outils Repère PTI.
              </p>
            </section>

            <section className="rounded-[36px] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
                Statut
              </p>

              <h2 className="mt-3 flex items-center gap-2 text-2xl font-black text-slate-950">
                {premium ? (
                  <>
                    <Crown className="h-6 w-6 text-violet-800" />
                    Premium actif
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6 text-violet-800" />
                    Version gratuite
                  </>
                )}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {premium
                  ? "Tu as accès aux PTI illimités, quiz illimités, cas complexes et export PDF."
                  : "Tu peux générer des PTI, pratiquer avec les quiz et explorer les ressources."}
              </p>

              <a
                href="/premium"
                className="mt-5 inline-flex w-full justify-center rounded-2xl bg-violet-800 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900 sm:w-auto"
              >
                {premium ? "Gérer mon abonnement" : "Explorer Premium"}
              </a>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <section className="overflow-hidden rounded-[36px] border border-white/80 bg-white/85 shadow-xl shadow-violet-100 backdrop-blur">
              <div className="grid md:grid-cols-[210px_1fr]">
                <div className="flex flex-col justify-between bg-gradient-to-br from-violet-100 via-white to-pink-50 p-7">
                  <div>
                    <p className="text-2xl font-black leading-6 text-slate-950">
                      Repère
                      <br />
                      PTI
                    </p>

                    <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
                      Carte étudiante
                    </p>
                  </div>

                  <div className="mt-10">
                    <p className="text-sm font-extrabold uppercase text-slate-600">
                      Soins infirmiers
                    </p>

                    <div className="mt-5 h-10 w-32 rounded bg-[repeating-linear-gradient(90deg,#4c1d95_0px,#4c1d95_2px,transparent_2px,transparent_5px)] opacity-80" />
                  </div>
                </div>

                <div className="bg-white/70 p-6 md:p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="mx-auto flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 p-2 shadow-inner md:mx-0 md:h-48 md:w-48">
                      <img
                        src={avatarImage}
                        alt="Avatar"
                        className="h-full w-full rounded-full object-cover shadow-lg"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <label className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                        Nom affiché
                      </label>

                      <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        onBlur={sauvegarderNom}
                        className="mt-2 w-full rounded-2xl border border-violet-100 bg-white/80 px-4 py-3 text-2xl font-black tracking-tight text-slate-950 outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100 md:text-4xl"
                      />

                      <button
                        onClick={sauvegarderNom}
                        className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-violet-100 px-4 py-2 text-sm font-extrabold text-violet-800 transition hover:bg-violet-200"
                      >
                        <Pencil className="h-4 w-4" />
                        Sauvegarder le nom
                      </button>

                      {messageSauvegarde && (
                        <p className="mt-2 text-sm font-extrabold text-green-600">
                          {messageSauvegarde}
                        </p>
                      )}

                      <p className="mt-3 truncate text-sm font-medium text-slate-500">
                        {email}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <span className="rounded-full bg-violet-100 px-5 py-2 text-sm font-extrabold text-violet-800">
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
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                        ID étudiante
                      </p>

                      <p className="mt-2 text-lg font-black text-violet-800">
                        {userId
                          ? `RPTI-${userId.slice(0, 4).toUpperCase()}-${userId
                              .slice(4, 8)
                              .toUpperCase()}`
                          : "RPTI"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                        Niveau
                      </p>

                      <p className="mt-2 text-lg font-black text-slate-700">
                        {niveau}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                        Statut
                      </p>

                      <p className="mt-2 text-lg font-black text-slate-700">
                        {premium ? "Premium" : "Gratuit"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur md:p-6">
                <p className="text-lg font-black text-slate-950">
                  Personnalise ton avatar
                </p>

                <div className="mt-4 grid grid-cols-5 gap-2 sm:flex sm:flex-wrap">
                  {avatars.map((image) => (
                    <button
                      key={image}
                      onClick={() => changerAvatar(image)}
                      className={`rounded-full p-1 transition ${
                        avatarImage === image
                          ? "bg-violet-100 ring-2 ring-violet-500"
                          : "bg-white hover:bg-violet-50"
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

              <div className="rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur md:p-6">
                <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                  Rappel éducatif
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Repère PTI soutient ton apprentissage, mais ne remplace jamais
                  le jugement clinique ou les consignes de ton milieu.
                </p>
              </div>
            </aside>
          </div>

          <section className="mt-6 rounded-[36px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur md:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
              Bulletin clinique
            </p>

            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                  {niveau}
                </h2>

                <p className="mt-2 text-sm text-slate-600 md:text-base">
                  {ptiCount} PTI générés au total
                </p>
              </div>

              <p className="text-sm font-medium text-slate-500">
                {ptiCount < 60
                  ? `Encore ${prochainPalier - ptiCount} PTI avant le niveau ${prochainNiveau}.`
                  : "Niveau maximal atteint 👑"}
              </p>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-violet-100">
              <div
                className="h-full rounded-full bg-violet-800"
                style={{ width: `${progression}%` }}
              />
            </div>
          </section>

          <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
            <div className="rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur md:p-6">
              <FileText className="h-5 w-5 text-violet-800" />
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
                PTI générés
              </p>
              <p className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
                {ptiCount}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur md:p-6">
              <CheckCircle className="h-5 w-5 text-violet-800" />
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
                PTI enregistrés
              </p>
              <p className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
                {savedPti}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur md:p-6">
              <Star className="h-5 w-5 text-violet-800" />
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
                Score clinique
              </p>
              <p className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
                {score}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur md:p-6">
              <BarChart3 className="h-5 w-5 text-violet-800" />
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
                Précision quiz
              </p>
              <p className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
                {precision}%
              </p>
            </div>
          </div>

          <section className="mt-5 rounded-[36px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur md:p-8">
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-950 md:text-2xl">
              <Brain className="h-6 w-6 text-violet-800" />
              Statistiques quiz
            </h2>

            <p className="mt-4 text-sm text-slate-600 md:text-base">
              ✅ {bonnes} bonnes réponses • ❌ {mauvaises} mauvaises réponses
            </p>

            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <a
                href="/generer"
                className="w-full rounded-2xl bg-violet-800 px-6 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900 sm:w-auto"
              >
                Générer un PTI
              </a>

              <a
                href="/quiz"
                className="w-full rounded-2xl border border-violet-100 bg-white px-6 py-3 text-center text-sm font-extrabold text-violet-800 transition hover:-translate-y-0.5 hover:bg-violet-50 sm:w-auto"
              >
                Faire un quiz
              </a>

              <a
                href="/ressources"
                className="w-full rounded-2xl border border-violet-100 bg-white px-6 py-3 text-center text-sm font-extrabold text-violet-800 transition hover:-translate-y-0.5 hover:bg-violet-50 sm:w-auto"
              >
                Voir les ressources
              </a>
            </div>

            <div className="mt-8 border-t border-violet-100 pt-6">
              <p className="flex items-center gap-2 text-sm font-extrabold text-red-600">
                <Trash2 className="h-4 w-4" />
                Suppression du compte
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                La suppression est permanente et effacera vos PTI, statistiques
                et données enregistrées.
              </p>

              <button
                onClick={supprimerCompte}
                className="mt-4 w-full rounded-2xl border border-red-100 bg-red-50 px-5 py-3 font-extrabold text-red-600 transition hover:bg-red-100 sm:w-auto"
              >
                Supprimer mon compte
              </button>
            </div>
          </section>

          <div className="mt-6 flex justify-center">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-5 py-3 text-sm font-extrabold text-violet-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              <LogOut className="h-4 w-4" />
              Me déconnecter
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}