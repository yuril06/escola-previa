"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { escola } from "@/config/escola";
import { mensagemPadraoWhatsapp, whatsappLink } from "@/lib/utils";
import { Logo } from "./Logo";

const links = [
  { href: "#turmas", label: "Turmas" },
  { href: "#ambientes", label: "Ambientes" },
  { href: "#rotina", label: "Rotina" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <header className="sticky top-0 z-40 bg-fundo">
      <div className="moldura flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#inicio" onClick={() => setAberto(false)} className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-medium transition-colors hover:text-primaria">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#visita" className="botao hidden min-h-11 px-5 t-nota sm:inline-flex">
            Agendar visita
          </a>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-celular"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-[0_1rem_0_1rem] bg-creme transition-colors hover:bg-secundaria-clara lg:hidden"
          >
            {aberto ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <m.div
            id="menu-celular"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-fundo lg:hidden"
          >
            <nav aria-label="Menu" className="moldura flex flex-col gap-1 py-6">
              {[...links, { href: "#proposta", label: "Proposta" }, { href: "#familias", label: "Famílias" }].map(
                (l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setAberto(false)}
                    className="t-titulo py-2 transition-colors hover:text-primaria"
                  >
                    {l.label}
                  </a>
                ),
              )}
              <div className="mt-8 grid gap-3">
                <a href="#visita" onClick={() => setAberto(false)} className="botao">
                  Agendar visita
                </a>
                <a
                  href={whatsappLink(mensagemPadraoWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link self-center py-2"
                >
                  Falar no WhatsApp
                </a>
              </div>
              <p className="t-nota mt-4 text-center text-texto-suave">{escola.horario.exibicao}</p>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
