"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Crown,
  Loader2,
  Lock,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function CorrigerPTIPage() {
  const [pti, setPti] = useState("");
  const [correction, setCorrection] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");

  const [loadingPremium, setLoadingPremium] = useState(true);
  const [connecte, setConnecte] = useState(false);
  const [estPremium, setEstPremium] = useState(false);

  useEffect(() => {
    const verifierAcces = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setConnecte(false);
        setEstPremium(false);
        setLoadingPremium(false);
        return;
      }

      setConnecte(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        setEstPremium(false);
      } else {
        setEstPremium(data?.is_premium === true);
      }

      setLoadingPremium(false);
    };

    verifierAcces();
  }, []);

  async function corrigerPTI() {
    setLoading(true);
    setErreur("");
    setCorrection("");

    try {
      const res = await fetch("/api/corriger-pti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pti }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErreur(data.error || "Une erreur est survenue.");
        return;
      }

      setCorrection(data.correction);
    } catch {
      setErreur("Impossible de corriger le PTI pour le moment.");
    } finally {
      setLoading(false);
    }
  }

  if (loadingPremium) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbf8fd] px-4">
        <div className="rounded-[28px] border border-white/80 bg-white/80 p-8 text-center shadow-sm backdrop-blur">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-700" />
          <p className="mt-4 text-sm font-bold text-slate-500">
            Vérification de ton accès...
          </p>
        </div>
      </main>
    );
  }

  if (!connecte) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#fbf8fd] px-4 py-10 text-slate-900">
        <div className="pointer-events-none fixed -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none fixed -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l’accueil
          </Link>

          <div className="rounded-[36px] border border-white/80 bg-white/85 p-8 text-center shadow-xl shadow-violet-100 backdrop-blur">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-violet-800">
              <Lock className="h-8 w-8" />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              Connexion requise
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Connecte-toi pour accéder au correcteur
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Le correcteur de PTI est une fonctionnalité Premium. Connecte-toi
              à ton compte pour vérifier ton accès.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-800 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-900"
              >
                Me connecter
              </Link>

              <Link
                href="/premium"
                className="inline-flex items-center justify-center rounded-2xl border border-violet-100 bg-white px-6 py-3 text-sm font-extrabold text-violet-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Voir Premium
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!estPremium) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#fbf8fd] px-4 py-10 text-slate-900">
        <div className="pointer-events-none fixed -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none fixed -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l’accueil
          </Link>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[36px] border border-white/80 bg-white/85 p-8 shadow-xl shadow-violet-100 backdrop-blur">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                <Crown className="h-4 w-4" />
                Fonction Premium
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Corrige ton PTI avec une rétroaction détaillée
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Le correcteur de PTI est réservé aux membres Premium. Il t’aide
                à améliorer tes constats, directives, priorités et interventions
                avec une rétroaction claire, pédagogique et structurée.
              </p>

              <div className="mt-7 grid gap-3">
                <div className="flex gap-3 rounded-2xl bg-violet-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    Analyse de la formulation des constats infirmiers.
                  </p>
                </div>

                <div className="flex gap-3 rounded-2xl bg-violet-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    Suggestions pour rendre les interventions plus précises et
                    observables.
                  </p>
                </div>

                <div className="flex gap-3 rounded-2xl bg-violet-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    Rétroaction éducative pour mieux comprendre ton raisonnement
                    clinique.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/premium"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-800 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-900"
                >
                  Débloquer Premium
                  <Sparkles className="h-4 w-4" />
                </Link>

                <Link
                  href="/generer"
                  className="inline-flex items-center justify-center rounded-2xl border border-violet-100 bg-white px-7 py-4 text-sm font-extrabold text-violet-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-50"
                >
                  Générer un PTI
                </Link>
              </div>
            </section>

            <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
                  Aperçu Premium
                </p>

                <h2 className="mt-3 text-2xl font-black text-slate-950">
                  Ce que l’IA peut corriger
                </h2>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                    <p className="text-sm font-extrabold text-violet-800">
                      Formulation
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Est-ce clair, précis et professionnel?
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                    <p className="text-sm font-extrabold text-violet-800">
                      Priorisation
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Les constats les plus importants sont-ils en premier?
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                    <p className="text-sm font-extrabold text-violet-800">
                      Cohérence clinique
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Les interventions sont-elles liées aux données?
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] px-4 py-10 text-slate-900">
      <div className="pointer-events-none fixed -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none fixed -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-violet-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l’accueil
        </Link>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-violet-700 shadow-sm">
            <Crown className="h-4 w-4" />
            Premium
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Corriger mon PTI
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Colle ton PTI et reçois une rétroaction professionnelle sur tes
            constats, directives, interventions, priorités et liens cliniques.
          </p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-white/80 bg-white/85 p-6 shadow-xl shadow-violet-100 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <label className="block text-lg font-black text-slate-950">
                  Ton PTI à corriger
                </label>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Retire toutes les informations nominatives avant de coller ton
                  texte.
                </p>
              </div>

              <div className="hidden rounded-2xl bg-violet-100 p-3 text-violet-800 sm:block">
                <WandSparkles className="h-6 w-6" />
              </div>
            </div>

            <textarea
              value={pti}
              onChange={(e) => setPti(e.target.value)}
              placeholder="Exemple : Constat prioritaire, directives infirmières, éléments à surveiller, justification clinique..."
              className="mt-5 min-h-[340px] w-full resize-none rounded-[28px] border border-violet-100 bg-white/90 p-5 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-slate-400">
                Minimum recommandé : quelques lignes complètes pour une
                correction utile.
              </p>

              <button
                onClick={corrigerPTI}
                disabled={loading || pti.trim().length < 20}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-800 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Correction en cours...
                  </>
                ) : (
                  <>
                    Corriger mon PTI
                    <WandSparkles className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {erreur && (
              <p className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium leading-6 text-red-700">
                {erreur}
              </p>
            )}
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              Correction incluse
            </p>

            <h2 className="mt-3 text-2xl font-black text-slate-950">
              L’IA vérifie ton raisonnement
            </h2>

            <div className="mt-6 space-y-3">
              <div className="flex gap-3 rounded-2xl bg-white/85 p-4 shadow-sm">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    Constats
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Pertinence, clarté et priorité clinique.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl bg-white/85 p-4 shadow-sm">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    Directives
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Cohérence avec les données et éléments à surveiller.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl bg-white/85 p-4 shadow-sm">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    Suggestions
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Reformulation plus professionnelle et pédagogique.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[28px] bg-violet-50 p-5">
              <p className="text-sm font-extrabold text-violet-900">
                Rappel confidentialité
              </p>
              <p className="mt-2 text-sm leading-6 text-violet-900/70">
                N’inscris jamais le nom, la date de naissance, le numéro de
                dossier ou toute information permettant d’identifier un patient.
              </p>
            </div>
          </aside>
        </section>

        {correction && (
          <section className="mt-8 rounded-[36px] border border-white/80 bg-white/90 p-6 shadow-xl shadow-violet-100 backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-800 text-white">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
                  Rétroaction Premium
                </p>
                <h2 className="text-2xl font-black text-slate-950">
                  Correction de ton PTI
                </h2>
              </div>
            </div>

            <div className="whitespace-pre-wrap rounded-[28px] bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {correction}
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          Outil éducatif d’aide au raisonnement clinique. Ne remplace pas
          l’enseignement, le jugement clinique, les consignes de stage ou les
          exigences de ton programme.
        </p>
      </div>
    </main>
  );
}