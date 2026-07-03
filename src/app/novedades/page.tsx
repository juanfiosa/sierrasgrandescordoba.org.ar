"use client";

import { useEffect, useState, useCallback } from "react";
import { Newspaper, Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { isAdmin } from "@/lib/admins";

interface Novedad {
  id: number;
  titulo: string;
  cuerpo: string;
  mostrar: boolean;
  autor: string;
  created_at: string;
}

function formatFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function NovedadesPage() {
  const { user } = useAuth();
  const admin = isAdmin(user);

  const [items, setItems] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [mostrar, setMostrar] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/novedades");
      const data = res.ok ? await res.json() : [];
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function crear(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!titulo.trim()) {
      setError("El título es obligatorio");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/novedades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, cuerpo, mostrar, autor: user?.nombre ?? "" }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "No se pudo guardar la novedad");
        return;
      }
      setTitulo("");
      setCuerpo("");
      setMostrar(true);
      setShowForm(false);
      await cargar();
    } catch {
      setError("No se pudo guardar la novedad");
    } finally {
      setSaving(false);
    }
  }

  async function toggleMostrar(n: Novedad) {
    await fetch("/api/novedades", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: n.id, titulo: n.titulo, cuerpo: n.cuerpo, mostrar: !n.mostrar }),
    });
    await cargar();
  }

  async function eliminar(n: Novedad) {
    if (!confirm(`¿Eliminar la novedad "${n.titulo}"?`)) return;
    await fetch(`/api/novedades?id=${n.id}`, { method: "DELETE" });
    await cargar();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Newspaper className="h-8 w-8 text-green-700" />
          <h1 className="text-3xl font-bold text-gray-900">Novedades</h1>
        </div>
        {admin && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            Nueva novedad
          </button>
        )}
      </div>
      <p className="mb-8 text-gray-500">
        Actualizaciones, noticias e informes recientes sobre las Sierras Grandes de Córdoba.
      </p>

      {/* Formulario admin */}
      {admin && showForm && (
        <form
          onSubmit={crear}
          className="mb-10 rounded-2xl border border-green-200 bg-green-50/50 p-6"
        >
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Título de la novedad"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Texto</label>
            <textarea
              value={cuerpo}
              onChange={(e) => setCuerpo(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Contenido de la novedad"
            />
          </div>
          <label className="mb-4 flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={mostrar}
              onChange={(e) => setMostrar(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            Mostrar en el inicio (barra lateral de novedades)
          </label>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      {loading ? (
        <div className="flex justify-center py-24 text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-24 text-center">
          <Newspaper className="mb-4 h-12 w-12 text-gray-300" />
          <p className="text-lg font-medium text-gray-400">Próximamente</p>
          <p className="mt-1 text-sm text-gray-400">
            Aquí aparecerán las novedades de la plataforma.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((n) => (
            <article
              key={n.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    {formatFecha(n.created_at)}
                    {n.autor ? ` · ${n.autor}` : ""}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-gray-900">{n.titulo}</h2>
                  {n.cuerpo && (
                    <p className="mt-2 whitespace-pre-line text-gray-700">{n.cuerpo}</p>
                  )}
                </div>
                {admin && (
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => toggleMostrar(n)}
                      title={n.mostrar ? "Se muestra en el inicio — clic para ocultar" : "Oculta en el inicio — clic para mostrar"}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        n.mostrar
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {n.mostrar ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      {n.mostrar ? "En inicio" : "Oculta"}
                    </button>
                    <button
                      onClick={() => eliminar(n)}
                      title="Eliminar"
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
