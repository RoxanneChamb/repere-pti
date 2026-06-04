import {
  AlertTriangle,
  Brain,
  CheckCircle,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white px-4 py-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <section className="mt-8 rounded-[32px] bg-white/85 p-6 shadow-xl backdrop-blur md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700 md:text-sm">
            <Sparkles className="h-4 w-4" />
            Outil éducatif en soins infirmiers
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            À propos de{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Repère PTI
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Repère PTI est un outil éducatif conçu pour soutenir le
            raisonnement clinique, l’organisation des données et la
            structuration d’un plan thérapeutique infirmier dans un contexte
            d’apprentissage.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100">
                <Stethoscope className="h-6 w-6 text-violet-600" />
              </div>

              <p className="mt-4 font-bold">Pensé pour les stages</p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Aide à structurer les situations cliniques rencontrées en
                apprentissage.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100">
                <Brain className="h-6 w-6 text-pink-600" />
              </div>

              <p className="mt-4 font-bold">Raisonnement clinique</p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Encourage la réflexion sur les priorités, les risques et la
                surveillance.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-fuchsia-50 to-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-100">
                <GraduationCap className="h-6 w-6 text-fuchsia-600" />
              </div>

              <p className="mt-4 font-bold">Usage pédagogique</p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Conçu pour soutenir l’étude, la préparation et la révision.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-5">
          <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
                <CheckCircle className="h-6 w-6 text-violet-600" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">
                  Objectif de l’outil
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  L’application aide à organiser les données cliniques, à
                  identifier des constats possibles, à réfléchir aux priorités
                  de soins, aux surveillances infirmières et aux interventions
                  pertinentes dans une démarche éducative.
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Elle vise à soutenir l’apprentissage du raisonnement clinique,
                  sans remplacer l’évaluation infirmière ni les décisions prises
                  dans un contexte réel de soins.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100">
                <AlertTriangle className="h-6 w-6 text-amber-700" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-amber-900">
                  Divulgation importante
                </h2>

                <p className="mt-4 leading-7 text-amber-900">
                  Repère PTI utilise l’intelligence artificielle. Les réponses
                  générées peuvent contenir des erreurs, des omissions ou des
                  informations incomplètes.
                </p>

                <p className="mt-4 leading-7 text-amber-900">
                  L’outil ne remplace jamais le jugement clinique, l’évaluation
                  infirmière, les politiques locales, les protocoles de votre
                  milieu ni la supervision d’une personne qualifiée.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100">
                <ShieldCheck className="h-6 w-6 text-pink-600" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">
                  À utiliser avec prudence
                </h2>

                <div className="mt-5 grid gap-3">
                  {[
                    "Toujours valider les informations importantes.",
                    "Vérifier les protocoles et politiques de votre établissement.",
                    "Ne jamais utiliser l’outil comme seule source de décision clinique.",
                    "Consulter une personne enseignante, préceptrice ou professionnelle qualifiée en cas de doute.",
                    "Ne pas entrer d’informations nominatives ou permettant d’identifier un patient.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg md:p-8">
            <h2 className="text-2xl font-extrabold">Utilisation prévue</h2>

            <p className="mt-4 leading-7 text-slate-600">
              Repère PTI est destiné à un usage pédagogique. Il vise à soutenir
              l’apprentissage, la réflexion clinique et la préparation aux
              stages ou aux études en soins infirmiers.
            </p>

            <div className="mt-6 rounded-3xl bg-gradient-to-r from-violet-50 to-pink-50 p-5">
              <p className="font-bold text-violet-700">
                Important : anonymisation des situations
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Les utilisateurs ne doivent jamais inscrire de nom, date de
                naissance, numéro de dossier, adresse ou toute autre information
                permettant d’identifier une personne.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/generer"
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-pink-200 sm:w-auto"
          >
            Générer un PTI
          </a>

          <a
            href="/ressources"
            className="w-full rounded-2xl bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 sm:w-auto"
          >
            Voir les ressources
          </a>

          <a
            href="/contact"
            className="w-full rounded-2xl bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 sm:w-auto"
          >
            Contact
          </a>
        </div>
      </div>
    </main>
  );
}