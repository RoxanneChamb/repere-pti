"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import {
  ClipboardList,
  Star,
  Trash2,
  Stethoscope,
  FileText,
  ArrowRight,
  LogOut,
  Sparkles,
} from "lucide-react";

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
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
      .maybeSingle();

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
          pti.id === id ? { ...pti, is_favorite: !valeurActuelle } : pti
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
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
      <Navbar />

      <section className="relative mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-14">
        <div className="pointer-events-none absolute -right-40 top-0 h-[360px] w-[360px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[320px] w-[320px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div className="flex-1 rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-9">
              <a
                href="/"
                className="inline-flex text-sm font-bold text-violet-700 transition hover:text-violet-900"
              >
                ← Retour à l'accueil
              </a>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 shadow-sm">
                <ClipboardList className="h-4 w-4" />
                Historique personnel
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                Mes{" "}
                <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  PTI
                </span>
              </h1>

              <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                Retrouve tes plans thérapeutiques infirmiers générés, épingle
                tes favoris et suis ta progression clinique.
              </p>

              {email && (
                <p className="mt-4 truncate text-sm font-medium text-slate-400">
                  {email}
                </p>
              )}
            </div>

            <button
              onClick={deconnexion}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-white/80 px-5 py-3 text-sm font-extrabold text-violet-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white md:w-auto"
            >
              <LogOut className="h-4 w-4" />
              Me déconnecter
            </button>
          </div>

          <section className="mt-6 rounded-[36px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur md:p-7">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
                  Niveau actuel
                </p>

                <h2 className="mt-3 text-2xl font-black text-slate-950 md:text-3xl">
                  {niveau}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
                  {nbPTI} PTI généré{nbPTI > 1 ? "s" : ""} au total
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {ptis.length} PTI actuellement enregistré
                  {ptis.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5 md:min-w-[280px]">
                {nbPTI < 60 ? (
                  <p className="text-sm font-medium leading-6 text-slate-600">
                    Encore{" "}
                    <span className="font-black text-violet-800">
                      {prochainPalier - nbPTI}
                    </span>{" "}
                    PTI pour atteindre le niveau{" "}
                    <span className="font-black text-violet-800">
                      {prochainNiveau}
                    </span>
                    .
                  </p>
                ) : (
                  <p className="text-sm font-extrabold text-violet-800">
                    Niveau maximal atteint 👑
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-violet-100">
              <div
                className="h-full rounded-full bg-violet-800 transition-all"
                style={{ width: `${progression}%` }}
              />
            </div>

            <div className="mt-3 grid grid-cols-4 text-center text-[11px] font-bold text-slate-400 md:text-xs">
              <span>Junior</span>
              <span>Intermédiaire</span>
              <span>Sénior</span>
              <span>Experte</span>
            </div>
          </section>

          {message && (
            <div className="mt-6 rounded-[28px] border border-white/80 bg-white/75 p-5 text-slate-500 shadow-sm backdrop-blur">
              {message}
            </div>
          )}

          {!message && ptis.length === 0 && (
            <div className="mt-6 rounded-[36px] border border-white/80 bg-white/75 p-8 text-center shadow-sm backdrop-blur">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                <FileText className="h-7 w-7 text-violet-800" />
              </div>

              <p className="mt-5 text-lg font-extrabold text-slate-800">
                Aucun PTI enregistré pour l’instant.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Génère ton premier PTI pour commencer ton historique.
              </p>

              <a
                href="/generer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-800 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900 sm:w-auto"
              >
                Générer un PTI
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}

          <div className="mt-6 space-y-4">
            {ptis.map((pti) => (
              <div
                key={pti.id}
                className={`rounded-[32px] border p-5 shadow-sm backdrop-blur md:p-6 ${
                  pti.is_favorite
                    ? "border-amber-200 bg-amber-50/90"
                    : "border-white/80 bg-white/80"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-medium text-slate-400 md:text-sm">
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
                      <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-700">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        Favori — épinglé en haut
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavori(pti.id, pti.is_favorite)}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition sm:w-auto ${
                      pti.is_favorite
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        : "border border-violet-100 bg-white text-violet-800 hover:bg-violet-50"
                    }`}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        pti.is_favorite
                          ? "fill-amber-500 text-amber-500"
                          : "text-violet-400"
                      }`}
                    />
                    Favori
                  </button>
                </div>

                <div className="mt-5 rounded-[28px] bg-white/75 p-4 shadow-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
                    Situation
                  </p>

                  <h2 className="mt-2 text-base font-extrabold leading-7 text-slate-900">
                    {pti.situation}
                  </h2>
                </div>

                <details className="mt-4 rounded-[28px] bg-[#fbf8fd] p-4">
                  <summary className="cursor-pointer text-sm font-extrabold text-violet-800">
                    Ouvrir le PTI
                  </summary>

                  <pre className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                    {pti.resultat}
                  </pre>
                </details>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/generer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-100 bg-white px-4 py-3 text-sm font-extrabold text-violet-800 transition hover:bg-violet-50 sm:w-auto"
                  >
                    <Stethoscope className="h-4 w-4" />
                    Générer un autre PTI
                  </a>

                  <button
                    onClick={() => supprimerPTI(pti.id)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-extrabold text-red-600 transition hover:bg-red-100 sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}