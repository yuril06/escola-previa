"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { X } from "lucide-react";
import { escola } from "@/config/escola";
import { parseVideo } from "@/lib/utils";

export function VideoModal({ onClose }: { onClose: () => void }) {
  const fechar = useRef<HTMLButtonElement>(null);
  const video = parseVideo(escola.video.url);

  useEffect(() => {
    fechar.current?.focus();
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [onClose]);

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label={escola.video.titulo}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <button
        ref={fechar}
        type="button"
        onClick={onClose}
        aria-label="Fechar vídeo"
        className="absolute top-3 right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:top-6 sm:right-6"
      >
        <X className="size-6" />
      </button>

      <m.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {video.tipo === "youtube" ? (
          <iframe
            src={video.embed}
            title={escola.video.titulo}
            className="size-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video
            src={video.src}
            className="size-full"
            controls
            autoPlay
            playsInline
            poster={escola.video.capa}
          >
            Seu navegador não suporta vídeo.
          </video>
        )}
      </m.div>
    </m.div>
  );
}
