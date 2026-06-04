"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

export default function GenererPage() {
  const [userId, setUserId] = useState("");
  const [premium, setPremium] = useState(false);
  const [situation, setSituation] = useState("");
  const [resultat, setResultat] = useState("");
  const [chargement, setChargement] = useState(false);
  const [modeComplexe, setModeComplexe] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("premium")
        .eq("id", user.id)
        .single();

      setPremium(profile?.premium === true);
    };

    getUser();
  }, []);

  const genererPTI = async () => {
    try {
      if (!situation.trim()) {
        setResultat("Décris une situation clinique avant de générer un PTI.");
        return;
      }

      setChargement(true);
      setResultat("Génération en cours...");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setResultat("Tu dois être connectée pour générer un PTI.");
        setChargement(false);
        return;
      }

      const response = await fetch("/api/generer-pti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          situation,
          modeComplexe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResultat(data.error || "Erreur lors de la génération.");
        setChargement(false);
        return;
      }

      setResultat(data.resultat);

      if (typeof window !== "undefined") {
        // @ts-ignore
        window.gtag?.("event", "pti_generated", {
          mode: modeComplexe ? "complexe" : "standard",
        });
      }

      if (userId) {
        const { error } = await supabase.from("ptis").insert({
          user_id: userId,
          situation,
          resultat: data.resultat,
        });

        if (error) {
          console.error("Erreur Supabase :", error.message);
          setChargement(false);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("pti_count")
          .eq("id", userId)
          .single();

        if (!profile) {
          await supabase.from("profiles").insert({
            id: userId,
            pti_count: 1,
          });
        } else {
          await supabase
            .from("profiles")
            .update({
              pti_count: (profile.pti_count || 0) + 1,
            })
            .eq("id", userId);
        }
      }

      setChargement(false);
    } catch (error) {
      console.error(error);
      setResultat("Erreur de connexion avec l'API.");
      setChargement(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-8 py-14">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-4 py-2 text-sm font-bold text-violet-700">
              ✨ Assistant clinique IA
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
              Transforme une situation clinique en PTI
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Décris une situation clinique de façon anonyme et obtiens un PTI
              structuré pour soutenir ton apprentissage, tes stages et le
              développement de ton raisonnement clinique.
            </p>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-violet-600">
              🔒 Aucune information permettant d’identifier un patient ne doit
              être inscrite.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur">
            <p className="font-bold">Outil éducatif</p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Ne remplace pas le jugement clinique, les politiques locales ou la
              validation par une personne qualifiée.
            </p>

            <div className="mt-5 rounded-2xl bg-violet-50 p-4 text-sm text-violet-700">
              {premium ? (
                <>
                  <p className="font-bold">👑 Premium actif</p>
                  <p className="mt-1">
                    PTI illimités et cas complexes débloqués.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold">Version gratuite</p>
                  <p className="mt-1">5 PTI par jour.</p>

                  <a
                    href="/premium"
                    className="mt-3 inline-flex font-bold text-violet-700 hover:text-pink-500"
                  >
                    Passer Premium →
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-pink-50 p-6 shadow-lg">
            <p className="text-2xl font-bold">Situation clinique</p>

            <p className="mt-2 text-sm text-slate-500">
              Décris les signes, symptômes, antécédents et le contexte, sans
              nom, date de naissance ou information identifiable.
            </p>

            <textarea
              className="mt-6 min-h-[260px] w-full rounded-3xl border-2 border-violet-200 bg-white p-6 text-base shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              placeholder="Ex. Patient de 72 ans, insuffisance cardiaque, SpO₂ 89 %, dyspnée, prise de poids de 2 kg en 2 jours..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />

            <div className="mt-5 rounded-3xl border border-violet-100 bg-white/85 p-5 shadow-sm">
              <label className="flex cursor-pointer flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-slate-800">
                      Cas complexe
                    </p>

                    <span className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-3 py-1 text-xs font-bold text-white">
                      👑 Premium
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Génère une analyse plus poussée avec priorités,
                    complications possibles, surveillance avancée et signes de
                    détérioration.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModeComplexe(!modeComplexe)}
                  className={`relative h-8 w-14 rounded-full transition ${
                    modeComplexe
                      ? "bg-gradient-to-r from-violet-600 to-pink-500"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                      modeComplexe ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </label>
            </div>

            <button
              onClick={genererPTI}
              disabled={chargement}
              className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-pink-200 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {chargement
                ? "Génération..."
                : modeComplexe
                  ? "Générer le PTI complexe"
                  : "Générer le PTI"}
            </button>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
              <span>⚡ Génération rapide</span>
              <span>🩺 Pensé pour les stages</span>
              <span>✨ IA éducative</span>
              {modeComplexe && <span>👑 Mode complexe activé</span>}
            </div>

            <p className="mt-5 text-sm text-slate-500">
              🔒 Les situations doivent être anonymisées avant d’être inscrites.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-2xl font-bold">PTI suggéré</p>

                <p className="mt-2 text-sm text-slate-500">
                  Ton plan apparaîtra ici après génération.
                </p>
              </div>

              {modeComplexe && (
                <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700">
                  👑 Cas complexe
                </span>
              )}
            </div>

            <div className="mt-6 min-h-[360px] rounded-[32px] bg-gradient-to-br from-slate-50 to-violet-50 p-6">
              {resultat ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {resultat}
                </pre>
              ) : (
                <div className="flex h-[300px] items-center justify-center text-center text-slate-400">
                  Génère un PTI pour voir les résultats ici.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}