import { escola } from "@/config/escola";
import { cn, enderecoCompleto, instagramLink, mensagemPadraoWhatsapp, whatsappLink } from "@/lib/utils";

const cores = ["bg-destaque", "bg-secundaria", "bg-suave", "bg-primaria-media", "bg-secundaria-clara"];
const alturas = ["h-[78%]", "h-full", "h-[64%]", "h-[88%]", "h-[70%]", "h-[96%]", "h-[60%]", "h-[84%]", "h-[72%]", "h-[92%]"];

const colunas = [
  {
    titulo: "A escola",
    links: [
      { href: "#turmas", label: "Turmas" },
      { href: "#ambientes", label: "Ambientes" },
      { href: "#rotina", label: "Rotina" },
    ],
  },
  {
    titulo: "O jeito",
    links: [
      { href: "#proposta", label: "Proposta" },
      { href: "#quem-cuida", label: "Quem cuida" },
      { href: "#familias", label: "Famílias" },
    ],
  },
  {
    titulo: "Para decidir",
    links: [
      { href: "#visita", label: "Agendar visita" },
      { href: "#duvidas", label: "Dúvidas" },
      { href: escola.endereco.mapsUrl, label: "Como chegar", externo: true },
    ],
  },
  {
    titulo: "Conversar",
    links: [
      { href: whatsappLink(mensagemPadraoWhatsapp), label: "WhatsApp", externo: true },
      { href: instagramLink(), label: `@${escola.contato.instagram}`, externo: true },
      { href: `mailto:${escola.contato.email}`, label: "E-mail" },
    ],
  },
];

/** Rodapé: a palavra do nome construída em blocos-pétala, depois links e contatos. */
export function Footer() {
  const letras = [...escola.marcaRodape];
  return (
    <footer className="bg-texto pt-14 pb-28 text-white">
      <div className="moldura">
        {/* A marca, construída em blocos */}
        <div aria-hidden translate="no" className="flex h-[22svh] max-h-56 min-h-32 items-end gap-1 lg:h-[34svh] lg:max-h-80">
          {letras.map((l, i) => (
            <span
              key={i}
              className={cn(
                "flex flex-1 items-end justify-center pb-[0.12em] font-display leading-none font-semibold text-texto",
                "text-[min(9.5vw,7.5rem)]",
                cores[i % cores.length],
                alturas[i % alturas.length],
              )}
              style={{ borderRadius: i % 2 ? "0 1.5rem 0 1.5rem" : "1.5rem 0 1.5rem 0" }}
            >
              {l}
            </span>
          ))}
        </div>
        <p className="sr-only">{escola.nomeCompleto}</p>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {colunas.map((c) => (
              <div key={c.titulo}>
                <h2 className="t-nota font-semibold text-white/70">{c.titulo}</h2>
                <ul className="mt-3 grid gap-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...("externo" in l && l.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="t-nota transition-colors hover:text-secundaria"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <address className="grid content-start gap-2 t-nota not-italic lg:col-span-4">
            <p>{enderecoCompleto()}</p>
            <p>{escola.horario.exibicao}</p>
            <p>
              <a href={`tel:${escola.contato.telefone.replace(/\D/g, "")}`} className="hover:text-secundaria">
                {escola.contato.telefone}
              </a>
              {" · "}
              <a href={whatsappLink(mensagemPadraoWhatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-secundaria">
                WhatsApp {escola.contato.whatsappExibicao}
              </a>
            </p>
            <p>
              <a href={`mailto:${escola.contato.email}`} className="hover:text-secundaria">
                {escola.contato.email}
              </a>
            </p>
          </address>
        </div>

        <div className="t-nota mt-14 flex flex-col gap-4 text-white/75 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-1">
            <p>
              © {new Date().getFullYear()} {escola.nomeCompleto}
            </p>
            <p>
              Prancha do jacarandá: Botanical Magazine, 1822, domínio público, via Wikimedia Commons.
              {escola.isDemo && " Fotos de exemplo: Unsplash."}
            </p>
          </div>
          <a href="#visita" className="botao min-h-11 w-fit shrink-0 px-5 t-nota">
            Agendar visita
          </a>
        </div>
      </div>
    </footer>
  );
}
