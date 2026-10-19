import { DemoBanner } from "@/components/DemoBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Equipe } from "@/components/sections/Equipe";
import { AgendarVisita } from "@/components/sections/AgendarVisita";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Estrutura } from "@/components/sections/Estrutura";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Localizacao } from "@/components/sections/Localizacao";
import { Proposta } from "@/components/sections/Proposta";
import { Rotina } from "@/components/sections/Rotina";
import { Turmas } from "@/components/sections/Turmas";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <DemoBanner />
      <Header />
      <main id="conteudo">
        <Hero />
        <Turmas />
        <Estrutura />
        <Rotina />
        <Proposta />
        <Equipe />
        <Depoimentos />
        <AgendarVisita />
        <Faq />
        <Localizacao />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFlutuante />
    </>
  );
}
