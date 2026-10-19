import { escola } from "@/config/escola";
import { Reveal } from "../ui/Reveal";

/** Painel escuro embutido: frase curta à esquerda, carta da diretora e equipe à direita. */
export function QuemCuida() {
  const e = escola.equipe;
  return (
    <section id="quem-cuida" aria-labelledby="titulo-equipe" className="px-2.5 sm:px-5">
      <div className="rounded-[0_3rem_0_3rem] bg-texto text-white">
        <div className="moldura grid gap-12 py-14 max-sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:py-28">
          <Reveal>
            <h2 id="titulo-equipe" className="t-titulo max-w-[13ch]">
              {e.titulo}
            </h2>
          </Reveal>

          <div className="grid gap-12 sm:grid-cols-2 lg:gap-10">
            <Reveal delay={0.06}>
              <h3 className="t-sub">
                {e.nome}, {e.cargo.toLowerCase()}
              </h3>
              <p className="t-corpo mt-3 text-white/90">{e.carta}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="t-sub">{e.equipeTitulo}</h3>
              <p className="t-corpo mt-3 text-white/90">{e.equipeTexto}</p>
              <a href="#visita" className="botao botao-claro mt-8">
                Conhecer a equipe
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
