"use client";

import { useEffect, useRef, useState } from "react";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";

const SEGURA_MS = 3000;

/** Uma moldura em pétala que fica parada enquanto o conteúdo troca. */
export function Ambientes() {
  const lista = escola.ambientes;
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false); // hover/foco
  const [parado, setParado] = useState(false); // escolha da pessoa
  const [visivel, setVisivel] = useState(false);
  const secao = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = secao.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visivel || pausado || parado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setAtual((i) => (i + 1) % lista.length);
    }, SEGURA_MS);
    return () => window.clearInterval(t);
  }, [visivel, pausado, parado, lista.length]);

  const ambiente = lista[atual];

  return (
    <section
      ref={secao}
      id="ambientes"
      aria-labelledby="titulo-ambientes"
      className="bg-suave-clara py-24 lg:py-32"
    >
      <div className="moldura grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-20">
        <div>
          <Reveal>
            <h2 id="titulo-ambientes" className="t-titulo">
              Os ambientes da casa
            </h2>
            <p className="t-corpo mt-5 max-w-[44ch]">
              Tudo na altura deles, do berço ao parque. Toque num nome para ver o espaço; na visita, você passa por todos.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-1 sm:max-w-xl"
              onMouseEnter={() => setPausado(true)}
              onMouseLeave={() => setPausado(false)}
            >
              {lista.map((a, i) => (
                <li key={a.nome}>
                  <button
                    type="button"
                    aria-pressed={i === atual}
                    onClick={() => {
                      setAtual(i);
                      setParado(true);
                    }}
                    className={cn(
                      "group flex w-full items-center gap-3 py-2 text-left font-medium transition-colors",
                      i === atual ? "text-texto" : "text-texto-suave hover:text-texto",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "marcador transition-transform duration-300",
                        i === atual ? "scale-125 bg-primaria" : "bg-white group-hover:bg-secundaria",
                      )}
                    />
                    {a.nome}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mx-auto w-[72vw] max-w-[32rem] lg:w-full">
          <button
            type="button"
            onClick={() => setAtual((i) => (i + 1) % lista.length)}
            onFocus={() => setPausado(true)}
            onBlur={() => setPausado(false)}
            className="petala relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-creme"
            aria-label={`Foto: ${ambiente.nome}. Toque para ver o próximo ambiente`}
          >
            {lista.map((a, i) => (
              <Foto
                key={a.foto}
                src={a.foto}
                alt={i === atual ? a.alt : ""}
                fill
                sizes="(min-width: 1024px) 512px, 72vw"
                className={cn(
                  "object-cover transition-opacity duration-[600ms]",
                  i === atual ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </button>
          <p className="t-nota mt-4 text-center" aria-live="polite">
            <strong className="font-semibold">{ambiente.nome}.</strong> {ambiente.descricao}
          </p>
          <p className="mt-2 text-center">
            <button
              type="button"
              onClick={() => setParado((v) => !v)}
              aria-pressed={parado}
              className="t-nota cursor-pointer font-semibold text-primaria underline decoration-2 underline-offset-4 hover:text-primaria-escura"
            >
              {parado ? "Retomar a troca de fotos" : "Pausar a troca de fotos"}
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
