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

export type VideoInfo =
  | { tipo: "youtube"; id: string; embed: string }
  | { tipo: "arquivo"; src: string };

/** Detecta se o vídeo do config é YouTube ou arquivo (.mp4 local ou remoto). */
export function parseVideo(url: string): VideoInfo {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) {
    const id = yt[1];
    return {
      tipo: "youtube",
      id,
      embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
    };
  }
  return { tipo: "arquivo", src: url };
}
