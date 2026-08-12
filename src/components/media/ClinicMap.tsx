"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { clinic } from "@/data/clinic";

import "leaflet/dist/leaflet.css";

/**
 * Leaflet's default marker is a pair of PNGs it resolves by URL at runtime, which
 * bundlers break. A `divIcon` is plain markup, so it survives the build and picks
 * up the site's own accent colour instead of arriving in Leaflet blue.
 */
const pin = L.divIcon({
  className: "",
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  html: `
    <span style="
      display:block; width:26px; height:26px; border-radius:999px;
      background:var(--c-teal, #0f766e); border:3px solid #fff;
      box-shadow:0 2px 10px rgba(0,0,0,.35);
    "></span>`,
});

/**
 * The clinic's location, on an OpenStreetMap base layer.
 *
 * Leaflet over OSM rather than an embedded Google iframe: no API key, no billing
 * account, and no third-party cookie dropped on a page a patient may reach before
 * consenting to anything. The trade-off is that OSM tiles are community data — the
 * building footprints are less detailed than Google's.
 *
 * Scroll-wheel zoom is off on purpose. A full-width map that swallows the page
 * scroll is a well-known way to trap someone mid-page on a phone.
 */
export function ClinicMap() {
  const { lat, lng } = clinic.address.coords;

  return (
    <div
      style={{
        height: "clamp(320px, 42vw, 460px)",
        borderRadius: "var(--radius-2xl)",
        overflow: "hidden",
        border: "1px solid var(--border-hairline)",
        boxShadow: "var(--shadow-sm)",
        position: "relative",
        zIndex: 0,
      }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        attributionControl
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        <Marker position={[lat, lng]} icon={pin}>
          <Popup>
            <strong>{clinic.shortName}</strong>
            <br />
            {clinic.address.line1}
            <br />
            {clinic.address.line2}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default ClinicMap;
