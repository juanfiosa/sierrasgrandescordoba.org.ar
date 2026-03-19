// ── Types ──────────────────────────────────────────────
export interface Investigador {
  id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  especialidadOtra: string; // si eligió "otra"
  email: string;
  telefono: string;
  institucion: string;
  link: string;
  creadoPor: string;
}

// ── Catálogo de especialidades ─────────────────────────
export const especialidades = [
  { value: "reforestacion", label: "Reforestación y restauración de bosques nativos" },
  { value: "hidrica", label: "Gestión hídrica y cuencas" },
  { value: "ganado", label: "Manejo de ganado en áreas serranas" },
  { value: "fuego", label: "Manejo del fuego e incendios forestales" },
  { value: "biodiversidad", label: "Biodiversidad y conservación" },
  { value: "clima", label: "Cambio climático y meteorología" },
  { value: "ecoturismo", label: "Ecoturismo y turismo sustentable" },
  { value: "carbono", label: "Captura de carbono y servicios ecosistémicos" },
  { value: "normativa", label: "Legislación y política ambiental" },
  { value: "geologia", label: "Geología y geomorfología serrana" },
  { value: "edafologia", label: "Edafología y suelos" },
  { value: "ecologia", label: "Ecología general" },
  { value: "teledeteccion", label: "Teledetección y SIG" },
  { value: "otra", label: "Otra (especificar)" },
];

// ── Datos de ejemplo ───────────────────────────────────
export const defaultInvestigadores: Investigador[] = [
  {
    id: "inv-1",
    nombre: "Ana",
    apellido: "Cingolani",
    especialidad: "ecologia",
    especialidadOtra: "",
    email: "",
    telefono: "",
    institucion: "CONICET / IMBIV – UNC",
    link: "",
    creadoPor: "sistema",
  },
  {
    id: "inv-2",
    nombre: "Marcelo",
    apellido: "Cabido",
    especialidad: "biodiversidad",
    especialidadOtra: "",
    email: "",
    telefono: "",
    institucion: "CONICET / IMBIV – UNC",
    link: "",
    creadoPor: "sistema",
  },
  {
    id: "inv-3",
    nombre: "Daniel",
    apellido: "Renison",
    especialidad: "reforestacion",
    especialidadOtra: "",
    email: "",
    telefono: "",
    institucion: "CONICET / CERNAR – UNC",
    link: "",
    creadoPor: "sistema",
  },
];
