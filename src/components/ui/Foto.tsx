import Image, { type ImageProps } from "next/image";
import blurData from "@/config/blur-data.json";

const blurMap = blurData as Record<string, string>;

/** Placeholder neutro e quente para fotos novas antes de rodar `npm run blur`. */
const blurPadrao =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><rect width="8" height="6" fill="#ece5d8"/></svg>`,
  );

type FotoProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & { src: string };

/** next/image com placeholder desfocado automático a partir do config. */
export function Foto({ src, alt, ...props }: FotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurMap[src] ?? blurPadrao}
      {...props}
    />
  );
}
