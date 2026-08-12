"use client";

import React from "react";
import { Icon } from "../core/Icon";

export interface FieldOption { value?: string; label?: string; }

export interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  name?: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  helper?: string;
  error?: string;
  options?: (FieldOption | string)[];
  rows?: number;
  icon?: string;
}

export function Field({
  label, name, type = "text", placeholder, value, onChange, required = false,
  helper, error, options = [], rows = 4, icon, style, ...rest
}: FieldProps) {
  const [focus, setFocus] = React.useState(false);
  const id = React.useId();
  const borderColor = error ? "#B4483F" : focus ? "var(--accent)" : "var(--border-strong)";
  const shared: React.CSSProperties = {
    width: "100%", minHeight: 48, padding: icon ? "13px 14px 13px 42px" : "13px 14px",
    font: "var(--type-body-sm)", fontFamily: "var(--font-text)", color: "var(--text-heading)",
    background: "var(--surface-card)", border: "1px solid " + borderColor,
    borderRadius: "var(--radius-md)", outline: "none",
    boxShadow: focus ? "var(--ring-focus)" : "none",
    transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
    appearance: type === "select" ? "none" : undefined,
  };
  const handlers = { id, name, value, onChange, required, onFocus: () => setFocus(true), onBlur: () => setFocus(false) };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, ...style }}>
      {label ? (
        <label htmlFor={id} style={{ font: "var(--type-body-sm)", fontWeight: 600, color: "var(--text-heading)" }}>
          {label}{required ? <span style={{ color: "var(--text-subtle)", fontWeight: 400 }}> *</span> : null}
        </label>
      ) : null}
      <div style={{ position: "relative" }}>
        {icon ? <Icon name={icon} size={17} color="var(--text-subtle)" style={{ position: "absolute", left: 14, top: 15 }} /> : null}
        {type === "textarea" ? (
          <textarea {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} {...handlers} rows={rows} placeholder={placeholder} style={{ ...shared, minHeight: 110, resize: "vertical" }} />
        ) : type === "select" ? (
          <>
            <select {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)} {...handlers} style={{ ...shared, paddingRight: 40, cursor: "pointer" }}>
              {placeholder ? <option value="">{placeholder}</option> : null}
              {options.map((o) => {
                const opt = typeof o === "string" ? { value: o, label: o } : o;
                return <option key={opt.value || opt.label} value={opt.value || opt.label}>{opt.label || opt.value}</option>;
              })}
            </select>
            <Icon name="chevron-down" size={16} color="var(--text-muted)" style={{ position: "absolute", right: 14, top: 16, pointerEvents: "none" }} />
          </>
        ) : (
          <input {...rest} {...handlers} type={type} placeholder={placeholder} style={shared} />
        )}
      </div>
      {error ? (
        <span style={{ display: "flex", gap: 6, alignItems: "center", font: "var(--type-meta)", color: "#B4483F" }}>
          <Icon name="circle-alert" size={13} />{error}
        </span>
      ) : helper ? (
        <span style={{ font: "var(--type-meta)", color: "var(--text-subtle)" }}>{helper}</span>
      ) : null}
    </div>
  );
}

export interface ChoiceGroupProps {
  label?: string;
  options?: (FieldOption | string)[];
  value?: string;
  onChange?: (value: string) => void;
  columns?: number;
}

/** Segmented radio group — used for appointment type and time-of-day preference. */
export function ChoiceGroup({ label, options = [], value, onChange, columns = 2 }: ChoiceGroupProps) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {label ? <legend style={{ font: "var(--type-body-sm)", fontWeight: 600, color: "var(--text-heading)", padding: 0, marginBottom: 2 }}>{label}</legend> : null}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns},1fr)`, gap: 8 }}>
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          const val = opt.value || opt.label || "";
          const active = value === val;
          return (
            <button key={val} type="button" onClick={() => onChange?.(val)} aria-pressed={active} style={{
              minHeight: 46, padding: "10px 14px", cursor: "pointer",
              font: "var(--type-body-sm)", fontWeight: active ? 600 : 500,
              color: active ? "var(--c-teal-ink)" : "var(--text-body)",
              background: active ? "var(--accent-quiet)" : "var(--surface-card)",
              border: "1px solid " + (active ? "var(--accent)" : "var(--border-strong)"),
              borderRadius: "var(--radius-md)",
              transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
            }}>{opt.label || opt.value}</button>
          );
        })}
      </div>
    </fieldset>
  );
}
