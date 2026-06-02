export default function EvaluationCliniquePage() {
  return (
    <main className="min-h-screen bg-white p-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <a href="/ressources" className="text-sm font-semibold text-violet-600">
          ← Retour aux ressources
        </a>

        <h1 className="mt-4 text-5xl font-bold">🩺 Évaluation tête-pieds</h1>

        <p className="mt-4 text-lg text-slate-600">
          Guide structuré pour réaliser une collecte de données et un examen physique complet,
          de la tête aux pieds.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
            <h2 className="text-2xl font-bold">Avant de commencer</h2>
            <ul className="mt-4 space-y-2">
              <li>• Vérifier l'identité du patient</li>
              <li>• Expliquer l'examen et obtenir la collaboration</li>
              <li>• Assurer intimité, confort et sécurité</li>
              <li>• Hygiène des mains</li>
              <li>• Observer l'état général dès l'entrée dans la chambre</li>
              <li>• Comparer avec l'état habituel du patient</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">1. Apparence générale</h2>
            <ul className="mt-4 space-y-2">
              <li>• Niveau de conscience</li>
              <li>• Position dans le lit ou au fauteuil</li>
              <li>• Coloration de la peau</li>
              <li>• Signes de détresse respiratoire ou douleur</li>
              <li>• Mobilité spontanée</li>
              <li>• Présence de cathéters, drains, solutés, oxygène</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">2. Signes vitaux</h2>
            <ul className="mt-4 space-y-2">
              <li>• Température</li>
              <li>• Fréquence cardiaque</li>
              <li>• Fréquence respiratoire</li>
              <li>• Tension artérielle</li>
              <li>• Saturation en oxygène</li>
              <li>• Douleur</li>
              <li>• Glycémie capillaire si pertinente</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">3. Neurologique</h2>
            <ul className="mt-4 space-y-2">
              <li>• Orientation : personne, lieu, temps, situation</li>
              <li>• État de conscience / Glasgow si indiqué</li>
              <li>• Pupilles : taille, égalité, réaction à la lumière</li>
              <li>• Langage : clair, confus, aphasie, dysarthrie</li>
              <li>• Force motrice aux quatre membres</li>
              <li>• Sensibilité</li>
              <li>• Équilibre et démarche si mobilisable</li>
              <li>• Signes d’AVC : visage, bras, parole, temps</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">4. Tête, yeux, oreilles, nez, gorge</h2>
            <ul className="mt-4 space-y-2">
              <li>• Céphalée, étourdissements, vision trouble</li>
              <li>• Muqueuses buccales : hydratation, lésions</li>
              <li>• Déglutition</li>
              <li>• Dentition/prothèses</li>
              <li>• Écoulement nasal ou congestion</li>
              <li>• Audition ou lunettes/appareils auditifs</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">5. Respiratoire</h2>
            <ul className="mt-4 space-y-2">
              <li>• Fréquence et rythme respiratoire</li>
              <li>• Travail respiratoire : tirage, muscles accessoires</li>
              <li>• Dyspnée au repos ou à l'effort</li>
              <li>• Toux : sèche ou productive</li>
              <li>• Expectoration : couleur, quantité, consistance</li>
              <li>• SpO₂ et besoin en oxygène</li>
              <li>• Auscultation : murmure vésiculaire, crépitants, sibilances</li>
              <li>• Douleur thoracique à la respiration</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">6. Cardiovasculaire</h2>
            <ul className="mt-4 space-y-2">
              <li>• Fréquence et rythme cardiaque</li>
              <li>• Tension artérielle</li>
              <li>• Douleur thoracique</li>
              <li>• Coloration, chaleur et perfusion des extrémités</li>
              <li>• Temps de remplissage capillaire</li>
              <li>• Œdèmes : localisation et godet</li>
              <li>• Pouls périphériques</li>
              <li>• Présence de palpitations, étourdissements, fatigue</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">7. Gastro-intestinal</h2>
            <ul className="mt-4 space-y-2">
              <li>• Appétit et tolérance alimentaire</li>
              <li>• Nausées ou vomissements</li>
              <li>• Douleur abdominale</li>
              <li>• Abdomen : souple, distendu, sensible</li>
              <li>• Bruits intestinaux si indiqué</li>
              <li>• Dernière selle</li>
              <li>• Constipation, diarrhée, sang dans les selles</li>
              <li>• Hydratation et apport liquidien</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">8. Génito-urinaire</h2>
            <ul className="mt-4 space-y-2">
              <li>• Diurèse : quantité, fréquence, couleur, odeur</li>
              <li>• Douleur ou brûlure mictionnelle</li>
              <li>• Urgence ou incontinence</li>
              <li>• Rétention urinaire</li>
              <li>• Sonde urinaire : perméabilité, fixation, drainage</li>
              <li>• Bilan ingesta/excreta si prescrit ou pertinent</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">9. Musculosquelettique et mobilité</h2>
            <ul className="mt-4 space-y-2">
              <li>• Force et amplitude des mouvements</li>
              <li>• Douleur à la mobilisation</li>
              <li>• Aide technique : marchette, canne, fauteuil</li>
              <li>• Risque de chute</li>
              <li>• Autonomie aux AVQ</li>
              <li>• Tolérance à l’effort</li>
              <li>• Besoin d’assistance pour transferts</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">10. Peau et intégrité tégumentaire</h2>
            <ul className="mt-4 space-y-2">
              <li>• Couleur, chaleur, humidité</li>
              <li>• Rougeurs, plaies, ecchymoses, lésions</li>
              <li>• Points de pression : sacrum, talons, coudes</li>
              <li>• Pansements : propreté, saturation, écoulement</li>
              <li>• Sites IV : rougeur, douleur, infiltration, phlébite</li>
              <li>• Œdème ou sécheresse cutanée</li>
              <li>• Risque de plaies de pression</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">11. Douleur</h2>
            <ul className="mt-4 space-y-2">
              <li>• Localisation</li>
              <li>• Intensité sur 0 à 10</li>
              <li>• Qualité : brûlure, pression, crampe, élancement</li>
              <li>• Début et durée</li>
              <li>• Facteurs aggravants ou soulageants</li>
              <li>• Effet de la médication</li>
              <li>• Impact sur sommeil, mobilité, respiration ou humeur</li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-2xl font-bold">12. Psychosocial et sécurité</h2>
            <ul className="mt-4 space-y-2">
              <li>• Humeur, anxiété, collaboration</li>
              <li>• Compréhension de la situation</li>
              <li>• Réseau de soutien</li>
              <li>• Risque de chute</li>
              <li>• Capacité à demander de l’aide</li>
              <li>• Besoin d’enseignement</li>
              <li>• Barrières linguistiques ou cognitives</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
            <h2 className="text-2xl font-bold">💡 Astuce de raisonnement clinique</h2>
            <p className="mt-4 text-lg">
              Après l’évaluation, identifie les données anormales, regroupe-les par système,
              puis demande-toi : « Qu’est-ce qui menace le plus la sécurité ou l’état clinique du patient maintenant ? »
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}