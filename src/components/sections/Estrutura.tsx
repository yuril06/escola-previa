"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { CabecalhoSecao } from "../ui/CabecalhoSecao";
import { Foto } from "../ui/Foto";

const Lightbox = dynamic(() => import("../ui/Lightbox").then((m) => m.Lightbox), { ssr: false });

/** Posições do mosaico no desktop (8 ambientes). Itens extras caem em 1x1. */
const mosaico = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
];

export function Estrutura() {
  const [indice, setIndice] = useState<number | null>(null);
  const [ativo, setAtivo] = useState(0);
  const trilho = useRef<HTMLUListElement>(null);
  const ambientes = escola.ambientes;

  const aoRolar = () => {
    const el = trilho.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setAtivo(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };

  const irPara = (i: number) => {
    const el = trilho.current;
    const card = el?.children[i] as HTMLElement | undefined;
    const primeiro = el?.children[0] as HTMLElement | undefined;
    if (el && card && primeiro) el.scrollTo({ left: card.offsetLeft - primeiro.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="estrutura" className="bg-creme/60 py-16 sm:py-24">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <CabecalhoSecao
            eyebrow="Estrutura"
            titulo="Cada cantinho pensado para o tamanho deles"
            texto="Toque nas fotos para ver em tela cheia. Na visita, você conhece todos os ambientes pessoalmente."
          />
          <div className="hidden gap-2 sm:flex lg:hidden">
            <BotaoSeta direcao="anterior" onClick={() => irPara(Math.max(0, ativo - 1))} />
            <BotaoSeta direcao="proximo" onClick={() => irPara(Math.min(ambientes.length - 1, ativo + 1))} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl lg:px-8">
        <ul
          ref={trilho}
          onScroll={aoRolar}
          className="sem-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:grid lg:auto-rows-[15rem] lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0"
          aria-label="Galeria de ambientes"
        >
          {ambientes.map((a, i) => (
            <li
              key={a.nome}
              className={cn("w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto", mosaico[i] ?? "")}
            >
              <button
                type="button"
                onClick={() => setIndice(i)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-creme text-left lg:aspect-auto lg:h-full"
              >
                <Foto
                  src={a.foto}
                  alt={a.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 560px, 82vw" : "(min-width: 1024px) 300px, (min-width: 640px) 46vw, 82vw"}
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-texto opacity-100 transition lg:opacity-0 lg:group-hover:opacity-100">
                  <Expand className="size-4" aria-hidden />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="block font-display text-xl font-semibold tracking-tight">
                    <span className="sr-only">Ampliar foto: </span>
                    {a.nome}
                  </span>
                  <span className={cn("mt-1 block text-sm leading-snug text-white/85", mosaico[i] ? "" : "lg:hidden")}>{a.descricao}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Indicadores (mobile/tablet) */}
        <div className="mt-5 flex justify-center gap-1.5 lg:hidden" aria-hidden>
          {ambientes.map((a, i) => (
            <span
              key={a.nome}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === ativo ? "w-6 bg-primaria" : "w-1.5 bg-texto/20",
              )}
            />
          ))}
        </div>
      </div>

      {indice !== null && (
        <Lightbox
          itens={ambientes.map((a) => ({ src: a.foto, alt: a.alt, titulo: a.nome, descricao: a.descricao }))}
          indice={indice}
          onChange={setIndice}
          onClose={() => setIndice(null)}
        />
      )}
    </section>
  );
}

function BotaoSeta({ direcao, onClick }: { direcao: "anterior" | "proximo"; onClick: () => void }) {
  const Icone = direcao === "anterior" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direcao === "anterior" ? "Foto anterior" : "Próxima foto"}
      className="grid size-11 place-items-center rounded-full border border-linha bg-white transition hover:bg-primaria-clara"
    >
      <Icone className="size-5" />
    </button>
  );
}
