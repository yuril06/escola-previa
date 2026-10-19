import { escola } from "@/config/escola";
import { cn } from "@/lib/utils";
import { CabecalhoSecao } from "../ui/CabecalhoSecao";
import { Foto } from "../ui/Foto";
import { Reveal } from "../ui/Reveal";

const coresFaixa = [
  "bg-destaque-clara text-texto",
  "bg-secundaria-clara text-texto",
  "bg-suave-clara text-texto",
  "bg-primaria-clara text-texto",
];

export function Turmas() {
  return (
    <section id="turmas" className="py-16 sm:py-24">
      <div className="container-site">
        <CabecalhoSecao
          eyebrow="Turmas"
          titulo="Do primeiro colo aos 5 anos"
          texto="Turmas pequenas, organizadas por idade, com educadoras de referência que acompanham cada fase de perto."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {escola.turmas.map((t, i) => (
            <li key={t.nome} className={i === 0 ? "sm:col-span-2 lg:col-span-3" : i === 1 ? "lg:col-span-3" : "lg:col-span-2"}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-linha bg-white shadow-suave transition duration-300 hover:-translate-y-1 hover:shadow-elevada">
                  <div
                    className={cn("relative aspect-[16/10]", i === 0 && "sm:aspect-[16/8]", i < 2 && "lg:aspect-[16/9]")}
                  >
                    <Foto
                      src={t.foto}
                      alt={t.alt}
                      fill
                      sizes={i < 2 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"}
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6">
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${coresFaixa[i % coresFaixa.length]}`}
                    >
                      {t.faixa}
                    </span>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{t.nome}</h3>
                    <p className="leading-relaxed text-texto-suave">{t.descricao}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
