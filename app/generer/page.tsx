"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import PTIResultat from "@/components/PTIResultat";
import jsPDF from "jspdf";
import {
  ClipboardList,
  Sparkles,
  Crown,
  ShieldCheck,
  FileText,
  Download,
  Lock,
  ArrowRight,
  Stethoscope,
  CheckCircle,
} from "lucide-react";

type SectionsPDF = {
  resume: boolean;
  donnees: boolean;
  pti: boolean;
  justification: boolean;
  validation: boolean;
  retenir: boolean;
  premium: boolean;
  avertissement: boolean;
};

export default function GenererPage() {
  const [userId, setUserId] = useState("");
  const [premium, setPremium] = useState(false);
  const [situation, setSituation] = useState("");
  const [resultat, setResultat] = useState("");
  const [chargement, setChargement] = useState(false);
  const [modeComplexe, setModeComplexe] = useState(false);

  const [sectionsPDF, setSectionsPDF] = useState<SectionsPDF>({
    resume: true,
    donnees: true,
    pti: true,
    justification: true,
    validation: true,
    retenir: true,
    premium: true,
    avertissement: true,
  });

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
        .maybeSingle();

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
          .maybeSingle();

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

  const changerSectionPDF = (section: keyof SectionsPDF) => {
    setSectionsPDF((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filtrerSectionsPourPDF = () => {
    const sections = [
      {
        key: "resume",
        titres: ["# Résumé de la situation", "Résumé de la situation"],
      },
      {
        key: "donnees",
        titres: ["# Données significatives", "Données significatives"],
      },
      {
        key: "pti",
        titres: ["# PTI suggéré", "PTI suggéré"],
      },
      {
        key: "justification",
        titres: [
          "# Justification clinique globale",
          "Justification clinique globale",
        ],
      },
      {
        key: "validation",
        titres: ["# Éléments à valider", "Éléments à valider"],
      },
      {
        key: "retenir",
        titres: ["# À retenir pour l’étudiante", "À retenir pour l’étudiante"],
      },
      {
        key: "premium",
        titres: ["# Mode Premium", "Mode Premium"],
      },
      {
        key: "avertissement",
        titres: ["# Avertissement éducatif", "Avertissement éducatif"],
      },
    ] as const;

    const lignes = resultat.split("\n");
    const lignesFiltrees: string[] = [];
    let garderSection = true;

    for (const ligne of lignes) {
      const ligneNettoyee = ligne.trim();

      const sectionTrouvee = sections.find((section) =>
        section.titres.some((titre) => ligneNettoyee.startsWith(titre))
      );

      if (sectionTrouvee) {
        garderSection = sectionsPDF[sectionTrouvee.key as keyof SectionsPDF];
      }

      if (garderSection) {
        lignesFiltrees.push(ligne);
      }
    }

    const texteFinal = lignesFiltrees.join("\n").trim();

    return texteFinal || "Aucune section sélectionnée pour le PDF.";
  };

  const ajouterTexteAvecPages = (
    doc: jsPDF,
    texte: string,
    x: number,
    yDepart: number,
    largeur: number
  ) => {
    const lignes = doc.splitTextToSize(texte, largeur);
    let y = yDepart;

    lignes.forEach((ligne: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(ligne, x, y);
      y += 5;
    });

    return y;
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

    const contenuPDF = filtrerSectionsPourPDF();

    if (contenuPDF === "Aucune section sélectionnée pour le PDF.") {
      alert("Sélectionne au moins une section à inclure dans le PDF.");
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

    doc.setDrawColor(91, 33, 182);
    doc.line(20, 50, 190, 50);

    let y = 60;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Situation clinique fournie :", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    y = ajouterTexteAvecPages(doc, situation, 20, y, 170);

    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text("PTI sélectionné :", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    ajouterTexteAvecPages(doc, contenuPDF, 20, y, 170);

    doc.save("repere-pti.pdf");
  };

  const resultatPret =
    resultat &&
    resultat !== "Génération en cours..." &&
    !resultat.startsWith("Erreur") &&
    !resultat.startsWith("Tu dois") &&
    !resultat.startsWith("Décris");

  const optionsPDF: {
    key: keyof SectionsPDF;
    label: string;
    description: string;
  }[] = [
    {
      key: "resume",
      label: "Résumé de la situation",
      description: "Titre clinique court.",
    },
    {
      key: "donnees",
      label: "Données significatives",
      description: "Données subjectives, objectives et contexte.",
    },
    {
      key: "pti",
      label: "Constats et directives",
      description: "Le cœur du PTI.",
    },
    {
      key: "justification",
      label: "Justification clinique",
      description: "Raisonnement global.",
    },
    {
      key: "validation",
      label: "Éléments à valider",
      description: "Protocoles, outils et encadrement.",
    },
    {
      key: "retenir",
      label: "À retenir",
      description: "Points pédagogiques pour l’étudiante.",
    },
    {
      key: "premium",
      label: "Analyse avancée",
      description: "Sections Premium si présentes.",
    },
    {
      key: "avertissement",
      label: "Avertissement éducatif",
      description: "Mention de prudence.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] text-slate-900">
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-14">
        <div className="pointer-events-none absolute -right-40 top-0 h-[380px] w-[380px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[340px] w-[340px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-6 grid gap-5 lg:mb-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Assistant clinique IA
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                Générer un{" "}
                <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  PTI
                </span>
              </h1>

              <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                Décris une situation clinique anonymisée et obtiens une ébauche
                structurée pour soutenir ton apprentissage, tes stages et ton
                raisonnement clinique.
              </p>

              <p className="mt-5 rounded-2xl bg-violet-50 p-4 text-sm font-medium leading-6 text-violet-800">
                🔒 Aucune information permettant d’identifier un patient ne doit
                être inscrite.
              </p>
            </div>

            <div className="rounded-[36px] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
                Statut
              </p>

              <h2 className="mt-3 text-2xl font-black text-slate-950">
                {premium ? "Premium actif" : "Version gratuite"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {premium
                  ? "PTI illimités, cas complexes et export PDF personnalisé débloqués."
                  : "La version gratuite permet de générer 5 PTI par jour."}
              </p>

              <div className="mt-5 rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5">
                <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                  Outil éducatif
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Ne remplace pas le jugement clinique, les politiques locales
                  ou la validation par une personne qualifiée.
                </p>
              </div>

              {!premium && (
                <a
                  href="/premium"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-800 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900"
                >
                  Passer Premium
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[36px] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur md:p-7">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
                  <Stethoscope className="h-6 w-6 text-violet-800" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-950">
                    Situation clinique
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Décris les signes, symptômes, antécédents et le contexte,
                    sans nom, date de naissance ou information identifiable.
                  </p>
                </div>
              </div>

              <textarea
                className="mt-6 min-h-[240px] w-full rounded-[28px] border border-violet-100 bg-white p-5 text-sm leading-7 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 md:min-h-[310px] md:text-base"
                placeholder="Ex. Patient de 72 ans, insuffisance cardiaque, SpO₂ 89 %, dyspnée, prise de poids de 2 kg en 2 jours..."
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
              />

              <div className="mt-5 rounded-[28px] border border-white/80 bg-white/70 p-4 shadow-sm">
                <label className="flex cursor-pointer flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-slate-900">
                        Cas complexe
                      </p>

                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-800 px-3 py-1 text-xs font-extrabold text-white">
                        <Crown className="h-3.5 w-3.5" />
                        Premium
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Analyse plus poussée : priorités, complications possibles,
                      surveillance avancée et signes de détérioration.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModeComplexe(!modeComplexe)}
                    className={`relative h-8 w-14 shrink-0 rounded-full transition ${
                      modeComplexe ? "bg-violet-800" : "bg-slate-300"
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
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-800 px-8 py-4 font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {chargement
                  ? "Génération..."
                  : modeComplexe
                    ? "Générer le PTI complexe"
                    : "Générer le PTI"}
                {!chargement && <ArrowRight className="h-4 w-4" />}
              </button>

              <div className="mt-5 grid gap-2 text-sm text-slate-500 sm:grid-cols-3">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-700" />
                  Rapide
                </span>

                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-700" />
                  Pensé stages
                </span>

                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-700" />
                  Éducatif
                </span>
              </div>
            </div>

            <div className="rounded-[36px] border border-white/80 bg-white/85 p-5 shadow-xl shadow-violet-100 backdrop-blur md:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
                    <ClipboardList className="h-6 w-6 text-violet-800" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      PTI suggéré
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Ton plan apparaîtra ici après génération.
                    </p>
                  </div>
                </div>

                {modeComplexe && (
                  <span className="w-fit rounded-full bg-violet-100 px-4 py-2 text-xs font-extrabold text-violet-800">
                    👑 Cas complexe
                  </span>
                )}
              </div>

              <div className="mt-6 min-h-[360px] rounded-[32px] bg-gradient-to-br from-violet-50 via-white to-pink-50 p-4 md:min-h-[430px] md:p-6">
                {resultat ? (
                  resultatPret ? (
                    <PTIResultat contenu={resultat} />
                  ) : (
                    <div className="flex h-[300px] items-center justify-center text-center text-sm font-bold text-violet-700 md:h-[360px]">
                      {resultat}
                    </div>
                  )
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-center text-sm text-slate-400 md:h-[360px]">
                    Génère un PTI pour voir les résultats ici.
                  </div>
                )}
              </div>

              {resultatPret && (
                <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  ⚠️ Ce PTI est une ébauche éducative. Valide toujours avec les
                  consignes de ton programme, les outils officiels, les
                  politiques du milieu et le jugement clinique.
                </p>
              )}

              {resultatPret && (
                <div className="mt-4 rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-sm">
                  <p className="flex items-center gap-2 font-black text-violet-800">
                    <FileText className="h-5 w-5" />
                    Personnaliser mon PDF {premium ? "" : "— Premium"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Coche les sections que tu veux inclure dans ton PDF.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {optionsPDF.map((option) => (
                      <label
                        key={option.key}
                        className="flex cursor-pointer gap-3 rounded-2xl bg-violet-50 p-3 text-sm text-slate-700 transition hover:bg-violet-100"
                      >
                        <input
                          type="checkbox"
                          checked={sectionsPDF[option.key]}
                          onChange={() => changerSectionPDF(option.key)}
                          className="mt-1 h-4 w-4 shrink-0 accent-violet-800"
                        />

                        <span>
                          <span className="block font-extrabold">
                            {option.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                            {option.description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>

                  {premium ? (
                    <button
                      onClick={telechargerPDF}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-800 px-6 py-3 font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900 sm:w-auto"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger le PDF personnalisé
                    </button>
                  ) : (
                    <div className="mt-5 rounded-2xl bg-violet-50 p-4 text-sm text-violet-800">
                      <p className="flex items-center gap-2 font-extrabold">
                        <Lock className="h-4 w-4" />
                        Export PDF Premium
                      </p>

                      <p className="mt-1">
                        Passe Premium pour télécharger un PDF personnalisé.
                      </p>

                      <a
                        href="/premium"
                        className="mt-3 inline-flex font-extrabold text-violet-800 hover:text-violet-950"
                      >
                        Débloquer l’export PDF →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}