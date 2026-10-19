"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Foto } from "../ui/Foto";

const SEGURA_MS = 5500;

/** Assinatura de movimento: as fotos da sala trocam devagar, como luz mudando no ambiente. */
export function FotosHero() {
  const fotos = escola.hero.fotos;
  const [atual, setAtual] = useState(0);
  const [parado, setParado] = useState(false);
  const [movimentoReduzido, setMovimentoReduzido] = useState(false);

  useEffect(() => {
    setMovimentoReduzido(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (fotos.length < 2 || parado || movimentoReduzido) return;
    let timer: number | undefined;
    const iniciar = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => setAtual((i) => (i + 1) % fotos.length), SEGURA_MS);
    };
    const aoMudarAba = () => (document.hidden ? window.clearInterval(timer) : iniciar());
    iniciar();
    document.addEventListener("visibilitychange", aoMudarAba);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", aoMudarAba);
    };
  }, [fotos.length, parado, movimentoReduzido]);

  return (
    <div className="petala-inv relative size-full overflow-hidden bg-creme">
      {fotos.map((f, i) => (
        <Foto
          key={f.src}
          src={f.src}
          alt={i === 0 ? f.alt : ""}
          aria-hidden={i === 0 ? undefined : true}
          fill
          priority={i === 0}
          quality={72}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            "object-cover transition-[opacity,transform] ease-out",
            "[transition-duration:1600ms,7000ms]",
            i === atual ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
          )}
        />
      ))}

      {fotos.length > 1 && !movimentoReduzido && (
        <button
          type="button"
          onClick={() => setParado((v) => !v)}
          aria-pressed={parado}
          aria-label={parado ? "Retomar a troca de fotos" : "Pausar a troca de fotos"}
          className="absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-[0_0.875rem_0_0.875rem] bg-white/90 text-texto transition-[background-color,transform] hover:bg-white active:scale-95"
        >
          {parado ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
        </button>
      )}
    </div>
  );
}
