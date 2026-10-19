import { escola } from "@/config/escola";
import { Flor } from "../ui/Flor";
import { FaixaPetalas } from "../ui/FaixaPetalas";
import { FotosHero } from "./FotosHero";

/**
 * Hero: cartão de papel com a faixa de pétalas e a flor gigante cortada pela borda,
 * ao lado da foto da sala (que troca devagar).
 */
export function Hero() {
  const { hero } = escola;
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-inicio"
      className="grid gap-3 p-3 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-2"
    >
      {/* Foto: no celular vem primeiro */}
      <div className="relative h-[46svh] min-h-72 lg:order-2 lg:h-auto">
        <FotosHero />
      </div>

      {/* Cartão */}
      <div className="relative z-10 -mt-9 flex flex-col overflow-hidden rounded-[0_2.5rem_0_2.5rem] bg-creme lg:order-1 lg:mt-0">
        <FaixaPetalas className="h-11 sm:h-14" />

        {/* A flor gigante, cortada pela borda do cartão: a forma do site na maior escala */}
        <Flor
          className="pointer-events-none absolute -right-[30%] -bottom-[24%] w-[78%] sm:-right-[8%] sm:-bottom-[30%] sm:w-[30%] lg:-right-[20%] lg:-bottom-[22%] lg:w-[62%]"
          cores={["fill-destaque", "fill-secundaria", "fill-suave", "fill-primaria", "fill-destaque"]}
          miolo="fill-creme"
        />

        <div className="entra relative z-10 flex flex-1 flex-col justify-center px-6 pt-10 pb-[52%] sm:px-12 sm:pb-[14%] lg:py-16 lg:pr-14 lg:pl-[calc(max(var(--margem),(100vw-1280px)/2+var(--margem))-12px)]">
          <h1 id="titulo-inicio" className="t-display max-w-[14ch]">
            <span className="sr-only">{escola.nome}: </span>
            {hero.titulo}
          </h1>
          <p className="t-corpo mt-6 max-w-[32ch]">{hero.subtitulo}</p>
          <a href="#visita" className="botao mt-8 w-fit">
            {hero.cta}
          </a>
          <ul className="t-nota mt-10 grid gap-2 font-semibold">
            {hero.fatos.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="marcador bg-primaria" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
