"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const DELAY_MS   = 3000;   // aparece 3s después de cargar
const VISIBLE_MS = 14000;  // visible ~14s (lectura + 4s extra)
const FADE_MS    = 700;    // duración del fade

export default function WelcomePopup() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let active = true;
    const t1 = setTimeout(() => { if (active) setShown(true);  }, DELAY_MS);
    const t2 = setTimeout(() => { if (active) setShown(false); }, DELAY_MS + VISIBLE_MS);
    return () => { active = false; clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
      style={{
        opacity: shown ? 1 : 0,
        pointerEvents: shown ? "auto" : "none",
        transition: `opacity ${FADE_MS}ms ease-in-out`,
      }}
    >
      <div
        className="relative mx-6 max-w-lg rounded-2xl border border-white/25 px-10 py-9 text-center shadow-2xl"
        style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(14px)" }}
      >
        {/* Botón cerrar */}
        <button
          onClick={() => setShown(false)}
          className="absolute right-3 top-3 rounded-full p-1 text-black/30 transition-colors hover:text-black/60"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Línea decorativa */}
        <div className="mx-auto mb-5 h-px w-12 bg-black/20" />

        <p className="text-base leading-7 tracking-wide text-gray-900" style={{ fontWeight: 300 }}>
          Esta plataforma propone a todos quienes están vinculados a las{" "}
          <span className="font-medium">Sierras Grandes</span> incorporar aquí
          sus conocimientos de modo de facilitar la toma informada de
          decisiones tanto por la comunidad como por los funcionarios públicos.
        </p>

        <p className="mt-4 text-sm font-semibold tracking-widest text-gray-800 uppercase">
          ¡Sumá tu conocimiento!
        </p>

        {/* Línea decorativa */}
        <div className="mx-auto mt-5 h-px w-12 bg-black/20" />
      </div>
    </div>
  );
}
