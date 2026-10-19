import Image from "next/image";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Flor } from "./ui/Flor";

/**
 * Se houver /public/escola/logo.(svg|png|webp), usa a imagem.
 * Senão, monta um logo em texto com a flor de cinco pétalas.
 */
export function Logo({ className, claro = false }: { className?: string; claro?: boolean }) {
  if (escola.logo.imagem) {
    // Sobre fundo escuro: usa logo-branco se existir; senão, deixa o logo normal todo branco.
    const src = claro ? (escola.logo.imagemClara ?? escola.logo.imagem) : escola.logo.imagem;
    const embranquecer = claro && !escola.logo.imagemClara;
    return (
      <Image
        src={src}
        alt={escola.nome}
        width={escola.logo.largura}
        height={escola.logo.altura}
        unoptimized={src.endsWith(".svg")}
        className={cn("h-11 w-auto max-w-[200px] object-contain sm:h-12", embranquecer && "brightness-0 invert", className)}
        priority={!claro}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Flor className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          translate="no"
          className={cn(
            "t-sub",
            claro ? "text-white" : "text-texto",
          )}
        >
          {escola.nome}
        </span>
        <span className={cn("t-nota mt-1", claro ? "text-white/75" : "text-texto-suave")}>
          {escola.slogan}
        </span>
      </span>
    </span>
  );
}
