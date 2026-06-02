export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-white/85 p-10 shadow-xl">
        <h1 className="text-5xl font-extrabold">
          Conditions d'utilisation
        </h1>

        <p className="mt-6 text-slate-600">
          Dernière mise à jour : Juin 2026
        </p>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">
              Outil pédagogique
            </h2>

            <p className="mt-3 text-slate-600">
              Repère PTI est un outil éducatif destiné
              à soutenir l'apprentissage du raisonnement
              clinique et la rédaction de PTI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Limitation
            </h2>

            <p className="mt-3 text-slate-600">
              Le contenu généré ne remplace pas
              le jugement clinique, les politiques
              institutionnelles ou les directives
              professionnelles applicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Responsabilité de l'utilisateur
            </h2>

            <p className="mt-3 text-slate-600">
              L'utilisateur demeure responsable
              des informations qu'il saisit dans
              la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Confidentialité
            </h2>

            <p className="mt-3 text-slate-600">
              Aucune information permettant
              l'identification d'un patient
              ne doit être inscrite.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}