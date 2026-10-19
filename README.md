# Site institucional para berçário e educação infantil

Site de uma página feito em Next.js (App Router), TypeScript e Tailwind CSS v4. Ele não usa banco de dados: **todo o conteúdo vem de [`src/config/escola.ts`](src/config/escola.ts)**.

A demo usa uma escola fictícia, a *Casa Jacarandá – Berçário e Educação Infantil* (São Bernardo do Campo), com fotos do Unsplash e vídeo do Mixkit.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Como personalizar para uma nova escola (5 passos)

1. **Edite o config.** Abra `src/config/escola.ts` e troque nome, slogan, cores, WhatsApp, endereço, link do Google Maps, Instagram, horário, turmas, rotina, diferenciais, depoimentos e FAQ. As cores viram CSS variables usadas pelo Tailwind (`bg-primaria`, `text-destaque`…), então o site inteiro muda de cor junto. Antes de publicar para um cliente, mude `isDemo` para `false`: isso tira a faixa "Site demonstrativo" e o selo "Depoimentos de exemplo".

2. **Troque o logo.** Coloque o arquivo em `public/escola/logo.svg` (ou `.png`) e preencha `logo.imagem: "/escola/logo.svg"` com largura e altura proporcionais. Enquanto ficar `null`, aparece o logo em texto com o símbolo de flor. O favicon fica em `src/app/icon.svg`.

3. **Troque as fotos.** Cada foto no config está marcada com `// 📷 TROCAR`. Coloque as fotos reais em `public/escola/` e use o caminho (`"/escola/bercario.jpg"`). Depois rode:
   ```bash
   npm run blur
   ```
   Esse comando gera os placeholders desfocados (`src/config/blur-data.json`). Dicas para as fotos: horizontais, com 1600px ou mais, mostrando ambientes, mãos ou crianças de costas, e com autorização de imagem. Atualize também o `alt` de cada foto.

4. **Coloque o vídeo.** Em `video.url`, use um arquivo local (`"/escola/tour.mp4"`, de preferência com menos de 20 MB) ou um link do YouTube (`https://youtu.be/...`). O tipo é detectado automaticamente. Troque também `video.capa`, que é a imagem do botão de play e da prévia no WhatsApp/Open Graph.

5. **Publique na Vercel.** Suba o projeto para um repositório no GitHub, importe-o em [vercel.com/new](https://vercel.com/new) (o Next.js é detectado sozinho) e clique em Deploy. Depois atualize `siteUrl` no config com o domínio final.

## O que já vem pronto

- Seções: hero com vídeo tour em modal, números de confiança, turmas, galeria com carrossel (swipe no mobile) e lightbox, rotina, proposta pedagógica com os campos da BNCC, depoimentos, formulário de visita que abre o WhatsApp com a mensagem preenchida, FAQ, "Como chegar" e rodapé.
- Botão flutuante de WhatsApp e header fixo com menu mobile.
- SEO local: metadata e Open Graph gerados do config, mais JSON-LD `Preschool`/`ChildCare` (endereço, telefone, horário) e `FAQPage`.
- Performance: `next/image` com AVIF/WebP e blur, lazy load abaixo da dobra, vídeo e lightbox carregados só quando abertos, Framer Motion carregado de forma assíncrona (`LazyMotion`) e mapa sem iframe.

## Estrutura

```
src/config/escola.ts       ← todo o conteúdo e as cores
src/config/blur-data.json  ← gerado por `npm run blur`
src/components/sections/   ← uma seção por arquivo
public/escola/             ← logo, fotos e vídeo da escola
```

Se usar fotos de outro banco de imagens remoto, adicione o domínio em `images.remotePatterns` no `next.config.ts`.
