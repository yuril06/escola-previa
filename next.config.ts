import { readdirSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/** Arquivos em /public/escola — o config usa a foto local quando ela existe (ver `foto()` em escola.ts). */
function arquivosDaEscola() {
  try {
    return readdirSync(path.join(__dirname, "public/escola")).join("|");
  } catch {
    return "";
  }
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  env: {
    ARQUIVOS_ESCOLA: arquivosDaEscola(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1280, 1600, 1920],
    // Bancos de imagem gratuitos usados na demo. Fotos locais (/public/escola) não precisam disso.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
