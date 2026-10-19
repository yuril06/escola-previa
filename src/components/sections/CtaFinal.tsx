import { CalendarCheck } from "lucide-react";
import { escola } from "@/config/escola";
import { mensagemPadraoWhatsapp, whatsappLink } from "@/lib/utils";
import { IconeWhatsApp } from "../ui/icones";
import { Reveal } from "../ui/Reveal";

/** Faixa de chamada final antes do rodapé. */
export function CtaFinal() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl bg-primaria px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <div aria-hidden className="pontilhado absolute inset-0 text-white opacity-40" />
            <div aria-hidden className="absolute -top-14 -left-14 size-28 rounded-full bg-secundaria sm:-top-16 sm:-left-16 sm:size-48" />
            <div aria-hidden className="absolute -right-12 -bottom-16 size-32 rounded-full bg-destaque sm:-bottom-20 sm:size-56" />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-[0.8rem] font-semibold">
                {escola.hero.selo}
              </span>
              <h2 className="mt-5 font-display text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
                {escola.ctaFinal.titulo}
              </h2>
              <p className="mt-4 text-[1.04rem] text-white/85 sm:text-lg">{escola.ctaFinal.texto}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#visita"
                  className="btn-primario bg-white text-primaria shadow-none hover:bg-secundaria-clara"
                >
                  <CalendarCheck className="size-5" aria-hidden />
                  Agendar visita
                </a>
                <a
                  href={whatsappLink(mensagemPadraoWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secundario border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20"
                >
                  <IconeWhatsApp className="size-5" />
                  Chamar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
