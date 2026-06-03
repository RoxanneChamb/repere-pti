"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
      return;
    }

    // Google Analytics
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.gtag?.("event", "account_created");
    }

    alert("Compte créé! Vérifie tes courriels si confirmation demandée.");
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("quiz_stats").upsert({
        user_id: user.id,
        score: 0,
        bonnes_reponses: 0,
        mauvaises_reponses: 0,
      });
    }

    window.location.href = "/generer";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white flex items-center justify-center p-8">
      <div className="w-full max-w-md rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur">
        <h1 className="text-4xl font-extrabold">Connexion</h1>
        <p className="mt-2 text-slate-500">Connecte-toi à Repère PTI.</p>

        <input
          className="mt-6 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          placeholder="Courriel"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-4 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signIn}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 p-4 font-bold text-white shadow-lg shadow-pink-200"
        >
          Me connecter
        </button>

        <button
          onClick={signUp}
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-4 font-bold text-slate-700 hover:bg-slate-50"
        >
          Créer mon compte
        </button>
      </div>
    </main>
  );
}