"use client";

type Props = {
  contenu: string;
};

export default function PTIResultat({ contenu }: Props) {
  const lignes = contenu.split("\n").filter((ligne) => ligne.trim() !== "");

  const renderLigne = (ligne: string, index: number) => {
    const texte = ligne.trim();

    if (texte.startsWith("# ")) {
      return (
        <div key={index} className="mt-9 first:mt-0">
          <div className="rounded-[28px] border border-violet-100 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
              Section
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              {texte.replace("# ", "")}
            </h2>

            <div className="mt-3 h-px w-40 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />
          </div>
        </div>
      );
    }

    if (texte.startsWith("## ")) {
      return (
        <div
          key={index}
          className="mt-7 rounded-[28px] border border-white/80 bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5 shadow-sm"
        >
          <h3 className="text-lg font-black leading-7 text-violet-900 md:text-xl">
            {texte.replace("## ", "")}
          </h3>
        </div>
      );
    }

    if (/^\d+\.\d+/.test(texte)) {
      return (
        <div
          key={index}
          className="mt-4 rounded-2xl border border-violet-100 bg-violet-50 p-4 shadow-sm"
        >
          <p className="text-sm font-extrabold leading-7 text-violet-900 md:text-base">
            {texte}
          </p>
        </div>
      );
    }

    if (/^\d+\.\s/.test(texte)) {
      return (
        <div
          key={index}
          className="mt-5 rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-sm"
        >
          <p className="text-base font-black leading-7 text-slate-950 md:text-lg">
            {texte}
          </p>
        </div>
      );
    }

    if (texte.startsWith("- ")) {
      return (
        <div
          key={index}
          className="mt-2 flex gap-3 rounded-2xl bg-white/55 px-4 py-3"
        >
          <div className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-violet-700" />

          <p className="text-sm leading-7 text-slate-700 md:text-base">
            {texte.replace("- ", "")}
          </p>
        </div>
      );
    }

    if (texte.includes(":")) {
      const [label, ...reste] = texte.split(":");
      const valeur = reste.join(":").trim();

      return (
        <div
          key={index}
          className="mt-3 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm"
        >
          <p className="text-sm leading-7 text-slate-700 md:text-base">
            <span className="font-black text-violet-900">{label} :</span>{" "}
            {valeur}
          </p>
        </div>
      );
    }

    return (
      <p
        key={index}
        className="mt-3 rounded-2xl bg-white/45 px-4 py-3 text-sm leading-7 text-slate-700 md:text-base"
      >
        {texte}
      </p>
    );
  };

  return <div className="space-y-1">{lignes.map(renderLigne)}</div>;
}