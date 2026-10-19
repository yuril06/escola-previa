/**
 * A forma do site (ver DESIGN.md): a pétala do jacarandá — um quadrado com dois
 * cantos opostos arredondados. A flor é a mesma pétala girada cinco vezes.
 */

/** Pétala num quadro 10×10, pontas em (0,0) e (10,10). */
export const PETALA = "M0 0H5A5 5 0 0 1 10 5V10H5A5 5 0 0 1 0 5Z";

const coresPadrao = [
  "fill-destaque",
  "fill-secundaria",
  "fill-suave",
  "fill-primaria",
  "fill-destaque-clara",
];

/** Flor de cinco pétalas. `cores` recebe classes de fill, uma por pétala. */
export function Flor({
  className,
  cores = coresPadrao,
  miolo = "fill-secundaria",
}: {
  className?: string;
  cores?: string[];
  miolo?: string | null;
}) {
  return (
    <svg viewBox="-11 -11 22 22" className={className} aria-hidden="true" focusable="false">
      {[0, 72, 144, 216, 288].map((giro, i) => (
        <path
          key={giro}
          d={PETALA}
          transform={`rotate(${giro + 45}) translate(-10 -10)`}
          className={cores[i % cores.length]}
        />
      ))}
      {miolo && <circle r="1.9" className={miolo} />}
    </svg>
  );
}

/** Uma pétala solta (marcador, faixa, fichas). */
export function Petala({ className, giro = 0 }: { className?: string; giro?: number }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={className}
      style={giro ? ({ "--giro": `${giro}deg`, transform: `rotate(${giro}deg)` } as React.CSSProperties) : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path d={PETALA} fill="currentColor" />
    </svg>
  );
}
