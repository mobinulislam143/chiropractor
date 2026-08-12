"use client";

import dynamic from "next/dynamic";

/**
 * Leaflet touches `window` at import time, so the map can only be loaded in the
 * browser. `ssr: false` needs a Client Component to live in — hence this thin
 * wrapper, which lets the Server Components that render it stay server-only.
 *
 * The placeholder matches the map's height so nothing shifts when it swaps in.
 */
const Map = dynamic(() => import("./ClinicMap").then((m) => m.ClinicMap), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      style={{
        height: "clamp(320px, 42vw, 460px)",
        borderRadius: "var(--radius-2xl)",
        border: "1px solid var(--border-hairline)",
        background: "var(--surface-tint-soft)",
      }}
    />
  ),
});

export function ClinicMapSection() {
  return <Map />;
}
