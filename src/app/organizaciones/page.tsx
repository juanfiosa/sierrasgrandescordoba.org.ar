"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  ExternalLink,
  Plus,
  X,
  LogIn,
  Filter,
  ChevronDown,
  ChevronRight,
  Instagram,
  Globe,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  type Organizacion,
  ejesOrg,
  defaultOrganizaciones,
} from "@/data/organizaciones";

const ORGS_KEY = "sg_organizaciones_civil";

export default function OrganizacionesPage() {
  const { user } = useAuth();
  const [orgs, setOrgs] = useState<Organizacion[]>([]);
  const [filtroEje, setFiltroEje] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form state
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [eje, setEje] = useState("general");
  const [web, setWeb] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(ORGS_KEY);
    if (stored) {
      try {
        setOrgs(JSON.parse(stored));
      } catch {
        setOrgs(defaultOrganizaciones.filter((o) => o.tipo === "civil"));
        localStorage.setItem(
          ORGS_KEY,
          JSON.stringify(defaultOrganizaciones.filter((o) => o.tipo === "civil"))
        );
      }
    } else {
      const civiles = defaultOrganizaciones.filter((o) => o.tipo === "civil");
      setOrgs(civiles);
      localStorage.setItem(ORGS_KEY, JSON.stringify(civiles));
    }
  }, []);

  const filtered =
    filtroEje === "all" ? orgs : orgs.filter((o) => o.eje === filtroEje);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;
    const nueva: Organizacion = {
      id: `org-user-${Date.now()}`,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      tipo: "civil",
      eje,
      web: web.trim(),
      instagram: instagram.trim(),
      creadoPor: user?.nombre || "anon",
    };
    const updated = [nueva, ...orgs];
    setOrgs(updated);
    localStorage.setItem(ORGS_KEY, JSON.stringify(updated));
    setNombre("");
    setDescripcion("");
    setEje("general");
    setWeb("");
    setInstagram("");
    setShowForm(false);
  }

  const ejeLabel = (value: string) =>
    ejesOrg.find((e) => e.value === value)?.label || value;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <Users className="h-8 w-8 text-green-600" />
            Organizaciones de la Sociedad Civil
          </h1>
          <p className="mt-2 text-gray-600">
            ONGs, asociaciones civiles, instituciones de investigaci&oacute;n y
            grupos comunitarios que trabajan en proyectos vinculados a las
            Sierras Grandes de C&oacute;rdoba.
          </p>
        </div>
        {user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-green-700"
          >
            {showForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showForm ? "Cancelar" : "Agregar Organizaci\u00f3n"}
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
          className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-green-800">
            Nueva Organizaci&oacute;n
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Nombre de la organizaci&oacute;n"
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Breve descripci&oacute;n de la organizaci&oacute;n y su trabajo"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Eje tem&aacute;tico
              </label>
              <select
                value={eje}
                onChange={(e) => setEje(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                {ejesOrg.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Guardar
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <button
          onClick={() => setFiltroEje("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            filtroEje === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Todas ({orgs.length})
        </button>
        {ejesOrg.map((e) => {
          const count = orgs.filter((o) => o.eje === e.value).length;
          if (count === 0) return null;
          return (
            <button
              key={e.value}
              onClick={() => setFiltroEje(e.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filtroEje === e.value
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {e.label} ({count})
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((org) => (
          <div
            key={org.id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === org.id ? null : org.id)
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Users className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{org.nombre}</h3>
                  <span className="text-xs text-green-600">
                    {ejeLabel(org.eje)}
                  </span>
                </div>
              </div>
              {expandedId === org.id ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedId === org.id && (
              <div className="border-t px-5 py-4">
                <p className="mb-3 text-sm text-gray-600">{org.descripcion}</p>
                <div className="flex flex-wrap gap-3">
                  {org.web && (
                    <a
                      href={org.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Sitio web
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {org.instagram && (
                    <a
                      href={org.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-700 transition-colors hover:bg-pink-100"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      Instagram
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {!org.web && !org.instagram && (
                    <span className="text-xs text-gray-400">
                      Sin enlaces disponibles
                    </span>
                  )}
                </div>
                {org.creadoPor !== "sistema" && (
                  <p className="mt-2 text-xs text-gray-400">
                    Agregada por {org.creadoPor}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          No hay organizaciones en esta categor&iacute;a.
        </div>
      )}
    </main>
  );
}
