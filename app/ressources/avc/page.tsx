export default function MPOCPage() {
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
          🫁 MPOC
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Aide-mémoire clinique rapide pour les étudiantes en soins infirmiers.
        </p>

        <div className="mt-10 space-y-8">

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Signes et symptômes
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Dyspnée</li>
              <li>• Toux chronique</li>
              <li>• Expectoration</li>
              <li>• Respiration sifflante (wheezing)</li>
              <li>• Utilisation des muscles accessoires</li>
              <li>• Diminution de la tolérance à l'effort</li>
              <li>• Cyanose (cas sévères)</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Surveillances infirmières
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Saturation en oxygène (SpO₂)</li>
              <li>• Fréquence respiratoire</li>
              <li>• Travail respiratoire</li>
              <li>• Auscultation pulmonaire</li>
              <li>• Quantité et aspect des sécrétions</li>
              <li>• Niveau de conscience</li>
              <li>• Tolérance aux activités</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Interventions infirmières
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Position semi-Fowler ou Fowler</li>
              <li>• Administrer l'oxygène selon ordonnance</li>
              <li>• Encourager la respiration à lèvres pincées</li>
              <li>• Administrer les bronchodilatateurs prescrits</li>
              <li>• Favoriser l'hydratation si approprié</li>
              <li>• Encourager la mobilisation progressive</li>
              <li>• Surveiller la réponse au traitement</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Enseignement au patient
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Cessation tabagique</li>
              <li>• Utilisation correcte des inhalateurs</li>
              <li>• Techniques respiratoires</li>
              <li>• Reconnaître les signes d'exacerbation</li>
              <li>• Importance de l'activité physique adaptée</li>
              <li>• Vaccination (influenza, pneumocoque)</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
            <h2 className="text-2xl font-bold">
              🚨 Quand aviser rapidement
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Détresse respiratoire</li>
              <li>• Saturation qui diminue malgré l'oxygène</li>
              <li>• Confusion ou altération de l'état de conscience</li>
              <li>• Cyanose</li>
              <li>• Augmentation importante du travail respiratoire</li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}