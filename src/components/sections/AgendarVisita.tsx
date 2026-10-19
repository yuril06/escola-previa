"use client";

import { useState } from "react";
import { CalendarCheck, ChevronDown, Clock, MapPin, ShieldCheck } from "lucide-react";
import { escola } from "@/config/escola";
import { cn, whatsappLink } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";
import { IconeWhatsApp } from "../ui/icones";

type Campos = { nome: string; whatsapp: string; idade: string; periodo: string };
type Erros = Partial<Record<keyof Campos, string>>;

const vazio: Campos = { nome: "", whatsapp: "", idade: "", periodo: "" };

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

export function AgendarVisita() {
  const [campos, setCampos] = useState<Campos>(vazio);
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);

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

  const classeCampo = (erro?: string) =>
    cn(
      "mt-1.5 block h-13 w-full rounded-2xl border bg-white px-4 text-base text-texto transition outline-none placeholder:text-texto/40",
      "focus:border-primaria focus:ring-4 focus:ring-primaria/15",
      erro ? "border-destaque ring-4 ring-destaque/10" : "border-linha",
    );

  return (
    <section id="visita" className="relative py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 -right-24 size-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--color-suave-clara),transparent)]" />
      </div>

      <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <span className="eyebrow">
            <span aria-hidden className="h-px w-6 bg-primaria/50" />
            Agende sua visita
          </span>
          <h2 className="titulo-secao mt-3">{escola.visita.titulo}</h2>
          <p className="mt-4 text-[1.04rem] leading-relaxed text-texto-suave sm:text-lg">{escola.visita.texto}</p>
          <ul className="mt-8 grid gap-4 text-[0.95rem]">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primaria" aria-hidden />
              {escola.horario.exibicao}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primaria" aria-hidden />
              {escola.endereco.bairro}, {escola.endereco.cidade}
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primaria" aria-hidden />
              Seus dados só são usados para confirmar a visita.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            noValidate
            onSubmit={enviar}
            className="rounded-4xl border border-linha bg-white p-6 shadow-elevada sm:p-9"
            aria-label="Formulário para agendar visita"
          >
            <div className="grid gap-5">
              <div>
                <label htmlFor="campo-nome" className="text-sm font-semibold">
                  Seu nome
                </label>
                <input
                  id="campo-nome"
                  name="nome"
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  value={campos.nome}
                  onChange={(e) => atualizar("nome", e.target.value)}
                  aria-invalid={!!erros.nome}
                  aria-describedby={erros.nome ? "erro-nome" : undefined}
                  className={classeCampo(erros.nome)}
                />
                <Erro id="erro-nome" texto={erros.nome} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="campo-whatsapp" className="text-sm font-semibold">
                    WhatsApp
                  </label>
                  <input
                    id="campo-whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="(11) 90000-0000"
                    value={campos.whatsapp}
                    onChange={(e) => atualizar("whatsapp", mascaraTelefone(e.target.value))}
                    aria-invalid={!!erros.whatsapp}
                    aria-describedby={erros.whatsapp ? "erro-whatsapp" : undefined}
                    className={classeCampo(erros.whatsapp)}
                  />
                  <Erro id="erro-whatsapp" texto={erros.whatsapp} />
                </div>
                <div>
                  <label htmlFor="campo-idade" className="text-sm font-semibold">
                    Idade da criança
                  </label>
                  <div className="relative">
                  <select
                    id="campo-idade"
                    name="idade"
                    value={campos.idade}
                    onChange={(e) => atualizar("idade", e.target.value)}
                    aria-invalid={!!erros.idade}
                    aria-describedby={erros.idade ? "erro-idade" : undefined}
                    className={cn(classeCampo(erros.idade), "appearance-none pr-11", !campos.idade && "text-texto/50")}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {escola.visita.idades.map((i) => (
                      <option key={i} value={i} className="text-texto">
                        {i}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 mt-0.75 size-5 -translate-y-1/2 text-texto-suave" />
                  </div>
                  <Erro id="erro-idade" texto={erros.idade} />
                </div>
              </div>

              <fieldset aria-describedby={erros.periodo ? "erro-periodo" : undefined}>
                <legend className="text-sm font-semibold">Período preferido para a visita</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {escola.visita.periodos.map((p, i) => (
                    <label
                      key={p}
                      className={cn(
                        "flex h-12 cursor-pointer items-center justify-center rounded-2xl border text-[0.95rem] font-medium transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primaria/25",
                        campos.periodo === p
                          ? "border-primaria bg-primaria-clara text-primaria"
                          : erros.periodo
                            ? "border-destaque/60 bg-white"
                            : "border-linha bg-white hover:border-primaria/40",
                      )}
                    >
                      <input
                        id={i === 0 ? "campo-periodo" : undefined}
                        type="radio"
                        name="periodo"
                        value={p}
                        checked={campos.periodo === p}
                        onChange={() => atualizar("periodo", p)}
                        className="sr-only"
                      />
                      {p}
                    </label>
                  ))}
                </div>
                <Erro id="erro-periodo" texto={erros.periodo} />
              </fieldset>

              <button type="submit" className="btn-primario mt-1 w-full min-h-14 text-base">
                <IconeWhatsApp className="size-5" />
                Agendar pelo WhatsApp
              </button>

              <p className="text-center text-xs leading-relaxed text-texto-suave" aria-live="polite">
                {enviado ? (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-primaria">
                    <CalendarCheck className="size-4" aria-hidden />
                    Abrimos o WhatsApp com sua mensagem. É só enviar!
                  </span>
                ) : (
                  "Ao enviar, abrimos o WhatsApp da escola com a mensagem já preenchida."
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Erro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-erro" role="alert">
      {texto}
    </p>
  );
}
