import { Info } from "lucide-react";
import { escola } from "@/config/escola";

/** Faixa "Site demonstrativo" — controlada por `isDemo` no config. */
export function DemoBanner() {
  if (!escola.isDemo) return null;
  return (
    <div className="bg-texto text-white/85">
      <p className="container-site flex items-center justify-center gap-2 py-1.5 text-center text-xs">
        <Info className="size-3.5 shrink-0" aria-hidden />
        <span>
          <strong className="font-semibold text-white">Site demonstrativo</strong> · escola, fotos e
          depoimentos fictícios
        </span>
      </p>
    </div>
  );
}
