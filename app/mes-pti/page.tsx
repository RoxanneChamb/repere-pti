"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Stethoscope } from "lucide-react";

export default function MesPTIPage() {
  const [ptis, setPtis] = useState<any[]>([]);
  const [message, setMessage] = useState("Chargement...");
  const [nbPTI, setNbPTI] = useState(0);
  const [email, setEmail] = useState("");

  let niveau = "🌱 Junior";
  let prochainPalier = 15;
  let prochainNiveau = "Intermédiaire";

  if (nbPTI >= 15 && nbPTI < 30) {
    niveau = "🌸 Intermédiaire";
    prochainPalier = 30;
    prochainNiveau = "Sénior";
  } else if (nbPTI >= 30 && nbPTI < 60) {
    niveau = "⭐ Infirmière sénior";
    prochainPalier = 60;
    prochainNiveau = "Experte clinique";
  } else if (nbPTI >= 60) {
    niveau = "👑 Experte clinique";
  }

  const progression =
    nbPTI >= 60 ? 100 : Math.min((nbPTI / prochainPalier) * 100, 100);

  const trierPTI = (liste: any[]) => {
    return [...liste].sort((a, b) => {
      if (a.is_favorite && !b.is_favorite) return -1;
      if (!a.is_favorite && b.is_favorite) return 1;
      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });
  };

  const chargerPTI = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Tu dois être connectée.");
      return;
    }

    setEmail(user.email || "");

    const { data: profile } = await supabase
      .from("profiles")
      .select("pti_count")
      .eq("id", user.id)
      .single();

    setNbPTI(profile?.pti_count || 0);

    const { data, error } = await supabase
      .from("ptis")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setPtis(trierPTI(data || []));
    setMessage("");
  };

  useEffect(() => {
    chargerPTI();
  }, []);

  const toggleFavori = async (id: string, valeurActuelle: boolean) => {
    const { error } = await supabase
      .from("ptis")
      .update({ is_favorite: !valeurActuelle })
      .eq("id", id);

    if (error) {
      alert("Erreur : " + error.message);
      return;
    }

    setPtis((anciensPTI) =>
      trierPTI(
        anciensPTI.map((pti) =>
          pti.id === id
            ? { ...pti, is_favorite: !valeurActuelle }
            : pti
        )
      )
    );
  };

  const supprimerPTI = async (id: string) => {
    const confirmation = confirm("Supprimer ce PTI?");
    if (!confirmation) return;

    const { error } = await supabase.from("ptis").delete().eq("id", id);

    if (error) {
      alert("Erreur : " + error.message);
      return;
    }

    setPtis((anciensPTI) => anciensPTI.filter((pti) => pti.id !== id));
  };

  const deconnexion = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <header className="border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <a href="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-400 shadow-lg">
              <Stethoscope className="h-7 w-7 text-white" />
            </div>

            <div>
              <p className="text-2xl font-extrabold tracking-tight">
                Repère PT
                <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  I
                </span>
              </p>
              <p className="text-xs font-medium text-slate-500">
                Votre allié pour le raisonnement clinique
              </p>
            </div>
          </a>

          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
  <a href="/generer">Générer un PTI</a>

  <a className="text-violet-600" href="/mes-pti">
    Mes PTI
  </a>

  <a href="/quiz">
    Quiz clinique
  </a>

  <a href="/dashboard">
    Tableau de bord
  </a>

  <a href="/ressources">
    Ressources
  </a>

  <a href="/a-propos">
    À propos
  </a>
</nav>

          <div className="hidden items-center gap-3 md:flex">
            {email ? (
              <>
                <span className="max-w-[180px] truncate text-xs font-medium text-slate-500">
                  {email}
                </span>
                <button
                  onClick={deconnexion}
                  className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-md"
              >
                Connexion
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight">Mes PTI</h1>
          <p className="mt-3 text-slate-600">
            Retrouve tes plans thérapeutiques infirmiers générés et suis ta progression.
          </p>
        </div>

        <section className="mb-8 rounded-[32px] border border-white/70 bg-white/80 p-7 shadow-xl shadow-pink-100 backdrop-blur">
          <p className="text-sm font-bold text-violet-600">Niveau actuel</p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-extrabold">{niveau}</h2>
              <p className="mt-2 text-slate-600">
                {nbPTI} PTI généré{nbPTI > 1 ? "s" : ""} au total
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {ptis.length} PTI actuellement enregistré
                {ptis.length > 1 ? "s" : ""}
              </p>
            </div>

            {nbPTI < 60 ? (
              <p className="text-sm font-medium text-slate-500">
                Encore {prochainPalier - nbPTI} PTI pour atteindre le niveau{" "}
                {prochainNiveau} ✨
              </p>
            ) : (
              <p className="text-sm font-medium text-violet-600">
                Niveau maximal atteint 👑
              </p>
            )}
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-violet-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 transition-all"
              style={{ width: `${progression}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs font-medium text-slate-400">
            <span>Junior</span>
            <span>Intermédiaire</span>
            <span>Sénior</span>
            <span>Experte</span>
          </div>
        </section>

        {message && <p className="text-slate-500">{message}</p>}

        <div className="space-y-4">
          {ptis.map((pti) => (
            <div
              key={pti.id}
              className={`rounded-[28px] border p-6 shadow-sm backdrop-blur ${
                pti.is_favorite
                  ? "border-yellow-200 bg-yellow-50/80"
                  : "border-white/70 bg-white/85"
              }`}
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {new Date(pti.created_at).toLocaleDateString("fr-CA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {" à "}
                    {new Date(pti.created_at).toLocaleTimeString("fr-CA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {pti.is_favorite && (
                    <p className="mt-2 text-sm font-bold text-yellow-700">
                      ⭐ Favori — épinglé en haut
                    </p>
                  )}
                </div>

                <button
                  onClick={() => toggleFavori(pti.id, pti.is_favorite)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                    pti.is_favorite
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pti.is_favorite ? "⭐ Favori" : "☆ Favori"}
                </button>
              </div>

              <h2 className="mt-3 font-bold text-slate-900">{pti.situation}</h2>

              <pre className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {pti.resultat}
              </pre>

              <div className="mt-6 flex gap-3">
                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Ouvrir
                </button>

                <button
                  onClick={() => supprimerPTI(pti.id)}
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {!message && ptis.length === 0 && (
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-center shadow-sm">
            <p className="font-semibold text-slate-700">
              Aucun PTI enregistré pour l’instant.
            </p>

            <a
              href="/generer"
              className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200"
            >
              Générer un PTI
            </a>
          </div>
        )}
      </div>
    </main>
  );
}