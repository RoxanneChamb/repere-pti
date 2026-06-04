"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

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

  const chargerScore = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("premium")
      .eq("id", user.id)
      .single();

    setPremium(profile?.premium === true);

    const { data } = await supabase
      .from("quiz_stats")
      .select("*")
      .eq("user_id", user.id)
      .single();

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
        Authorization: `Bearer ${session.access_token}`,
      },
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
      .single();

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
      categorie: quiz?.categorie || "Quiz clinique",
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
        });
      }

      setDejaVerifie(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <Navbar />

      <div className="mx-auto max-w-3xl p-8">
        <h1 className="mt-10 text-5xl font-extrabold">🎓 Quiz clinique</h1>

        <p className="mt-3 text-sm font-medium text-violet-600">
          💜 Inspiré de la réalité des stages en soins infirmiers.
        </p>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Pratique ton raisonnement clinique avec des situations réalistes
          inspirées des milieux de soins. Génère un cas clinique, choisis ta
          réponse et lis l’explication.
        </p>

        <div className="mt-6 rounded-3xl bg-white/85 p-5 shadow-sm">
          <p className="text-sm font-bold text-violet-600">
            🧠 Score clinique
          </p>

          <p className="mt-2 text-3xl font-extrabold">{score} points</p>

          <p className="mt-2 text-sm text-slate-500">
            ✅ {bonnes} bonnes réponses • ❌ {mauvaises} mauvaises réponses
          </p>

          <div className="mt-5 rounded-2xl bg-violet-50 p-4 text-sm text-violet-700">
            {premium ? (
              <>
                <p className="font-bold">👑 Premium actif</p>
                <p className="mt-1">
                  Quiz illimités et accès aux futures fonctionnalités Premium.
                </p>
              </>
            ) : (
              <>
                <p className="font-bold">Version gratuite</p>
                <p className="mt-1">2 quiz par jour inclus.</p>

                <a
                  href="/premium"
                  className="mt-3 inline-flex font-bold text-violet-700 hover:text-pink-500"
                >
                  Débloquer les quiz illimités →
                </a>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-sm font-medium text-slate-500">
          Priorisation • Raisonnement clinique • Correction instantanée
        </p>

        <button
          onClick={genererQuiz}
          disabled={chargement}
          className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {chargement ? "Génération..." : "Générer un quiz"}
        </button>

        {quiz && (
          <div className="mt-8 rounded-[32px] bg-white/85 p-8 shadow-xl backdrop-blur">
            <p className="text-sm font-bold text-violet-600">Situation</p>

            <p className="mt-4 leading-8">{quiz.situation}</p>

            <h2 className="mt-8 text-2xl font-bold">{quiz.question}</h2>

            <div className="mt-5 space-y-3">
              {Object.entries(quiz.choix).map(([lettre, texte]: any) => (
                <button
                  key={lettre}
                  onClick={() => setReponse(lettre)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    reponse === lettre
                      ? "border-violet-500 bg-violet-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <strong>{lettre}.</strong> {texte}
                </button>
              ))}
            </div>

            <button
              onClick={verifierReponse}
              className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white"
            >
              Vérifier
            </button>

            {corrige && (
              <>
                <div className="mt-8 rounded-3xl bg-slate-50 p-6">
                  {reponse === quiz.bonneReponse ? (
                    <p className="font-bold text-green-600">
                      ✅ Bonne réponse ! +10 points
                    </p>
                  ) : (
                    <p className="font-bold text-red-600">
                      ❌ Pas tout à fait. La bonne réponse est{" "}
                      {quiz.bonneReponse}.
                    </p>
                  )}

                  <p className="mt-4 leading-7 text-slate-600">
                    {quiz.explication}
                  </p>
                </div>

                <button
                  onClick={genererQuiz}
                  className="mt-4 rounded-2xl border border-violet-200 bg-white px-6 py-3 font-bold text-violet-600 hover:bg-violet-50"
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