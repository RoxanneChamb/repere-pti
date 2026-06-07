"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import {
  Brain,
  CheckCircle,
  XCircle,
  Sparkles,
  Crown,
  GraduationCap,
  Target,
  Lock,
} from "lucide-react";

export default function QuizPage() {
  const [quiz, setQuiz] = useState<any>(null);
  const [reponse, setReponse] = useState("");
  const [corrige, setCorrige] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [dejaVerifie, setDejaVerifie] = useState(false);
  const [score, setScore] = useState(0);
  const [bonnes, setBonnes] = useState(0);
  const [mauvaises, setMauvaises] = useState(0);
  const [premium, setPremium] = useState(false);
  const [specialite, setSpecialite] = useState("Général");

  const specialites = [
    "Général",
    "Urgence",
    "Pédiatrie",
    "Périnatalité",
    "Santé mentale",
    "Gériatrie / CHSLD",
    "Chirurgie",
    "Médecine",
    "Cardiologie",
    "Respiratoire",
    "Diabète / endocrinologie",
    "Pharmacologie",
  ];

  const total = bonnes + mauvaises;
  const precision = total > 0 ? Math.round((bonnes / total) * 100) : 0;

  const chargerScore = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("premium")
      .eq("id", user.id)
      .maybeSingle();

    setPremium(profile?.premium === true);

    const { data } = await supabase
      .from("quiz_stats")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setScore(data.score || 0);
      setBonnes(data.bonnes_reponses || 0);
      setMauvaises(data.mauvaises_reponses || 0);
    }
  };

  useEffect(() => {
    chargerScore();
  }, []);

  const genererQuiz = async () => {
    setChargement(true);
    setCorrige(false);
    setReponse("");
    setDejaVerifie(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("Tu dois être connectée pour générer un quiz.");
      setChargement(false);
      return;
    }

    const response = await fetch("/api/generer-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        specialite,
      }),
    });

    const data = await response.json();

    if (data.quiz) {
      setQuiz(data.quiz);
    } else {
      alert(data.error || "Erreur lors de la génération.");
    }

    setChargement(false);
  };

  const enregistrerResultat = async (bonne: boolean) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: stats } = await supabase
      .from("quiz_stats")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!stats) {
      await supabase.from("quiz_stats").insert({
        user_id: user.id,
        score: bonne ? 10 : 0,
        bonnes_reponses: bonne ? 1 : 0,
        mauvaises_reponses: bonne ? 0 : 1,
      });
    } else {
      await supabase
        .from("quiz_stats")
        .update({
          score: stats.score + (bonne ? 10 : 0),
          bonnes_reponses: stats.bonnes_reponses + (bonne ? 1 : 0),
          mauvaises_reponses: stats.mauvaises_reponses + (bonne ? 0 : 1),
        })
        .eq("user_id", user.id);
    }

    await chargerScore();
  };

  const enregistrerHistoriqueQuiz = async (bonne: boolean) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("quiz_history").insert({
      user_id: user.id,
      categorie: quiz?.categorie || specialite || "Quiz clinique",
      score: bonne ? 1 : 0,
      total: 1,
    });
  };

  const verifierReponse = async () => {
    if (!quiz || !reponse) {
      alert("Choisis une réponse avant de vérifier.");
      return;
    }

    setCorrige(true);

    if (!dejaVerifie) {
      const bonneReponse = reponse === quiz.bonneReponse;

      await enregistrerResultat(bonneReponse);
      await enregistrerHistoriqueQuiz(bonneReponse);

      if (typeof window !== "undefined") {
        // @ts-ignore
        window.gtag?.("event", "quiz_completed", {
          result: bonneReponse ? "correct" : "incorrect",
          specialite: quiz?.categorie || specialite,
        });
      }

      setDejaVerifie(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm md:text-sm">
              <GraduationCap className="h-4 w-4" />
              Quiz clinique éducatif
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              Quiz clinique
            </h1>

            <p className="mt-3 text-sm font-medium text-violet-600">
              💜 Inspiré de la réalité des stages en soins infirmiers.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Pratique ton raisonnement clinique avec des situations réalistes.
              Génère un cas, choisis ta réponse et lis l’explication pour mieux
              comprendre la logique clinique.
            </p>
          </div>

          <div className="rounded-3xl bg-white/85 p-5 shadow-lg md:min-w-[280px]">
            {premium ? (
              <>
                <p className="flex items-center gap-2 text-sm font-bold text-violet-700">
                  <Crown className="h-4 w-4" />
                  Premium actif
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Quiz illimités et quiz par spécialité débloqués.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-violet-700">
                  Version gratuite
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  2 quiz par jour inclus.
                </p>

                <a
                  href="/premium"
                  className="mt-3 inline-flex text-sm font-bold text-violet-700 hover:text-pink-500"
                >
                  Débloquer les quiz illimités →
                </a>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 md:gap-5">
          <div className="rounded-3xl bg-white/85 p-4 shadow-sm md:p-5">
            <p className="flex items-center gap-2 text-xs font-bold text-violet-600 md:text-sm">
              <Brain className="h-4 w-4" />
              Score
            </p>

            <p className="mt-3 text-2xl font-extrabold md:text-4xl">
              {score}
            </p>

            <p className="mt-1 text-xs text-slate-400">points</p>
          </div>

          <div className="rounded-3xl bg-white/85 p-4 shadow-sm md:p-5">
            <p className="flex items-center gap-2 text-xs font-bold text-green-600 md:text-sm">
              <CheckCircle className="h-4 w-4" />
              Bonnes
            </p>

            <p className="mt-3 text-2xl font-extrabold md:text-4xl">
              {bonnes}
            </p>

            <p className="mt-1 text-xs text-slate-400">réponses</p>
          </div>

          <div className="rounded-3xl bg-white/85 p-4 shadow-sm md:p-5">
            <p className="flex items-center gap-2 text-xs font-bold text-pink-600 md:text-sm">
              <Target className="h-4 w-4" />
              Précision
            </p>

            <p className="mt-3 text-2xl font-extrabold md:text-4xl">
              {precision}%
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {mauvaises} erreur{mauvaises > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white/85 p-5 shadow-lg md:p-6">
          <p className="text-sm font-bold text-violet-700">
            Spécialité du quiz {premium ? "👑" : "— Premium"}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Choisis une spécialité pour pratiquer un thème précis. La version
            gratuite utilise le mode général.
          </p>

          <select
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            disabled={!premium}
            className="mt-4 w-full rounded-2xl border border-violet-100 bg-white p-4 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            {specialites.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {!premium && (
            <div className="mt-4 rounded-2xl bg-violet-50 p-4 text-sm text-violet-700">
              <p className="flex items-center gap-2 font-bold">
                <Lock className="h-4 w-4" />
                Quiz par spécialité réservés Premium
              </p>

              <p className="mt-1 leading-6">
                La version gratuite génère des quiz généraux. Premium débloque
                les spécialités et les quiz illimités.
              </p>

              <a
                href="/premium"
                className="mt-3 inline-flex font-bold text-violet-700 hover:text-pink-500"
              >
                Débloquer les quiz par spécialité →
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-white/85 p-5 shadow-lg md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-violet-600">
                Priorisation • Raisonnement clinique • Correction instantanée
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Génère une nouvelle situation clinique et teste ton jugement.
              </p>

              <p className="mt-2 text-sm font-bold text-violet-700">
                Thème actuel : {specialite}
              </p>
            </div>

            <button
              onClick={genererQuiz}
              disabled={chargement}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {chargement ? "Génération..." : "Générer un quiz"}
            </button>
          </div>
        </div>

        {!quiz && (
          <div className="mt-6 rounded-[32px] border border-white/70 bg-white/70 p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
              <Sparkles className="h-7 w-7 text-violet-600" />
            </div>

            <p className="mt-5 font-bold text-slate-700">
              Aucun quiz généré pour l’instant.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Clique sur “Générer un quiz” pour commencer une mise en situation.
            </p>
          </div>
        )}

        {quiz && (
          <div className="mt-6 rounded-[32px] bg-white/90 p-5 shadow-xl backdrop-blur md:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700">
                {quiz.categorie || specialite}
              </span>

              {premium && (
                <span className="rounded-full bg-pink-100 px-4 py-2 text-xs font-bold text-pink-700">
                  👑 Premium
                </span>
              )}
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
                Situation
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                {quiz.situation}
              </p>
            </div>

            <h2 className="mt-7 text-xl font-extrabold leading-8 md:text-2xl">
              {quiz.question}
            </h2>

            <div className="mt-5 space-y-3">
              {Object.entries(quiz.choix).map(([lettre, texte]: any) => (
                <button
                  key={lettre}
                  onClick={() => setReponse(lettre)}
                  disabled={corrige}
                  className={`w-full rounded-2xl border p-4 text-left text-sm leading-6 transition md:text-base ${
                    reponse === lettre
                      ? "border-violet-500 bg-violet-50 ring-2 ring-violet-100"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  } disabled:cursor-default`}
                >
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-700">
                    {lettre}
                  </span>
                  {texte}
                </button>
              ))}
            </div>

            <button
              onClick={verifierReponse}
              disabled={corrige}
              className="mt-6 w-full rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              Vérifier
            </button>

            {corrige && (
              <>
                <div
                  className={`mt-8 rounded-3xl p-5 md:p-6 ${
                    reponse === quiz.bonneReponse
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  {reponse === quiz.bonneReponse ? (
                    <p className="flex items-center gap-2 font-bold text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      Bonne réponse ! +10 points
                    </p>
                  ) : (
                    <p className="flex items-center gap-2 font-bold text-red-700">
                      <XCircle className="h-5 w-5" />
                      Pas tout à fait. La bonne réponse est {quiz.bonneReponse}.
                    </p>
                  )}

                  <div className="mt-4 rounded-2xl bg-white/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Explication
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
                      {quiz.explication}
                    </p>
                  </div>
                </div>

                <button
                  onClick={genererQuiz}
                  className="mt-4 w-full rounded-2xl border border-violet-200 bg-white px-6 py-3 font-bold text-violet-600 hover:bg-violet-50 sm:w-auto"
                >
                  Prochaine question →
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}