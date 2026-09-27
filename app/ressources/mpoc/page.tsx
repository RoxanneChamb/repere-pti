import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Activity,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Wind,
} from "lucide-react";

const sections = [
  {
    title: "Signes et symptômes",
    icon: Activity,
    items: [
      "Dyspnée",
      "Toux chronique",
      "Expectoration",
      "Respiration sifflante (wheezing)",
      "Utilisation des muscles accessoires",
      "Diminution de la tolérance à l’effort",
      "Cyanose dans les cas sévères",
    ],
  },
  {
    title: "Surveillances infirmières",
    icon: ClipboardList,
    items: [
      "Saturation en oxygène (SpO₂)",
      "Fréquence respiratoire",
      "Travail respiratoire",
      "Auscultation pulmonaire",
      "Quantité et aspect des sécrétions",
      "Niveau de conscience",
      "Tolérance aux activités",
    ],
  },
  {
    title: "Interventions infirmières",
    icon: Stethoscope,
    items: [
      "Installer en position semi-Fowler ou Fowler selon tolérance",
      "Administrer l’oxygène selon l’ordonnance et les protocoles du milieu",
      "Encourager la respiration à lèvres pincées",
      "Administrer les bronchodilatateurs prescrits",
      "Favoriser l’hydratation si approprié",
      "Encourager la mobilisation progressive selon tolérance",
      "Surveiller la réponse au traitement",
    ],
  },
  {
    title: "Enseignement au patient",
    icon: GraduationCap,
    items: [
      "Encourager la cessation tabagique",
      "Réviser l’utilisation correcte des inhalateurs",
      "Enseigner les techniques respiratoires",
      "Reconnaître les signes d’exacerbation",
      "Valoriser l’activité physique adaptée",
      "Rappeler l’importance de la vaccination selon les recommandations",
    ],
  },
];

export default function MPOCPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none fixed -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/ressources"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 transition hover:text-violet-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux ressources
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[36px] border border-white/80 bg-white/80 p-7 shadow-xl shadow-violet-100 backdrop-blur md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              <Wind className="h-4 w-4" />
              Aide-mémoire clinique
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              MPOC
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Aide-mémoire rapide pour réviser les signes cliniques, les
              surveillances, les interventions infirmières et l’enseignement au
              patient en contexte de maladie pulmonaire obstructive chronique.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <Wind className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Priorité
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Respiration et oxygénation.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <ClipboardList className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  À surveiller
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  SpO₂, FR, effort respiratoire.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <HeartPulse className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  But clinique
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Prévenir la détérioration.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-800 text-white shadow-lg shadow-violet-100">
              <Stethoscope className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Point clé
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              En MPOC, l’évaluation infirmière vise surtout à repérer rapidement
              les signes de détérioration respiratoire : augmentation de la
              dyspnée, désaturation, fatigue, confusion ou travail respiratoire
              accru.
            </p>

            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5">
              <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                Outil éducatif
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                À valider avec les protocoles du milieu, les ordonnances, les
                politiques locales et les consignes de ton programme.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="text-2xl font-black text-slate-950">
                    {section.title}
                  </h2>
                </div>

                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-slate-600"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-[36px] border border-amber-100 bg-amber-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                À aviser rapidement
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Signes de détérioration
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ces éléments nécessitent une évaluation rapide selon le contexte
                clinique et les protocoles du milieu.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Détresse respiratoire",
              "SpO₂ qui diminue malgré l’oxygène",
              "Confusion ou altération de l’état de conscience",
              "Cyanose",
              "Augmentation importante du travail respiratoire",
              "Fatigue marquée ou épuisement respiratoire",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-100 bg-white/70 p-4 text-sm font-bold leading-6 text-amber-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          Repère PTI est un outil éducatif. Il ne remplace pas le jugement
          clinique, l’évaluation complète, les ordonnances, les protocoles du
          milieu ou l’encadrement professionnel.
        </p>
      </div>
    </main>
  );
}