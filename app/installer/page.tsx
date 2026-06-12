import Navbar from "@/components/Navbar";
import {
  Apple,
  Smartphone,
  Share,
  PlusSquare,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function InstallerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-14">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <div className="mt-8 rounded-[32px] bg-white/85 p-6 shadow-xl backdrop-blur md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700 md:text-sm">
            <Smartphone className="h-4 w-4" />
            Installer Repère PTI sur ton téléphone
          </div>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                Ajoute Repère PTI comme une{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                  app
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                Tu peux ajouter Repère PTI à l’écran d’accueil de ton téléphone.
                L’icône apparaîtra comme une application, sans passer par l’App
                Store.
              </p>
            </div>

            <div className="mx-auto flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[28px] bg-white shadow-xl shadow-pink-200 md:h-36 md:w-36 md:rounded-[34px]">
              <img
                src="/icon-512.png"
                alt="Icône Repère PTI"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <section className="rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                <Apple className="h-6 w-6 text-violet-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-violet-600">iPhone</p>
                <h2 className="text-2xl font-extrabold">Avec Safari</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-violet-50 p-4">
                <p className="font-bold">1. Ouvre Safari</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Va sur le site :
                </p>
                <p className="mt-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-violet-700">
                  repere-pti.ca
                </p>
              </div>

              <div className="rounded-3xl bg-pink-50 p-4">
                <p className="flex items-center gap-2 font-bold">
                  <Share className="h-4 w-4 text-pink-600" />
                  2. Appuie sur Partager
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  C’est le bouton carré avec une flèche vers le haut, en bas de
                  l’écran.
                </p>
              </div>

              <div className="rounded-3xl bg-violet-50 p-4">
                <p className="flex items-center gap-2 font-bold">
                  <PlusSquare className="h-4 w-4 text-violet-600" />
                  3. Choisis “Ajouter à l’écran d’accueil”
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Puis appuie sur “Ajouter”. Repère PTI apparaîtra comme une app
                  sur ton iPhone.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100">
                <Smartphone className="h-6 w-6 text-pink-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-pink-600">Android</p>
                <h2 className="text-2xl font-extrabold">Avec Chrome</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-pink-50 p-4">
                <p className="font-bold">1. Ouvre Chrome</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Va sur le site :
                </p>
                <p className="mt-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-pink-700">
                  repere-pti.ca
                </p>
              </div>

              <div className="rounded-3xl bg-violet-50 p-4">
                <p className="font-bold">2. Appuie sur le menu ⋮</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Le menu se trouve généralement en haut à droite de l’écran.
                </p>
              </div>

              <div className="rounded-3xl bg-pink-50 p-4">
                <p className="font-bold">
                  3. Choisis “Ajouter à l’écran d’accueil”
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Confirme l’ajout. Repère PTI apparaîtra ensuite comme une app.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[32px] bg-white/85 p-6 shadow-lg md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-violet-700">
                <Sparkles className="h-4 w-4" />
                Pourquoi l’ajouter à ton écran d’accueil ?
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Repère PTI devient plus rapide d’accès
              </h2>
            </div>

            <a
              href="/generer"
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-pink-200 md:w-auto"
            >
              Essayer Repère PTI
            </a>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "Accès rapide depuis l’écran d’accueil.",
              "Expérience proche d’une vraie application.",
              "Pratique pour les stages, les révisions et les quiz.",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-3xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          Repère PTI est un outil éducatif. Il ne remplace pas le jugement
          clinique, les politiques locales ou la supervision d’une personne
          qualifiée.
        </p>
      </section>
    </main>
  );
}