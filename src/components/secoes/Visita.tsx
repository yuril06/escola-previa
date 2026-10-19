"use client";

import { useEffect, useState } from "react";
import { escola } from "@/config/escola";
import { cn, enderecoCompleto, whatsappLink } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";

const EVENTO = "preencher-visita";

/** Pré-preenche a idade no formulário (usado pela calculadora de turma). */
export function preencherVisita(idade: string) {
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: idade }));
}

type Campos = { nome: string; whatsapp: string; idade: string; periodo: string };
type Erros = Partial<Record<keyof Campos, string>>;

function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validar(c: Campos): Erros {
  const e: Erros = {};
  if (c.nome.trim().length < 2) e.nome = "Conte pra gente seu nome.";
  const digitos = c.whatsapp.replace(/\D/g, "").length;
  if (digitos < 10 || digitos > 11) e.whatsapp = "Informe um WhatsApp com DDD.";
  if (!c.idade) e.idade = "Escolha a idade da criança.";
  if (!c.periodo) e.periodo = "Escolha um período.";
  return e;
}

const campoBase =
  "mt-1.5 block h-13 w-full rounded-[0_0.875rem_0_0.875rem] bg-white/15 px-4 text-base text-white transition-colors outline-none placeholder:text-white/70 hover:bg-white/20 focus:bg-white/25 focus-visible:ring-3 focus-visible:ring-secundaria";

