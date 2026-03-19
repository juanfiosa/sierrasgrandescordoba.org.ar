"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  ExternalLink,
  Plus,
  X,
  LogIn,
  Filter,
  ChevronDown,
  ChevronRight,
  Instagram,
  Globe,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  type Organizacion,
  ejesOrg,
  defaultOrganizaciones,
} from "@/data/organizaciones";

const EMPS_KEY = "sg_organizaciones_comercial";

export default function EmpresasPage() {
  const { user } = useAuth();
  const [emps, setEmps] = useState<Organizacion[]>([]);
  const [filtroEje, setFiltroEje] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form state
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [eje, setEje] = useState("ecoturismo");
  const [web, setWeb] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(EMPS_KEY);
    if (stored) {
      try {
        setEmps(JSON.parse(stored));
      } catch {
        const comerciales = defaultOrganizaciones.filter(
          (o) => o.tipo === "comercial"
        );
        setEmps(comerciales);
        localStorage.setItem(EMPS_KEY, JSON.stringify(comerciales));
      }
    } else {
      const comerciales = defaultOrganizaciones.filter(
        (o) => o.tipo === "comercial"
      );
      setEmps(comerciales);
      localStorage.setItem(EMPS_KEY, JSON.stringify(comerciales));
    }
  }, []);

  const filtered =
    filtroEje === "all" ? emps : emps.filter((o) => o.eje === filtroEje);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;
    const nueva: Organizacion = {
      id: `emp-user-${Date.now()}`,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      tipo: "comercial",
      eje,
      web: web.trim(),
      instagram: instagram.trim(),
      creadoPor: user?.nombre || "anon",
    };
    const updated = [nueva, ...emps];
    setEmps(updated);
    localStorage.setItem(EMPS_KEY, JSON.stringify(updated));
    setNombre("");
    setDescripcion("");
    setEje("ecoturismo");
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
            <Briefcase className="h-8 w-8 text-amber-600" />
            Empresas y Emprendimientos
          </h1>
          <p className="mt-2 text-gray-600">
            Empresas privadas con actividad comercial en las Sierras Grandes:
            turismo aventura, senderismo, hosteler&iacute;a, servicios
            ambientales y m&aacute;s.
          </p>
        </div>
        {user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-amber-700"
          >
            {showForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showForm ? "Cancelar" : "Agregar Empresa"}
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
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-amber-800">
            Nueva Empresa
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Nombre de la empresa"
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Servicios que ofrece, ubicaci&oacute;n, etc."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Rubro principal
              </label>
              <select
                value={eje}
                onChange={(e) => setEje(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-amber-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
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
              ? "bg-amber-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Todas ({emps.length})
        </button>
        {ejesOrg.map((e) => {
          const count = emps.filter((o) => o.eje === e.value).length;
          if (count === 0) return null;
          return (
            <button
              key={e.value}
              onClick={() => setFiltroEje(e.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filtroEje === e.value
                  ? "bg-amber-600 text-white"
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
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === emp.id ? null : emp.id)
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <MapPin className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{emp.nombre}</h3>
                  <span className="text-xs text-amber-600">
                    {ejeLabel(emp.eje)}
                  </span>
                </div>
              </div>
              {expandedId === emp.id ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedId === emp.id && (
              <div className="border-t px-5 py-4">
                <p className="mb-3 text-sm text-gray-600">{emp.descripcion}</p>
                <div className="flex flex-wrap gap-3">
                  {emp.web && (
                    <a
                      href={emp.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Sitio web
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {emp.instagram && (
                    <a
                      href={emp.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-700 transition-colors hover:bg-pink-100"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      Instagram
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {!emp.web && !emp.instagram && (
                    <span className="text-xs text-gray-400">
                      Sin enlaces disponibles
                    </span>
                  )}
                </div>
                {emp.creadoPor !== "sistema" && (
                  <p className="mt-2 text-xs text-gray-400">
                    Agregada por {emp.creadoPor}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          No hay empresas en esta categor&iacute;a.
        </div>
      )}
    </main>
  );
}
