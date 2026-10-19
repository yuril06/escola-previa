import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { escola } from "@/config/escola";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--fonte-display",
  weight: ["600"],
  display: "swap",
});

const corpo = Figtree({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  weight: ["400", "500", "600"],
  display: "swap",
});

const titulo = `${escola.nomeCompleto} | ${escola.endereco.cidade}`;

export const metadata: Metadata = {
  metadataBase: new URL(escola.siteUrl),
  title: titulo,
  description: escola.descricao,
  keywords: [
    "berçário",
    "educação infantil",
    "escola infantil",
    `berçário em ${escola.endereco.cidade}`,
    `escola infantil ${escola.endereco.bairro}`,
    "período integral",
    escola.nome,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: escola.siteUrl,
    siteName: escola.nomeCompleto,
    title: titulo,
    description: escola.descricao,
    images: [{ url: escola.video.capa, width: 1600, height: 1067, alt: escola.video.capaAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: escola.descricao,
    images: [escola.video.capa],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: escola.cores.fundo,
  width: "device-width",
  initialScale: 1,
};

/** Cores do config → CSS variables consumidas pelo Tailwind (ver globals.css). */
const cssVars = `:root{${Object.entries(escola.cores)
  .map(([k, v]) => `--cor-${k}:${v};`)
  .join("")}}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Preschool", "ChildCare"],
  name: escola.nomeCompleto,
  description: escola.descricao,
  url: escola.siteUrl,
  image: escola.video.capa,
  telephone: escola.contato.telefone,
  email: escola.contato.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: escola.endereco.rua,
    addressLocality: escola.endereco.cidade,
    addressRegion: escola.endereco.estado,
    postalCode: escola.endereco.cep,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: escola.endereco.latitude,
    longitude: escola.endereco.longitude,
  },
  hasMap: escola.endereco.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: escola.horario.dias,
      opens: escola.horario.abre,
      closes: escola.horario.fecha,
    },
  ],
  sameAs: [`https://instagram.com/${escola.contato.instagram}`],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans text-base">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
