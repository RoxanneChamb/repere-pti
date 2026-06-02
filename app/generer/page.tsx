"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Stethoscope } from "lucide-react";

export default function GenererPage() {
  const [userId, setUserId] = useState("");
  const [situation, setSituation] = useState("");
  const [resultat, setResultat] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }
    };

    getUser();
  }, []);

  const genererPTI = async () => {
    try {
      setResultat("Génération en cours...");

      const response = await fetch("/api/generer-pti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situation }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResultat("Erreur API : " + (data.error || "Erreur inconnue"));
        return;
      }

      setResultat(data.resultat);

      if (userId) {
        const { error } = await supabase.from("ptis").insert({
  user_id: userId,
  situation,
  resultat: data.resultat,
});

if (error) {
  console.error("Erreur Supabase :", error.message);
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
      pti_count: profile.pti_count + 1,
    })
    .eq("id", userId);
}
      }
    } catch (error) {
      setResultat("Erreur de connexion avec l'API.");
    }
  };

  return (
   <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
         <div className="flex items-center gap-4">
  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-400 shadow-lg">
  <Stethoscope className="h-8 w-8 text-white" />
</div>

  <div>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
  Repère PT
  <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
    I
  </span>
</p>

    <p className="text-sm font-medium text-slate-500">
      Votre allié pour le raisonnement clinique
    </p>
  </div>
</div>

          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="text-violet-600" href="/generer">
              Générer un PTI
            </a>
            <a href="/mes-pti">Mes PTI</a>
            <a href="/ressources">Ressources</a>
            <a href="/a-propos">À propos</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-14">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row">
         <div>
  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-4 py-2 text-sm font-bold text-violet-700">
  ✨ Assistant clinique IA
</div>

  <h1 className="text-6xl font-extrabold tracking-tight">
    Construis ton PTI en quelques secondes
  </h1>

  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
    Décris une situation clinique et obtiens un plan thérapeutique infirmier structuré pour soutenir ton raisonnement clinique.
  </p>
</div>

          <div className="rounded-[32px] border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur">
            <p className="font-bold">Outil éducatif</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Ne remplace pas le jugement clinique, les politiques locales ou la
              validation par une personne qualifiée.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-pink-50 p-6 shadow-lg">
            <p className="text-2xl font-bold">Situation clinique</p>
            <p className="mt-2 text-sm text-slate-500">
              Décris les signes, symptômes, antécédents et le contexte.
            </p>

            <textarea
              className="mt-6 min-h-[260px] w-full rounded-3xl border-2 border-violet-200 bg-white p-6 text-base shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              placeholder="Ex. Homme 72 ans, insuffisance cardiaque, SpO₂ 89 %, dyspnée, prise de poids de 2 kg en 2 jours..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />

            <button
              onClick={genererPTI}
              className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-pink-200 transition hover:scale-105"
            >
              Générer le PTI
            </button>

            <div className="mt-5 flex gap-4 text-sm text-slate-500">
  <span>⚡ Génération rapide</span>
  <span>🩺 Pensé pour les stages</span>
  <span>✨ IA éducative</span>
</div>

            <p className="mt-5 text-sm text-slate-500">
              🔒 Données confidentielles pour la version bêta.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-2xl font-bold">PTI suggéré</p>
            <p className="mt-2 text-sm text-slate-500">
              Ton plan apparaîtra ici après génération.
            </p>

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