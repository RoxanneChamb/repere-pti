export default function DiabetePage() {
  return (
    <main className="min-h-screen bg-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <a
          href="/ressources"
          className="text-sm font-semibold text-violet-600"
        >
          ← Retour aux ressources
        </a>

        <h1 className="mt-4 text-5xl font-bold">
          🍬 Diabète
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Aide-mémoire clinique rapide pour les étudiantes en soins infirmiers.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Signes d'hypoglycémie
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Diaphorèse</li>
              <li>• Tremblements</li>
              <li>• Palpitations</li>
              <li>• Faim soudaine</li>
              <li>• Confusion</li>
              <li>• Irritabilité</li>
              <li>• Altération de l'état de conscience</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Signes d'hyperglycémie
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Polyurie</li>
              <li>• Polydipsie</li>
              <li>• Polyphagie</li>
              <li>• Vision trouble</li>
              <li>• Fatigue</li>
              <li>• Déshydratation</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Surveillances infirmières
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Glycémies capillaires</li>
              <li>• Signes d'hypoglycémie</li>
              <li>• Signes d'hyperglycémie</li>
              <li>• Apport alimentaire</li>
              <li>• Hydratation</li>
              <li>• État neurologique</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Interventions infirmières
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Administrer l'insuline selon ordonnance</li>
              <li>• Vérifier la glycémie avant l'administration</li>
              <li>• Traiter rapidement l'hypoglycémie</li>
              <li>• Encourager l'hydratation</li>
              <li>• Assurer une alimentation adéquate</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Enseignement au patient
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Autosurveillance glycémique</li>
              <li>• Reconnaître les signes d'hypoglycémie</li>
              <li>• Reconnaître les signes d'hyperglycémie</li>
              <li>• Importance de l'alimentation</li>
              <li>• Importance de l'activité physique</li>
              <li>• Adhésion au traitement</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}