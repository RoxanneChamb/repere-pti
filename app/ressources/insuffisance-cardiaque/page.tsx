export default function InsuffisanceCardiaquePage() {
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
          ❤️ Insuffisance cardiaque
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
              <li>• Orthopnée</li>
              <li>• Crépitants pulmonaires</li>
              <li>• Œdèmes périphériques</li>
              <li>• Gain de poids rapide</li>
              <li>• Fatigue</li>
              <li>• Diminution de la tolérance à l'effort</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Surveillances infirmières
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Saturation en oxygène</li>
              <li>• Fréquence respiratoire</li>
              <li>• Auscultation pulmonaire</li>
              <li>• Bilan ingesta/excreta</li>
              <li>• Poids quotidien</li>
              <li>• Présence d'œdèmes</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Interventions infirmières
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Position semi-Fowler</li>
              <li>• Administrer l'oxygène selon ordonnance</li>
              <li>• Surveiller la réponse aux diurétiques</li>
              <li>• Limiter les efforts excessifs</li>
              <li>• Encourager le repos</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Enseignement au patient
            </h2>

            <ul className="mt-4 space-y-2">
              <li>• Pesée quotidienne</li>
              <li>• Restriction hydrique si prescrite</li>
              <li>• Réduction du sodium</li>
              <li>• Reconnaître les signes de décompensation</li>
              <li>• Adhésion au traitement</li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}