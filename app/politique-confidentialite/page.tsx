export default function PolitiqueConfidentialitePage() {
  const sections = [
    {
      titre: "Données recueillies",
      texte:
        "Repère PTI peut recueillir certaines informations nécessaires au fonctionnement de la plateforme, notamment l’adresse courriel, les PTI enregistrés, les résultats de quiz et certaines statistiques d’utilisation.",
    },
    {
      titre: "Confidentialité des patients",
      texte:
        "Les utilisateurs ne doivent jamais inscrire le nom d’un patient, sa date de naissance, son numéro de dossier ou toute autre information permettant son identification.",
    },
    {
      titre: "Utilisation des données",
      texte:
        "Les données sont utilisées pour permettre l’accès au compte, la sauvegarde des PTI, le suivi de progression, l’accès aux fonctionnalités Premium et l’amélioration de l’expérience utilisateur.",
    },
    {
      titre: "Analyse de l’utilisation",
      texte:
        "Repère PTI peut utiliser des outils d’analyse, comme Google Analytics, afin de comprendre l’utilisation générale de la plateforme et d’améliorer ses fonctionnalités.",
    },
    {
      titre: "Paiement et abonnement",
      texte:
        "Les paiements et la gestion des abonnements peuvent être traités par Stripe. Repère PTI ne conserve pas les informations complètes de carte de crédit.",
    },
    {
      titre: "Suppression des données",
      texte:
        "Les utilisateurs peuvent demander la suppression de leur compte et de leurs données à partir de leur tableau de bord ou en communiquant avec l’administrateur de la plateforme.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] px-4 py-8 text-slate-900 md:px-8 md:py-14">
      <section className="relative mx-auto max-w-4xl">
        <div className="pointer-events-none absolute -right-40 top-0 h-[360px] w-[360px] rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-20 h-[320px] w-[320px] rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative z-10 rounded-[36px] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur md:p-10">
          <a
            href="/"
            className="inline-flex text-sm font-bold text-violet-700 transition hover:text-violet-900"
          >
            ← Retour à l'accueil
          </a>

          <div className="mt-6 inline-flex rounded-full border border-violet-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 shadow-sm">
            Confidentialité
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Politique de{" "}
            <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              confidentialité
            </span>
          </h1>

          <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

          <p className="mt-6 text-sm font-medium text-slate-500">
            Dernière mise à jour : Juin 2026
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Cette politique explique quelles informations peuvent être
            recueillies par Repère PTI et comment elles sont utilisées pour
            offrir un outil éducatif sécuritaire et utile.
          </p>

          <div className="mt-9 space-y-4">
            {sections.map((section) => (
              <section
                key={section.titre}
                className="rounded-[28px] border border-white/80 bg-white/75 p-5 shadow-sm"
              >
                <h2 className="text-xl font-extrabold text-slate-950">
                  {section.titre}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                  {section.texte}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] bg-violet-50 p-5">
            <p className="text-sm font-extrabold text-violet-800">
              Rappel important
            </p>

            <p className="mt-2 text-sm leading-6 text-violet-800">
              Repère PTI est un outil éducatif. Aucune information permettant
              d’identifier un patient ne doit être entrée dans la plateforme.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="inline-flex justify-center rounded-2xl bg-violet-800 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-900"
            >
              Aller au tableau de bord
            </a>

            <a
              href="/contact"
              className="inline-flex justify-center rounded-2xl border border-violet-100 bg-white px-6 py-3 text-sm font-extrabold text-violet-800 transition hover:-translate-y-0.5 hover:bg-violet-50"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}