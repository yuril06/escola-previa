"use client";

import { useId, useState } from "react";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";

const fundos = ["bg-secundaria-clara", "bg-suave-clara", "bg-destaque-clara"];

/** Fichas com aba, empilhadas como num arquivo; uma aberta por vez. */
export function Duvidas() {
  const [aberta, setAberta] = useState(0);
  const base = useId();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: escola.faq.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  return (
    <section id="duvidas" aria-labelledby="titulo-duvidas" className="moldura py-28 lg:py-40">
      <div className="mx-auto max-w-[52rem]">
        <Reveal>
          <h2 id="titulo-duvidas" className="t-titulo">
            Perguntas das famílias
          </h2>
        </Reveal>

        <div className="mt-14">
          {escola.faq.map((f, i) => {
            const aberto = aberta === i;
            const idPainel = `${base}-painel-${i}`;
            const idBotao = `${base}-botao-${i}`;
            return (
              <Reveal
                key={f.pergunta}
                delay={Math.min(i, 5) * 0.05}
                className={cn("relative", i > 0 && "-mt-5 sm:-mt-6")}
                style={{ zIndex: i + 1 }}
              >
                <div>
                  {/* Aba: anda para a direita a cada ficha */}
                  <span
                    aria-hidden
                    className={cn(
                      "t-nota relative block h-10 w-[7rem] rounded-[0_1rem_0_0] px-4 pt-2.5 font-semibold sm:w-[12.5rem]",
                      "ml-[calc(var(--passo-aba)*var(--i))] [--passo-aba:2.75rem] sm:[--passo-aba:6.5rem]",
                      fundos[i % fundos.length],
                    )}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {f.topico}
                  </span>
                  <div className={cn("rounded-[0_1.5rem_0_1.5rem] rounded-tl-none", fundos[i % fundos.length])}>
                    <h3>
                      <button
                        id={idBotao}
                        type="button"
                        aria-expanded={aberto}
                        aria-controls={idPainel}
                        onClick={() => setAberta(aberto ? -1 : i)}
                        className="flex w-full cursor-pointer items-start justify-between gap-6 px-5 pt-4 pb-8 text-left sm:px-7"
                      >
                        <span className="t-sub">{f.pergunta}</span>
                        <span
                          aria-hidden
                          className={cn(
                            "mt-1.5 size-4 shrink-0 rounded-[0_50%_0_50%] bg-primaria transition-transform duration-300",
                            aberto ? "rotate-90" : "rotate-0",
                          )}
                        />
                      </button>
                    </h3>
                    <div
                      id={idPainel}
                      role="region"
                      aria-labelledby={idBotao}
                      hidden={!aberto}
                      className="px-5 pb-12 sm:px-7"
                    >
                      <p className="t-corpo max-w-[50ch]">{f.resposta}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}
