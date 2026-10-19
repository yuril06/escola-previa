import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Petala } from "../ui/Flor";

const cores = ["text-destaque", "text-secundaria", "text-suave", "text-primaria-media", "text-destaque-clara"];
const giros = [12, -28, 40, -8, 66, 22, -40, 4, 30, -18, 52, -4];

/** Faixa de largura total que divide as duas metades da página: pétalas caindo + a origem do nome. */
export function FaixaNome() {
  return (
    <section aria-labelledby="titulo-nome" className="overflow-hidden bg-primaria py-16 text-white lg:py-20">
      <div className="moldura grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
        <div>
          <h2 id="titulo-nome" className="t-sub">
            Por que Jacarandá
          </h2>
          <p className="t-corpo mt-2 text-white/90">{escola.faixaNome}</p>
        </div>
        <div aria-hidden className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:flex-nowrap sm:justify-between">
          {giros.map((g, i) => (
            <Petala
              key={i}
              giro={g}
              className={cn(
                "balanca shrink-0",
                cores[i % cores.length],
                i % 3 === 0 ? "size-12 lg:size-16" : i % 3 === 1 ? "size-8 lg:size-10" : "size-10 lg:size-12",
                i > 7 && "hidden sm:block",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
