export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <h1 className="mt-4 text-5xl font-bold">À propos</h1>

        <p className="mt-4 text-lg text-slate-600">
          Repère PTI est un outil éducatif conçu pour soutenir le raisonnement
          clinique et la structuration d’un plan thérapeutique infirmier.
        </p>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Objectif de l’outil</h2>
            <p className="mt-4 text-slate-600">
              L’application aide à organiser les données cliniques, identifier
              des priorités possibles, réfléchir aux surveillances infirmières
              et structurer une démarche de soins.
            </p>
          </section>

          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-2xl font-bold text-amber-800">
              ⚠️ Divulgation importante
            </h2>

            <p className="mt-4 text-amber-900">
              Repère PTI utilise l’intelligence artificielle. Les réponses
              générées peuvent contenir des erreurs, des omissions ou des
              informations incomplètes.
            </p>

            <p className="mt-4 text-amber-900">
              L’outil ne remplace jamais le jugement clinique, l’évaluation
              infirmière, les politiques locales, les protocoles de votre milieu
              ni la supervision d’une personne qualifiée.
            </p>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">À utiliser avec prudence</h2>

            <ul className="mt-4 space-y-2 text-slate-600">
              <li>• Toujours valider les informations importantes.</li>
              <li>• Vérifier les protocoles et politiques de votre établissement.</li>
              <li>• Ne jamais utiliser l’outil comme seule source de décision clinique.</li>
              <li>• Consulter une personne enseignante, préceptrice ou professionnelle qualifiée en cas de doute.</li>
              <li>• Ne pas entrer d’informations nominatives ou permettant d’identifier un patient.</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Utilisation prévue</h2>

            <p className="mt-4 text-slate-600">
              Repère PTI est destiné à un usage pédagogique. Il vise à soutenir
              l’apprentissage, la réflexion clinique et la préparation aux stages
              ou aux études en soins infirmiers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}