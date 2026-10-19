import Image from "next/image";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";

/** Borda serrilhada em cima e embaixo, como papel destacado. */
function serrilhado(dentes = 18, altura = 8) {
  const passo = 100 / dentes;
  const topo: string[] = [];
  const base: string[] = [];
  for (let i = 0; i <= dentes; i++) {
    const x = (i * passo).toFixed(2);
    topo.push(`${x}% ${i % 2 ? 0 : altura}px`);
    base.unshift(`${x}% calc(100% - ${i % 2 ? 0 : altura}px)`);
  }
  return `polygon(${[...topo, ...base].join(",")})`;
}
const CORTE = serrilhado();

const bilhetes = [
  { giro: "lg:-rotate-4 -rotate-2", lugar: "mr-auto lg:mt-16", inicial: "bg-destaque-clara" },
  { giro: "lg:rotate-2 rotate-2", lugar: "ml-auto lg:mt-4", inicial: "bg-suave-clara" },
  { giro: "lg:rotate-5 -rotate-3", lugar: "mr-auto lg:mt-24", inicial: "bg-secundaria-clara" },
];

/** Bilhetes de papel inclinados sobre um campo de cor, com a prancha do jacarandá entre eles. */
export function Familias() {
  return (
    <section
      id="familias"
      aria-labelledby="titulo-familias"
      className="mt-28 overflow-hidden bg-destaque-clara py-24 lg:mt-40 lg:py-32"
    >
      <div className="moldura">
        <Reveal className="max-w-2xl">
          <h2 id="titulo-familias" className="t-titulo">
            O que as famílias contam
          </h2>
          {escola.isDemo && (
            <p className="t-corpo mt-4">Depoimentos de exemplo, para trocar pelos das famílias da escola.</p>
          )}
        </Reveal>

        <ul className="mt-12 flex flex-col lg:mt-14 lg:flex-row lg:items-start lg:justify-center lg:pl-[6%]">
          {escola.depoimentos.slice(0, 3).map((d, i) => (
            <li
              key={d.nome}
              className={cn(
                "w-[82%] max-w-[22rem] sm:w-[60%] lg:w-[19rem] lg:max-w-none lg:shrink-0",
                i > 0 && "-mt-8 lg:mt-0 lg:-ml-5",
                bilhetes[i].lugar,
              )}
            >
              <Reveal delay={i * 0.09}>
                <figure
                  className={cn(
                    "flex flex-col bg-fundo px-7 pt-10 pb-12 transition-transform duration-300 hover:rotate-0 lg:pr-9",
                    bilhetes[i].giro,
                  )}
                  style={{ clipPath: CORTE }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mx-auto grid size-14 place-items-center rounded-[0_50%_0_50%] font-display text-2xl font-semibold text-primaria",
                      bilhetes[i].inicial,
                    )}
                  >
                    {d.nome.charAt(0)}
                  </span>
                  <figcaption className="mt-4 text-center">
                    <span className="block font-semibold">{d.nome}</span>
                    <span className="t-nota block text-texto-suave">{d.relacao}</span>
                  </figcaption>
                  <blockquote className="t-corpo mt-6">“{d.texto}”</blockquote>
                </figure>
              </Reveal>
            </li>
          ))}

          {/* A prancha botânica do jacarandá, como uma folha guardada entre os bilhetes */}
          <li className="mt-6 ml-auto w-[64%] max-w-[17rem] lg:-ml-6 lg:mt-36 lg:w-[16rem] lg:shrink-0">
            <Reveal delay={0.3}>
              <figure className="-rotate-3 bg-fundo p-3 lg:-rotate-6">
                <Image
                  src="/acervo/jacaranda-mimosifolia-bot-mag-49-t-2327.jpg"
                  alt="Prancha botânica de 1822 com um ramo de jacarandá florido em lilás e a folhagem miúda ao lado"
                  width={1200}
                  height={1391}
                  sizes="(min-width: 1024px) 256px, 64vw"
                  className="h-auto w-full"
                />
                <figcaption className="t-nota mt-2 text-texto-suave">Jacarandá, Botanical Magazine, 1822.</figcaption>
              </figure>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
