"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import jsPDF from "jspdf";

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

  const telechargerPDF = () => {
    if (!premium) {
      alert("L’export PDF est réservé aux utilisateurs Premium.");
      return;
    }

    if (!resultat) {
      alert("Génère d’abord un PTI.");
      return;
    }

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString("fr-CA");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Repère PTI", 20, 20);

    doc.setFontSize(13);
    doc.text("Plan thérapeutique infirmier suggéré", 20, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Date : ${date}`, 20, 38);
    doc.text("Outil éducatif - Ne remplace pas le jugement clinique.", 20, 44);

    doc.setDrawColor(139, 92, 246);
    doc.line(20, 50, 190, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Situation clinique :", 20, 60);

    doc.setFont("helvetica", "normal");
    const situationLignes = doc.splitTextToSize(situation, 170);
    doc.text(situationLignes, 20, 68);

    let y = 68 + situationLignes.length * 5 + 10;

    doc.setFont("helvetica", "bold");
    doc.text("PTI suggéré :", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    const lignes = doc.splitTextToSize(resultat, 170);

    lignes.forEach((ligne: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(ligne, 20, y);
      y += 5;
    });

    doc.save("repere-pti.pdf");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-14">
        <div className="mb-6 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:gap-6">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-4 py-2 text-xs font-bold text-violet-700 md:text-sm">
              ✨ Assistant clinique IA
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
              Transforme une situation clinique en PTI
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Décris une situation clinique de façon anonyme et obtiens un PTI
              structuré pour soutenir ton apprentissage, tes stages et le
              développement de ton raisonnement clinique.
            </p>

            <p className="mt-4 max-w-2xl rounded-2xl bg-white/70 p-3 text-sm font-medium leading-6 text-violet-600 shadow-sm md:bg-transparent md:p-0 md:shadow-none">
              🔒 Aucune information permettant d’identifier un patient ne doit
              être inscrite.
            </p>
          </div>

          <div className="rounded-3xl border border-white/50 bg-white/85 p-5 shadow-lg backdrop-blur md:rounded-[32px] md:p-8 md:shadow-xl">
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
                    PTI illimités, cas complexes et export PDF débloqués.
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

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-pink-50 p-5 shadow-lg md:p-6">
            <p className="text-xl font-bold md:text-2xl">Situation clinique</p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Décris les signes, symptômes, antécédents et le contexte, sans
              nom, date de naissance ou information identifiable.
            </p>

            <textarea
              className="mt-5 min-h-[220px] w-full rounded-3xl border-2 border-violet-200 bg-white p-4 text-sm shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 md:mt-6 md:min-h-[260px] md:p-6 md:text-base"
              placeholder="Ex. Patient de 72 ans, insuffisance cardiaque, SpO₂ 89 %, dyspnée, prise de poids de 2 kg en 2 jours..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />

            <div className="mt-5 rounded-3xl border border-violet-100 bg-white/85 p-4 shadow-sm md:p-5">
              <label className="flex cursor-pointer flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
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
                  className={`relative h-8 w-14 shrink-0 rounded-full transition ${
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
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-pink-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {chargement
                ? "Génération..."
                : modeComplexe
                  ? "Générer le PTI complexe"
                  : "Générer le PTI"}
            </button>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500 md:gap-4">
              <span>⚡ Génération rapide</span>
              <span>🩺 Pensé pour les stages</span>
              <span>✨ IA éducative</span>
              {modeComplexe && <span>👑 Mode complexe activé</span>}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              🔒 Les situations doivent être anonymisées avant d’être inscrites.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold md:text-2xl">PTI suggéré</p>

                <p className="mt-2 text-sm text-slate-500">
                  Ton plan apparaîtra ici après génération.
                </p>
              </div>

              {modeComplexe && (
                <span className="w-fit rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700">
                  👑 Cas complexe
                </span>
              )}
            </div>

            <div className="mt-5 min-h-[320px] rounded-3xl bg-gradient-to-br from-slate-50 to-violet-50 p-4 md:mt-6 md:min-h-[360px] md:rounded-[32px] md:p-6">
              {resultat ? (
                <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                  {resultat}
                </pre>
              ) : (
                <div className="flex h-[260px] items-center justify-center text-center text-sm text-slate-400 md:h-[300px]">
                  Génère un PTI pour voir les résultats ici.
                </div>
              )}
            </div>

            {resultat && premium && (
              <button
                onClick={telechargerPDF}
                className="mt-4 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
              >
                📄 Télécharger en PDF
              </button>
            )}

            {resultat && !premium && (
              <div className="mt-4 rounded-2xl bg-violet-50 p-4 text-sm text-violet-700">
                <p className="font-bold">📄 Export PDF Premium</p>

                <p className="mt-1">
                  Passe Premium pour télécharger tes PTI en PDF.
                </p>

                <a
                  href="/premium"
                  className="mt-3 inline-flex font-bold text-violet-700 hover:text-pink-500"
                >
                  Débloquer l’export PDF →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}