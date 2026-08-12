"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { Icon } from "@/components/core/Icon";
import { EASE_ENTRANCE } from "@/components/motion/primitives";

type Status = "idle" | "submitting" | "success";

type FieldName = "name" | "phone" | "email" | "date" | "time" | "reason" | "message";

type Values = Record<FieldName, string>;

const EMPTY: Values = { name: "", phone: "", email: "", date: "", time: "", reason: "", message: "" };

const TIMES = ["Morning (8a – 11a)", "Midday (11a – 2p)", "Afternoon (2p – 6p)"];

/** Frontend-only validation. Wire to a real endpoint in `submit` when one exists. */
function validate(values: Values, compact: boolean): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Please enter a phone number so we can confirm your time.";
  else if (digits.length < 10) errors.phone = "That doesn't look like a complete phone number.";

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please check the email address.";

  if (!compact && !values.reason.trim()) errors.reason = "Let us know what you'd like to be seen for.";

  return errors;
}

const inputBase: React.CSSProperties = {
  width: "100%",
  minHeight: 48,
  padding: "13px 14px",
  font: "var(--type-body-sm)",
  fontFamily: "var(--font-text)",
  color: "var(--text-heading)",
  background: "var(--surface-card)",
  borderRadius: "var(--radius-md)",
  borderWidth: 1,
  borderStyle: "solid",
  outline: "none",
  transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
};

export interface AppointmentFormProps {
  /** Drops the date/time/reason fields — used on /contact. */
  compact?: boolean;
}

