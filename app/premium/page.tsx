"use client";

import { supabase } from "@/lib/supabaseClient";

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

    const response = await fetch(
      "/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Erreur Stripe");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8">
      <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-10 shadow-xl">
        <h1 className="text-5xl font-extrabold">
          ✨ Repère PTI Premium
        </h1>

        <p className="mt-4 text-slate-600">
          Débloque toutes les fonctionnalités avancées.
        </p>

        <div className="mt-8 space-y-3">
          <p>✅ PTI illimités</p>
          <p>✅ Export PDF</p>
          <p>✅ Cas cliniques avancés</p>
          <p>✅ Historique complet</p>
          <p>✅ Nouvelles fonctionnalités en priorité</p>
        </div>

        <div className="mt-8">
          <p className="text-5xl font-extrabold">
            2,99 $
          </p>

          <p className="text-slate-500">
            par mois
          </p>
        </div>

        <button
          onClick={ouvrirCheckout}
          className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-8 py-4 font-bold text-white"
        >
          Passer Premium
        </button>
      </div>
    </main>
  );
}