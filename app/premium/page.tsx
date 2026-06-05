"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import {
  Check,
  Sparkles,
  Crown,
  FileText,
  Brain,
  Lock,
  Infinity,
  Download,
  ShieldCheck,
  ArrowRight,
  Settings,
  XCircle,
} from "lucide-react";

export default function PremiumPage() {
  const [chargement, setChargement] = useState(false);
  const [chargementPortail, setChargementPortail] = useState(false);
  const [premium, setPremium] = useState(false);
  const [chargementProfil, setChargementProfil] = useState(true);

  useEffect(() => {
    const verifierPremium = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setChargementProfil(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("premium")
        .eq("id", user.id)
        .single();

      setPremium(profile?.premium === true);
      setChargementProfil(false);
    };

    verifierPremium();
  }, []);

  const ouvrirCheckout = async () => {
    try {
      setChargement(true);

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
        setChargement(false);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ouverture du paiement.");
      setChargement(false);
    }
  };

  const ouvrirPortailAbonnement = async () => {
    try {
      setChargementPortail(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("Tu dois être connectée.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erreur lors de l'ouverture du portail Stripe.");
        setChargementPortail(false);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ouverture du portail d'abonnement.");
      setChargementPortail(false);
    }
  };

  const avantages = [
    "PTI illimités",
    "Quiz cliniques illimités",
    "Export PDF professionnel",
    "Cas complexes Premium",
    "Historique complet",
    "Nouveautés Premium en priorité",
  ];

  if (chargementProfil) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
        <Navbar />

        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="rounded-[32px] bg-white/85 p-8 shadow-xl">
            <p className="font-bold text-violet-700">
              Chargement de ton statut Premium...
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-bold text-violet-600 shadow-sm backdrop-blur md:text-sm">
              <Sparkles className="h-4 w-4" />
              {premium
                ? "Ton abonnement Premium est actif"
                : "Pour aller plus loin dans tes stages"}
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {premium ? (
                <>
                  Ton espace{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                    Premium
                  </span>
                </>
              ) : (
                <>
                  Débloque tout le potentiel de{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                    Repère PTI
                  </span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              {premium
                ? "Tu as accès aux PTI illimités, aux quiz illimités, aux cas complexes et à l’export PDF. Tu peux gérer ou annuler ton abonnement à tout moment depuis le portail sécurisé Stripe."
                : "Premium te permet de pratiquer davantage, d’obtenir des analyses plus poussées et de conserver tes PTI en format PDF pour tes révisions, tes stages et ton développement du raisonnement clinique."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 md:gap-4">
              <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100">
                  <Infinity className="h-6 w-6 text-violet-600" />
                </div>

                <p className="mt-4 font-bold">Sans limites</p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Génère plus de PTI et de quiz pour pratiquer à ton rythme.
                </p>
              </div>

              <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100">
                  <Brain className="h-6 w-6 text-pink-600" />
                </div>

                <p className="mt-4 font-bold">Cas complexes</p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Priorités, risques, surveillance avancée et détérioration.
                </p>
              </div>

              <div className="rounded-3xl bg-white/85 p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-100">
                  <Download className="h-6 w-6 text-fuchsia-600" />
                </div>

                <p className="mt-4 font-bold">Export PDF</p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Télécharge tes PTI pour les conserver et les relire.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-violet-100 bg-white/75 p-5 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-bold text-violet-700">
                <ShieldCheck className="h-5 w-5" />
                Pensé pour un usage éducatif
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Repère PTI aide à structurer ton raisonnement clinique, mais ne
                remplace jamais ton jugement, les politiques locales ou
                l’encadrement de ton milieu de stage.
              </p>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Lock className="h-4 w-4" />
              Paiement et gestion d’abonnement sécurisés par Stripe.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-5 shadow-2xl shadow-pink-100 backdrop-blur md:rounded-[36px] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-violet-600">
                  Repère PTI Premium
                </p>

                <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                  {premium ? "Premium actif" : "Plan mensuel"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {premium
                    ? "Ton abonnement est actuellement actif."
                    : "Pour pratiquer plus souvent pendant ta session ou tes stages."}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg">
                <Crown className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-gradient-to-br from-violet-50 via-pink-50 to-white p-5">
              <div className="flex items-end gap-2">
                <p className="text-5xl font-extrabold md:text-6xl">2,99 $</p>
                <p className="pb-2 font-medium text-slate-500">/ mois</p>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {premium
                  ? "Tu peux modifier ton moyen de paiement, consulter tes factures ou annuler ton abonnement dans le portail Stripe."
                  : "Abonnement mensuel. Annulation possible en tout temps depuis ton espace de gestion."}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {avantages.map((avantage) => (
                <div key={avantage} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100">
                    <Check className="h-4 w-4 text-violet-600" />
                  </div>

                  <p className="font-medium leading-7 text-slate-700">
                    {avantage}
                  </p>
                </div>
              ))}
            </div>

            {premium ? (
              <div className="mt-9 space-y-3">
                <button
                  onClick={ouvrirPortailAbonnement}
                  disabled={chargementPortail}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Settings className="h-5 w-5" />
                  {chargementPortail
                    ? "Ouverture du portail..."
                    : "Gérer mon abonnement"}
                </button>

                <button
                  onClick={ouvrirPortailAbonnement}
                  disabled={chargementPortail}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-8 py-4 font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <XCircle className="h-5 w-5" />
                  Annuler mon abonnement
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  L’annulation se fait dans le portail sécurisé Stripe.
                </p>
              </div>
            ) : (
              <button
                onClick={ouvrirCheckout}
                disabled={chargement}
                className="mt-9 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {chargement ? "Ouverture du paiement..." : "Passer Premium"}
                {!chargement && <ArrowRight className="h-5 w-5" />}
              </button>
            )}

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Inclus avec Premium
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-3">
                  <FileText className="h-5 w-5 text-violet-500" />
                  <p className="mt-2 font-bold">PTI</p>
                  <p className="text-xs text-slate-500">Illimités</p>
                </div>

                <div className="rounded-2xl bg-white p-3">
                  <Brain className="h-5 w-5 text-pink-500" />
                  <p className="mt-2 font-bold">Quiz</p>
                  <p className="text-xs text-slate-500">Illimités</p>
                </div>

                <div className="rounded-2xl bg-white p-3">
                  <Download className="h-5 w-5 text-fuchsia-500" />
                  <p className="mt-2 font-bold">PDF</p>
                  <p className="text-xs text-slate-500">Export</p>
                </div>

                <div className="rounded-2xl bg-white p-3">
                  <Crown className="h-5 w-5 text-violet-500" />
                  <p className="mt-2 font-bold">Premium</p>
                  <p className="text-xs text-slate-500">Actif</p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              Repère PTI demeure un outil éducatif. Il ne remplace pas le
              jugement clinique, les politiques locales ou l’encadrement
              pédagogique.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
            <p className="font-bold text-slate-800">
              Est-ce que je peux annuler ?
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Oui. L’abonnement est mensuel et peut être annulé en tout temps
              dans le portail Stripe.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
            <p className="font-bold text-slate-800">
              Est-ce réservé aux étudiantes ?
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              L’outil est conçu pour soutenir l’apprentissage en soins
              infirmiers, particulièrement en stage.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
            <p className="font-bold text-slate-800">
              Est-ce un avis clinique ?
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Non. C’est un outil éducatif qui soutient la réflexion clinique.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}