import { escola } from "@/config/escola";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Link wa.me com mensagem opcional já preenchida. */
export function whatsappLink(mensagem?: string) {
  const base = `https://wa.me/${escola.contato.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const mensagemPadraoWhatsapp = `Olá! Vi o site da ${escola.nome} e gostaria de mais informações.`;

export function instagramLink() {
  return `https://instagram.com/${escola.contato.instagram}`;
}

export function enderecoCompleto() {
  const e = escola.endereco;
  return `${e.rua} – ${e.bairro}, ${e.cidade} – ${e.estado}, ${e.cep}`;
}
