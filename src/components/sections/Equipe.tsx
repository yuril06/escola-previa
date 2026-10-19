import { CalendarCheck } from "lucide-react";
import { escola } from "@/config/escola";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";

/** "Quem cuida": carta da diretora + números da equipe. */
export function Equipe() {
  const e = escola.equipe;
  return (
    <section id="equipe" className="py-16 sm:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -top-4 -left-4 size-full rounded-[42%_58%_55%_45%/48%_42%_58%_52%] bg-secundaria/70 sm:-top-6 sm:-left-6"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-5xl bg-creme shadow-elevada">
            <Foto
              src={e.foto}
              alt={e.alt}
              fill
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-4 -bottom-5 max-w-[15rem] rounded-3xl bg-white p-4 shadow-elevada sm:-right-6">
            <p className="font-display text-lg leading-tight font-semibold">{e.nome}</p>
            <p className="mt-1 text-xs leading-snug text-texto-suave">{e.cargo}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <span className="eyebrow">
            <span aria-hidden className="h-px w-6 bg-primaria/50" />
            Quem cuida
          </span>
          <h2 className="titulo-secao mt-3">{e.titulo}</h2>
          <blockquote className="mt-5 border-l-4 border-secundaria pl-5 text-[1.06rem] leading-relaxed text-texto-suave sm:text-lg">
            “{e.texto}”
          </blockquote>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {e.destaques.map((d) => (
              <div key={d.rotulo} className="flex flex-col rounded-2xl border border-linha bg-white p-4">
                <dt className="order-2 mt-1 text-[0.82rem] leading-snug text-texto-suave">{d.rotulo}</dt>
                <dd className="order-1 font-display text-xl font-semibold tracking-tight text-primaria">{d.valor}</dd>
              </div>
            ))}
          </dl>

          <a href="#visita" className="btn-primario mt-8">
            <CalendarCheck className="size-5" aria-hidden />
            Quero conhecer a escola
          </a>
        </Reveal>
      </div>
    </section>
  );
}
