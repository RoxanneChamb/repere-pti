"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Compte créé! Vérifie tes courriels si confirmation demandée.");
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
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md rounded-3xl border p-8 shadow-sm">
        <h1 className="text-4xl font-bold">Connexion</h1>
        <p className="mt-2 text-slate-500">Connecte-toi à Repère PTI.</p>

        <input
          className="mt-6 w-full rounded-2xl border p-4"
          placeholder="Courriel"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-4 w-full rounded-2xl border p-4"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signIn} className="mt-6 w-full rounded-2xl bg-violet-600 p-4 font-bold text-white">
          Me connecter
        </button>

        <button onClick={signUp} className="mt-3 w-full rounded-2xl border p-4 font-bold">
          Créer mon compte
        </button>
      </div>
    </main>
  );
}