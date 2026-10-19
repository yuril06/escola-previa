import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";

/** Uma cor de pétala por coluna: a única cor do lado direito. */
const coresColuna = ["bg-destaque", "bg-secundaria"];

/** Foto gigante em pétala, cortada pela borda esquerda, e os pontos pequenos marcados com a pétala. */
export function Proposta() {
  const { proposta } = escola;
  return (
    <section id="proposta" aria-labelledby="titulo-proposta" className="overflow-hidden py-28 lg:py-40">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
        <Reveal className="lg:col-span-5">
          <div className="petala relative -ml-[18vw] aspect-[4/5] w-[100vw] max-h-[60svh] overflow-hidden bg-creme sm:w-[82vw] lg:-ml-[12%] lg:h-[78svh] lg:max-h-none lg:w-[112%]">
            <Foto src={proposta.foto} alt={proposta.fotoAlt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
          </div>
        </Reveal>

        <div className="px-[var(--margem)] lg:col-span-7 lg:col-start-6 lg:pl-10 lg:pr-[max(var(--margem),calc((100vw-1280px)/2+var(--margem)))] ">
          <Reveal>
            <h2 id="titulo-proposta" className="t-titulo">
              {proposta.titulo}
            </h2>
            <p className="t-corpo mt-5 max-w-[48ch]">{proposta.texto}</p>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {proposta.pontos.map((p, i) => (
              <li key={p.titulo}>
                <Reveal delay={(i % 2) * 0.06}>
                  <h3 className="t-sub flex items-baseline gap-2.5">
                    <span className={cn("marcador relative -top-px", coresColuna[i % coresColuna.length])} aria-hidden />
                    {p.titulo}
                  </h3>
                  <p className="t-corpo mt-1 pl-[calc(0.7em+0.625rem)]">{p.texto}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
