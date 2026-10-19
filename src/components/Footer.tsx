import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { escola } from "@/config/escola";
import { enderecoCompleto, instagramLink, mensagemPadraoWhatsapp, whatsappLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { IconeInstagram, IconeWhatsApp } from "./ui/icones";

export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-texto pt-14 pb-28 text-white/75 sm:pb-14">
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1.1fr_1fr]">
          <div>
            <Logo claro />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">{escola.descricao}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={instagramLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram @${escola.contato.instagram}`}
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <IconeInstagram className="size-5" />
              </a>
              <a
                href={whatsappLink(mensagemPadraoWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <IconeWhatsApp className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-white">Contato</h2>
            <ul className="mt-4 grid gap-3 text-[0.95rem]">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
                <a href={`tel:${escola.contato.telefone.replace(/\D/g, "")}`} className="hover:text-white">
                  {escola.contato.telefone}
                </a>
              </li>
              <li className="flex gap-3">
                <IconeWhatsApp className="mt-0.5 size-4 shrink-0" />
                <a href={whatsappLink(mensagemPadraoWhatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {escola.contato.whatsappExibicao}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                <a href={`mailto:${escola.contato.email}`} className="hover:text-white">
                  {escola.contato.email}
                </a>
              </li>
              <li className="flex gap-3">
                <IconeInstagram className="mt-0.5 size-4 shrink-0" />
                <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  @{escola.contato.instagram}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-white">Visite a escola</h2>
            <ul className="mt-4 grid gap-3 text-[0.95rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <a href={escola.endereco.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {enderecoCompleto()}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
                {escola.horario.exibicao}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {ano} {escola.nomeCompleto}
          </p>
          {escola.isDemo && <p>Site demonstrativo · fotos Unsplash e vídeo Mixkit</p>}
        </div>
      </div>
    </footer>
  );
}
