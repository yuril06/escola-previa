"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";
import { escola } from "@/config/escola";
import { Foto } from "../ui/Foto";

const VideoModal = dynamic(() => import("./VideoModal").then((m) => m.VideoModal), { ssr: false });

/** Evento global para abrir o tour a partir de qualquer botão (ex.: CTA do hero). */
export const EVENTO_ABRIR_TOUR = "abrir-tour";

export function VideoTour() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const abrir = () => setAberto(true);
    window.addEventListener(EVENTO_ABRIR_TOUR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_TOUR, abrir);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-4xl bg-creme text-left shadow-elevada sm:aspect-[16/11]"
      >
        <Foto
          src={escola.video.capa}
          alt={escola.video.capaAlt}
          fill
          priority
          quality={70}
          sizes="(min-width: 1024px) 640px, calc(100vw - 2rem)"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        <span className="absolute inset-0 grid place-items-center">
          <span className="relative grid size-20 place-items-center sm:size-24">
            <span className="absolute -inset-2.5 rounded-full bg-white/25" />
            <span className="relative grid size-full place-items-center rounded-full bg-white text-primaria shadow-elevada transition duration-300 group-hover:scale-105">
              <Play className="ml-1 size-8 fill-current sm:size-9" aria-hidden />
            </span>
          </span>
        </span>

        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
          <span className="text-white">
            <span className="block text-xs font-semibold tracking-[0.14em] text-white/80 uppercase">
              Assistir ao vídeo tour
            </span>
            <span className="mt-1 block font-display text-lg font-semibold leading-tight sm:text-xl">
              {escola.video.titulo}
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white">
            {escola.video.duracao}
          </span>
        </span>
      </button>

      {aberto && <VideoModal onClose={() => setAberto(false)} />}
    </>
  );
}

export function BotaoAbrirTour({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_TOUR))}
    >
      {children}
    </button>
  );
}