/** Formulário em forma de cupom: cartão verde com recortes e picote. Envia pelo WhatsApp. */
export function Visita() {
  const [campos, setCampos] = useState<Campos>({ nome: "", whatsapp: "", idade: "", periodo: "" });
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const aoPreencher = (e: Event) => {
      const idade = (e as CustomEvent<string>).detail;
      setCampos((c) => ({ ...c, idade }));
      setErros((er) => ({ ...er, idade: undefined }));
    };
    window.addEventListener(EVENTO, aoPreencher);
    return () => window.removeEventListener(EVENTO, aoPreencher);
  }, []);

  const atualizar = (k: keyof Campos, v: string) => {
    setCampos((c) => ({ ...c, [k]: v }));
    if (erros[k]) setErros((e) => ({ ...e, [k]: undefined }));
  };

  const enviar = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validar(campos);
    setErros(e);
    const primeiro = Object.keys(e)[0];
    if (primeiro) {
      document.getElementById(`campo-${primeiro}`)?.focus();
      return;
    }
    const mensagem = [
      `Olá, ${escola.nome}! Gostaria de agendar uma visita.`,
      "",
      `*Nome:* ${campos.nome.trim()}`,
      `*WhatsApp:* ${campos.whatsapp}`,
      `*Idade da criança:* ${campos.idade}`,
      `*Período preferido:* ${campos.periodo}`,
    ].join("\n");
    window.open(whatsappLink(mensagem), "_blank", "noopener,noreferrer");
    setEnviado(true);
  };

  const ariaCampo = (k: keyof Campos) => ({
    id: `campo-${k}`,
    name: k,
    "aria-invalid": !!erros[k],
    "aria-describedby": erros[k] ? `erro-${k}` : undefined,
  });

  return (
    <section id="visita" aria-labelledby="titulo-visita" className="moldura py-28 lg:py-40">
      <Reveal>
        <div className="relative mx-auto max-w-[68rem] rounded-[0_2.5rem_0_2.5rem] bg-primaria text-white">
          {/* Recortes e picote: círculos da cor do fundo e uma linha pontilhada */}
          <span aria-hidden className="absolute top-0 left-[46%] hidden size-7 -translate-1/2 rounded-full bg-fundo lg:block" />
          <span aria-hidden className="absolute bottom-0 left-[46%] hidden size-7 -translate-x-1/2 translate-y-1/2 rounded-full bg-fundo lg:block" />
          <span aria-hidden className="absolute top-6 bottom-6 left-[46%] hidden -translate-x-1/2 border-l-[5px] border-dotted border-fundo lg:block" />

          <div className="grid lg:grid-cols-[46%_54%]">
            <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
              <div>
                <h2 id="titulo-visita" className="t-titulo">
                  {escola.visita.titulo}
                </h2>
                <p className="t-corpo mt-4 max-w-[34ch] text-white/90">{escola.visita.texto}</p>
              </div>
              <div className="t-nota grid gap-1 text-white/90">
                <p>{enderecoCompleto()}</p>
                <p>{escola.horario.exibicao}</p>
                <a
                  href={escola.endereco.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-fit font-semibold text-white underline decoration-white/40 decoration-2 underline-offset-4 hover:decoration-white"
                >
                  Como chegar pelo Google Maps
                </a>
              </div>
            </div>

            {/* Picote horizontal no celular */}
            <div aria-hidden className="relative h-7 lg:hidden">
              <span className="absolute top-1/2 left-0 size-7 -translate-1/2 rounded-full bg-fundo" />
              <span className="absolute top-1/2 right-0 size-7 translate-x-1/2 -translate-y-1/2 rounded-full bg-fundo" />
              <span className="absolute top-1/2 right-6 left-6 -translate-y-1/2 border-t-[5px] border-dotted border-fundo" />
            </div>

            <form noValidate onSubmit={enviar} className="grid gap-4 p-7 sm:p-10 lg:p-12" aria-label="Agendar visita">
              <div>
                <label htmlFor="campo-nome" className="t-nota font-semibold">
                  Seu nome
                </label>
                <input
                  {...ariaCampo("nome")}
                  autoComplete="name"
                  placeholder="Ex.: Ana Souza…"
                  value={campos.nome}
                  onChange={(e) => atualizar("nome", e.target.value)}
                  className={cn(campoBase, erros.nome && "ring-3 ring-secundaria")}
                />
                <Erro id="erro-nome" texto={erros.nome} />
              </div>
              <div>
                <label htmlFor="campo-whatsapp" className="t-nota font-semibold">
                  WhatsApp com DDD
                </label>
                <input
                  {...ariaCampo("whatsapp")}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Ex.: (11) 91234-5678…"
                  value={campos.whatsapp}
                  onChange={(e) => atualizar("whatsapp", mascaraTelefone(e.target.value))}
                  className={cn(campoBase, erros.whatsapp && "ring-3 ring-secundaria")}
                />
                <Erro id="erro-whatsapp" texto={erros.whatsapp} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="campo-idade" className="t-nota font-semibold">
                    Idade da criança
                  </label>
                  <select
                    {...ariaCampo("idade")}
                    value={campos.idade}
                    onChange={(e) => atualizar("idade", e.target.value)}
                    className={cn(campoBase, "cursor-pointer [color-scheme:dark] [&>option]:bg-white [&>option]:text-texto", !campos.idade && "text-white/70", erros.idade && "ring-3 ring-secundaria")}
                  >
                    <option value="" disabled>
                      Selecione…
                    </option>
                    {escola.visita.idades.map((i) => (
                      <option key={i} value={i} className="text-texto">
                        {i}
                      </option>
                    ))}
                  </select>
                  <Erro id="erro-idade" texto={erros.idade} />
                </div>
                <div>
                  <label htmlFor="campo-periodo" className="t-nota font-semibold">
                    Período da visita
                  </label>
                  <select
                    {...ariaCampo("periodo")}
                    value={campos.periodo}
                    onChange={(e) => atualizar("periodo", e.target.value)}
                    className={cn(campoBase, "cursor-pointer [color-scheme:dark] [&>option]:bg-white [&>option]:text-texto", !campos.periodo && "text-white/70", erros.periodo && "ring-3 ring-secundaria")}
                  >
                    <option value="" disabled>
                      Selecione…
                    </option>
                    {escola.visita.periodos.map((p) => (
                      <option key={p} value={p} className="text-texto">
                        {p}
                      </option>
                    ))}
                  </select>
                  <Erro id="erro-periodo" texto={erros.periodo} />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 flex h-14 w-full cursor-pointer items-center justify-center rounded-[0_1.25rem_0_1.25rem] bg-texto font-semibold text-white transition-[background-color,transform] hover:bg-black active:scale-[0.98]"
              >
                Agendar pelo WhatsApp
              </button>
              <p className="t-nota text-white/85" aria-live="polite">
                {enviado
                  ? "Abrimos o WhatsApp com a sua mensagem. É só enviar."
                  : "Abrimos o WhatsApp da escola com a mensagem já escrita."}
              </p>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Erro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} role="alert" className="t-nota mt-1.5 font-semibold text-secundaria-clara">
      {texto}
    </p>
  );
}
