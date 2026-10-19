import { Plus } from "lucide-react";
import { escola } from "@/config/escola";
import { mensagemPadraoWhatsapp, whatsappLink } from "@/lib/utils";
import { CabecalhoSecao } from "../ui/CabecalhoSecao";
import { IconeWhatsApp } from "../ui/icones";

export function Faq() {
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
    <section id="duvidas" className="py-16 sm:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <CabecalhoSecao
            eyebrow="Dúvidas frequentes"
            titulo="Perguntas que todo pai e mãe faz"
            texto="Não encontrou o que procurava? Fale com a gente, respondemos rapidinho."
          />
          <a
            href={whatsappLink(mensagemPadraoWhatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secundario mt-7"
          >
            <IconeWhatsApp className="size-5 text-[#25D366]" />
            Perguntar no WhatsApp
          </a>
        </div>

        <div className="divide-y divide-linha border-y border-linha">
          {escola.faq.map((f) => (
            <details key={f.pergunta} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold tracking-tight sm:text-xl [&::-webkit-details-marker]:hidden">
                {f.pergunta}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primaria-clara text-primaria transition duration-300 group-open:rotate-45 group-open:bg-primaria group-open:text-white">
                  <Plus className="size-5" aria-hidden />
                </span>
              </summary>
              <p className="-mt-1 pr-12 pb-6 leading-relaxed text-texto-suave">{f.resposta}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}
