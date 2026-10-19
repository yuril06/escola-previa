"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

/** As features de animação são baixadas depois do carregamento inicial (não bloqueiam o LCP). */
const carregarFeatures = () => import("./motion-features").then((m) => m.default);

/** Carrega só o pacote mínimo do Framer Motion e respeita "reduzir movimento". */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={carregarFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
