import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { Ambientes } from "@/components/secoes/Ambientes";
import { Duvidas } from "@/components/secoes/Duvidas";
import { FaixaNome } from "@/components/secoes/FaixaNome";
import { Familias } from "@/components/secoes/Familias";
import { Hero } from "@/components/secoes/Hero";
import { Proposta } from "@/components/secoes/Proposta";
import { QuemCuida } from "@/components/secoes/QuemCuida";
import { Rotina } from "@/components/secoes/Rotina";
import { Turmas } from "@/components/secoes/Turmas";
import { Visita } from "@/components/secoes/Visita";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-white focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Turmas />
        <Ambientes />
        <Rotina />
        <FaixaNome />
        <Proposta />
        <QuemCuida />
        <Familias />
        <Visita />
        <Duvidas />
      </main>
      <Footer />
      <WhatsAppFlutuante />
    </>
  );
}
