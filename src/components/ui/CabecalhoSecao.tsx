import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function CabecalhoSecao({
  eyebrow,
  titulo,
  texto,
  centralizado = false,
  className,
}: {
  eyebrow: string;
  titulo: string;
  texto?: string;
  centralizado?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", centralizado && "mx-auto text-center", className)}>
      <span className={cn("eyebrow", centralizado && "justify-center")}>
        <span aria-hidden className="h-px w-6 bg-primaria/50" />
        {eyebrow}
      </span>
      <h2 className="titulo-secao mt-3">{titulo}</h2>
      {texto && <p className="mt-4 text-[1.04rem] leading-relaxed text-texto-suave sm:text-lg">{texto}</p>}
    </Reveal>
  );
}
