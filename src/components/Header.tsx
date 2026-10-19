"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CalendarCheck, Menu, X } from "lucide-react";
import { escola } from "@/config/escola";
import { cn, mensagemPadraoWhatsapp, whatsappLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { IconeWhatsApp } from "./ui/icones";

const links = [
  { href: "#turmas", label: "Turmas" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#rotina", label: "Rotina" },
  { href: "#proposta", label: "Proposta" },
  { href: "#depoimentos", label: "Famílias" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        rolou || aberto
          ? "bg-fundo/90 shadow-[0_1px_0_var(--color-linha)] backdrop-blur-md"
          : "bg-fundo/0",
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#inicio" onClick={() => setAberto(false)}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-texto-suave transition hover:bg-primaria-clara hover:text-primaria"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#visita" className="btn-primario hidden min-h-11 px-5 text-sm sm:inline-flex">
            <CalendarCheck className="size-4" aria-hidden />
            Agendar visita
          </a>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-full border border-linha bg-white text-texto transition hover:bg-primaria-clara lg:hidden"
          >
            {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <m.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-linha bg-fundo lg:hidden"
          >
            <nav aria-label="Menu" className="container-site flex flex-col py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="border-b border-linha py-4 font-display text-2xl font-semibold tracking-tight"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-8 grid gap-3">
                <a href="#visita" onClick={() => setAberto(false)} className="btn-primario">
                  <CalendarCheck className="size-5" aria-hidden />
                  Agendar visita
                </a>
                <a
                  href={whatsappLink(mensagemPadraoWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secundario"
                >
                  <IconeWhatsApp className="size-5 text-[#25D366]" />
                  Falar no WhatsApp
                </a>
              </div>
              <p className="mt-6 text-center text-sm text-texto-suave">{escola.horario.exibicao}</p>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