export function AppointmentForm({ compact = false }: AppointmentFormProps) {
  const reduce = useReducedMotion();
  const [values, setValues] = React.useState<Values>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const successRef = React.useRef<HTMLDivElement>(null);

  const set = (field: FieldName) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    // Re-validate a field only after it has been blurred once, so we don't
    // shout at someone halfway through typing their phone number.
    if (touched[field]) setErrors(validate(next, compact));
  };

  const blur = (field: FieldName) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values, compact));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values, compact);
    setErrors(found);
    setTouched({ name: true, phone: true, email: true, date: true, time: true, reason: true, message: true });

    if (Object.keys(found).length) {
      // Move focus to the first field with a problem.
      const first = Object.keys(found)[0];
      document.getElementById(`af-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    // No backend yet — this is where the POST goes.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        initial={reduce ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
        style={{
          display: "grid", gap: 18, justifyItems: "center", textAlign: "center",
          padding: "clamp(32px,5vw,56px)",
          background: "var(--surface-card)",
          border: "1px solid var(--border-hairline)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-sm)",
          outline: "none",
        }}
      >
        <span
          style={{
            width: 56, height: 56, borderRadius: "var(--radius-pill)",
            background: "#E6F4EE", color: "var(--status-success)",
            display: "grid", placeItems: "center",
          }}
        >
          <Icon name="check" size={26} />
        </span>
        <h2 className="t-h3" style={{ color: "var(--text-heading)" }}>Request received</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "44ch" }}>
          {clinic.shortName} will call you to confirm a time — usually within one business hour
          during opening hours. Nothing is booked until we&apos;ve spoken.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 4 }}>
          <a href={clinic.phone.href} className="btn btn-secondary">
            <Icon name="phone" size={18} />
            Call {clinic.phone.display} instead
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => { setValues(EMPTY); setTouched({}); setErrors({}); setStatus("idle"); }}
          >
            Send another request
          </button>
        </div>
      </motion.div>
    );
  }

  const field = (
    name: FieldName,
    label: string,
    opts: {
      type?: string;
      placeholder?: string;
      required?: boolean;
      helper?: string;
      as?: "input" | "select" | "textarea";
      options?: string[];
      autoComplete?: string;
    } = {},
  ) => {
    const { type = "text", placeholder, required, helper, as = "input", options, autoComplete } = opts;
    const invalid = Boolean(errors[name] && touched[name]);
    const describedBy = [invalid ? `af-${name}-error` : null, helper ? `af-${name}-help` : null]
      .filter(Boolean)
      .join(" ") || undefined;

    const style: React.CSSProperties = {
      ...inputBase,
      borderColor: invalid ? "var(--status-danger)" : "var(--border-strong)",
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <label htmlFor={`af-${name}`} style={{ font: "var(--type-body-sm)", fontWeight: 600, color: "var(--text-heading)" }}>
          {label}
          {required ? <span style={{ color: "var(--text-subtle)", fontWeight: 400 }}> *</span> : null}
        </label>

        {as === "textarea" ? (
          <textarea
            id={`af-${name}`}
            name={name}
            value={values[name]}
            onChange={set(name)}
            onBlur={blur(name)}
            placeholder={placeholder}
            rows={4}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            style={{ ...style, minHeight: 110, resize: "vertical" }}
          />
        ) : as === "select" ? (
          <div style={{ position: "relative" }}>
            <select
              id={`af-${name}`}
              name={name}
              value={values[name]}
              onChange={set(name)}
              onBlur={blur(name)}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              style={{ ...style, appearance: "none", paddingRight: 40, cursor: "pointer" }}
            >
              <option value="">{placeholder}</option>
              {options?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <Icon
              name="chevron-down"
              size={16}
              color="var(--text-muted)"
              style={{ position: "absolute", right: 14, top: 16, pointerEvents: "none" }}
            />
          </div>
        ) : (
          <input
            id={`af-${name}`}
            name={name}
            type={type}
            value={values[name]}
            onChange={set(name)}
            onBlur={blur(name)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            style={style}
          />
        )}

        {invalid ? (
          <span
            id={`af-${name}-error`}
            style={{ display: "flex", gap: 6, alignItems: "center", font: "var(--type-meta)", color: "var(--status-danger)" }}
          >
            <Icon name="circle-alert" size={13} />
            {errors[name]}
          </span>
        ) : helper ? (
          <span id={`af-${name}-help`} style={{ font: "var(--type-meta)", color: "var(--text-subtle)" }}>
            {helper}
          </span>
        ) : null}
      </div>
    );
  };

  const errorCount = Object.keys(errors).filter((k) => touched[k as FieldName]).length;

  return (
    <form onSubmit={submit} noValidate style={{ display: "grid", gap: 18 }}>
      {/* Screen readers get a count; sighted users get the per-field messages. */}
      <AnimatePresence>
        {errorCount > 0 ? (
          <motion.p
            role="alert"
            initial={reduce ? undefined : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            style={{
              font: "var(--type-meta)", color: "var(--status-danger)",
              background: "#FBEEEC", border: "1px solid #F0D4D0",
              borderRadius: "var(--radius-md)", padding: "12px 14px", margin: 0,
              display: "flex", gap: 8, alignItems: "center", overflow: "hidden",
            }}
          >
            <Icon name="circle-alert" size={15} />
            {errorCount === 1 ? "One field needs attention." : `${errorCount} fields need attention.`}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {field("name", "Full name", { required: true, placeholder: "Jordan Reyes", autoComplete: "name" })}

      <div className="grid-2" style={{ gap: 18 }}>
        {field("phone", "Phone", {
          type: "tel", required: true, placeholder: "(210) 555-0134",
          autoComplete: "tel", helper: "We'll call to confirm your time.",
        })}
        {field("email", "Email", { type: "email", placeholder: "you@email.com", autoComplete: "email" })}
      </div>

      {!compact ? (
        <>
          <div className="grid-2" style={{ gap: 18 }}>
            {field("date", "Preferred date", { type: "date", autoComplete: "off" })}
            {field("time", "Preferred time", { as: "select", placeholder: "Any time", options: TIMES })}
          </div>

          {field("reason", "Reason for visit", {
            as: "select", required: true, placeholder: "Select a reason",
            options: [...services.map((s) => s.title), "Not sure — happy to be advised"],
          })}
        </>
      ) : null}

      {field("message", compact ? "How can we help?" : "Anything else we should know?", {
        as: "textarea",
        placeholder: compact
          ? "Tell us what's going on and we'll get back to you."
          : "Where the discomfort is, how long it's been going on, anything relevant.",
      })}

      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <motion.span
              aria-hidden="true"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              style={{
                width: 17, height: 17, borderRadius: "50%",
                border: "2px solid rgba(255,255,255,.35)", borderTopColor: "#fff",
              }}
            />
            Sending…
          </>
        ) : (
          <>
            <Icon name="calendar-check" size={19} />
            {compact ? "Send message" : "Request appointment"}
          </>
        )}
      </button>

      <p style={{ font: "var(--type-meta)", color: "var(--text-subtle)", textAlign: "center", margin: 0 }}>
        Most insurance accepted. Requesting a time doesn&apos;t commit you to a course of care.
      </p>
    </form>
  );
}
