"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TreePine, Droplets, Flame, Beef, Bug, Thermometer,
  Footprints, Leaf, AlertTriangle, Scale,
  FileText, ExternalLink, Plus, X, Save, Pencil,
  ChevronRight, CheckCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type EjeItem = {
  id: string;
  title: string;
  description?: string;
};

type Eje = {
  id: string;
  icon: React.ElementType;
  title: string;
  color: string;
  iconColor: string;
  items: EjeItem[];
  subejesLabel?: string;
  subejesBadge?: string;
  subejes?: string[];
};

type Report = {
  url: string;
  name: string;
  addedAt: string;
  addedBy: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ejes: Eje[] = [
  {
    id: "reforestacion",
    icon: TreePine,
    title: "Reforestación y Restauración Ecológica",
    color: "border-green-500 bg-green-50",
    iconColor: "text-green-700",
    items: [
      { id: "bosque-nativo", title: "Estado del bosque nativo de Polylepis australis (tabaquillo) y bosque chaqueño serrano." },
      { id: "areas-degradadas", title: "Mapeo de áreas degradadas y prioritarias para restauración." },
      { id: "proyectos-activos", title: "Proyectos activos: Acción Serrana, Ecosistemas Argentinos y otros." },
      { id: "especies-invasoras", title: "Distribución de especies invasoras y estrategias de manejo." },
      { id: "potencial-restauracion", title: "Estimación de potencial de restauración por microcuenca." },
    ],
  },
  {
    id: "hidrica",
    icon: Droplets,
    title: "Gestión Hídrica",
    color: "border-blue-500 bg-blue-50",
    iconColor: "text-blue-700",
    items: [
      { id: "cuencas", title: "Cuencas principales: San Roque, Los Molinos, Río Tercero." },
      { id: "red-monitoreo", title: "Red de monitoreo de calidad de agua y caudales." },
      { id: "zonas-recarga", title: "Zonas de recarga hídrica y su relación con la cobertura vegetal." },
      { id: "niveles-embalses", title: "Niveles históricos de embalses y tendencias." },
      { id: "riesgo-erosion", title: "Riesgo de erosión por pérdida de cobertura." },
    ],
  },
  {
    id: "ganado",
    icon: Beef,
    title: "Manejo del Ganado",
    color: "border-yellow-500 bg-yellow-50",
    iconColor: "text-yellow-700",
    items: [
      { id: "uso-ganadero", title: "Uso ganadero del suelo en las sierras altas." },
      { id: "carga-sustentable", title: "Umbrales de carga ganadera sustentable (Giorgis et al. 2020)." },
      { id: "impacto-sobrepastoreo", title: "Impacto del sobrepastoreo en la regeneración del bosque nativo." },
      { id: "alternativas-productivas", title: "Alternativas productivas compatibles con la conservación." },
    ],
  },
  {
    id: "fuego",
    icon: Flame,
    title: "Manejo del Fuego",
    color: "border-orange-500 bg-orange-50",
    iconColor: "text-orange-700",
    items: [
      { id: "historial-incendios", title: "Historial de incendios forestales (datos IDECOR/CONAE)." },
      { id: "areas-quemadas", title: "Áreas quemadas por año y tendencias temporales." },
      { id: "zonas-riesgo", title: "Zonas de riesgo y vulnerabilidad ante incendios." },
      { id: "fuego-ganado", title: "Relación fuego-ganado-regeneración vegetal." },
      { id: "estrategias-prevencion", title: "Estrategias de prevención y respuesta temprana." },
    ],
  },
  {
    id: "biodiversidad",
    icon: Bug,
    title: "Biodiversidad y Especies Invasoras",
    color: "border-teal-500 bg-teal-50",
    iconColor: "text-teal-700",
    items: [
      { id: "comunidades-vegetales", title: "Comunidades vegetales de la Pampa de Achala y el Bosque Chaqueño Serrano." },
      { id: "composicion-floristica", title: "Composición florística y mapas de vegetación actualizados." },
      { id: "distribucion-invasoras", title: "Distribución y expansión de especies leñosas exóticas invasoras." },
      { id: "restricciones-climaticas", title: "Restricciones climáticas para la invasión a lo largo del gradiente altitudinal." },
      { id: "mapa-base-vegetacion", title: "Mapa base de vegetación para el ordenamiento territorial (Giorgis et al. 2022)." },
    ],
  },
  {
    id: "clima",
    icon: Thermometer,
    title: "Cambio Climático y Dendrocronología",
    color: "border-red-500 bg-red-50",
    iconColor: "text-red-700",
    items: [
      { id: "dendrocronologia", title: "Uso de dendrocronología para reconstruir procesos geomórficos históricos." },
      { id: "adaptacion-local", title: "Adaptación local de especies arbóreas a lo largo del gradiente altitudinal." },
      { id: "cambio-climatico-polylepis", title: "Implicaciones del cambio climático para la conservación de Polylepis australis." },
      { id: "monitoreo-vegetacion", title: "Monitoreo de cambios en la línea de vegetación de alta montaña." },
    ],
  },
  {
    id: "ecoturismo",
    icon: Footprints,
    title: "Ecoturismo y Senderismo",
    color: "border-amber-500 bg-amber-50",
    iconColor: "text-amber-700",
    items: [
      { id: "red-senderos", title: "Red de senderos existentes y propuestos." },
      { id: "capacidad-carga", title: "Capacidad de carga por sendero y zona." },
      { id: "infraestructura-turistica", title: "Infraestructura turística y puntos de interés." },
      { id: "comunidades-locales", title: "Articulación con comunidades locales." },
      { id: "turismo-sustentable", title: "Modelo de turismo sustentable para las Sierras Grandes." },
    ],
  },
  {
    id: "carbono",
    icon: Leaf,
    title: "Captación y Mercados de Carbono",
    color: "border-emerald-500 bg-emerald-50",
    iconColor: "text-emerald-700",
    items: [
      { id: "stock-carbono", title: "Estimaciones de stock de carbono por tipo de cobertura vegetal." },
      { id: "areas-potenciales", title: "Áreas potenciales para proyectos de captura de carbono." },
      { id: "proyectos-bonos", title: "Proyectos de bonos de carbono existentes en la región." },
      { id: "metodologias", title: "Metodologías de cuantificación (SEPAL/OpenForis)." },
      { id: "financiamiento", title: "Oportunidades de financiamiento vía mercados voluntarios." },
    ],
  },
  {
    id: "conflictos-socioambientales",
    icon: AlertTriangle,
    title: "Conflictos Socioambientales",
    color: "border-purple-500 bg-purple-50",
    iconColor: "text-purple-700",
    items: [
      {
        id: "autovia-punilla",
        title: "Autovía de Punilla (2017–presente)",
        description:
          "Autovía de 43,5 km sobre bosque nativo del Valle de Punilla. Destrucción de vegetación nativa, alteración de cursos de agua y sitios arqueológicos. En marzo de 2025, seis defensores ambientales fueron elevados a juicio oral en Cruz del Eje.",
      },
      {
        id: "mineria-ongamira",
        title: "Minería metálica en Ischilín/Ongamira",
        description:
          "Proyecto de extracción de oro sobre ~20.000 ha en el Valle de Ongamira y Quebrada de Luna. Riesgo de contaminación de acuíferos con cianuro y otros tóxicos. En 2023 el gobierno provincial emitió una resolución prohibiendo la explotación en el área de las Cuevas de Ongamira.",
      },
      {
        id: "inundaciones-sierras-chicas",
        title: "Inundaciones de Sierras Chicas (febrero 2015)",
        description:
          "Catástrofe donde la deforestación para barrios cerrados y el avance urbano en zonas de recarga detonaron inundaciones que dejaron 8 muertos, 250 viviendas destruidas y 2.200 afectadas. Organizaciones ciudadanas demandaron paralización de nuevos loteos en cuencas medias y altas.",
      },
      {
        id: "canteras-aridos",
        title: "Canteras y extracción de áridos",
        description:
          "Expansión de canteras en Sierras Grandes y Sierras Chicas con impactos equivalentes a la megaminería metálica. Asambleas ambientales relevaron y cartografiaron los conflictos activos en el Valle de Punilla (2018–2019).",
      },
      {
        id: "deforestacion-ilegal",
        title: "Deforestación ilegal",
        description:
          "Casos documentados en San Alberto, San Marcos Sierras y otros departamentos. Desmonte de algarrobos, talas y breas para extracción de leña y habilitación de suelos productivos.",
      },
      {
        id: "organizaciones-activas",
        title: "Organizaciones activas",
        description:
          "Foro Ambiental Córdoba, Coordinadora Ambiental y de DDHH de Sierras Chicas, Asambleas Ambientales del Valle de Punilla, Sierras Chicas sin Canteras, Mesa de Comunidades Indígenas y Asambleas de los Valles de Córdoba.",
      },
    ],
    subejesLabel: "Tipos de conflicto registrados:",
    subejesBadge: "bg-purple-100 text-purple-700",
    subejes: [
      "Infraestructura vial",
      "Minería metálica",
      "Canteras y áridos",
      "Deforestación y loteos",
      "Conflictos hídricos",
      "Incendios intencionales",
      "Tierras y tenencia",
    ],
  },
  {
    id: "normativa",
    icon: Scale,
    title: "Propuestas Normativas",
    color: "border-indigo-500 bg-indigo-50",
    iconColor: "text-indigo-700",
    items: [
      { id: "marco-legal", title: "Marco legal vigente sobre áreas protegidas y reservas hídricas en Córdoba." },
      { id: "ordenamiento-territorial", title: "Propuestas de ordenamiento territorial para las Sierras Grandes." },
      { id: "regulacion-actividades", title: "Regulación de actividades productivas en zonas de amortiguamiento." },
      { id: "normativa-fuego", title: "Normativa sobre manejo del fuego y prevención de incendios." },
      { id: "instrumentos-legales", title: "Instrumentos legales para la protección de cuencas y servicios ecosistémicos." },
    ],
    subejesLabel: "Sub-ejes para proyectos de ley y propuestas:",
    subejesBadge: "bg-indigo-100 text-indigo-700",
    subejes: [
      "Gestión Integral de las Sierras Grandes",
      "Reforestación y Restauración Ecológica",
      "Recursos Hídricos",
      "Manejo de Ganado",
      "Manejo del Fuego",
      "Biodiversidad",
      "Ecoturismo",
      "Carbono",
      "Cambio Climático",
    ],
  },
];

// ─── localStorage helpers ─────────────────────────────────────────────────────

function reportKey(ejeId: string, itemId: string) {
  return `sg_report:${ejeId}:${itemId}`;
}

function getReport(ejeId: string, itemId: string): Report | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(reportKey(ejeId, itemId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveReport(ejeId: string, itemId: string, report: Report) {
  localStorage.setItem(reportKey(ejeId, itemId), JSON.stringify(report));
}

function deleteReport(ejeId: string, itemId: string) {
  localStorage.removeItem(reportKey(ejeId, itemId));
}

// ─── Panel lateral ────────────────────────────────────────────────────────────

type PanelProps = {
  eje: Eje;
  item: EjeItem;
  isAdmin: boolean;
  adminName: string;
  onClose: () => void;
  onReportChange: () => void;
};

function ItemPanel({ eje, item, isAdmin, adminName, onClose, onReportChange }: PanelProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formUrl, setFormUrl] = useState("");
  const [formName, setFormName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setReport(getReport(eje.id, item.id));
    setShowForm(false);
    setFormUrl("");
    setFormName("");
    setSaved(false);
  }, [eje.id, item.id]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleSave() {
    if (!formUrl.trim()) return;
    const r: Report = {
      url: formUrl.trim(),
      name: formName.trim() || "Informe",
      addedAt: new Date().toLocaleDateString("es-AR"),
      addedBy: adminName,
    };
    saveReport(eje.id, item.id, r);
    setReport(r);
    setShowForm(false);
    setFormUrl("");
    setFormName("");
    setSaved(true);
    onReportChange();
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDelete() {
    deleteReport(eje.id, item.id);
    setReport(null);
    onReportChange();
  }

  function handleEdit() {
    if (report) { setFormUrl(report.url); setFormName(report.name); }
    setShowForm(true);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${eje.iconColor}`}>
                <eje.icon className="h-3.5 w-3.5" />
                {eje.title}
              </p>
              <h2 className="mt-2 text-lg font-bold leading-snug text-gray-900">
                {item.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="mt-0.5 flex-shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">

          {/* Descripción (solo si existe) */}
          {item.description && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Descripción
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>
            </div>
          )}

          {/* Informe */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Informe
            </p>

            {report ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {report.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Cargado el {report.addedAt} por {report.addedBy}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Ver informe
                  </a>
                  {isAdmin && (
                    <>
                      <button
                        onClick={handleEdit}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Editar
                      </button>
                      <button
                        onClick={handleDelete}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 p-5 text-center">
                <FileText className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500">Sin informe cargado</p>
                {isAdmin && !showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Agregar informe
                  </button>
                )}
                {!isAdmin && (
                  <p className="mt-1 text-xs text-gray-400">
                    Iniciá sesión para cargar documentos
                  </p>
                )}
              </div>
            )}

            {/* Formulario admin */}
            {isAdmin && showForm && (
              <div className="mt-3 space-y-3 rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-700">
                  {report ? "Editar informe" : "Nuevo informe"}
                </p>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Nombre del documento
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Informe de impacto ambiental 2024"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    URL del documento <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Google Drive, Dropbox, o cualquier enlace a un PDF
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={!formUrl.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Guardar
                  </button>
                  <button
                    onClick={() => { setShowForm(false); setFormUrl(""); setFormName(""); }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {saved && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-green-600">
                <CheckCircle className="h-4 w-4" />
                Informe guardado correctamente
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function EjesContent() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<{ eje: Eje; item: EjeItem } | null>(null);
  const [reportMap, setReportMap] = useState<Record<string, boolean>>({});

  const refreshReportMap = useCallback(() => {
    const map: Record<string, boolean> = {};
    ejes.forEach((eje) => {
      eje.items.forEach((item) => {
        map[`${eje.id}:${item.id}`] = getReport(eje.id, item.id) !== null;
      });
    });
    setReportMap(map);
  }, []);

  useEffect(() => {
    refreshReportMap();
  }, [refreshReportMap]);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Ejes Temáticos</h1>
      <p className="mt-2 text-gray-500">
        Diez líneas de diagnóstico y acción para la gestión integrada de las
        Sierras Grandes.
      </p>

      <div className="mt-10 space-y-8">
        {ejes.map((eje) => (
          <section
            key={eje.id}
            id={eje.id}
            className={`scroll-mt-20 rounded-xl border-l-4 p-6 ${eje.color}`}
          >
            <div className="flex items-center gap-3">
              <eje.icon className={`h-7 w-7 ${eje.iconColor}`} />
              <h2 className="text-xl font-bold text-gray-900">{eje.title}</h2>
            </div>

            <ul className="mt-4 space-y-1">
              {eje.items.map((item) => {
                const hasReport = reportMap[`${eje.id}:${item.id}`];
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setSelected({ eje, item })}
                      className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/70"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                      <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900">
                        {item.title}
                      </span>
                      {hasReport && (
                        <FileText className={`h-3.5 w-3.5 flex-shrink-0 opacity-60 ${eje.iconColor}`} />
                      )}
                      <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-300 transition-colors group-hover:text-gray-500" />
                    </button>
                  </li>
                );
              })}
            </ul>

            {eje.subejes && (
              <div className="mt-5 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  {eje.subejesLabel ?? "Sub-ejes:"}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {eje.subejes.map((sub, i) => (
                    <span
                      key={i}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${eje.subejesBadge ?? "bg-gray-100 text-gray-700"}`}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {selected && (
        <ItemPanel
          eje={selected.eje}
          item={selected.item}
          isAdmin={!!user}
          adminName={user?.nombre ?? ""}
          onClose={handleClose}
          onReportChange={refreshReportMap}
        />
      )}
    </div>
  );
}
