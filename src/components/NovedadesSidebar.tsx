"use client";

import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

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

export default function NovedadesSidebar() {
  const [items, setItems] = useState<Novedad[]>([]);

  useEffect(() => {
    fetch("/api/novedades?visibles=1")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]));
  }, []);

  // Si no hay novedades para mostrar, la barra no aparece.
  if (items.length === 0) return null;

  return (
    <aside className="absolute left-1/2 top-1/2 z-10 w-[85%] max-w-sm -translate-x-1/2 -translate-y-1/2 px-3 md:bottom-24 md:left-0 md:top-[4.5rem] md:w-1/5 md:min-w-[240px] md:max-w-none md:translate-x-0 md:translate-y-0">
      <div className="flex max-h-[60vh] flex-col rounded-xl border border-emerald-200/60 bg-emerald-50/85 shadow-lg backdrop-blur-md md:h-full md:max-h-none">
        <div className="flex items-center gap-2 border-b border-emerald-200/70 px-4 py-3">
          <Newspaper className="h-5 w-5 text-green-700" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-green-800">
            Novedades
          </h2>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {items.map((n) => (
            <article
              key={n.id}
              className="border-b border-emerald-200/50 pb-3 last:border-0 last:pb-0"
            >
              <p className="text-[11px] uppercase tracking-wider text-green-700/70">
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
                  className="mt-2 w-full rounded-lg border border-emerald-200/60 object-cover"
                />
              )}
              {n.cuerpo && (
                <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-gray-600">
                  {n.cuerpo}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
