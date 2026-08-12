"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/core/Icon";

export interface AnnouncementBarProps {
  message: string;
  linkLabel?: string;
  href?: string;
  dismissible?: boolean;
}

export function AnnouncementBar({ message, linkLabel, href = "/faq", dismissible = true }: AnnouncementBarProps) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  return (
    <div style={{ background: "var(--surface-inverse)", color: "var(--text-on-inverse)", font: "var(--type-meta)", position: "relative" }}>
      <div
        className="container-page"
        style={{ padding: "10px var(--gutter)", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}
      >
        <span style={{ opacity: 0.92 }}>{message}</span>
        {linkLabel ? (
          <Link href={href} style={{ color: "#7FD4CF", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
            {linkLabel}
            <Icon name="arrow-right" size={13} />
          </Link>
        ) : null}
      </div>
      {dismissible ? (
        <button
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            width: 32, height: 32, display: "grid", placeItems: "center",
            background: "transparent", border: 0, color: "inherit", opacity: 0.6, cursor: "pointer",
          }}
        >
          <Icon name="x" size={14} />
        </button>
      ) : null}
    </div>
  );
}
