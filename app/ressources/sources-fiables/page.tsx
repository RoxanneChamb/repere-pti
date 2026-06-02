export default function SourcesFiablesPage() {
  return (
    <main className="min-h-screen bg-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <a href="/ressources" className="text-sm font-semibold text-violet-600">
          ← Retour aux ressources
        </a>

        <h1 className="mt-4 text-5xl font-bold">📚 Sources fiables</h1>

        <p className="mt-4 text-lg text-slate-600">
          Références professionnelles et organismes reconnus pour valider les informations cliniques.
        </p>

        <div className="mt-10 space-y-4">
          {[
            ["OIIQ", "Ordre des infirmières et infirmiers du Québec", "https://www.oiiq.org"],
            ["INESSS", "Institut national d’excellence en santé et services sociaux", "https://www.inesss.qc.ca"],
            ["MSSS", "Ministère de la Santé et des Services sociaux", "https://www.msss.gouv.qc.ca"],
            ["INSPQ", "Institut national de santé publique du Québec", "https://www.inspq.qc.ca"],
            ["CDC", "Centers for Disease Control and Prevention", "https://www.cdc.gov"],
          ].map(([nom, description, url]) => (
            <a
              key={nom}
              href={url}
              target="_blank"
              className="block rounded-3xl border p-6 shadow-sm hover:bg-slate-50"
            >
              <h2 className="text-xl font-bold">{nom}</h2>
              <p className="mt-2 text-slate-600">{description}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}