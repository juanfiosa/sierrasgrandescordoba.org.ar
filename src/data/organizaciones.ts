// ── Types ──────────────────────────────────────────────
export interface Organizacion {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: "civil" | "comercial";
  eje: string;
  web: string;
  instagram: string;
  email: string;
  creadoPor: string;
}

export interface Alojamiento {
  id: string;
  nombre: string;
  descripcion: string;
  tipoAloj: "refugio" | "camping" | "cabanas" | "hotel" | "hosteria";
  zona: string;
  web: string;
  instagram: string;
  creadoPor: string;
}

// ── Catálogos ──────────────────────────────────────────
export const ejesOrg = [
  { value: "general", label: "General / Multitemático" },
  { value: "reforestacion", label: "Reforestación" },
  { value: "hidrica", label: "Gestión Hídrica" },
  { value: "ganado", label: "Manejo de Ganado" },
  { value: "fuego", label: "Manejo del Fuego" },
  { value: "biodiversidad", label: "Biodiversidad" },
  { value: "clima", label: "Cambio Climático" },
  { value: "ecoturismo", label: "Ecoturismo" },
  { value: "carbono", label: "Carbono" },
  { value: "normativa", label: "Propuestas Normativas" },
];

export const zonasAlojamiento = [
  { value: "sierras_altas", label: "Sierras Altas (>1500m)" },
  { value: "traslasierra", label: "Valle de Traslasierra" },
  { value: "calamuchita", label: "Valle de Calamuchita" },
  { value: "punilla", label: "Valle de Punilla" },
  { value: "paravachasca", label: "Valle de Paravachasca" },
];

export const tiposAlojamiento = [
  { value: "refugio", label: "Refugio de montaña" },
  { value: "camping", label: "Camping" },
  { value: "cabanas", label: "Cabañas" },
  { value: "hotel", label: "Hotel" },
  { value: "hosteria", label: "Hostería" },
];

