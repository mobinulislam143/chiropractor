"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clinic } from "@/data/clinic";
import { Icon } from "@/components/core/Icon";
import { EASE_ENTRANCE } from "@/components/motion/primitives";

const NAV = clinic.nav;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Route change closes the drawer.
  React.useEffect(() => { setOpen(false); }, [pathname]);

  // A drawer that scrolls the page behind it feels broken.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  React.useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: scrolled ? "rgba(250,252,251,.86)" : "var(--bg-page)",
          backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
          borderBottom: "1px solid " + (scrolled ? "var(--border-hairline)" : "transparent"),
          transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        }}
      >
        <div
          className="container-page"
          style={{ height: 74, display: "flex", alignItems: "center", gap: 28 }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19,
              letterSpacing: "-0.028em", color: "var(--text-heading)", marginRight: "auto",
            }}
          >
            {clinic.wordmark}
          </Link>

          <nav className="ds-nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    position: "relative",
                    font: "var(--type-body-sm)", fontWeight: 500,
                    color: active ? "var(--text-accent)" : "var(--text-body)",
                    padding: "9px 12px", borderRadius: "var(--radius-sm)",
                  }}
                >
                  {l.label}
                  {active ? (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-active"}
                      style={{
                        position: "absolute", left: 12, right: 12, bottom: 2, height: 2,
                        borderRadius: 2, background: "var(--accent)",
                      }}
                      transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="ds-nav-cta" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href={clinic.phone.href} className="btn btn-secondary btn-sm">
              <Icon name="phone" size={16} />
              {clinic.phone.display}
            </a>
            <Link href="/book" className="btn btn-primary btn-sm">
              Book Appointment
            </Link>
          </div>

          <button
            className="ds-nav-burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            style={{
              display: "none", width: 44, height: 44, alignItems: "center", justifyContent: "center",
              borderRadius: "var(--radius-md)", background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)", cursor: "pointer",
            }}
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <div style={{ position: "fixed", inset: 0, zIndex: 90 }}>
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              style={{ position: "absolute", inset: 0, background: "var(--c-overlay)" }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.42, ease: EASE_ENTRANCE }}
              style={{
                position: "absolute", inset: "0 0 0 auto", width: "min(420px,88vw)",
                background: "var(--surface-card)", boxShadow: "var(--shadow-modal)",
                display: "flex", flexDirection: "column", padding: "20px 24px 28px",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.028em", color: "var(--text-heading)" }}>
                  {clinic.wordmark}
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  style={{
                    width: 44, height: 44, display: "grid", placeItems: "center",
                    borderRadius: "var(--radius-md)", background: "transparent",
                    border: "1px solid var(--border-hairline)", cursor: "pointer",
                  }}
                >
                  <Icon name="x" size={20} />
                </button>
              </div>

              <nav style={{ display: "flex", flexDirection: "column" }}>
                {[{ label: "Home", href: "/" }, ...NAV].map((l, i) => {
                  const active = isActive(pathname, l.href);
                  return (
                    <motion.div
                      key={l.href}
                      initial={reduce ? undefined : { opacity: 0, x: 20 }}
                      animate={reduce ? undefined : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: EASE_ENTRANCE, delay: 0.08 + i * 0.045 }}
                    >
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "16px 0", minHeight: "var(--tap-min)",
                          borderBottom: "1px solid var(--border-hairline)",
                          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20,
                          letterSpacing: "-0.022em",
                          color: active ? "var(--text-accent)" : "var(--text-heading)",
                        }}
                      >
                        {l.label}
                        <Icon name="chevron-right" size={18} color={active ? "var(--text-accent)" : "var(--text-subtle)"} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div style={{ marginTop: "auto", paddingTop: 28, display: "grid", gap: 10 }}>
                <Link href="/book" className="btn btn-primary btn-lg btn-block">
                  <Icon name="calendar-check" size={19} />
                  Book Appointment
                </Link>
                <a href={clinic.phone.href} className="btn btn-secondary btn-lg btn-block">
                  <Icon name="phone" size={19} />
                  Call {clinic.phone.display}
                </a>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
