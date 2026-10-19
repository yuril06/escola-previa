import { CalendarCheck, PlayCircle } from "lucide-react";
import { escola } from "@/config/escola";
import { BotaoAbrirTour, VideoTour } from "../video/VideoTour";

export function Hero() {
  const { hero } = escola;
  return (
    <section id="inicio" className="relative overflow-hidden pt-6 pb-14 sm:pt-12 lg:pt-16 lg:pb-20">
      {/* Formas orgânicas de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--color-suave-clara),transparent)] sm:size-[44rem]" />
        <div className="absolute top-[36rem] -left-40 size-[28rem] rounded-full bg-[radial-gradient(closest-side,var(--color-secundaria-clara),transparent)] lg:top-24" />
      </div>

      <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.12fr] lg:gap-14">
        <div className="animar-entrada">
          <span className="inline-flex items-center gap-2 rounded-full border border-secundaria/50 bg-secundaria-clara px-3.5 py-1.5 text-[0.8rem] font-semibold text-texto">
            <span className="relative flex size-2">
              <span className="absolute -inset-1 rounded-full bg-destaque/25" />
              <span className="relative inline-flex size-2 rounded-full bg-destaque" />
            </span>
            {hero.selo}
          </span>

          <h1 className="mt-5 font-display text-[2.45rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.1rem]">
            {hero.titulo}
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
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -bottom-5 -left-4 h-2/3 w-2/3 rounded-[48%_52%_42%_58%/55%_45%_55%_45%] bg-primaria/90 sm:-bottom-7 sm:-left-7"
          />
          <div
            aria-hidden
            className="absolute -top-4 -right-3 size-24 rounded-full bg-secundaria sm:-top-6 sm:-right-6 sm:size-32"
          />
          <div className="relative">
            <VideoTour />
          </div>
        </div>
      </div>

      <div className="container-site mt-14 lg:mt-20">
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-linha bg-white shadow-suave lg:grid-cols-4">
          {escola.numeros.map((n, i) => (
            <div
              key={n.rotulo}
              className={[
                "flex flex-col gap-1 p-5 sm:p-6",
                i % 2 === 0 ? "border-r border-linha" : "",
                i < 2 ? "border-b border-linha lg:border-b-0" : "",
                i === 1 ? "lg:border-r" : "",
              ].join(" ")}
            >
              <dt className="order-2 text-[0.82rem] leading-snug text-texto-suave">{n.rotulo}</dt>
              <dd className="order-1 font-display text-2xl font-semibold tracking-tight text-primaria sm:text-3xl">
                {n.valor}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
