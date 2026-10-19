import { cn } from "@/lib/utils";

const cores = ["bg-destaque", "bg-secundaria", "bg-suave", "bg-primaria"];

/**
 * Faixa de pétalas (DESIGN.md): uma fileira de pétalas chapadas nas cores da marca.
 * Usada no topo do cartão do hero e como divisor de largura total.
 */
export function FaixaPetalas({ className, quantidade = 24 }: { className?: string; quantidade?: number }) {
  return (
    <div aria-hidden className={cn("flex shrink-0 overflow-hidden", className)}>
      {Array.from({ length: quantidade }).map((_, i) => (
        <span
          key={i}
          className={cn("aspect-square h-full shrink-0", cores[i % cores.length])}
          style={{ borderRadius: i % 2 ? "0 50% 0 50%" : "50% 0 50% 0" }}
        />
      ))}
    </div>
  );
}
