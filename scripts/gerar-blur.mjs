/**
 * Gera os placeholders desfocados (blur) de todas as fotos do config.
 * Uso: npm run blur
 * Saída: src/config/blur-data.json  ({ "url-da-foto": "data:image/webp;base64,..." })
 */
import { readdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Mesmo cálculo do next.config.ts: diz ao config quais fotos locais existem.
process.env.ARQUIVOS_ESCOLA = readdirSync(path.join(raiz, "public/escola")).join("|");
const { escola } = await import(pathToFileURL(path.join(raiz, "src/config/escola.ts")).href);

const ehImagem = (v) =>
  typeof v === "string" &&
  (/^https:\/\/images\.(unsplash|pexels)\.com\//.test(v) || /^\/.*\.(jpe?g|png|webp|avif)$/i.test(v));

const urls = new Set();
(function coletar(valor) {
  if (ehImagem(valor)) urls.add(valor);
  else if (Array.isArray(valor)) valor.forEach(coletar);
  else if (valor && typeof valor === "object") Object.values(valor).forEach(coletar);
})(escola);

async function carregar(src) {
  if (src.startsWith("/")) return readFile(path.join(raiz, "public", src));
  const url = new URL(src);
  url.searchParams.set("w", "64");
  url.searchParams.set("q", "40");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const resultado = {};
await Promise.all(
  [...urls].map(async (src) => {
    try {
      const buf = await sharp(await carregar(src)).resize(16).webp({ quality: 40 }).toBuffer();
      resultado[src] = `data:image/webp;base64,${buf.toString("base64")}`;
      console.log("✓", src);
    } catch (e) {
      console.warn("✗", src, e.message);
    }
  }),
);

await writeFile(path.join(raiz, "src/config/blur-data.json"), JSON.stringify(resultado, null, 2) + "\n");
console.log(`\n${Object.keys(resultado).length} placeholders gerados em src/config/blur-data.json`);
