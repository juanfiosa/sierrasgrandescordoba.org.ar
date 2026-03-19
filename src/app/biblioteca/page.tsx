"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Database,
  ExternalLink,
  Plus,
  X,
  Download,
  LogIn,
  Filter,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Scale,
  Lightbulb,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  type Publicacion,
  ejes,
  defaultPublicaciones,
} from "@/data/publicaciones";

const PUBS_KEY = "sg_publicaciones";

const categorias = [
  { label: "Todos", value: "all" },
  { label: "Artículos", value: "articulo" },
  { label: "Informes", value: "informe" },
  { label: "Datasets", value: "dataset" },
  { label: "Tesis", value: "tesis" },
  { label: "Proyectos de Ley", value: "proyecto_ley" },
  { label: "Propuestas", value: "propuesta" },
];

const iconByType: Record<string, typeof BookOpen> = {
  articulo: BookOpen,
  informe: FileText,
  dataset: Database,
  tesis: GraduationCap,
  proyecto_ley: Scale,
  propuesta: Lightbulb,
};

const colorByType: Record<string, string> = {
  articulo: "bg-blue-100 text-blue-700",
  informe: "bg-purple-100 text-purple-700",
  dataset: "bg-emerald-100 text-emerald-700",
  tesis: "bg-amber-100 text-amber-700",
  proyecto_ley: "bg-indigo-100 text-indigo-700",
  propuesta: "bg-pink-100 text-pink-700",
};

// Separate scientific ejes from normative sub-ejes for filtering
const ejesCientificos = ejes.filter((e) => !e.value.startsWith("norm-"));
const ejesNormativos = ejes.filter((e) => e.value.startsWith("norm-"));

