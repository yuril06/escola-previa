import { CalendarCheck, PlayCircle, Star } from "lucide-react";
import { escola } from "@/config/escola";
import { iconesNumeros } from "../ui/icones";
import { TituloComDestaque } from "../ui/Rabisco";
import { BotaoAbrirTour, VideoTour } from "../video/VideoTour";

const fundosNumero = ["bg-secundaria-clara", "bg-destaque-clara", "bg-suave-clara", "bg-primaria-clara"];

export function Hero() {
  const { hero } = escola;
  return (
    <section id="inicio" className="relative overflow-hidden pt-6 pb-14 sm:pt-12 lg:pt-14 lg:pb-20">
      {/* Formas orgânicas de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--color-suave-clara),transparent)] sm:size-[44rem]" />
        <div className="absolute top-[36rem] -left-40 size-[28rem] rounded-full bg-[radial-gradient(closest-side,var(--color-secundaria-clara),transparent)] lg:top-24" />
      </div>

      <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="animar-entrada">
          <span className="inline-flex items-center gap-2 rounded-full border border-secundaria/50 bg-secundaria-clara px-3.5 py-1.5 text-[0.8rem] font-semibold text-texto">
            <span className="relative flex size-2">
              <span className="absolute -inset-1 rounded-full bg-destaque/25" />
              <span className="relative inline-flex size-2 rounded-full bg-destaque" />
            </span>
            {hero.selo}
          </span>

          <h1 className="mt-5 font-display text-[2.45rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.1rem]">
            <TituloComDestaque titulo={hero.titulo} destaque={hero.tituloDestaque} />
          </h1>

          <p className="mt-5 max-w-xl text-[1.06rem] leading-relaxed text-texto-suave sm:text-lg">
            {hero.subtitulo}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#visita" className="btn-primario">
              <CalendarCheck className="size-5" aria-hidden />
              {hero.ctaPrincipal}
            </a>
            <BotaoAbrirTour className="btn-secundario cursor-pointer">
              <PlayCircle className="size-5 text-primaria" aria-hidden />
              {hero.ctaSecundario}
            </BotaoAbrirTour>
          </div>

          <div className="mt-7 flex items-center gap-3 text-sm">
            <span className="flex text-secundaria" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <p className="text-texto-suave">
              <strong className="font-semibold text-texto">{hero.nota}</strong> {hero.notaTexto}
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -bottom-5 -left-4 h-2/3 w-2/3 rounded-[48%_52%_42%_58%/55%_45%_55%_45%] bg-primaria sm:-bottom-7 sm:-left-7"
          />
          <div
            aria-hidden
            className="pontilhado absolute -top-5 -right-3 size-28 rounded-full text-secundaria sm:-top-7 sm:-right-7 sm:size-36"
          />
          <div className="relative">
            <VideoTour />
            <div className="absolute -top-4 left-4 flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2.5 text-[0.8rem] font-semibold shadow-elevada sm:left-6">
              <span className="relative flex size-2.5">
                <span className="absolute -inset-1 rounded-full bg-[#25D366]/25" />
                <span className="relative size-2.5 rounded-full bg-[#25D366]" />
              </span>
              {hero.seloVideo}
            </div>
          </div>
        </div>
      </div>

      <div className="container-site mt-14 lg:mt-20">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {escola.numeros.map((n, i) => {
            const Icone = iconesNumeros[n.icone];
            return (
              <div
                key={n.rotulo}
                className="flex flex-col gap-3 rounded-3xl border border-linha bg-white p-4 shadow-suave sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <span className={`grid size-11 shrink-0 place-items-center rounded-2xl text-primaria ${fundosNumero[i % 4]}`}>
                  <Icone className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <dt className="order-2 text-[0.8rem] leading-snug text-texto-suave">{n.rotulo}</dt>
                  <dd className="order-1 font-display text-2xl font-semibold tracking-tight">{n.valor}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
