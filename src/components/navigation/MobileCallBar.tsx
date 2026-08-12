"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clinic } from "@/data/clinic";
import { Icon } from "@/components/core/Icon";

/**
 * Mobile-only conversion bar. Appears once the header CTA has scrolled away,
 * so the two never compete. Hidden on /book, where it would point at the page
 * the visitor is already on.
 */
export function MobileCallBar({ showAfter = 420 }: { showAfter?: number }) {
  const pathname = usePathname();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const h = () => setShow(window.scrollY > showAfter);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [showAfter]);

  if (pathname === "/book") return null;

  return (
    <div
      className="ds-sticky-cta"
      style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "saturate(180%) blur(14px)",
        WebkitBackdropFilter: "saturate(180%) blur(14px)",
        borderTop: "1px solid var(--border-hairline)",
        padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
        gridTemplateColumns: "1fr 1fr", gap: 10,
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform var(--dur-slow) var(--ease-entrance)",
      }}
    >
      <a href={clinic.phone.href} className="btn btn-secondary btn-block">
        <Icon name="phone" size={18} />
        Call
      </a>
      <Link href="/book" className="btn btn-primary btn-block">
        <Icon name="calendar-check" size={18} />
        Book
      </Link>
    </div>
  );
}