// ── Organizaciones ─────────────────────────────────────
export const defaultOrganizaciones: Organizacion[] = [
  // ── Sociedad civil ──
  {
    id: "org-1",
    nombre: "Acción Serrana",
    descripcion:
      "Movimiento regional de reforestación con especies nativas (tabaquillo, maitén) en las Sierras Grandes de Córdoba. Realizan jornadas de plantación comunitaria y educación ambiental.",
    tipo: "civil",
    eje: "reforestacion",
    web: "https://www.accionserrana.com",
    instagram: "https://instagram.com/accionserrana",
    email: "info@accionserrana.com",
    creadoPor: "sistema",
  },
  {
    id: "org-2",
    nombre: "Ecosistemas Argentinos",
    descripcion:
      "Asociación civil que trabaja en restauración de bosques nativos en las sierras de Córdoba, con foco en la recuperación de cuencas degradadas y monitoreo de biodiversidad.",
    tipo: "civil",
    eje: "reforestacion",
    web: "https://www.ecosistemasarg.org.ar",
    instagram: "https://instagram.com/ecosistemasarg",
    email: "ecosistemasarg@gmail.com",
    creadoPor: "sistema",
  },
  {
    id: "org-3",
    nombre: "Manos que Tejen Bosques",
    descripcion:
      "Organización comunitaria que trabaja en la reforestación y restauración de bosques nativos en las Sierras de Córdoba (PN Quebrada del Condorito) a través de la participación colectiva.",
    tipo: "civil",
    eje: "reforestacion",
    web: "https://www.manosquetejenbosques.org",
    instagram: "https://instagram.com/manosquetejenbosques",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "org-4",
    nombre: "Fundación CONYDES",
    descripcion:
      "Fundación Conservación y Desarrollo (Río Cuarto) que trabaja en conservación de biodiversidad, restauración de bosques nativos y desarrollo sustentable en las sierras del sur de Córdoba.",
    tipo: "civil",
    eje: "biodiversidad",
    web: "",
    instagram: "",
    email: "fundacionconydes@gmail.com",
    creadoPor: "sistema",
  },
  {
    id: "org-5",
    nombre: "CERNAR – UNC",
    descripcion:
      "Centro de Ecología y Recursos Naturales Renovables \"Dr. Ricardo Luti\" de la Universidad Nacional de Córdoba. Investigan ecología de bosques serranos, incendios y restauración.",
    tipo: "civil",
    eje: "general",
    web: "https://fcefyn.unc.edu.ar/facultad/secretarias/investigacion-y-desarrollo/centros/centro-ecologia-y-recursos-naturales-renovables-cernar/",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "org-6",
    nombre: "Grupo Sierras Grandes",
    descripcion:
      "Grupo interdisciplinario que articula conocimiento científico, técnico y comunitario para la gestión integrada de las Sierras Grandes de Córdoba.",
    tipo: "civil",
    eje: "general",
    web: "https://sierrasgrandes.ar",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "org-7",
    nombre: "Administración de Parques Nacionales – PN Quebrada del Condorito",
    descripcion:
      "Parque Nacional que protege los pastizales de altura y bosques de tabaquillo en las Sierras Grandes. Incluye la Quebrada del Condorito, hábitat del cóndor andino.",
    tipo: "civil",
    eje: "biodiversidad",
    web: "https://www.argentina.gob.ar/parquesnacionales/quebradadelcondorito",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "org-8",
    nombre: "Reserva Hídrica Provincial Pampa de Achala",
    descripcion:
      "Área protegida provincial que resguarda las nacientes de los principales ríos y arroyos que alimentan los embalses de Córdoba. Gestionada por la Secretaría de Ambiente de la Provincia.",
    tipo: "civil",
    eje: "hidrica",
    web: "https://ambiente.cba.gov.ar/areas-naturales-protegidas/",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "org-9",
    nombre: "Bomberos Voluntarios de las Sierras",
    descripcion:
      "Red de cuarteles de bomberos voluntarios que cubren la prevención y combate de incendios forestales en las Sierras Grandes y valles periféricos.",
    tipo: "civil",
    eje: "fuego",
    web: "",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "org-10",
    nombre: "Club Andino Córdoba",
    descripcion:
      "Club de montañismo y trekking (fundado en 1935) que realiza travesías, escuela de montaña y actividades en las Sierras Grandes. Promueve el disfrute responsable y el cuidado de la montaña.",
    tipo: "civil",
    eje: "ecoturismo",
    web: "https://clubandinocordoba.org",
    instagram: "",
    email: "info@clubandinocordoba.org",
    creadoPor: "sistema",
  },
  {
    id: "org-11",
    nombre: "Fundación de Actividades Biosféricas (FundaciónAB)",
    descripcion:
      "Fundación con sede en Traslasierra. Su Centro de Restauración Ecológica y Educación Ambiental (CREEA) impulsa el proyecto \"Ordeñando Nubes\", de restauración de los bosques más altos en la Reserva Hídrica de Achala, Sierras Grandes.",
    tipo: "civil",
    eje: "reforestacion",
    web: "https://www.fundacionab.org.ar",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "org-12",
    nombre: "Aves Argentinas",
    descripcion:
      "Asociación ornitológica del Plata (BirdLife International en Argentina). Trabaja en la conservación del cóndor andino y de las Áreas de Importancia para la Conservación de las Aves (AICAs) en la Pampa de Achala y el PN Quebrada del Condorito.",
    tipo: "civil",
    eje: "biodiversidad",
    web: "https://www.avesargentinas.org.ar",
    instagram: "https://instagram.com/avesargentinas",
    email: "info@avesargentinas.org.ar",
    creadoPor: "sistema",
  },
  {
    id: "org-13",
    nombre: "Fundación Mil Aves",
    descripcion:
      "Organización cordobesa sin fines de lucro dedicada a la conservación de aves silvestres y sus ambientes, con educación ambiental y avistajes en la Pampa de Achala y las Sierras Grandes.",
    tipo: "civil",
    eje: "biodiversidad",
    web: "https://milaves.org.ar",
    instagram: "https://instagram.com/fundacionmilaves",
    email: "",
    creadoPor: "sistema",
  },

  // ── Empresas comerciales ──
  {
    id: "emp-1",
    nombre: "Alto Rumbo Turismo Aventura",
    descripcion:
      "Empresa de turismo aventura con base en Traslasierra. Ofrecen trekking al Champaquí, cabalgatas y excursiones guiadas por las Sierras Grandes.",
    tipo: "comercial",
    eje: "ecoturismo",
    web: "",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "emp-2",
    nombre: "Senderos EVT",
    descripcion:
      "Empresa de viajes y turismo especializada en senderismo y trekking en las Sierras de Córdoba. Organizan travesías grupales y salidas de montaña.",
    tipo: "comercial",
    eje: "ecoturismo",
    web: "",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
  {
    id: "emp-3",
    nombre: "Córdoba Naturaleza y Aventura",
    descripcion:
      "Operador turístico que ofrece actividades de ecoturismo, avistaje de aves y caminatas interpretativas en las Sierras Grandes.",
    tipo: "comercial",
    eje: "ecoturismo",
    web: "",
    instagram: "",
    email: "",
    creadoPor: "sistema",
  },
];

// ── Alojamientos ───────────────────────────────────────
export const defaultAlojamientos: Alojamiento[] = [
  {
    id: "aloj-1",
    nombre: "Refugio Los Gigantes",
    descripcion:
      "Refugio de montaña ubicado al pie de Los Gigantes, en las Sierras Grandes a ~2100 msnm. Punto de partida para ascensos a las formaciones rocosas.",
    tipoAloj: "refugio",
    zona: "sierras_altas",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-2",
    nombre: "Refugio El Gigantillo",
    descripcion:
      "Pequeño refugio de montaña en la zona de Los Gigantes, Sierras Grandes de Córdoba. Base para excursiones y escalada en la zona.",
    tipoAloj: "refugio",
    zona: "sierras_altas",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-3",
    nombre: "Camping Quebrada del Condorito",
    descripcion:
      "Área de acampe en las inmediaciones del Parque Nacional Quebrada del Condorito. Servicios básicos y acceso a senderos del parque.",
    tipoAloj: "camping",
    zona: "sierras_altas",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-4",
    nombre: "Camping La Cumbrecita",
    descripcion:
      "Camping municipal en la villa peatonal de La Cumbrecita, al pie de las Sierras Grandes. Acceso a senderos, cascadas y río.",
    tipoAloj: "camping",
    zona: "calamuchita",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-5",
    nombre: "Hostería de Copina",
    descripcion:
      "Hostería rural en la localidad de Copina, camino a las altas cumbres. Punto estratégico para excursiones a la Pampa de Achala.",
    tipoAloj: "hosteria",
    zona: "sierras_altas",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-6",
    nombre: "Cabañas en San Javier",
    descripcion:
      "Alojamiento en cabañas de montaña en San Javier, Traslasierra. Vista a las sierras y acceso a senderos de la zona.",
    tipoAloj: "cabanas",
    zona: "traslasierra",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-7",
    nombre: "Camping Los Hornillos",
    descripcion:
      "Camping en la localidad de Los Hornillos, valle de Traslasierra. Cercanía a ríos y senderos hacia las Sierras Grandes.",
    tipoAloj: "camping",
    zona: "traslasierra",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-8",
    nombre: "Camping Yuspe",
    descripcion:
      "Área de camping en la zona de la estancia Yuspe, Pampa de Achala. Punto de acceso a senderos de altura.",
    tipoAloj: "camping",
    zona: "sierras_altas",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-9",
    nombre: "Cabañas en Villa Alpina",
    descripcion:
      "Cabañas en Villa Alpina, Calamuchita, a los pies del cerro Champaquí. Base frecuente para el ascenso a la cumbre más alta de Córdoba.",
    tipoAloj: "cabanas",
    zona: "calamuchita",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-10",
    nombre: "Camping El Durazno",
    descripcion:
      "Camping en la localidad de El Durazno, sobre el río homónimo en Traslasierra. Acceso a excursiones hacia las Sierras Grandes.",
    tipoAloj: "camping",
    zona: "traslasierra",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
  {
    id: "aloj-11",
    nombre: "Hostería Cuchi Corral",
    descripcion:
      "Hostería en la zona de Cuchi Corral, cerca de La Falda, Valle de Punilla. Entorno serrano con acceso a caminatas y cascadas.",
    tipoAloj: "hosteria",
    zona: "punilla",
    web: "",
    instagram: "",
    creadoPor: "sistema",
  },
];
