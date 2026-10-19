import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";

/**
 * Três blocos que crescem: a ordem do dia é carregada pelo tamanho.
 * No desktop: título no vazio acima dos dois blocos menores, bases alinhadas, textos embaixo.
 */
const layout = [
  {
    bloco: "lg:col-start-1 lg:col-end-4 lg:row-start-2",
    texto: "lg:col-start-1 lg:col-end-4 lg:row-start-3",
    altura: "h-[34vw] lg:h-[30vh]",
    fundo: "bg-secundaria-clara",
    sizes: "(min-width: 1024px) 25vw, 100vw",
  },
  {
    bloco: "lg:col-start-4 lg:col-end-8 lg:row-start-2",
    texto: "lg:col-start-4 lg:col-end-8 lg:row-start-3",
    altura: "h-[46vw] lg:h-[44vh]",
    fundo: "bg-destaque-clara",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    bloco: "lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-3",
    texto: "lg:col-start-8 lg:col-end-13 lg:row-start-3",
    altura: "h-[62vw] lg:h-[60vh]",
    fundo: "bg-primaria-clara",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
];

export function Rotina() {
  return (
    <section id="rotina" aria-labelledby="titulo-rotina" className="moldura py-28 lg:py-40">
      <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-3 lg:gap-y-0">
        <Reveal className="mb-4 lg:col-start-1 lg:col-end-8 lg:row-start-1 lg:mb-10 lg:self-start lg:pr-10">
          <h2 id="titulo-rotina" className="t-titulo">
            Um dia na Casa, das 7h às 19h
          </h2>
          <p className="t-corpo mt-5 max-w-[44ch]">
            Rotina pensada para o integral. Os horários mudam um pouco por turma e respeitam o ritmo dos bebês.
          </p>
        </Reveal>

        {escola.rotina.map((p, i) => (
          <div key={p.periodo} className="contents">
            <Reveal delay={i * 0.08} className={cn("lg:self-end", layout[i].bloco)}>
              <div className={cn("petala relative overflow-hidden", layout[i].altura, layout[i].fundo)}>
                <Foto src={p.foto} alt={p.alt} fill sizes={layout[i].sizes} className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={i * 0.08 + 0.06} className={cn("mb-8 lg:mb-0 lg:pr-6", layout[i].texto)}>
              <h3 className="t-sub mt-1 lg:mt-6">
                {p.periodo} <span className="text-texto-suave">· {p.faixa}</span>
              </h3>
              <ul className="mt-3 grid gap-1.5">
                {p.itens.map((it) => (
                  <li key={it.hora} className="t-corpo grid grid-cols-[3.75rem_1fr] gap-2">
                    <span className="font-semibold text-primaria tabular-nums">{it.hora}</span>
                    {it.texto}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
