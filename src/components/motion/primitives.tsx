"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

/**
 * The system's motion vocabulary. Every entrance on the site composes from these.
 *
 * House curve is the design system's `--ease-entrance` — cubic-bezier(.22,1,.36,1) —
 * expressed here as a coefficient array because Motion needs the raw numbers.
 * Nothing bounces, nothing loops, nothing animates after it has entered.
 */
export const EASE_ENTRANCE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0, 0, 0.58, 1] as const;

/**
 * `will-change` buys a compositor layer, and every layer costs GPU memory for as
 * long as it exists. These entrances run once and then never move again, so the
 * hint is dropped the moment the animation lands — otherwise a long page ends up
 * holding a hundred promoted layers it will never use again, which is the usual
 * cause of janky scrolling on a site that animates well.
 *
 * Returns the style value plus the handler that retires it.
 */
function useTransientWillChange(value = "transform") {
  const [animating, setAnimating] = React.useState(true);
  return {
    willChange: animating ? value : "auto",
    onAnimationComplete: () => setAnimating(false),
  } as const;
}

/**
 * Rescue for reveals that never receive an intersection callback.
 *
 * `whileInView` is only as reliable as IntersectionObserver, and the observer can
 * stay silent for reasons that have nothing to do with the element: a tab that
 * loaded in the background, an embedding context that never composites, a parent
 * that measured zero height at mount. When that happens the element holds its
 * `initial` state indefinitely — clipped to nothing, or fully transparent — and
 * the page renders a blank hole where a photograph or a paragraph should be.
 * `CountUp` already guards against exactly this; these primitives did not.
 *
 * The rescue is deliberately narrow: it only fires for elements sitting in the
 * viewport when the observer has had its chance and said nothing. Anything below
 * the fold is left alone, so the scroll choreography is unchanged.
 */
export function useRevealSafety<T extends HTMLElement>(timeout = 1400) {
  const ref = React.useRef<T>(null);
  const [force, setForce] = React.useState(false);

  React.useEffect(() => {
    if (force) return;
    if (typeof IntersectionObserver === "undefined") { setForce(true); return; }

    let done = false;

    const rescueIfOnScreen = () => {
      const el = ref.current;
      if (done || !el) return;
      const r = el.getBoundingClientRect();
      if (r.height <= 0) return;

      // Mirrors Motion's `amount` semantics rather than "any pixel visible", so a
      // rescued element enters at roughly the point the observer would have chosen.
      // `min(height, viewport)` keeps elements taller than the screen from never
      // reaching the ratio.
      const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      if (visible / Math.min(r.height, window.innerHeight) >= 0.2) {
        done = true;
        setForce(true);
      }
    };

    const timer = setTimeout(rescueIfOnScreen, timeout);

    // Scroll matters as much as the initial timer: when the observer is dead for
    // the whole page session, every section the reader scrolls to afterwards would
    // otherwise stay blank. Passive listeners, dropped as soon as one fires.
    const opts = { passive: true } as const;
    window.addEventListener("scroll", rescueIfOnScreen, opts);
    window.addEventListener("resize", rescueIfOnScreen, opts);
    const onVisible = () => {
      if (document.visibilityState === "visible") setTimeout(rescueIfOnScreen, 250);
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", rescueIfOnScreen);
      window.removeEventListener("resize", rescueIfOnScreen);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [timeout, force]);

  return { ref, force };
}

type Dir = "up" | "down" | "left" | "right";

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 18 },
  down: { y: -18 },
  left: { x: 24 },
  right: { x: -24 },
};

/**
 * Rendering a caller-supplied tag ("h1", "span", …) trips TypeScript's
 * intrinsic-element union, which intersects to `never`. Casting through this
 * shape keeps the call sites honest about the props they actually pass.
 */
type PolyTag = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}>;

const poly = (tag: React.ElementType) => tag as unknown as PolyTag;

/* ── Text ──────────────────────────────────────────────────────────────────── */

export interface WordRevealProps {
  text: string;
  /** Renders as this element. Style it from the caller. */
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** Seconds between each word. */
  stagger?: number;
  /** Play immediately rather than waiting for the viewport. Use above the fold. */
  immediate?: boolean;
}

/**
 * Headline reveal, word by word, each word rising out of its own overflow mask.
 * The mask is what separates this from a fade — words emerge from behind a hard
 * edge rather than materialising in place.
 */
export function WordReveal({
  text, as = "span", className, style, delay = 0, stagger = 0.06, immediate = false,
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const { willChange, onAnimationComplete } = useTransientWillChange();
  const { ref, force } = useRevealSafety<HTMLElement>();
  const Tag = poly(as);
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  const play = immediate || force;

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.08em",
          }}
        >
          <motion.span
            data-reveal
            style={{ display: "inline-block", willChange }}
            initial={{ y: "110%" }}
            {...(play
              ? { animate: { y: "0%" } }
              : { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.4 } })}
            transition={{ duration: 0.85, ease: EASE_ENTRANCE, delay: delay + i * stagger }}
            // Only the last word needs to report — it finishes last.
            onAnimationComplete={i === words.length - 1 ? onAnimationComplete : undefined}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export interface LineRevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  immediate?: boolean;
}

