import React from "react";

/**
 * Background global único (inspirado no visual da seção "Como funciona").
 * Fica fixo atrás de todo o app.
 */
export default function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#05070c]" />

      {/* Glow / Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18)_0%,rgba(0,0,0,0)_55%)]" />

      {/* Grid suave */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* Orbs */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-amber-500/18 blur-[120px]" />
      <div className="absolute top-24 -right-40 h-[520px] w-[520px] rounded-full bg-emerald-400/12 blur-[120px]" />
      <div className="absolute -bottom-52 left-1/4 h-[620px] w-[620px] rounded-full bg-sky-400/10 blur-[140px]" />

      {/* Vinheta */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
