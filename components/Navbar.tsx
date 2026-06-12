"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Menu,
  X,
  Home,
  ClipboardList,
  Brain,
  BookOpen,
  Crown,
  LayoutDashboard,
  LogOut,
  LogIn,
  Smartphone,
} from "lucide-react";

export default function Navbar() {
  const [connecte, setConnecte] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);

  useEffect(() => {
    const verifierConnexion = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setConnecte(!!user);
    };

    verifierConnexion();
  }, []);

  const deconnexion = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const liens = [
    {
      href: "/",
      label: "Accueil",
      icon: Home,
    },
    {
      href: "/generer",
      label: "Générer",
      icon: ClipboardList,
    },
    {
      href: "/mes-pti",
      label: "Mes PTI",
      icon: BookOpen,
    },
    {
      href: "/quiz",
      label: "Quiz",
      icon: Brain,
    },
    {
      href: "/ressources",
      label: "Ressources",
      icon: BookOpen,
    },
    {
      href: "/premium",
      label: "Premium",
      icon: Crown,
    },
    {
      href: "/installer",
      label: "Installer",
      icon: Smartphone,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100/60 bg-[#fbf8fd]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden square with very rounded corners-[18px] bg-transparent">
            <img
              src="/icon-32.png"
              alt="Repère PTI"
              className="h-[125%] w-[125%] max-w-none object-cover"
            />
          </div>

          <div className="text-left">
            <p className="text-base font-black leading-4 tracking-tight text-slate-950">
              Repère PTI
            </p>
            <p className="text-xs font-medium text-slate-400">
              Outil éducatif
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-violet-100/70 bg-white/55 px-2 py-2 shadow-sm backdrop-blur md:flex">
          <a
            href="/generer"
            className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-600 transition hover:bg-violet-50 hover:text-violet-800"
          >
            Générer
          </a>

          <a
            href="/mes-pti"
            className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-600 transition hover:bg-violet-50 hover:text-violet-800"
          >
            Mes PTI
          </a>

          <a
            href="/quiz"
            className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-600 transition hover:bg-violet-50 hover:text-violet-800"
          >
            Quiz
          </a>

          <a
            href="/ressources"
            className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-600 transition hover:bg-violet-50 hover:text-violet-800"
          >
            Ressources
          </a>

          <a
            href="/premium"
            className="rounded-full px-4 py-2 text-sm font-extrabold text-violet-800 transition hover:bg-violet-50"
          >
            Premium
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {connecte ? (
            <>
              <a
                href="/dashboard"
                className="rounded-full bg-violet-100 px-5 py-2.5 text-sm font-extrabold text-violet-800 transition hover:-translate-y-0.5 hover:bg-violet-200"
              >
                Tableau de bord
              </a>

              <button
                onClick={deconnexion}
                className="rounded-full border border-violet-100 bg-white/65 px-5 py-2.5 text-sm font-extrabold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-50 hover:text-violet-800"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="rounded-full bg-violet-800 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900"
            >
              Connexion
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50/80 text-violet-800 shadow-sm transition hover:bg-violet-100 md:hidden"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOuvert ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {menuOuvert && (
        <div className="border-t border-violet-100/70 bg-[#fbf8fd]/95 px-4 pb-5 pt-3 shadow-xl backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl space-y-2">
            {connecte && (
              <a
                href="/dashboard"
                onClick={() => setMenuOuvert(false)}
                className="flex items-center gap-3 rounded-2xl bg-violet-800 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-100"
              >
                <LayoutDashboard className="h-5 w-5" />
                Tableau de bord
              </a>
            )}

            {liens.map((lien) => {
              const Icon = lien.icon;

              return (
                <a
                  key={lien.href}
                  href={lien.href}
                  onClick={() => setMenuOuvert(false)}
                  className="flex items-center gap-3 rounded-2xl border border-violet-100/70 bg-white/60 px-4 py-3 text-sm font-extrabold text-slate-700 shadow-sm transition hover:bg-violet-50 hover:text-violet-800"
                >
                  <Icon className="h-5 w-5 text-violet-800" />
                  {lien.label}
                </a>
              );
            })}

            <div className="pt-2">
              {connecte ? (
                <button
                  onClick={deconnexion}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-extrabold text-red-600 transition hover:bg-red-100"
                >
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </button>
              ) : (
                <a
                  href="/login"
                  onClick={() => setMenuOuvert(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-800 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-900"
                >
                  <LogIn className="h-5 w-5" />
                  Connexion / Créer un compte
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}