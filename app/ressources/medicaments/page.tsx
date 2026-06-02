export default function MedicamentsPage() {
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
          💊 Administration sécuritaire des médicaments
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Aide-mémoire clinique pour une administration sécuritaire et une surveillance adéquate des médicaments.
        </p>

        <div className="mt-10 space-y-8">

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Les 10 bons
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Bon patient</li>
              <li>• Bon médicament</li>
              <li>• Bonne dose</li>
              <li>• Bonne voie</li>
              <li>• Bon moment</li>
              <li>• Bonne documentation</li>
              <li>• Bonne raison</li>
              <li>• Bonne réponse</li>
              <li>• Bonne éducation</li>
              <li>• Droit de refus du patient</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Avant l'administration
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Vérifier l'ordonnance</li>
              <li>• Vérifier les allergies</li>
              <li>• Valider l'identité du patient</li>
              <li>• Consulter les paramètres requis</li>
              <li>• Vérifier les résultats de laboratoire pertinents</li>
              <li>• Préparer le médicament sans interruption</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Pendant l'administration
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Respecter la technique aseptique</li>
              <li>• Expliquer le médicament au patient</li>
              <li>• Respecter la voie prescrite</li>
              <li>• Observer immédiatement toute réaction</li>
              <li>• Administrer selon les protocoles en vigueur</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Surveillance après l'administration
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Vérifier l'efficacité du traitement</li>
              <li>• Surveiller les effets secondaires</li>
              <li>• Surveiller les effets indésirables</li>
              <li>• Réévaluer l'état clinique du patient</li>
              <li>• Documenter les observations pertinentes</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Paramètres fréquemment vérifiés
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Tension artérielle (antihypertenseurs)</li>
              <li>• Fréquence cardiaque (bêtabloquants, digoxine)</li>
              <li>• Glycémie (insuline)</li>
              <li>• Saturation (certains traitements respiratoires)</li>
              <li>• Douleur (analgésiques)</li>
              <li>• INR ou coagulation (anticoagulants)</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-2xl font-bold">
              ⚠️ Médicaments à haut risque
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Insuline</li>
              <li>• Héparine</li>
              <li>• Opioïdes</li>
              <li>• Électrolytes concentrés</li>
              <li>• Anticoagulants</li>
              <li>• Chimiothérapie</li>
            </ul>

            <p className="mt-4">
              Ces médicaments nécessitent une vigilance accrue et le respect des politiques locales.
            </p>
          </section>

          <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
            <h2 className="text-2xl font-bold">
              💡 Astuce examen et stage
            </h2>

            <div className="mt-4 rounded-2xl bg-white p-4 text-lg font-bold">
              Avant d'administrer un médicament, demande-toi :
              « Quels paramètres dois-je vérifier avant, pendant et après ? »
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}