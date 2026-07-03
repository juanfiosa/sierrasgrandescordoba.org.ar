"use client";

import { useEffect, useState } from "react";
import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react";

interface Novedad {
  id: number;
  titulo: string;
  cuerpo: string;
  imagen?: string;
  created_at: string;
}

function formatFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const INTERVALO_MS = 6000;

export default function NovedadesSidebar() {
  const [items, setItems] = useState<Novedad[]>([]);
  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    fetch("/api/novedades?visibles=1")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]));
  }, []);

  // Reel: avanza solo cada INTERVALO_MS (salvo que esté pausado o haya una sola).
  useEffect(() => {
    if (items.length <= 1 || pausado) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [items.length, pausado]);

  if (items.length === 0) return null;

  const actual = Math.min(index, items.length - 1);
  const n = items[actual];
  const varias = items.length > 1;

  function ir(delta: number) {
    setIndex((i) => (i + delta + items.length) % items.length);
  }

  return (
    <aside className="absolute left-1/2 top-1/2 z-10 w-[85%] max-w-sm -translate-x-1/2 -translate-y-1/2 px-3 md:bottom-24 md:left-0 md:top-[4.5rem] md:w-1/5 md:min-w-[240px] md:max-w-none md:translate-x-0 md:translate-y-0">
      <div
        className="flex max-h-[70vh] flex-col rounded-xl border border-green-300/70 bg-green-100/90 shadow-lg backdrop-blur-md md:h-full md:max-h-none"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between gap-2 border-b border-green-300/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-green-700" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-green-800">
              Novedades
            </h2>
          </div>
          {varias && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => ir(-1)}
                aria-label="Anterior"
                className="rounded-full p-1 text-green-700 transition-colors hover:bg-green-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => ir(1)}
                aria-label="Siguiente"
                className="rounded-full p-1 text-green-700 transition-colors hover:bg-green-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Reel: una novedad por vez */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <article key={n.id} className="animate-[fadein_0.4s_ease]">
            <p className="text-[11px] uppercase tracking-wider text-green-700/80">
              {formatFecha(n.created_at)}
            </p>
            <h3 className="mt-0.5 text-sm font-semibold leading-snug text-gray-900">
              {n.titulo}
            </h3>
            {n.imagen && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={n.imagen}
                alt={n.titulo}
                className="mt-2 w-full rounded-lg border border-green-300/60 object-cover"
              />
            )}
            {n.cuerpo && (
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-900">
                {n.cuerpo}
              </p>
            )}
          </article>
        </div>

        {/* Puntitos de navegación */}
        {varias && (
          <div className="flex items-center justify-center gap-1.5 border-t border-green-300/70 py-2.5">
            {items.map((it, i) => (
              <button
                key={it.id}
                onClick={() => setIndex(i)}
                aria-label={`Ir a la novedad ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === actual ? "w-4 bg-green-600" : "w-1.5 bg-green-300 hover:bg-green-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
