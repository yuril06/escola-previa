import { escola } from "@/config/escola";
import { CabecalhoSecao } from "../ui/CabecalhoSecao";
import { iconesRotina } from "../ui/icones";
import { Reveal } from "../ui/Reveal";

const cores = [
  "bg-secundaria-clara text-texto",
  "bg-destaque-clara text-texto",
  "bg-suave-clara text-texto",
  "bg-primaria-clara text-primaria",
];

export function Rotina() {
  return (
    <section id="rotina" className="py-16 sm:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <CabecalhoSecao
            eyebrow="Rotina do dia"
            titulo="Um dia previsível é um dia tranquilo"
            texto={`Rotina pensada para o período integral, ${escola.horario.exibicao.toLowerCase()}. Os horários se adaptam à idade de cada turma e ao ritmo dos bebês.`}
          />
          <div className="mt-8 hidden h-3 overflow-hidden rounded-full lg:flex" aria-hidden>
            <span className="flex-1 bg-secundaria" />
            <span className="flex-1 bg-destaque/80" />
            <span className="flex-1 bg-suave" />
            <span className="flex-1 bg-primaria" />
          </div>
          <div className="mt-2 hidden justify-between text-xs font-semibold text-texto-suave lg:flex" aria-hidden>
            <span>{escola.horario.abre.replace(":00", "h")}</span>
            <span>{escola.horario.fecha.replace(":00", "h")}</span>
          </div>
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute top-6 bottom-6 left-[1.375rem] w-0.5 rounded-full bg-linha" />
          {escola.rotina.map((r, i) => {
            const Icone = iconesRotina[r.icone];
            return (
              <li key={r.hora + r.titulo}>
                <Reveal delay={Math.min(i, 4) * 0.03} className="relative flex gap-4 py-2.5 sm:gap-5">
                  <span
                    className={`relative grid size-11 shrink-0 place-items-center rounded-2xl ring-4 ring-fundo ${cores[i % cores.length]}`}
                  >
                    <Icone className="size-5" strokeWidth={1.9} aria-hidden />
                  </span>
                  <div className="flex-1 rounded-2xl border border-linha bg-white px-4 py-3 shadow-suave sm:px-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold tracking-tight">{r.titulo}</h3>
                      <time className="shrink-0 rounded-full bg-fundo px-2.5 py-0.5 text-sm font-semibold text-primaria tabular-nums">
                        {r.hora}
                      </time>
                    </div>
                    <p className="mt-0.5 text-[0.93rem] leading-relaxed text-texto-suave">{r.descricao}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
