import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Activity,
  Brain,
  ClipboardList,
  Droplets,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Wind,
} from "lucide-react";

const sections = [
  {
    title: "Signes et symptômes possibles",
    icon: Activity,
    items: [
      "Fièvre ou hypothermie",
      "Tachycardie",
      "Tachypnée",
      "Hypotension",
      "Confusion ou altération de l’état de conscience",
      "Frissons ou faiblesse importante",
      "Diminution du débit urinaire",
      "Peau marbrée, froide ou moite",
    ],
  },
  {
    title: "Surveillances infirmières",
    icon: ClipboardList,
    items: [
      "Signes vitaux fréquents",
      "Pression artérielle et fréquence cardiaque",
      "Saturation en oxygène",
      "Température",
      "État neurologique",
      "Diurèse",
      "Douleur et état général",
      "Résultats de laboratoire selon prescription",
    ],
  },
  {
    title: "Interventions infirmières",
    icon: Stethoscope,
    items: [
      "Aviser rapidement l’équipe médicale si suspicion de sepsis",
      "Installer une surveillance rapprochée selon le contexte",
      "Administrer l’oxygène selon l’ordonnance",
      "Préparer ou administrer les antibiotiques selon l’ordonnance",
      "Surveiller la réponse aux liquides IV selon l’ordonnance",
      "Documenter l’évolution clinique",
      "Réévaluer fréquemment l’état du patient",
    ],
  },
  {
    title: "Éléments à communiquer",
    icon: Brain,
    items: [
      "Changement récent de l’état général",
      "Source infectieuse possible",
      "Signes vitaux anormaux",
      "Altération de l’état de conscience",
      "Diminution de la diurèse",
      "Réponse aux interventions déjà effectuées",
    ],
  },
];

export default function SepsisPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">
              <AlertTriangle className="h-4 w-4" />
              Aide-mémoire clinique
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Sepsis
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-red-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Aide-mémoire rapide pour reconnaître les signes d’alarme, cibler
              les surveillances prioritaires et communiquer efficacement une
              détérioration clinique possible.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-red-50 p-4">
                <HeartPulse className="h-6 w-6 text-red-700" />
                <p className="mt-3 text-sm font-black text-red-800">
                  Priorité
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Reconnaître rapidement.
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4">
                <Thermometer className="h-6 w-6 text-red-700" />
                <p className="mt-3 text-sm font-black text-red-800">
                  À surveiller
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  SV, état neuro, diurèse.
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4">
                <Wind className="h-6 w-6 text-red-700" />
                <p className="mt-3 text-sm font-black text-red-800">
                  But clinique
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Prévenir la détérioration.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-600 text-white shadow-lg shadow-red-100">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Point clé
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Le sepsis peut évoluer rapidement. Une détérioration de l’état
              général, une hypotension, une confusion nouvelle, une tachypnée ou
              une diminution de la diurèse doivent être prises au sérieux et
              communiquées rapidement.
            </p>

            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-red-50 via-white to-pink-50 p-5">
              <p className="flex items-start gap-2 text-sm font-extrabold text-red-800">
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
                className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-100"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700">
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
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-[36px] border border-red-100 bg-red-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">
                À aviser rapidement
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Signes de détérioration possible
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ces éléments nécessitent une évaluation rapide selon le contexte
                clinique et les protocoles du milieu.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Hypotension",
              "Confusion soudaine",
              "Détresse respiratoire",
              "Diurèse diminuée",
              "Fièvre élevée avec détérioration",
              "Patient qui « ne semble pas bien » malgré peu de signes évidents",
              "Peau marbrée, froide ou moite",
              "Tachycardie ou tachypnée persistante",
              "Altération rapide de l’état général",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-red-100 bg-white/75 p-4 text-sm font-bold leading-6 text-red-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-amber-100 bg-amber-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Droplets className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                À ne pas oublier
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                La diurèse est une donnée importante
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Une diminution du débit urinaire peut être un signe de
                détérioration clinique. Elle doit être surveillée et communiquée
                selon le contexte, surtout si elle s’accompagne d’hypotension,
                de confusion ou d’un état général qui se détériore.
              </p>
            </div>
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