export default function SepsisPage() {
  return (
    <main className="min-h-screen bg-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <a href="/ressources" className="text-sm font-semibold text-violet-600">
          ← Retour aux ressources
        </a>

        <h1 className="mt-4 text-5xl font-bold">🦠 Sepsis</h1>

        <p className="mt-4 text-lg text-slate-600">
          Aide-mémoire clinique rapide pour reconnaître les signes d’alarme et les priorités infirmières.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Signes et symptômes possibles</h2>

            <ul className="mt-4 space-y-2">
              <li>• Fièvre ou hypothermie</li>
              <li>• Tachycardie</li>
              <li>• Tachypnée</li>
              <li>• Hypotension</li>
              <li>• Confusion ou altération de l’état de conscience</li>
              <li>• Frissons, faiblesse importante</li>
              <li>• Diminution du débit urinaire</li>
              <li>• Peau marbrée, froide ou moite</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Surveillances infirmières</h2>

            <ul className="mt-4 space-y-2">
              <li>• Signes vitaux fréquents</li>
              <li>• Pression artérielle et fréquence cardiaque</li>
              <li>• Saturation en oxygène</li>
              <li>• Température</li>
              <li>• État neurologique</li>
              <li>• Diurèse</li>
              <li>• Douleur et état général</li>
              <li>• Résultats de laboratoire selon prescription</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Interventions infirmières</h2>

            <ul className="mt-4 space-y-2">
              <li>• Aviser rapidement l’équipe médicale si suspicion de sepsis</li>
              <li>• Installer une surveillance rapprochée</li>
              <li>• Administrer l’oxygène selon ordonnance</li>
              <li>• Préparer/administrer les antibiotiques selon ordonnance</li>
              <li>• Surveiller la réponse aux liquides IV selon ordonnance</li>
              <li>• Documenter l’évolution clinique</li>
              <li>• Réévaluer fréquemment l’état du patient</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Éléments à communiquer</h2>

            <ul className="mt-4 space-y-2">
              <li>• Changement récent de l’état général</li>
              <li>• Source infectieuse possible</li>
              <li>• Signes vitaux anormaux</li>
              <li>• Altération de l’état de conscience</li>
              <li>• Diminution de la diurèse</li>
              <li>• Réponse aux interventions déjà effectuées</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-2xl font-bold text-red-700">🚨 Quand aviser rapidement</h2>

            <ul className="mt-4 space-y-2">
              <li>• Hypotension</li>
              <li>• Confusion soudaine</li>
              <li>• Détresse respiratoire</li>
              <li>• Diurèse diminuée</li>
              <li>• Fièvre élevée avec détérioration</li>
              <li>• Patient qui “ne semble pas bien” malgré peu de signes évidents</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}