function getPublicaciones(): Publicacion[] {
  if (typeof window === "undefined") return defaultPublicaciones;
  try {
    const stored = localStorage.getItem(PUBS_KEY);
    if (!stored) {
      localStorage.setItem(PUBS_KEY, JSON.stringify(defaultPublicaciones));
      return defaultPublicaciones;
    }
    const parsed: Publicacion[] = JSON.parse(stored);
    // If stored data has fewer items than defaults (new articles added), reset
    if (parsed.length < defaultPublicaciones.length) {
      const userPubs = parsed.filter((p) => p.creadoPor !== "sistema");
      const merged = [...defaultPublicaciones, ...userPubs];
      localStorage.setItem(PUBS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return defaultPublicaciones;
  }
}

function savePublicaciones(pubs: Publicacion[]) {
  localStorage.setItem(PUBS_KEY, JSON.stringify(pubs));
}

export default function BibliotecaPage() {
  const { user } = useAuth();
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("all");
  const [filtroEje, setFiltroEje] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedEjes, setExpandedEjes] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    titulo: "",
    tipo: "articulo" as Publicacion["tipo"],
    autores: "",
    anio: new Date().getFullYear(),
    resumen: "",
    url: "",
    eje: "reforestacion",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setPublicaciones(getPublicaciones());
  }, []);

  // Apply filters
  const filtered = publicaciones.filter((p) => {
    if (filtroTipo !== "all" && p.tipo !== filtroTipo) return false;
    if (filtroEje === "all") return true;
    if (filtroEje === "all-norm") return p.eje.startsWith("norm-");
    if (p.eje !== filtroEje) return false;
    return true;
  });

  // Group by eje
  const groupedByEje = ejes
    .map((eje) => ({
      ...eje,
      items: filtered.filter((p) => p.eje === eje.value),
    }))
    .filter((g) => g.items.length > 0);

  function toggleEje(value: string) {
    setExpandedEjes((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function expandAll() {
    setExpandedEjes(new Set(groupedByEje.map((g) => g.value)));
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!form.titulo.trim() || !form.autores.trim() || !form.resumen.trim()) {
      setFormError("Completá título, autores y resumen como mínimo");
      return;
    }
    const newPub: Publicacion = {
      id: Date.now().toString(),
      titulo: form.titulo.trim(),
      tipo: form.tipo,
      autores: form.autores.trim(),
      anio: form.anio,
      resumen: form.resumen.trim(),
      url: form.url.trim(),
      eje: form.eje,
      creadoPor: user?.username || "anónimo",
    };
    const updated = [newPub, ...publicaciones];
    setPublicaciones(updated);
    savePublicaciones(updated);
    setForm({
      titulo: "",
      tipo: "articulo",
      autores: "",
      anio: new Date().getFullYear(),
      resumen: "",
      url: "",
      eje: "reforestacion",
    });
    setShowForm(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Biblioteca de Conocimiento
          </h1>
          <p className="mt-2 text-gray-500">
            Artículos científicos, informes técnicos y datasets sobre las
            Sierras Grandes, organizados por eje temático.
          </p>
        </div>
        {user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            {showForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showForm ? "Cancelar" : "Nuevo artículo"}
          </button>
        ) : (
          <Link
            href="/login"
            className="flex shrink-0 items-center gap-2 rounded-lg border border-green-600 px-4 py-2.5 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
          >
            <LogIn className="h-4 w-4" />
            Ingresar para contribuir
          </Link>
        )}
      </div>

      {/* Formulario */}
      {showForm && user && (
        <form
          onSubmit={handleAdd}
          className="mt-6 rounded-xl border-2 border-dashed border-green-300 bg-green-50/50 p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Agregar publicación
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Título *
              </label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Título del artículo o publicación"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Eje temático *
              </label>
              <select
                value={form.eje}
                onChange={(e) => setForm({ ...form, eje: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <optgroup label="Ejes Temáticos">
                  {ejesCientificos.map((eje) => (
                    <option key={eje.value} value={eje.value}>
                      {eje.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Propuestas Normativas">
                  {ejesNormativos.map((eje) => (
                    <option key={eje.value} value={eje.value}>
                      {eje.label.replace("Normativa: ", "")}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo *
              </label>
              <select
                value={form.tipo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tipo: e.target.value as Publicacion["tipo"],
                  })
                }
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="articulo">Artículo científico</option>
                <option value="informe">Informe técnico</option>
                <option value="dataset">Dataset</option>
                <option value="tesis">Tesis</option>
                <option value="proyecto_ley">Proyecto de Ley</option>
                <option value="propuesta">Propuesta</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Año *
              </label>
              <input
                type="number"
                value={form.anio}
                onChange={(e) =>
                  setForm({ ...form, anio: parseInt(e.target.value) || 2025 })
                }
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                min={1980}
                max={2030}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Autores *
              </label>
              <input
                type="text"
                value={form.autores}
                onChange={(e) => setForm({ ...form, autores: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Apellido, N. et al."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Resumen *
              </label>
              <textarea
                value={form.resumen}
                onChange={(e) => setForm({ ...form, resumen: e.target.value })}
                rows={3}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Breve descripción del contenido..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                URL del paper / enlace de descarga
              </label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="https://doi.org/10.xxxx/xxxxx"
              />
            </div>
          </div>

          {formError && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {formError}
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              Publicar
            </button>
          </div>
        </form>
      )}

      {/* Filtros */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-medium uppercase text-gray-400">
            Tipo:
          </span>
          {categorias.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFiltroTipo(cat.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filtroTipo === cat.value
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-medium uppercase text-gray-400">
            Eje:
          </span>
          <button
            onClick={() => setFiltroEje("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filtroEje === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {ejesCientificos.map((eje) => (
            <button
              key={eje.value}
              onClick={() => setFiltroEje(eje.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filtroEje === eje.value
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {eje.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Scale className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-medium uppercase text-gray-400">
            Normativa:
          </span>
          <button
            onClick={() => setFiltroEje("all-norm")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filtroEje === "all-norm"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todas
          </button>
          {ejesNormativos.map((eje) => (
            <button
              key={eje.value}
              onClick={() => setFiltroEje(eje.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filtroEje === eje.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {eje.label.replace("Normativa: ", "")}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {filtered.length} publicacion{filtered.length !== 1 ? "es" : ""}
          </span>
          <button
            onClick={expandAll}
            className="text-xs text-green-600 hover:text-green-700 hover:underline"
          >
            Expandir todos
          </button>
        </div>
      </div>

      {/* Lista agrupada por eje */}
      <div className="mt-6 space-y-4">
        {groupedByEje.map((group) => {
          const isExpanded = expandedEjes.has(group.value);
          return (
            <div
              key={group.value}
              className="overflow-hidden rounded-xl border"
            >
              <button
                onClick={() => toggleEje(group.value)}
                className="flex w-full items-center justify-between bg-gray-50 px-5 py-3 text-left transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <h2 className="font-semibold text-gray-900">
                    {group.label}
                  </h2>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    {group.items.length}
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="divide-y">
                  {group.items.map((pub) => {
                    const Icon = iconByType[pub.tipo] || BookOpen;
                    return (
                      <article
                        key={pub.id}
                        className="group px-5 py-4 transition-colors hover:bg-gray-50/50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colorByType[pub.tipo]}`}
                              >
                                <Icon className="h-3 w-3" />
                                {pub.tipo.charAt(0).toUpperCase() +
                                  pub.tipo.slice(1)}
                              </span>
                              <span className="text-xs text-gray-400">
                                {pub.anio}
                              </span>
                              {pub.creadoPor !== "sistema" && (
                                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                                  por {pub.creadoPor}
                                </span>
                              )}
                            </div>
                            <h3 className="mt-1.5 text-sm font-semibold text-gray-900 group-hover:text-green-700">
                              {pub.titulo}
                            </h3>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {pub.autores}
                            </p>
                            <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                              {pub.resumen}
                            </p>
                          </div>
                          <div className="shrink-0">
                            {pub.url ? (
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
                                title="Ver / Descargar paper"
                              >
                                <Download className="h-3.5 w-3.5" />
                                Paper
                              </a>
                            ) : (
                              <span className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-400">
                                <ExternalLink className="h-3.5 w-3.5" />
                                Sin enlace
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-gray-400">
          No hay publicaciones que coincidan con los filtros.
        </p>
      )}
    </div>
  );
}
