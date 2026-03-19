"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Tent,
  ExternalLink,
  Plus,
  X,
  LogIn,
  Filter,
  ChevronDown,
  ChevronRight,
  Instagram,
  Globe,
  Home,
  Mountain,
  TreePine,
  Hotel,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  type Alojamiento,
  zonasAlojamiento,
  tiposAlojamiento,
  defaultAlojamientos,
} from "@/data/organizaciones";

const ALOJ_KEY = "sg_alojamientos";

const iconByTipo: Record<string, typeof Tent> = {
  refugio: Mountain,
  camping: Tent,
  cabanas: Home,
  hotel: Hotel,
  hosteria: TreePine,
};

const colorByTipo: Record<string, string> = {
  refugio: "bg-orange-100 text-orange-700",
  camping: "bg-green-100 text-green-700",
  cabanas: "bg-amber-100 text-amber-700",
  hotel: "bg-blue-100 text-blue-700",
  hosteria: "bg-purple-100 text-purple-700",
};

export default function AlojamientosPage() {
  const { user } = useAuth();
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [filtroZona, setFiltroZona] = useState("all");
  const [filtroTipo, setFiltroTipo] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form state
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipoAloj, setTipoAloj] = useState("cabanas");
  const [zona, setZona] = useState("traslasierra");
  const [web, setWeb] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(ALOJ_KEY);
    if (stored) {
      try {
        setAlojamientos(JSON.parse(stored));
      } catch {
        setAlojamientos(defaultAlojamientos);
        localStorage.setItem(ALOJ_KEY, JSON.stringify(defaultAlojamientos));
      }
    } else {
      setAlojamientos(defaultAlojamientos);
      localStorage.setItem(ALOJ_KEY, JSON.stringify(defaultAlojamientos));
    }
  }, []);

  const filtered = alojamientos.filter((a) => {
    if (filtroZona !== "all" && a.zona !== filtroZona) return false;
    if (filtroTipo !== "all" && a.tipoAloj !== filtroTipo) return false;
    return true;
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;
    const nuevo: Alojamiento = {
      id: `aloj-user-${Date.now()}`,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      tipoAloj: tipoAloj as Alojamiento["tipoAloj"],
      zona,
      web: web.trim(),
      instagram: instagram.trim(),
      creadoPor: user?.nombre || "anon",
    };
    const updated = [nuevo, ...alojamientos];
    setAlojamientos(updated);
    localStorage.setItem(ALOJ_KEY, JSON.stringify(updated));
    setNombre("");
    setDescripcion("");
    setTipoAloj("cabanas");
    setZona("traslasierra");
    setWeb("");
    setInstagram("");
    setShowForm(false);
  }

  const zonaLabel = (value: string) =>
    zonasAlojamiento.find((z) => z.value === value)?.label || value;

  const tipoLabel = (value: string) =>
    tiposAlojamiento.find((t) => t.value === value)?.label || value;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <Tent className="h-8 w-8 text-orange-600" />
            Alojamientos
          </h1>
          <p className="mt-2 text-gray-600">
            Refugios de monta&ntilde;a, campings, caba&ntilde;as, hoteles y
            hoster&iacute;as en las Sierras Grandes y los valles
            perif&eacute;ricos.
          </p>
        </div>
        {user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700"
          >
            {showForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showForm ? "Cancelar" : "Agregar Alojamiento"}
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            <LogIn className="h-4 w-4" />
            Ingres&aacute; para agregar
          </Link>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-xl border border-orange-200 bg-orange-50 p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-orange-800">
            Nuevo Alojamiento
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nombre *
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Nombre del alojamiento"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descripci&oacute;n *
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                rows={3}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Servicios, capacidad, ubicaci&oacute;n, etc."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tipo de alojamiento
              </label>
              <select
                value={tipoAloj}
                onChange={(e) => setTipoAloj(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {tiposAlojamiento.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Zona
              </label>
              <select
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {zonasAlojamiento.map((z) => (
                  <option key={z.value} value={z.value}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sitio web
              </label>
              <input
                value={web}
                onChange={(e) => setWeb(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <input
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-orange-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            Guardar
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="mb-4 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-500">Zona:</span>
          <button
            onClick={() => setFiltroZona("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filtroZona === "all"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todas
          </button>
          {zonasAlojamiento.map((z) => {
            const count = alojamientos.filter((a) => a.zona === z.value).length;
            if (count === 0) return null;
            return (
              <button
                key={z.value}
                onClick={() => setFiltroZona(z.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filtroZona === z.value
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {z.label} ({count})
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-transparent" />
          <span className="text-xs font-medium text-gray-500">Tipo:</span>
          <button
            onClick={() => setFiltroTipo("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filtroTipo === "all"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {tiposAlojamiento.map((t) => {
            const count = alojamientos.filter(
              (a) => a.tipoAloj === t.value
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={t.value}
                onClick={() => setFiltroTipo(t.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filtroTipo === t.value
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((aloj) => {
          const Icon = iconByTipo[aloj.tipoAloj] || Tent;
          const color = colorByTipo[aloj.tipoAloj] || "bg-gray-100 text-gray-700";
          return (
            <div
              key={aloj.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === aloj.id ? null : aloj.id)
                }
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {aloj.nombre}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-orange-600">
                        {zonaLabel(aloj.zona)}
                      </span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">
                        {tipoLabel(aloj.tipoAloj)}
                      </span>
                    </div>
                  </div>
                </div>
                {expandedId === aloj.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {expandedId === aloj.id && (
                <div className="border-t px-5 py-4">
                  <p className="mb-3 text-sm text-gray-600">
                    {aloj.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {aloj.web && (
                      <a
                        href={aloj.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Sitio web
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {aloj.instagram && (
                      <a
                        href={aloj.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-700 transition-colors hover:bg-pink-100"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        Instagram
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {!aloj.web && !aloj.instagram && (
                      <span className="text-xs text-gray-400">
                        Sin enlaces disponibles
                      </span>
                    )}
                  </div>
                  {aloj.creadoPor !== "sistema" && (
                    <p className="mt-2 text-xs text-gray-400">
                      Agregado por {aloj.creadoPor}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          No hay alojamientos en esta categor&iacute;a.
        </div>
      )}
    </main>
  );
}
