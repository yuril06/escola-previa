# Site institucional para berçário e educação infantil

Site de uma página feito em Next.js (App Router), TypeScript e Tailwind CSS v4. Ele não usa banco de dados: **todo o conteúdo vem de [`src/config/escola.ts`](src/config/escola.ts)**. As regras visuais (a forma da pétala, cores, tipos, espaçamento) estão em [`DESIGN.md`](DESIGN.md).

A demo usa uma escola fictícia, a *Casa Jacarandá – Berçário e Educação Infantil* (São Bernardo do Campo), com fotos de exemplo do Unsplash e uma prancha botânica de domínio público.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Como personalizar para uma nova escola (5 passos)

1. **Edite o config.** Abra `src/config/escola.ts` e troque nome, cores, WhatsApp, endereço, link do Google Maps, Instagram, horário, turmas, ambientes, rotina, proposta, equipe, depoimentos e FAQ. As cores viram CSS variables usadas pelo Tailwind (`bg-primaria`, `text-destaque`…), então o site inteiro muda de cor junto. Antes de publicar para um cliente, mude `isDemo` para `false`: isso tira a faixa "Site demonstrativo" e o aviso de depoimentos de exemplo.

2. **Troque o logo.** Coloque `public/escola/logo.svg` (ou `.png`). Ele entra sozinho no lugar do logo em texto. Opcional: `logo-branco.svg` para fundos escuros. O favicon fica em `src/app/icon.svg`.

3. **Troque as fotos.** Solte as fotos em `public/escola/` com os nomes da lista em [`public/escola/LEIA-ME.txt`](public/escola/LEIA-ME.txt) (`hero-1.jpg`, `turma-bercario.jpg`, `ambiente-parque.jpg`…). Cada arquivo que existir substitui a foto de exemplo automaticamente. Depois rode:
   ```bash
   npm run blur
   ```
   e reinicie o `npm run dev`. Atualize também o `alt` de cada foto no config.

4. **Revise os textos de exemplo.** Diretora, notas das turmas, números da equipe e depoimentos são fictícios: troque pelos reais antes de publicar.

5. **Publique na Vercel.** Importe o repositório em [vercel.com/new](https://vercel.com/new) (o Next.js é detectado sozinho) e clique em Deploy. Depois atualize `siteUrl` no config com o domínio final.

## O que já vem pronto

- Seções: hero com fotos que trocam devagar, turmas com a calculadora "Em qual turma seu filho fica?", ambientes, rotina, proposta pedagógica com os campos da BNCC, quem cuida, depoimentos, formulário de visita que abre o WhatsApp com a mensagem preenchida, FAQ e rodapé com endereço e "Como chegar".
- Botão flutuante de WhatsApp e header fixo com menu no celular.
- SEO local: metadata e Open Graph gerados do config, mais JSON-LD `Preschool`/`ChildCare` (endereço, telefone, horário) e `FAQPage`.
- Performance: `next/image` com AVIF/WebP e blur, lazy load abaixo da dobra, Framer Motion carregado de forma assíncrona e nenhum iframe.

## Estrutura

```
DESIGN.md                  ← design system (forma, cores, tipos, seções)
src/config/escola.ts       ← todo o conteúdo e as cores
src/config/blur-data.json  ← gerado por `npm run blur`
src/components/secoes/     ← uma seção por arquivo
public/escola/             ← logo e fotos da escola
public/acervo/             ← imagens de acervo aberto (créditos no rodapé)
```

Se usar fotos de outro banco de imagens remoto, adicione o domínio em `images.remotePatterns` no `next.config.ts`.
