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
        <div key={index} className="mt-8 first:mt-0">
          <h2 className="rounded-3xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-4 text-xl font-extrabold text-white shadow-lg shadow-pink-100 md:text-2xl">
            {texte.replace("# ", "")}
          </h2>
        </div>
      );
    }

    if (texte.startsWith("## ")) {
      return (
        <div
          key={index}
          className="mt-7 rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-pink-50 p-5 shadow-sm"
        >
          <h3 className="text-lg font-extrabold text-violet-700 md:text-xl">
            {texte.replace("## ", "")}
          </h3>
        </div>
      );
    }

    if (/^\d+\.\s/.test(texte)) {
      return (
        <div
          key={index}
          className="mt-5 rounded-3xl border border-violet-100 bg-white p-5 shadow-sm"
        >
          <p className="text-base font-extrabold text-slate-900 md:text-lg">
            {texte}
          </p>
        </div>
      );
    }

    if (/^\d+\.\d+/.test(texte)) {
      return (
        <div
          key={index}
          className="mt-4 rounded-2xl border border-pink-100 bg-pink-50/80 p-4 shadow-sm"
        >
          <p className="font-bold text-pink-700">{texte}</p>
        </div>
      );
    }

    if (texte.startsWith("- ")) {
      return (
        <div key={index} className="ml-1 mt-2 flex gap-3">
          <div className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
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
          className="mt-3 rounded-2xl border border-slate-100 bg-white/80 p-4"
        >
          <p className="text-sm leading-7 text-slate-700 md:text-base">
            <span className="font-extrabold text-slate-900">{label} :</span>{" "}
            {valeur}
          </p>
        </div>
      );
    }

    return (
      <p
        key={index}
        className="mt-3 text-sm leading-7 text-slate-700 md:text-base"
      >
        {texte}
      </p>
    );
  };

  return <div className="space-y-1">{lignes.map(renderLigne)}</div>;
}