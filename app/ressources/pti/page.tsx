export default function PTIPage() {
  return (
    <main className="min-h-screen bg-white p-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <a
          href="/ressources"
          className="text-sm font-semibold text-violet-600"
        >
          ← Retour aux ressources
        </a>

        <h1 className="mt-4 text-5xl font-bold">
          📋 PTI et raisonnement clinique
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Guide rapide pour construire un Plan thérapeutique infirmier (PTI)
          pertinent et centré sur les priorités du patient.
        </p>

        <div className="mt-10 space-y-8">

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              1. Commencer par l'évaluation
            </h2>

            <p className="mt-4">
              Le PTI découle directement des données recueillies lors de
              l'évaluation infirmière.
            </p>

            <ul className="mt-4 space-y-2">
              <li>• Signes et symptômes</li>
              <li>• Résultats d'examens</li>
              <li>• Antécédents</li>
              <li>• Données subjectives</li>
              <li>• Données objectives</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              2. Identifier les priorités
            </h2>

            <p className="mt-4">
              Toutes les données ne sont pas prioritaires.
              L'infirmière doit déterminer ce qui menace le plus la santé ou la
              sécurité du patient.
            </p>

            <ul className="mt-4 space-y-2">
              <li>• Airway (voies respiratoires)</li>
              <li>• Breathing (respiration)</li>
              <li>• Circulation</li>
              <li>• Sécurité</li>
              <li>• Douleur</li>
              <li>• Risque de détérioration</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              3. Formuler le constat infirmier
            </h2>

            <p className="mt-4">
              Le constat doit être précis, observable et lié à la situation du
              patient.
            </p>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              Exemple :
              <br />
              <strong>
                Altération des échanges gazeux se manifestant par une SpO₂ à
                88 %, dyspnée et utilisation des muscles accessoires.
              </strong>
            </div>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              4. Déterminer les interventions
            </h2>

            <p className="mt-4">
              Les interventions doivent répondre directement au problème
              identifié.
            </p>

            <ul className="mt-4 space-y-2">
              <li>• Surveiller</li>
              <li>• Administrer</li>
              <li>• Enseigner</li>
              <li>• Soutenir</li>
              <li>• Collaborer</li>
              <li>• Réévaluer</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Exemple de raisonnement clinique
            </h2>

            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <strong>Données :</strong>
                <br />
                Dyspnée, crépitants, SpO₂ 88 %, œdèmes MI.
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <strong>Analyse :</strong>
                <br />
                Signes compatibles avec une surcharge liquidienne et une
                altération des échanges gazeux.
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <strong>Priorité :</strong>
                <br />
                Respiration.
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <strong>PTI :</strong>
                <br />
                Surveiller la saturation, administrer l'oxygène selon
                ordonnance, surveiller les signes respiratoires et l'efficacité
                du traitement.
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
            <h2 className="text-2xl font-bold">
              💡 Astuce examen et stage
            </h2>

            <p className="mt-4">
              Avant d'écrire un PTI, pose-toi toujours la question :
            </p>

            <div className="mt-4 rounded-2xl bg-white p-4 text-lg font-bold">
              « Quel est le problème le plus urgent pour ce patient
              actuellement ? »
            </div>

            <p className="mt-4">
              La réponse te permettra souvent d'identifier la priorité
              principale du PTI.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}