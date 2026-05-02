import {
  TreePine,
  Droplets,
  Flame,
  Beef,
  Footprints,
  Leaf,
  Bug,
  Thermometer,
  Scale,
  AlertTriangle,
} from "lucide-react";

export const metadata = {
  title: "Ejes Temáticos — Sierras Grandes",
};

const ejes = [
  {
    id: "reforestacion",
    icon: TreePine,
    title: "Reforestación y Restauración Ecológica",
    color: "border-green-500 bg-green-50",
    iconColor: "text-green-700",
    content: [
      "Estado del bosque nativo de Polylepis australis (tabaquillo) y bosque chaqueño serrano.",
      "Mapeo de áreas degradadas y prioritarias para restauración.",
      "Proyectos activos: Acción Serrana, Ecosistemas Argentinos y otros.",
      "Distribución de especies invasoras y estrategias de manejo.",
      "Estimación de potencial de restauración por microcuenca.",
    ],
  },
  {
    id: "hidrica",
    icon: Droplets,
    title: "Gestión Hídrica",
    color: "border-blue-500 bg-blue-50",
    iconColor: "text-blue-700",
    content: [
      "Cuencas principales: San Roque, Los Molinos, Río Tercero.",
      "Red de monitoreo de calidad de agua y caudales.",
      "Zonas de recarga hídrica y su relación con la cobertura vegetal.",
      "Niveles históricos de embalses y tendencias.",
      "Riesgo de erosión por pérdida de cobertura.",
    ],
  },
  {
    id: "ganado",
    icon: Beef,
    title: "Manejo del Ganado",
    color: "border-yellow-500 bg-yellow-50",
    iconColor: "text-yellow-700",
    content: [
      "Uso ganadero del suelo en las sierras altas.",
      "Umbrales de carga ganadera sustentable (Giorgis et al. 2020).",
      "Impacto del sobrepastoreo en la regeneración del bosque nativo.",
      "Alternativas productivas compatibles con la conservación.",
    ],
  },
  {
    id: "fuego",
    icon: Flame,
    title: "Manejo del Fuego",
    color: "border-orange-500 bg-orange-50",
    iconColor: "text-orange-700",
    content: [
      "Historial de incendios forestales (datos IDECOR/CONAE).",
      "Áreas quemadas por año y tendencias temporales.",
      "Zonas de riesgo y vulnerabilidad ante incendios.",
      "Relación fuego-ganado-regeneración vegetal.",
      "Estrategias de prevención y respuesta temprana.",
    ],
  },
  {
    id: "biodiversidad",
    icon: Bug,
    title: "Biodiversidad y Especies Invasoras",
    color: "border-teal-500 bg-teal-50",
    iconColor: "text-teal-700",
    content: [
      "Comunidades vegetales de la Pampa de Achala y el Bosque Chaqueño Serrano.",
      "Composición florística y mapas de vegetación actualizados.",
      "Distribución y expansión de especies leñosas exóticas invasoras.",
      "Restricciones climáticas para la invasión a lo largo del gradiente altitudinal.",
      "Mapa base de vegetación para el ordenamiento territorial (Giorgis et al. 2022).",
    ],
  },
  {
    id: "clima",
    icon: Thermometer,
    title: "Cambio Climático y Dendrocronología",
    color: "border-red-500 bg-red-50",
    iconColor: "text-red-700",
    content: [
      "Uso de dendrocronología para reconstruir procesos geomórficos históricos.",
      "Adaptación local de especies arbóreas a lo largo del gradiente altitudinal.",
      "Implicaciones del cambio climático para la conservación de Polylepis australis.",
      "Monitoreo de cambios en la línea de vegetación de alta montaña.",
    ],
  },
  {
    id: "ecoturismo",
    icon: Footprints,
    title: "Ecoturismo y Senderismo",
    color: "border-amber-500 bg-amber-50",
    iconColor: "text-amber-700",
    content: [
      "Red de senderos existentes y propuestos.",
      "Capacidad de carga por sendero y zona.",
      "Infraestructura turística y puntos de interés.",
      "Articulación con comunidades locales.",
      "Modelo de turismo sustentable para las Sierras Grandes.",
    ],
  },
  {
    id: "carbono",
    icon: Leaf,
    title: "Captación y Mercados de Carbono",
    color: "border-emerald-500 bg-emerald-50",
    iconColor: "text-emerald-700",
    content: [
      "Estimaciones de stock de carbono por tipo de cobertura vegetal.",
      "Áreas potenciales para proyectos de captura de carbono.",
      "Proyectos de bonos de carbono existentes en la región.",
      "Metodologías de cuantificación (SEPAL/OpenForis).",
      "Oportunidades de financiamiento vía mercados voluntarios.",
    ],
  },
  {
    id: "conflictos-socioambientales",
    icon: AlertTriangle,
    title: "Conflictos Socioambientales",
    color: "border-purple-500 bg-purple-50",
    iconColor: "text-purple-700",
    content: [
      "Autovía de Punilla (2017–presente): autovía de 43,5 km sobre bosque nativo del Valle de Punilla. Destrucción de vegetación nativa, alteración de cursos de agua y sitios arqueológicos. En marzo de 2025, seis defensores ambientales fueron elevados a juicio oral en Cruz del Eje.",
      "Minería metálica en Ischilín/Ongamira: proyecto de extracción de oro sobre ~20.000 ha en el Valle de Ongamira y Quebrada de Luna. Riesgo de contaminación de acuíferos con cianuro y otros tóxicos. En 2023 el gobierno provincial emitió una resolución prohibiendo la explotación en el área de las Cuevas de Ongamira.",
      "Inundaciones de Sierras Chicas (febrero 2015): catástrofe donde la deforestación para barrios cerrados y el avance urbano en zonas de recarga detonaron inundaciones que dejaron 8 muertos, 250 viviendas destruidas y 2.200 afectadas. Organizaciones ciudadanas demandaron paralización de nuevos loteos en cuencas medias y altas.",
      "Canteras y extracción de áridos: expansión de canteras en Sierras Grandes y Sierras Chicas con impactos equivalentes a la megaminería metálica. Asambleas ambientales relevaron y cartografiaron los conflictos activos en el Valle de Punilla (2018–2019).",
      "Deforestación ilegal: casos documentados en San Alberto, San Marcos Sierras y otros departamentos. Desmonte de algarrobos, talas y breas para extracción de leña y habilitación de suelos productivos.",
      "Organizaciones activas: Foro Ambiental Córdoba, Coordinadora Ambiental y de DDHH de Sierras Chicas, Asambleas Ambientales del Valle de Punilla, Sierras Chicas sin Canteras, Mesa de Comunidades Indígenas y Asambleas de los Valles de Córdoba.",
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
    content: [
      "Marco legal vigente sobre áreas protegidas y reservas hídricas en Córdoba.",
      "Propuestas de ordenamiento territorial para las Sierras Grandes.",
      "Regulación de actividades productivas en zonas de amortiguamiento.",
      "Normativa sobre manejo del fuego y prevención de incendios.",
      "Instrumentos legales para la protección de cuencas y servicios ecosistémicos.",
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

export default function EjesPage() {
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
            <ul className="mt-4 space-y-2">
              {eje.content.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
            {"subejes" in eje && eje.subejes && (
              <div className="mt-5 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  {"subejesLabel" in eje ? (eje as any).subejesLabel : "Sub-ejes:"}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(eje.subejes as string[]).map((sub, i) => (
                    <span
                      key={i}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${"subejesBadge" in eje ? (eje as any).subejesBadge : "bg-gray-100 text-gray-700"}`}
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
    </div>
  );
}
