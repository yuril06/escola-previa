import { mensagemPadraoWhatsapp, whatsappLink } from "@/lib/utils";
import { IconeWhatsApp } from "./ui/icones";

export function WhatsAppFlutuante() {
  return (
    <a
      href={whatsappLink(mensagemPadraoWhatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.4)] transition hover:scale-105 hover:bg-[#1FBF5B] sm:right-6 sm:bottom-6 sm:pr-5"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <IconeWhatsApp className="size-7" />
      <span className="hidden text-sm font-semibold sm:inline">Fale conosco</span>
    </a>
  );
}