/** Single masked line — for section headings that shouldn't fragment into words. */
export function LineReveal({
  children, as = "div", className, style, delay = 0, immediate = false,
}: LineRevealProps) {
  const reduce = useReducedMotion();
  const { willChange, onAnimationComplete } = useTransientWillChange();
  const { ref, force } = useRevealSafety<HTMLElement>();
  const Tag = poly(as);

  if (reduce) return <Tag className={className} style={style}>{children}</Tag>;

  return (
    <Tag ref={ref} className={className} style={{ ...style, overflow: "hidden" }}>
      <motion.span
        data-reveal
        style={{ display: "block", willChange }}
        initial={{ y: "110%" }}
        {...(immediate || force
          ? { animate: { y: "0%" } }
          : { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.5 } })}
        transition={{ duration: 0.85, ease: EASE_ENTRANCE, delay }}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

export interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: Dir;
  /** Adds a short blur-to-sharp pass. Reserve for key statements. */
  blur?: boolean;
  immediate?: boolean;
  amount?: number;
}

/** Paragraph and block reveal. The workhorse — deliberately quieter than the masks. */
export function FadeUp({
  children, className, style, delay = 0, direction = "up", blur = false, immediate = false, amount = 0.3,
}: FadeUpProps) {
  const reduce = useReducedMotion();
  const { ref, force } = useRevealSafety<HTMLDivElement>();

  if (reduce) return <div className={className} style={style}>{children}</div>;

  const from = { opacity: 0, ...offset[direction], ...(blur ? { filter: "blur(6px)" } : null) };
  const to = { opacity: 1, x: 0, y: 0, ...(blur ? { filter: "blur(0px)" } : null) };

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      style={style}
      initial={from}
      {...(immediate || force ? { animate: to } : { whileInView: to, viewport: { once: true, amount } })}
      transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  direction?: Dir;
  immediate?: boolean;
}

/** Wraps a list so each child enters one step after the previous. */
export function Stagger({
  children, className, style, delay = 0, stagger = 0.08, direction = "up", immediate = false,
}: StaggerProps) {
  const reduce = useReducedMotion();
  const { willChange, onAnimationComplete } = useTransientWillChange("transform, opacity");
  const { ref, force } = useRevealSafety<HTMLDivElement>();

  if (reduce) return <div className={className} style={style}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE_ENTRANCE } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      {...(immediate || force ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.15 } })}
      // Fires once the last staggered child has landed.
      onAnimationComplete={onAnimationComplete}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} data-reveal variants={item} style={{ willChange, height: "100%" }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Numbers ───────────────────────────────────────────────────────────────── */

export interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

/** Runs before paint on the client, no-ops during SSR. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * Counts once, on entering the viewport. Static under reduced motion.
 *
 * Renders the real figure during SSR so the number is in the HTML for crawlers
 * and for anyone without JS, then resets to zero in a layout effect — before
 * paint, so the final value never flashes on screen first.
 */
export function CountUp({ value, decimals = 0, suffix = "", prefix = "", duration = 1.4 }: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(value);
  const done = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!reduce && !done.current) setDisplay(0);
  }, [reduce]);

  React.useEffect(() => {
    if (reduce) { setDisplay(value); return; }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setDisplay(value); return; }

    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return;
      done.current = true;
      io.disconnect();
      clearTimeout(safety);

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / (duration * 1000), 1);
        // easeOutExpo — fast start, long settle. Matches the entrance curve's feel.
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(value * eased);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    // The figure is the content; the count is the flourish. If the observer has
    // not reported within a couple of seconds — a backgrounded tab at load, a
    // zero-height parent, an embedding context that never composites — show the
    // real number rather than leaving a nought on screen.
    const safety = setTimeout(() => {
      if (done.current) return;
      done.current = true;
      io.disconnect();
      setDisplay(value);
    }, 2500);

    io.observe(el);
    return () => { io.disconnect(); clearTimeout(safety); cancelAnimationFrame(frame); };
  }, [value, duration, reduce]);

  return <span ref={ref}>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

/* ── Scroll ────────────────────────────────────────────────────────────────── */

export interface ParallaxProps {
  children: React.ReactNode;
  /** Pixels of travel across the full scroll pass. Keep it small — 20 to 60. */
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Subtle scroll-linked drift. Disabled entirely under reduced motion. */
export function Parallax({ children, distance = 40, className, style }: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, restDelta: 0.001 });

  if (reduce) return <div className={className} style={style}>{children}</div>;

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
