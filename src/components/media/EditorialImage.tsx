"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_ENTRANCE, useRevealSafety } from "@/components/motion/primitives";

export type RevealPattern = "mask-up" | "mask-left" | "mask-right" | "scale" | "none";

const clipFrom: Record<Exclude<RevealPattern, "none" | "scale">, string> = {
  "mask-up": "inset(100% 0% 0% 0%)",
  "mask-left": "inset(0% 100% 0% 0%)",
  "mask-right": "inset(0% 0% 0% 100%)",
};

export interface EditorialImageProps {
  src: StaticImageData;
  alt: string;
  /** CSS aspect-ratio for the frame, e.g. "4 / 5". */
  ratio?: string;
  /** object-position, for subjects that sit off-centre. */
  position?: string;
  /** Distinct patterns keep neighbouring sections from animating identically. */
  pattern?: RevealPattern;
  /** Above-the-fold images should set this — it also disables lazy loading. */
  priority?: boolean;
  /** Responsive sizes hint. Defaults to a sensible two-column assumption. */
  sizes?: string;
  radius?: string;
  /** Slow zoom on hover. Off for decorative or non-interactive images. */
  hoverZoom?: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Rendered above the photograph — captions, badges, gradient scrims. */
  children?: React.ReactNode;
}

/**
 * The only way a photograph enters this site.
 *
 * Reveals through a clip-path wipe while the image itself settles from 1.06 to 1,
 * so the frame and its contents resolve on different curves. That offset is what
 * reads as editorial rather than as a fade.
 */
export function EditorialImage({
  src, alt, ratio = "4 / 5", position = "50% 50%", pattern = "mask-up",
  priority = false, sizes = "(max-width: 900px) 100vw, 50vw",
  radius = "var(--radius-2xl)", hoverZoom = false, delay = 0, className, style, children,
}: EditorialImageProps) {
  const reduce = useReducedMotion();
  const [hover, setHover] = React.useState(false);
  // Without this, a photograph whose observer never reports stays clipped to zero
  // height — an empty frame where the picture should be. See `useRevealSafety`.
  const { ref, force } = useRevealSafety<HTMLElement>();

  // The settle runs once. Holding `will-change` past it would pin a compositor
  // layer per photograph for the life of the page — see the note in primitives.
  // Images that zoom on hover keep the hint, since they do move again.
  const [settled, setSettled] = React.useState(false);

  const animateFrame = reduce || pattern === "none" || pattern === "scale";
  const initialClip = animateFrame ? undefined : clipFrom[pattern as keyof typeof clipFrom];

  return (
    <motion.figure
      ref={ref}
      data-reveal
      className={className}
      onMouseEnter={hoverZoom ? () => setHover(true) : undefined}
      onMouseLeave={hoverZoom ? () => setHover(false) : undefined}
      style={{
        margin: 0,
        position: "relative",
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: "hidden",
        background: "var(--surface-tint-soft)",
        ...style,
      }}
      {...(initialClip
        ? {
            initial: { clipPath: initialClip },
            ...(force
              ? { animate: { clipPath: "inset(0% 0% 0% 0%)" } }
              : {
                  whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
                  viewport: { once: true, amount: 0.25 },
                }),
            transition: { duration: 1.1, ease: EASE_ENTRANCE, delay },
          }
        : {})}
    >
      <motion.div
        data-reveal
        style={{
          position: "absolute",
          inset: 0,
          willChange: settled && !hoverZoom ? "auto" : "transform",
        }}
        initial={reduce ? undefined : { scale: 1.06 }}
        {...(reduce
          ? {}
          : hoverZoom && hover
            ? { animate: { scale: 1.04 } }
            : force
              ? // The observer never reported — settle the zoom directly rather than
                // leaving the photograph held at 1.06.
                { animate: { scale: 1 } }
              : { whileInView: { scale: 1 }, viewport: { once: true, amount: 0.25 } })}
        transition={{ duration: 1.2, ease: EASE_ENTRANCE, delay }}
        onAnimationComplete={() => setSettled(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          placeholder="blur"
          style={{ objectFit: "cover", objectPosition: position }}
        />
      </motion.div>
      {children}
    </motion.figure>
  );
}
