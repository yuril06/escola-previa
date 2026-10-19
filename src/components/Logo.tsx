import Image from "next/image";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";

/**
 * Se `escola.logo.imagem` estiver preenchido, usa a imagem.
 * Senão, monta um logo em texto com um símbolo de flor nas cores da escola.
 */
export function Logo({ className, claro = false }: { className?: string; claro?: boolean }) {
  if (escola.logo.imagem) {
    return (
      <Image
        src={escola.logo.imagem}
        alt={escola.nome}
        width={escola.logo.largura}
        height={escola.logo.altura}
        className={cn("h-10 w-auto", className)}
        priority
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SimboloFlor className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.2rem] font-semibold tracking-[-0.02em]",
            claro ? "text-white" : "text-texto",
          )}
        >
          {escola.nome}
        </span>
        <span
          className={cn(
            "mt-1 text-[0.65rem] font-semibold tracking-[0.12em] uppercase",
            claro ? "text-white/70" : "text-texto-suave",
          )}
        >
          {escola.slogan}
        </span>
      </span>
    </span>
  );
}

export function SimboloFlor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="13" className="fill-primaria" />
      <g transform="translate(20 20)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse
            key={r}
            cx="0"
            cy="-7.2"
            rx="4.6"
            ry="7"
            transform={`rotate(${r})`}
            className="fill-destaque-clara"
            opacity="0.95"
          />
        ))}
        <circle r="3.6" className="fill-secundaria" />
      </g>
    </svg>
  );
}
