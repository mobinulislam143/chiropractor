"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Faq } from "@/data/faqs";
import { Icon } from "@/components/core/Icon";
import { EASE_ENTRANCE } from "@/components/motion/primitives";

export interface FaqAccordionProps {
  items: Faq[];
  /** Index open on mount. Pass -1 for all closed. */
  defaultOpen?: number;
}

/**
 * Height animates via AnimatePresence on `height: auto`, which measures the real
 * content rather than assuming a max-height. The chevron rotates on the same curve.
 */
export function FaqAccordion({ items, defaultOpen = 0 }: FaqAccordionProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <div style={{ borderTop: "1px solid var(--border-hairline)" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div key={item.q} style={{ borderBottom: "1px solid var(--border-hairline)" }}>
            <h3 style={{ margin: 0 }}>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", gap: 24,
                  padding: "22px 0", minHeight: "var(--tap-min)",
                  background: "transparent", border: 0, cursor: "pointer", textAlign: "left",
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18,
                  letterSpacing: "-0.018em", color: "var(--text-heading)",
                }}
              >
                {item.q}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.32, ease: EASE_ENTRANCE }}
                  style={{ display: "inline-flex", marginTop: 2, flex: "0 0 auto" }}
                >
                  <Icon name="chevron-down" size={19} color="var(--text-accent)" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: reduce ? 0 : 0.36, ease: EASE_ENTRANCE },
                    opacity: { duration: reduce ? 0 : 0.26, ease: EASE_ENTRANCE },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ color: "var(--text-muted)", maxWidth: "var(--measure)", paddingBottom: 24 }}>
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
