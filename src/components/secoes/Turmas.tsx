"use client";

import { useId, useState } from "react";
import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";
import { preencherVisita } from "./Visita";

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];
const coresMarcador = ["bg-destaque", "bg-secundaria", "bg-suave", "bg-primaria", "bg-destaque"];

type Resultado =
  | { tipo: "turma"; indice: number; idade: string }
  | { tipo: "bebe"; idade: string }
  | { tipo: "fundamental" };

/** Turma no ano letivo, pela data de corte de 31/03 (idade completa até lá). */
function calcular(mes: number, ano: number): Resultado {
  const letivo = escola.anoLetivo;
  const anos = letivo - ano - (mes > 3 ? 1 : 0);
  const mesesNoInicio = (letivo - ano) * 12 + (2 - mes); // em fevereiro do ano letivo
  if (mesesNoInicio < 4) return { tipo: "bebe", idade: mesesNoInicio < 0 ? "Ainda vai nascer" : "4 a 11 meses" };
  if (anos >= 6) return { tipo: "fundamental" };
  const indice = escola.turmas.findIndex((t) => anos >= t.idadeEmMarco[0] && anos <= t.idadeEmMarco[1]);
  const idade = anos === 0 ? "4 a 11 meses" : anos === 1 ? "1 ano" : `${anos} anos`;
  return { tipo: "turma", indice, idade };
}

export function Turmas() {
  const id = useId();
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const resultado = mes && ano ? calcular(Number(mes), Number(ano)) : null;
  const destacada = resultado?.tipo === "turma" ? resultado.indice : resultado?.tipo === "bebe" ? 0 : -1;
  const anos = Array.from({ length: 8 }, (_, i) => escola.anoLetivo - i);

  return (
    <section id="turmas" aria-labelledby="titulo-turmas" className="moldura pt-24 pb-24 lg:pt-32 lg:pb-32">
      <Reveal className="flex items-baseline justify-between gap-6">
        <h2 id="titulo-turmas" className="t-titulo">
          Turmas de {escola.anoLetivo}
        </h2>
        <p className="t-corpo shrink-0 font-semibold">{escola.turmas.length} turmas</p>
      </Reveal>

      {/* O elemento interativo: calculadora de turma */}
      <Reveal delay={0.08}>
        <form
          className="mt-10 grid gap-5 rounded-[0_2rem_0_2rem] bg-secundaria-clara p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10"
          onSubmit={(e) => e.preventDefault()}
          aria-describedby={`${id}-resultado`}
        >
          <fieldset className="min-w-0">
            <legend className="t-sub">Em qual turma seu filho fica?</legend>
            <p className="t-corpo mt-1">Escolha o mês e o ano em que ele nasceu (ou vai nascer).</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
              <label className="grid gap-1.5">
                <span className="t-nota font-semibold">Mês</span>
                <select
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  className="h-12 w-full cursor-pointer rounded-[0_0.75rem_0_0.75rem] bg-white px-3 text-base text-texto"
                  name="mes-nascimento"
                >
                  <option value="">Mês…</option>
                  {MESES.map((m, i) => (
                    <option key={m} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5">
                <span className="t-nota font-semibold">Ano</span>
                <select
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  className="h-12 w-full cursor-pointer rounded-[0_0.75rem_0_0.75rem] bg-white px-3 text-base text-texto"
                  name="ano-nascimento"
                >
                  <option value="">Ano…</option>
                  {anos.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          <div id={`${id}-resultado`} aria-live="polite" className="min-h-[5.5rem] lg:w-[24rem]">
            {!resultado && (
              <p className="t-corpo">A turma de {escola.anoLetivo} aparece aqui, já com a data de corte de 31 de março.</p>
            )}
            {resultado?.tipo === "turma" && (
              <>
                <p className="t-sub">
                  Em {escola.anoLetivo}: {escola.turmas[resultado.indice].nome}
                </p>
                <a
                  href="#visita"
                  className="link mt-2 inline-block"
                  onClick={() => preencherVisita(resultado.idade)}
                >
                  Agendar visita para essa turma
                </a>
              </>
            )}
            {resultado?.tipo === "bebe" && (
              <>
                <p className="t-sub">Berçário, a partir dos 4 meses</p>
                <a href="#visita" className="link mt-2 inline-block" onClick={() => preencherVisita(resultado.idade)}>
                  Reservar a vaga com antecedência
                </a>
              </>
            )}
            {resultado?.tipo === "fundamental" && (
              <p className="t-sub">Em {escola.anoLetivo}, ele já vai para o 1º ano do Fundamental.</p>
            )}
          </div>
        </form>
      </Reveal>

      <ul className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-2">
        {escola.turmas.map((t, i) => (
          <li key={t.nome}>
            <Reveal delay={(i % 2) * 0.07}>
              <article
                className={cn(
                  "-m-3 grid grid-cols-[3.25rem_1fr] gap-x-5 rounded-[0_1.5rem_0_1.5rem] p-3 transition-colors duration-300 sm:grid-cols-[4rem_1fr]",
                  destacada === i && "bg-primaria-clara",
                )}
              >
                <div className="petala relative aspect-square overflow-hidden bg-creme">
                  <Foto src={t.foto} alt={t.alt} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="t-sub">{t.nome}</h3>
                    <p className="t-corpo shrink-0 font-semibold">{t.faixa}</p>
                  </div>
                  <p className="t-corpo mt-1 max-w-[46ch]">{t.descricao}</p>
                  <p className="t-nota mt-2 flex items-center gap-2 font-semibold text-primaria">
                    <span className={cn("marcador", coresMarcador[i % coresMarcador.length])} aria-hidden />
                    {t.nota}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
