"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  WandSparkles,
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
      href: "/corriger",
      label: "Corriger",
      icon: WandSparkles,
      premium: true,
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
      special: true,
    },
    {
      href: "/installer",
      label: "Installer",
      icon: Smartphone,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100/70 bg-[#fbf8fd]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setMenuOuvert(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[18px] shadow-lg shadow-violet-100 ring-1 ring-violet-100/70">
            <img
              src="/icon-192.png"
              alt="Repère PTI"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="text-left">
            <p className="text-base font-black tracking-tight text-slate-950">
              Repère PTI
            </p>
            <p className="text-xs font-medium text-slate-400">
              Outil éducatif
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/80 bg-white/70 p-1 shadow-sm backdrop-blur md:flex">
          {liens.slice(0, 7).map((lien) => {
            const Icon = lien.icon;

            return (
              <Link
                key={lien.href}
                href={lien.href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                  lien.special
                    ? "bg-violet-800 text-white shadow-sm hover:bg-violet-900"
                    : lien.premium
                    ? "text-violet-800 hover:bg-violet-50"
                    : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {lien.label}
                {lien.premium && <span className="text-xs">⭐</span>}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {connecte ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-sm font-extrabold text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <LayoutDashboard className="h-4 w-4" />
                Tableau
              </Link>

              <button
                onClick={deconnexion}
                className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white/70 px-4 py-2 text-sm font-extrabold text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-red-500 hover:shadow-md"
              >
                <LogOut className="h-4 w-4" />
                Quitter
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-5 py-2.5 text-sm font-extrabold text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              <LogIn className="h-4 w-4" />
              Connexion
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-white/80 text-violet-800 shadow-sm transition hover:bg-white md:hidden"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOuvert ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOuvert && (
        <div className="border-t border-violet-100/70 bg-[#fbf8fd]/95 px-4 pb-5 pt-2 shadow-lg backdrop-blur-xl md:hidden">
          <nav className="mx-auto grid max-w-6xl gap-2">
            {liens.map((lien) => {
              const Icon = lien.icon;

              return (
                <Link
                  key={lien.href}
                  href={lien.href}
                  onClick={() => setMenuOuvert(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-extrabold shadow-sm transition ${
                    lien.special
                      ? "bg-violet-800 text-white"
                      : lien.premium
                      ? "border border-violet-100 bg-white text-violet-800"
                      : "border border-white/80 bg-white/75 text-slate-600 hover:bg-white hover:text-violet-700"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {lien.label}
                  </span>

                  {lien.premium && (
                    <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-black text-violet-800">
                      Premium
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-violet-100 pt-3">
              {connecte ? (
                <div className="grid gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOuvert(false)}
                    className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3 text-sm font-extrabold text-violet-800 shadow-sm"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Tableau de bord
                  </Link>

                  <button
                    onClick={deconnexion}
                    className="flex items-center gap-3 rounded-2xl border border-red-100 bg-white px-4 py-3 text-left text-sm font-extrabold text-red-500 shadow-sm"
                  >
                    <LogOut className="h-5 w-5" />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOuvert(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-violet-800 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-200"
                >
                  <LogIn className="h-5 w-5" />
                  Connexion
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}