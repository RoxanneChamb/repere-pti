"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Stethoscope,
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
      label: "Générer un PTI",
      icon: ClipboardList,
    },
    {
      href: "/mes-pti",
      label: "Mes PTI",
      icon: BookOpen,
    },
    {
      href: "/quiz",
      label: "Quiz clinique",
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
      label: "Installer l’app",
      icon: Smartphone,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-md shadow-pink-100">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-extrabold leading-4 text-slate-900">
              Repère PTI
            </p>
            <p className="text-xs text-slate-400">Outil éducatif</p>
          </div>
        </a>

        <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
          <a href="/generer" className="hover:text-violet-600">
            Générer
          </a>

          <a href="/mes-pti" className="hover:text-violet-600">
            Mes PTI
          </a>

          <a href="/quiz" className="hover:text-violet-600">
            Quiz
          </a>

          <a href="/ressources" className="hover:text-violet-600">
            Ressources
          </a>

          <a href="/premium" className="hover:text-violet-600">
            Premium
          </a>

          <a href="/installer" className="hover:text-violet-600">
            Installer
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {connecte ? (
            <>
              <a
                href="/dashboard"
                className="rounded-2xl bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 hover:bg-violet-100"
              >
                Tableau de bord
              </a>

              <button
                onClick={deconnexion}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-pink-100"
            >
              Connexion
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 md:hidden"
          aria-label="Ouvrir le menu"
        >
          {menuOuvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOuvert && (
        <div className="border-t border-slate-100 bg-white/95 px-4 pb-5 pt-3 shadow-xl md:hidden">
          <div className="space-y-2">
            {connecte && (
              <a
                href="/dashboard"
                onClick={() => setMenuOuvert(false)}
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-3 text-sm font-bold text-white"
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
                  className="flex items-center gap-3 rounded-2xl bg-violet-50/70 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-violet-100"
                >
                  <Icon className="h-5 w-5 text-violet-600" />
                  {lien.label}
                </a>
              );
            })}

            <div className="pt-2">
              {connecte ? (
                <button
                  onClick={deconnexion}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
                >
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </button>
              ) : (
                <a
                  href="/login"
                  onClick={() => setMenuOuvert(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-3 text-sm font-bold text-white shadow-md shadow-pink-100"
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