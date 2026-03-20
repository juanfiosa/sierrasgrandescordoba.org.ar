"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ExternalLink,
  Plus,
  X,
  LogIn,
  Filter,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Building2,
  Globe,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  type Investigador,
  especialidades,
} from "@/data/investigadores";

export default function InvestigadoresPage() {
  const { user } = useAuth();
  const [investigadores, setInvestigadores] = useState<Investigador[]>([]);
  const [filtroEsp, setFiltroEsp] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form state
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [especialidad, setEspecialidad] = useState("ecologia");
  const [especialidadOtra, setEspecialidadOtra] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/investigadores")
      .then((res) => res.json())
      .then((data) => {
        // Map DB fields to frontend interface
        const mapped = data.map?.((row: Record<string, string>) => ({
          id: String(row.id),
          nombre: row.nombre,
          apellido: row.apellido,
          especialidad: row.especialidad,
          especialidadOtra: "",
          email: row.email,
          telefono: row.telefono || "",
          institucion: row.institucion || "",
          link: row.link || "",
          creadoPor: "sistema",
        })) || [];
        setInvestigadores(mapped);
      })
      .catch(() => setInvestigadores([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filtroEsp === "all"
      ? investigadores
      : investigadores.filter((i) => i.especialidad === filtroEsp);

  function resetForm() {
    setNombre("");
    setApellido("");
    setEspecialidad("ecologia");
    setEspecialidadOtra("");
    setEmail("");
    setTelefono("");
    setInstitucion("");
    setLink("");
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !email.trim()) return;
    setSaving(true);
    try {
      const espFinal =
        especialidad === "otra" && especialidadOtra.trim()
          ? especialidadOtra.trim()
          : especialidad;
      const res = await fetch("/api/investigadores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          especialidad: espFinal,
          email: email.trim(),
          telefono: telefono.trim(),
          institucion: institucion.trim(),
          link: link.trim(),
        }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      const row = await res.json();
      const nuevo: Investigador = {
        id: String(row.id),
        nombre: row.nombre,
        apellido: row.apellido,
        especialidad: row.especialidad,
        especialidadOtra: "",
        email: row.email,
        telefono: row.telefono || "",
        institucion: row.institucion || "",
        link: row.link || "",
        creadoPor: "sistema",
      };
      setInvestigadores([nuevo, ...investigadores]);
      resetForm();
    } catch (err) {
      alert("Error al guardar el investigador. Intentá de nuevo.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  const espLabel = (value: string, otra: string) => {
    if (value === "otra" && otra) return otra;
    return especialidades.find((e) => e.value === value)?.label || value;
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            Investigadores
          </h1>
          <p className="mt-2 text-gray-600">
            Directorio de investigadores vinculados a las Sierras Grandes de
            C&oacute;rdoba. Registr&aacute; tu perfil para conectar con otros
            colegas y proyectos.
          </p>
        </div>
        {user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700"
          >
            {showForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showForm ? "Cancelar" : "Registrarme"}
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            <LogIn className="h-4 w-4" />
            Ingres&aacute; para registrarte
          </Link>
        )}
      </div>

      {/* ── Form ── */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-indigo-800">
            Nuevo Investigador
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Nombre */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nombre *
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Nombre"
              />
            </div>
            {/* Apellido */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Apellido *
              </label>
              <input
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Apellido"
              />
            </div>
            {/* Especialidad */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Especialidad *
              </label>
              <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {especialidades.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Especialidad "Otra" */}
            {especialidad === "otra" && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Especific&aacute; tu especialidad *
                </label>
                <input
                  value={especialidadOtra}
                  onChange={(e) => setEspecialidadOtra(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ej: Limnolog&iacute;a, Entomolog&iacute;a..."
                />
              </div>
            )}
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Correo electr&oacute;nico *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="nombre@institucion.edu.ar"
              />
            </div>
            {/* Teléfono */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tel&eacute;fono
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="+54 9 351 ..."
              />
            </div>
            {/* Institución */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Instituci&oacute;n
              </label>
              <input
                value={institucion}
                onChange={(e) => setInstitucion(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Universidad, CONICET, etc."
              />
            </div>
            {/* Link */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Link a trabajo o instituci&oacute;n
              </label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="https://..."
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </form>
      )}

      {/* ── Filters ── */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <button
          onClick={() => setFiltroEsp("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            filtroEsp === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Todas ({investigadores.length})
        </button>
        {especialidades
          .filter((e) => e.value !== "otra")
          .map((e) => {
            const count = investigadores.filter(
              (i) => i.especialidad === e.value
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={e.value}
                onClick={() => setFiltroEsp(e.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filtroEsp === e.value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {e.label.split(" ")[0]} ({count})
              </button>
            );
          })}
        {investigadores.filter((i) => i.especialidad === "otra").length > 0 && (
          <button
            onClick={() => setFiltroEsp("otra")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filtroEsp === "otra"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Otra ({investigadores.filter((i) => i.especialidad === "otra").length})
          </button>
        )}
      </div>

      {/* ── Table / List ── */}
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Especialidad</th>
              <th className="px-4 py-3">Instituci&oacute;n</th>
              <th className="px-4 py-3">Contacto</th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((inv) => (
              <tr key={inv.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {inv.nombre} {inv.apellido}
                  {inv.creadoPor !== "sistema" && (
                    <span className="ml-2 text-[10px] text-gray-400">
                      (por {inv.creadoPor})
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                    {espLabel(inv.especialidad, inv.especialidadOtra)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {inv.institucion ? (
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-gray-400" />
                      {inv.institucion}
                    </span>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    {inv.email && (
                      <a
                        href={`mailto:${inv.email}`}
                        className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {inv.email}
                      </a>
                    )}
                    {inv.telefono && (
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Phone className="h-3.5 w-3.5" />
                        {inv.telefono}
                      </span>
                    )}
                    {!inv.email && !inv.telefono && (
                      <span className="text-gray-300">—</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {inv.link ? (
                    <a
                      href={inv.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Ver
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((inv) => (
          <div
            key={inv.id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === inv.id ? null : inv.id)
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                  <GraduationCap className="h-5 w-5 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {inv.nombre} {inv.apellido}
                  </h3>
                  <span className="text-xs text-indigo-600">
                    {espLabel(inv.especialidad, inv.especialidadOtra)}
                  </span>
                </div>
              </div>
              {expandedId === inv.id ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedId === inv.id && (
              <div className="border-t px-5 py-4 space-y-2">
                {inv.institucion && (
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    {inv.institucion}
                  </p>
                )}
                {inv.email && (
                  <a
                    href={`mailto:${inv.email}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {inv.email}
                  </a>
                )}
                {inv.telefono && (
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {inv.telefono}
                  </p>
                )}
                {inv.link && (
                  <a
                    href={inv.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Trabajo / Instituci&oacute;n
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {inv.creadoPor !== "sistema" && (
                  <p className="mt-1 text-xs text-gray-400">
                    Agregado por {inv.creadoPor}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {loading && (
        <div className="py-16 text-center text-gray-400">
          Cargando investigadores...
        </div>
      )}
      {!loading && filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          No hay investigadores en esta categor&iacute;a. &iexcl;S&eacute; el primero en registrarte!
        </div>
      )}
    </main>
  );
}
