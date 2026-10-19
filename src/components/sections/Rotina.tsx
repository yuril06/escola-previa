import { escola } from "@/config/escola";
import { CabecalhoSecao } from "../ui/CabecalhoSecao";
import { Reveal } from "../ui/Reveal";

const pontos = ["bg-secundaria", "bg-destaque", "bg-suave", "bg-primaria"];

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
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute top-3 bottom-3 left-[4.75rem] w-px bg-linha sm:left-[5.75rem]" />
          {escola.rotina.map((r, i) => (
            <li key={r.hora + r.titulo}>
              <Reveal delay={Math.min(i, 4) * 0.03} className="relative grid grid-cols-[4rem_1fr] gap-6 py-3.5 sm:grid-cols-[5rem_1fr] sm:gap-8">
                <time className="pt-0.5 text-right font-display text-[0.95rem] font-semibold text-primaria tabular-nums sm:text-lg">
                  {r.hora}
                </time>
                <span
                  aria-hidden
                  className={`absolute top-[1.3rem] left-[4.75rem] size-3 -translate-x-1/2 rounded-full ring-4 ring-fundo sm:top-[1.45rem] sm:left-[5.75rem] ${pontos[i % pontos.length]}`}
                />
                <div className="pl-2">
                  <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{r.titulo}</h3>
                  <p className="mt-0.5 text-[0.95rem] leading-relaxed text-texto-suave">{r.descricao}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
