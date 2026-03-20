"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  Plus,
  X,
  Mail,
  FileText,
  Camera,
  Mountain,
  ChevronDown,
  ChevronUp,
  User,
  Download,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface Miembro {
  id: number;
  nombre: string;
  apellido: string;
  rol: string;
  bio: string;
  foto_url: string;
  cv_url: string;
  email: string;
  orden: number;
}

export default function QuienesSomosPage() {
  const { user } = useAuth();
  const [miembros, setMiembros] = useState<Miembro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showProject, setShowProject] = useState(true);

  // Form state
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rol, setRol] = useState("");
  const [bio, setBio] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [email, setEmail] = useState("");
  const fotoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/miembros")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMiembros(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/miembros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          rol,
          bio,
          foto_url: fotoUrl,
          cv_url: cvUrl,
          email,
          orden: miembros.length,
        }),
      });

      if (res.ok) {
        const nuevo = await res.json();
        setMiembros((prev) => [...prev, nuevo]);
        // Reset form
        setNombre("");
        setApellido("");
        setRol("");
        setBio("");
        setFotoUrl("");
        setCvUrl("");
        setEmail("");
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error al guardar miembro:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Convert to base64 data URL for simplicity (stored in DB as text)
    const reader = new FileReader();
    reader.onload = () => {
      setFotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
          <Users className="h-4 w-4" />
          Quiénes Somos
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Grupo Sierras Grandes
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Equipo interdisciplinario dedicado a la gestión integrada de las Sierras Grandes de Córdoba
        </p>
      </div>

      {/* About the project — collapsible */}
      <section className="mb-12">
        <button
          onClick={() => setShowProject(!showProject)}
          className="flex w-full items-center justify-between rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 text-left transition-colors hover:from-green-100 hover:to-emerald-100"
        >
          <div className="flex items-center gap-3">
            <Mountain className="h-6 w-6 text-green-700" />
            <h2 className="text-xl font-semibold text-green-900">El Proyecto</h2>
          </div>
          {showProject ? (
            <ChevronUp className="h-5 w-5 text-green-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-green-600" />
          )}
        </button>

        {showProject && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="prose prose-green max-w-none">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Programa Córdoba Ciencia Productiva · Línea 2 — Proyectos de Innovación Pública · Convocatoria 2025
              </p>

              <h3 className="mt-3 text-lg font-semibold text-gray-900">Visión general</h3>
              <p className="text-gray-700 leading-relaxed">
                Las Sierras Grandes de Córdoba y sus valles adyacentes enfrentan desafíos ambientales
                y socioeconómicos interrelacionados: degradación de la cubierta vegetal por incendios
                recurrentes y sobrepastoreo, disminución progresiva de la capacidad de captación
                hídrica en una región que abastece a más de <strong>1,5 millones de habitantes</strong>{" "}
                a través de los embalses San Roque, Los Molinos y Río Tercero, y declive de la
                actividad turística tradicional en localidades históricamente dependientes de ese sector.
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Pese a la existencia de conocimiento científico-técnico significativo —disperso en
                universidades, organismos públicos, ONGs y comunidades locales—, no existe un
                instrumento que articule estos saberes y los ponga a disposición de los decisores
                públicos de manera accesible, actualizada y operativa. Este proyecto propone
                desarrollar una <strong>plataforma digital de gestión integrada del conocimiento</strong>{" "}
                sobre las Sierras Grandes, orientada a facilitar la toma de decisiones públicas
                basadas en evidencia.
              </p>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">Ejes temáticos</h3>
              <p className="text-gray-700 leading-relaxed">
                El proyecto se organiza en torno a seis diagnósticos temáticos:
              </p>
              <ol className="mt-2 list-decimal pl-5 text-gray-700 space-y-1">
                <li><strong>Reforestación y restauración ecológica</strong> — bosques de tabaquillo (<em>Polylepis australis</em>), bosque chaqueño serrano, áreas degradadas y proyectos activos.</li>
                <li><strong>Manejo del ganado</strong> — uso ganadero del suelo, umbrales de carga y su impacto en la vegetación nativa.</li>
                <li><strong>Manejo del fuego</strong> — historial de incendios (en 2024 la provincia registró 586 incendios con 103.327 ha quemadas según IDECOR), zonas de riesgo y estrategias de prevención.</li>
                <li><strong>Gestión hídrica</strong> — cuencas principales (San Roque, Los Molinos, Río Tercero), calidad de agua, zonas de recarga y lecciones de la crisis hídrica 2020-2022.</li>
                <li><strong>Ecoturismo y senderismo</strong> — red de senderos, capacidad de carga, puntos de interés, infraestructura y reconversión turística.</li>
                <li><strong>Captación y mercados de carbono</strong> — estimaciones de stock de carbono, áreas potenciales y proyectos existentes.</li>
              </ol>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">Metodología</h3>
              <p className="text-gray-700 leading-relaxed">
                El proyecto contempla cuatro fases a lo largo de 12 meses:
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-sm font-semibold text-green-700">Fase 1 · Relevamiento (meses 1-3)</p>
                  <p className="mt-1 text-xs text-gray-600">Revisión bibliográfica, entrevistas a informantes clave (investigadores, funcionarios, actores territoriales) y mapeo de actores mediante análisis de redes.</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-sm font-semibold text-blue-700">Fase 2 · Diagnóstico (meses 3-6)</p>
                  <p className="mt-1 text-xs text-gray-600">Talleres participativos con expertos por eje temático. Documentos de diagnóstico con marcos FODA y análisis de brechas. Georreferenciación mediante SIG.</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-sm font-semibold text-purple-700">Fase 3 · Desarrollo tecnológico (meses 6-9)</p>
                  <p className="mt-1 text-xs text-gray-600">Diseño con metodología ágil (Scrum). Desarrollo del prototipo web con herramientas de código abierto. Integración de capas georreferenciadas.</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-sm font-semibold text-amber-700">Fase 4 · Validación (meses 9-12)</p>
                  <p className="mt-1 text-xs text-gray-600">Prueba piloto con funcionarios del organismo público adoptante. Evaluación de usabilidad (SUS). Informe final con recomendaciones de política pública.</p>
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">Área de trabajo</h3>
              <p className="text-gray-700 leading-relaxed">
                La zona de alcance abarca desde las primeras estribaciones del macizo al sur
                (zona de Alpa Corral) hasta Cruz del Eje al norte, y desde la ruta que une
                Mina Clavero con Merlo — pasando por San Javier, Las Rosas y La Población — al
                oeste, hasta la divisoria de aguas de las cumbres de las Sierras Chicas al este.
                Esta delimitación aproximada puede verse en el{" "}
                <a href="/mapa" className="text-green-700 underline hover:text-green-600">
                  mapa interactivo
                </a>{" "}
                como una línea roja punteada.
              </p>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">Radicación institucional</h3>
              <p className="text-gray-700 leading-relaxed">
                El proyecto se radica en la <strong>Universidad Nacional de Córdoba</strong>, a
                través del Centro de Investigaciones Jurídicas y Sociales (CIJS) de la Facultad
                de Derecho, articulando saberes científicos con marcos regulatorios y diseño de
                políticas públicas. El equipo multidisciplinario integra especialistas en ecología,
                hidrología, turismo sustentable, mercados de carbono, desarrollo de software y
                políticas públicas, junto con actores territoriales.
              </p>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">Resultados esperados</h3>
              <ol className="mt-2 list-decimal pl-5 text-gray-700 space-y-1">
                <li>Plataforma digital funcional (TRL 6) con diagnósticos integrados, capas georreferenciadas e interfaz de consulta para decisores, validada con usuarios reales.</li>
                <li>Seis documentos de diagnóstico temático con estado del arte, mapeo de actores y análisis de brechas.</li>
                <li>Informe final con recomendaciones de política pública para un plan integral de manejo de las Sierras Grandes.</li>
                <li>Red articulada de expertos y actores territoriales vinculados a la plataforma.</li>
              </ol>

              {/* Stats */}
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <p className="text-2xl font-bold text-green-700">6</p>
                  <p className="text-sm text-green-600">Diagnósticos temáticos</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-2xl font-bold text-blue-700">1,5 M</p>
                  <p className="text-sm text-blue-600">Habitantes beneficiados</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <p className="text-2xl font-bold text-purple-700">12</p>
                  <p className="text-sm text-purple-600">Meses de ejecución</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-2xl font-bold text-amber-700">TRL 6</p>
                  <p className="text-sm text-amber-600">Prototipo validado</p>
                </div>
              </div>

              {/* Download button */}
              <div className="mt-6 flex justify-center">
                <a
                  href="/Proyecto_Plataforma_Sierras_Grandes.docx"
                  download="Proyecto_Plataforma_Sierras_Grandes.docx"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-green-600 bg-white px-5 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50"
                >
                  <Download className="h-4 w-4" />
                  Descargar proyecto completo (.docx)
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Members section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Nuestro Equipo</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? "Cancelar" : "Sumarme al equipo"}
          </button>
        </div>

        {/* Add member form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-xl border border-green-200 bg-green-50/50 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Nuevo integrante
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Photo upload */}
              <div className="sm:col-span-2 flex items-center gap-4">
                <div
                  onClick={() => fotoInputRef.current?.click()}
                  className="group relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-white transition-colors hover:border-green-400"
                >
                  {fotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={fotoUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400 group-hover:text-green-500" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Foto de perfil</p>
                  <p className="text-xs text-gray-500">Click para subir una imagen</p>
                  <input
                    ref={fotoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFotoUpload}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Juan"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Apellido *
                </label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Pérez"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rol / Especialidad
                </label>
                <input
                  type="text"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Ej: Ecólogo, Coordinador, Geógrafa..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Breve biografía
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Contanos brevemente sobre tu trayectoria, intereses y vínculo con las Sierras Grandes..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Link a CV o perfil profesional
                </label>
                <input
                  type="url"
                  value={cvUrl}
                  onChange={(e) => setCvUrl(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="https://linkedin.com/in/... o link a CV"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving || !nombre.trim() || !apellido.trim()}
                className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Registrarme"}
              </button>
            </div>
          </form>
        )}

        {/* Members grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Cargando equipo...
          </div>
        ) : miembros.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">
              Aún no hay miembros registrados.
            </p>
            <p className="text-sm text-gray-400">
              Sé el primero en sumarte al equipo.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {miembros.map((m) => (
              <div
                key={m.id}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* Photo */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-green-100 to-emerald-200">
                    {m.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.foto_url}
                        alt={`${m.nombre} ${m.apellido}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-green-600" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    {m.cv_url ? (
                      <a
                        href={m.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-green-800 underline decoration-green-300 underline-offset-2 transition-colors hover:text-green-600 hover:decoration-green-500"
                      >
                        {m.nombre} {m.apellido}
                      </a>
                    ) : (
                      <h3 className="text-lg font-semibold text-gray-900">
                        {m.nombre} {m.apellido}
                      </h3>
                    )}
                    {m.rol && (
                      <p className="mt-0.5 text-sm font-medium text-green-600">
                        {m.rol}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {m.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {m.bio}
                  </p>
                )}

                {/* Footer links */}
                <div className="mt-3 flex flex-wrap gap-3 border-t border-gray-100 pt-3">
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-green-600"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {m.email}
                    </a>
                  )}
                  {m.cv_url && (
                    <a
                      href={m.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-green-600"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Ver CV / Perfil
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
