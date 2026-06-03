"use client";

import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { Check, Sparkles, Crown, FileText, Brain, Lock } from "lucide-react";

export default function PremiumPage() {
  const ouvrirCheckout = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("Tu dois être connectée pour passer Premium.");
      window.location.href = "/login";
      return;
    }

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Erreur Stripe");
    }
  };

  const avantages = [
    "PTI illimités",
    "Export PDF professionnel",
    "Cas cliniques avancés",
    "Historique complet",
    "Nouveautés Premium en priorité",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-bold text-violet-600 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Pour aller plus loin dans tes stages
            </div>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
              Passe en mode{" "}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Débloque les outils avancés de Repère PTI pour pratiquer plus,
              structurer tes idées plus vite et garder une trace claire de ton
              raisonnement clinique.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                <FileText className="h-6 w-6 text-violet-500" />
                <p className="mt-3 font-bold">PTI illimités</p>
                <p className="mt-1 text-sm text-slate-500">
                  Pratique sans limite.
                </p>
              </div>

              <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                <Brain className="h-6 w-6 text-pink-500" />
                <p className="mt-3 font-bold">Cas avancés</p>
                <p className="mt-1 text-sm text-slate-500">
                  Pour pousser ton jugement.
                </p>
              </div>

              <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                <Crown className="h-6 w-6 text-fuchsia-500" />
                <p className="mt-3 font-bold">Outils exclusifs</p>
                <p className="mt-1 text-sm text-slate-500">
                  Nouveautés en priorité.
                </p>
              </div>
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <Lock className="h-4 w-4" />
              Paiement sécurisé par Stripe. Annulation possible en tout temps.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-pink-100 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-violet-600">
                  Repère PTI Premium
                </p>

                <h2 className="mt-2 text-3xl font-extrabold">
                  Plan mensuel
                </h2>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 p-3 text-white shadow-lg">
                <Crown className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-8 flex items-end gap-2">
              <p className="text-6xl font-extrabold">2,99 $</p>
              <p className="pb-2 font-medium text-slate-500">/ mois</p>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Idéal pour tester Premium pendant tes stages ou ta session.
            </p>

            <div className="mt-8 space-y-4">
              {avantages.map((avantage) => (
                <div key={avantage} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100">
                    <Check className="h-4 w-4 text-violet-600" />
                  </div>

                  <p className="font-medium text-slate-700">{avantage}</p>
                </div>
              ))}
            </div>

            <button
              onClick={ouvrirCheckout}
              className="mt-9 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Passer Premium
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Repère PTI demeure un outil éducatif. Il ne remplace pas le
              jugement clinique, les politiques locales ou l’encadrement
              pédagogique.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}