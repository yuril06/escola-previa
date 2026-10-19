"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { CabecalhoSecao } from "../ui/CabecalhoSecao";

const fundos = ["bg-suave-clara", "bg-secundaria-clara", "bg-destaque-clara", "bg-primaria-clara"];

export function Depoimentos() {
  const trilho = useRef<HTMLUListElement>(null);
  const [ativo, setAtivo] = useState(0);
  const lista = escola.depoimentos;

  const passo = () => {
    const card = trilho.current?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 16 : 0;
  };
  const mover = (dir: 1 | -1) => trilho.current?.scrollBy({ left: dir * passo(), behavior: "smooth" });

  return (
    <section id="depoimentos" className="overflow-hidden bg-creme/60 py-16 sm:py-24">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <CabecalhoSecao eyebrow="Famílias" titulo="O que os pais contam depois da adaptação" />
          <div className="flex items-center gap-3">
            {escola.isDemo && (
              <span className="rounded-full border border-dashed border-texto/30 px-3 py-1 text-xs font-semibold text-texto-suave">
                Depoimentos de exemplo
              </span>
            )}
            <div className="ml-auto hidden gap-2 sm:flex">
              {([-1, 1] as const).map((d) => {
                const Icone = d === -1 ? ChevronLeft : ChevronRight;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => mover(d)}
                    aria-label={d === -1 ? "Depoimento anterior" : "Próximo depoimento"}
                    className="grid size-11 place-items-center rounded-full border border-linha bg-white transition hover:bg-primaria-clara"
                  >
                    <Icone className="size-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <ul
          ref={trilho}
          onScroll={(e) => {
            const p = passo();
            if (p) setAtivo(Math.round(e.currentTarget.scrollLeft / p));
          }}
          aria-label="Depoimentos"
          className="sem-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
        >
          {lista.map((d, i) => (
            <li key={d.nome} className="w-[86%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-2rem)/2.4)]">
              <figure className="flex h-full flex-col rounded-4xl border border-linha bg-white p-7 shadow-suave sm:p-8">
                <span className={cn("grid size-11 place-items-center rounded-2xl text-primaria", fundos[i % fundos.length])}>
                  <Quote className="size-5 fill-current" aria-hidden />
                </span>
                <blockquote className="mt-5 flex-1 text-[1.06rem] leading-relaxed text-texto sm:text-lg">
                  “{d.texto}”
                </blockquote>
                <figcaption className="mt-6 border-t border-linha pt-5">
                  <span className="block font-semibold">{d.nome}</span>
                  <span className="block text-sm text-texto-suave">{d.relacao}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-center gap-1.5 sm:hidden" aria-hidden>
          {lista.map((d, i) => (
            <span
              key={d.nome}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === ativo ? "w-6 bg-primaria" : "w-1.5 bg-texto/20",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
