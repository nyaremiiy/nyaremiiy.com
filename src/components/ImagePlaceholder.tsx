import Image from "next/image";
import type { CSSProperties } from "react";
import s from "./ImagePlaceholder.module.css";

type ProjectProps = {
  image?: string;
  imageSize?: [number, number];
  name: string;
  alt: string;
  colors: { from: string; to: string; ink: string };
};

/**
 * Project screenshot inside the browser frame.
 * Empty `image` → gradient placeholder with the project name.
 * A path such as "/images/komar.jpg" (file in /public/images) → next/image at its own aspect ratio.
 */
export function ImagePlaceholder(props: ProjectProps) {
  if (props.image) {
    const [w, h] = props.imageSize ?? [1600, 900];
    return (
      <Image
        src={props.image}
        alt={props.alt}
        width={w}
        height={h}
        sizes="(max-width: 1100px) 92vw, 600px"
        quality={90}
        className={s.shotImg}
      />
    );
  }
  const style = {
    "--ph-from": props.colors.from,
    "--ph-to": props.colors.to,
    "--ph-ink": props.colors.ink,
  } as CSSProperties;
  return (
    <div className={`${s.shot} ${s.shotPlaceholder}`} style={style} role="img" aria-label={props.alt}>
      <span className={s.shotName}>{props.name}</span>
    </div>
  );
}
