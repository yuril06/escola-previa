"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Foto } from "./Foto";

type Item = { src: string; alt: string; titulo: string; descricao?: string };

export function Lightbox({
  itens,
  indice,
  onChange,
  onClose,
}: {
  itens: Item[];
  indice: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const fechar = useRef<HTMLButtonElement>(null);
  const toqueX = useRef<number | null>(null);
  const item = itens[indice];
  const anterior = () => onChange((indice - 1 + itens.length) % itens.length);
  const proximo = () => onChange((indice + 1) % itens.length);

  useEffect(() => {
    fechar.current?.focus();
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((indice - 1 + itens.length) % itens.length);
      if (e.key === "ArrowRight") onChange((indice + 1) % itens.length);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [indice, itens.length, onChange, onClose]);

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto: ${item.titulo}`}
      className="fixed inset-0 z-[60] flex flex-col bg-black/92 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onTouchStart={(e) => (toqueX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toqueX.current === null) return;
        const dx = e.changedTouches[0].clientX - toqueX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? anterior : proximo)();
        toqueX.current = null;
      }}
    >
      <div className="flex items-center justify-between p-3 text-white sm:p-5">
        <span className="pl-2 text-sm text-white/70 tabular-nums">
          {indice + 1} / {itens.length}
        </span>
        <button
          ref={fechar}
          type="button"
          onClick={onClose}
          aria-label="Fechar galeria"
          className="grid size-12 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <X className="size-6" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1" onClick={onClose}>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={item.src}
            className="absolute inset-0 px-3 sm:px-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative size-full">
              <Foto src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
            </div>
          </m.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            anterior();
          }}
          aria-label="Foto anterior"
          className="absolute top-1/2 left-4 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:grid"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            proximo();
          }}
          aria-label="Próxima foto"
          className="absolute top-1/2 right-4 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:grid"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 p-5 pb-8 text-white sm:justify-center sm:text-center">
        <div>
          <p className="font-display text-xl font-semibold">{item.titulo}</p>
          {item.descricao && <p className="mt-1 text-sm text-white/70">{item.descricao}</p>}
        </div>
        <div className="flex shrink-0 gap-2 sm:hidden">
          <button
            type="button"
            onClick={anterior}
            aria-label="Foto anterior"
            className="grid size-11 place-items-center rounded-full bg-white/10"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={proximo}
            aria-label="Próxima foto"
            className="grid size-11 place-items-center rounded-full bg-white/10"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </m.div>
  );
}
