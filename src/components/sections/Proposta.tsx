import { escola } from "@/config/escola";
import { iconesDiferenciais } from "../ui/icones";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";

const fundosIcone = [
  "bg-suave-clara text-primaria",
  "bg-secundaria-clara text-primaria",
  "bg-destaque-clara text-primaria",
  "bg-primaria-clara text-primaria",
];

export function Proposta() {
  const { proposta, diferenciais } = escola;
  return (
    <section id="proposta" className="py-16 sm:py-24">
      <div className="container-site">
        <div className="overflow-hidden rounded-5xl bg-primaria text-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 sm:p-12 lg:p-14">
              <Reveal>
                <span className="eyebrow text-secundaria-clara">
                  <span aria-hidden className="h-px w-6 bg-secundaria/60" />
                  Proposta pedagógica
                </span>
                <h2 className="titulo-secao mt-3 text-white">{proposta.titulo}</h2>
                <p className="mt-5 text-[1.04rem] leading-relaxed text-white/85 sm:text-lg">{proposta.texto}</p>

                <p className="mt-8 text-sm font-semibold text-white/70">
                  Os 5 campos de experiência da BNCC
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {proposta.camposBncc.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.85rem] font-medium"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="relative min-h-72 lg:min-h-full">
              <Foto
                src={proposta.foto}
                alt={proposta.fotoAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.map((d, i) => {
            const Icone = iconesDiferenciais[d.icone];
            return (
              <li key={d.titulo}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="flex h-full gap-4 rounded-3xl border border-linha bg-white p-5 shadow-suave sm:block sm:p-6">
                    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${fundosIcone[i % fundosIcone.length]}`}>
                      <Icone className="size-6" aria-hidden strokeWidth={1.8} />
                    </span>
                    <div>
                    <h3 className="sm:mt-5 font-display text-lg font-semibold leading-snug tracking-tight">{d.titulo}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-texto-suave">{d.descricao}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
