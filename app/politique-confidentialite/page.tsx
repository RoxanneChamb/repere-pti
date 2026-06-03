export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-white/85 p-10 shadow-xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <h1 className="mt-6 text-5xl font-extrabold">
          Politique de confidentialité
        </h1>

        <p className="mt-6 text-slate-600">
          Dernière mise à jour : Juin 2026
        </p>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">Données recueillies</h2>
            <p className="mt-3 text-slate-600">
              Repère PTI peut recueillir certaines informations nécessaires au
              fonctionnement de la plateforme, notamment l'adresse courriel, les
              PTI enregistrés, les résultats de quiz et certaines statistiques
              d'utilisation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Confidentialité des patients</h2>
            <p className="mt-3 text-slate-600">
              Les utilisateurs ne doivent jamais inscrire le nom d'un patient,
              sa date de naissance ou toute autre information permettant son
              identification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Utilisation des données</h2>
            <p className="mt-3 text-slate-600">
              Les données sont utilisées pour permettre l'accès au compte, la
              sauvegarde des PTI, le suivi de progression et l'amélioration de
              l'expérience utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Analyse de l'utilisation</h2>
            <p className="mt-3 text-slate-600">
              Repère PTI peut utiliser des outils d'analyse, comme Google
              Analytics, afin de comprendre l'utilisation générale de la
              plateforme et d'améliorer ses fonctionnalités.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Suppression des données</h2>
            <p className="mt-3 text-slate-600">
              Les utilisateurs peuvent demander la suppression de leur compte et
              de leurs données en communiquant avec l'administrateur de la
              plateforme.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}