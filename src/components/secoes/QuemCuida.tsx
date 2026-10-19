import { escola } from "@/config/escola";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";

/**
 * Painel escuro embutido: frase curta, retrato em pétala cortado pela borda de baixo,
 * dois blocos de texto à direita. No celular: frase → textos → retrato.
 */
export function QuemCuida() {
  const e = escola.equipe;
  return (
    <section id="quem-cuida" aria-labelledby="titulo-equipe" className="px-2.5 sm:px-5">
      <div className="overflow-hidden rounded-[0_3rem_0_3rem] bg-texto text-white">
        <div className="grid gap-12 p-7 pb-0 sm:p-14 sm:pb-0 lg:pl-[calc(max(var(--margem),(100vw-1280px)/2+var(--margem))-20px)] lg:grid-cols-[1fr_minmax(0,21rem)] lg:gap-x-16 lg:gap-y-0 lg:pr-[8%]">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <h2 id="titulo-equipe" className="t-titulo max-w-[13ch] text-white">
              {e.titulo}
            </h2>
          </Reveal>

          <div className="grid content-start gap-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-24">
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
                Conhecer a equipe na visita
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-start-1 lg:row-start-2 lg:mt-14">
            {/* A margem negativa embaixo faz a borda do painel cortar o retrato */}
            <div className="petala relative mx-auto -mb-[22%] aspect-[4/5] w-[86%] overflow-hidden bg-primaria sm:w-[60%] lg:mx-0 lg:ml-[8%] lg:-mb-[16%] lg:w-[min(38vw,32rem)]">
              <Foto src={e.foto} alt={e.alt} fill sizes="(min-width: 1024px) 38vw, 86vw" className="object-cover object-top" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
