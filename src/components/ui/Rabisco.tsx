import { cn } from "@/lib/utils";

/** Sublinhado "desenhado à mão" para destacar um trecho de título. */
export function Rabisco({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className={cn("absolute -bottom-[0.12em] left-[-2%] h-[0.38em] w-[104%] text-secundaria", className)}
      >
        <path
          d="M3 15c38-7 84-11 141-9 52 2 101 6 153 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          className="rabisco"
        />
      </svg>
    </span>
  );
}

/** Quebra o título e envolve `destaque` com o Rabisco. */
export function TituloComDestaque({ titulo, destaque }: { titulo: string; destaque?: string }) {
  if (!destaque || !titulo.includes(destaque)) return <>{titulo}</>;
  const [antes, depois] = titulo.split(destaque);
  return (
    <>
      {antes}
      <Rabisco>{destaque}</Rabisco>
      {depois}
    </>
  );
}
