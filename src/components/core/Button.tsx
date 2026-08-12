"use client";

import React from "react";
import { Icon } from "./Icon";

const sizes = {
  sm: { height: 38, padding: "0 16px", fontSize: 14, icon: 16 },
  md: { height: 46, padding: "0 22px", fontSize: 15, icon: 18 },
  lg: { height: 54, padding: "0 28px", fontSize: 16, icon: 19 },
};

const variants: Record<string, { base: React.CSSProperties; hover: React.CSSProperties }> = {
  primary: {
    base: { background: "var(--accent)", color: "var(--text-on-accent)", borderColor: "var(--accent)", boxShadow: "var(--shadow-accent)" },
    hover: { background: "var(--accent-hover)", borderColor: "var(--accent-hover)" },
  },
  secondary: {
    base: { background: "var(--surface-card)", color: "var(--text-heading)", borderColor: "var(--border-strong)", boxShadow: "var(--shadow-xs)" },
    hover: { background: "var(--surface-tint-soft)", borderColor: "var(--accent)", color: "var(--text-accent)" },
  },
  ghost: {
    base: { background: "transparent", color: "var(--text-heading)", borderColor: "transparent" },
    hover: { background: "var(--surface-tint-soft)", color: "var(--text-accent)" },
  },
  quiet: {
    base: { background: "var(--accent-quiet)", color: "var(--c-teal-ink)", borderColor: "transparent" },
    hover: { background: "#CFEDEA" },
  },
};

/** Primary action control. "Book an Appointment" is always `primary`; "Call …" is always `secondary`. */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "quiet";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconAfter?: string;
  href?: string;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

export function Button({
  children, variant = "primary", size = "md", icon, iconAfter, href,
  fullWidth = false, disabled = false, type = "button", onClick, style, ...rest
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  // "a" | "button" as a union trips TypeScript's intrinsic-prop intersection,
  // which collapses to `never`. Cast through a concrete prop shape instead.
  const Tag = (href ? "a" : "button") as unknown as React.ComponentType<
    React.AnchorHTMLAttributes<HTMLAnchorElement> &
      React.ButtonHTMLAttributes<HTMLButtonElement>
  >;

  const css: React.CSSProperties = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center", justifyContent: "center", gap: 9,
    minHeight: Math.max(s.height, 44),
    height: s.height, padding: s.padding,
    fontFamily: "var(--font-text)", fontWeight: 600, fontSize: s.fontSize, lineHeight: 1,
    letterSpacing: "-0.005em",
    borderRadius: "var(--radius-md)",
    borderWidth: 1, borderStyle: "solid",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none", whiteSpace: "nowrap",
    transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
    transform: press && !disabled ? "translateY(1px) scale(.988)" : "none",
    ...v.base,
    ...(hover && !disabled ? v.hover : null),
    ...style,
  };

  return (
    <Tag
      {...(rest as Record<string, unknown>)}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      onClick={disabled ? undefined : (onClick as React.MouseEventHandler)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={css}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {children}
      {iconAfter ? <Icon name={iconAfter} size={s.icon} /> : null}
    </Tag>
  );
}
