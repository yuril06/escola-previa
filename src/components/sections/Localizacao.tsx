import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { escola } from "@/config/escola";
import { Reveal } from "../ui/Reveal";

/** Mapa leve: sem iframe do Google, só um card ilustrado + botão "Como chegar". */
export function Localizacao() {
  const e = escola.endereco;
  return (
    <section id="contato" className="pb-16 sm:pb-24">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl border border-linha bg-suave-clara">
            <MapaIlustrado />
            <Pino />
            <div className="relative grid gap-8 p-4 pt-36 sm:p-12 sm:pt-40 lg:pt-12 lg:grid-cols-2 lg:items-center">
              <div className="rounded-4xl bg-white p-6 shadow-elevada sm:p-8">
                <span className="eyebrow">
                  <span aria-hidden className="h-px w-6 bg-primaria/50" />
                  Como chegar
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Pertinho de você, no {e.bairro}
                </h2>
                <ul className="mt-6 grid gap-4 text-[0.98rem]">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primaria" aria-hidden />
                    <address className="not-italic">
                      {e.rua} – {e.bairro}
                      <br />
                      {e.cidade} – {e.estado}, {e.cep}
                    </address>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-primaria" aria-hidden />
                    {escola.horario.exibicao}
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-primaria" aria-hidden />
                    <a href={`tel:${escola.contato.telefone.replace(/\D/g, "")}`} className="underline-offset-4 hover:underline">
                      {escola.contato.telefone}
                    </a>
                  </li>
                </ul>
                <a href={e.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primario mt-7 w-full sm:w-auto">
                  <Navigation className="size-5" aria-hidden />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MapaIlustrado() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 500"
    >
      <rect width="800" height="500" className="fill-suave-clara" />
      <path d="M520 0 C 560 140, 700 180, 800 160 L800 0Z" className="fill-primaria-clara" />
      <path d="M600 500 C 620 400, 720 360, 800 380 L800 500Z" className="fill-primaria-clara" />
      <g fill="none" stroke="white" strokeLinecap="round">
        <path d="M-20 120 C 200 160, 420 60, 820 140" strokeWidth="22" />
        <path d="M-20 380 C 260 330, 500 420, 820 300" strokeWidth="16" />
        <path d="M640 -20 C 600 160, 700 320, 600 520" strokeWidth="18" />
        <path d="M420 -20 C 440 200, 380 360, 460 520" strokeWidth="10" />
      </g>
    </svg>
  );
}

function Pino() {
  return (
    <div aria-hidden className="absolute top-10 left-1/2 -translate-x-1/2 lg:top-1/2 lg:left-[72%] lg:-translate-y-1/2">
      <span className="absolute top-1/2 left-1/2 size-24 -translate-1/2 rounded-full bg-destaque/10" />
      <span className="absolute top-1/2 left-1/2 size-16 -translate-1/2 rounded-full bg-destaque/20" />
      <MapPin className="relative size-12 fill-destaque text-white" strokeWidth={1.5} />
    </div>
  );
}
