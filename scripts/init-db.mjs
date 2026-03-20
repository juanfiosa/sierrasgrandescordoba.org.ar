import { neon } from "@neondatabase/serverless";

const DATABASE_URL =
  "postgresql://neondb_owner:npg_FB4A9LRDpIvh@ep-soft-heart-an7yys0g-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

async function main() {
  console.log("Creating tables...");

  // ── Investigadores ──
  await sql`
    CREATE TABLE IF NOT EXISTS investigadores (
      id            SERIAL PRIMARY KEY,
      nombre        TEXT NOT NULL,
      apellido      TEXT NOT NULL,
      especialidad  TEXT NOT NULL,
      email         TEXT NOT NULL,
      telefono      TEXT DEFAULT '',
      institucion   TEXT DEFAULT '',
      link          TEXT DEFAULT '',
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("  ✓ investigadores");

  // ── Organizaciones ──
  await sql`
    CREATE TABLE IF NOT EXISTS organizaciones (
      id            SERIAL PRIMARY KEY,
      nombre        TEXT NOT NULL,
      descripcion   TEXT NOT NULL,
      tipo          TEXT NOT NULL DEFAULT 'civil',
      eje           TEXT NOT NULL DEFAULT 'general',
      web           TEXT DEFAULT '',
      instagram     TEXT DEFAULT '',
      creado_por    TEXT DEFAULT 'sistema',
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("  ✓ organizaciones");

  // ── Alojamientos ──
  await sql`
    CREATE TABLE IF NOT EXISTS alojamientos (
      id            SERIAL PRIMARY KEY,
      nombre        TEXT NOT NULL,
      descripcion   TEXT NOT NULL,
      tipo_aloj     TEXT NOT NULL DEFAULT 'cabanas',
      zona          TEXT NOT NULL DEFAULT 'traslasierra',
      web           TEXT DEFAULT '',
      instagram     TEXT DEFAULT '',
      creado_por    TEXT DEFAULT 'sistema',
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("  ✓ alojamientos");

  // ── Seed investigadores (vacío por ahora) ──

  // ── Seed organizaciones ──
  const orgCount = await sql`SELECT count(*) as n FROM organizaciones`;
  if (Number(orgCount[0].n) === 0) {
    console.log("  Seeding organizaciones...");
    const orgs = [
      ["Acción Serrana", "ONG dedicada a la reforestación con especies nativas en las Sierras Grandes de Córdoba.", "civil", "reforestacion", "https://accionserrana.org", "https://instagram.com/accionserrana"],
      ["Ecosistemas Argentinos", "Organización que trabaja en restauración de bosques nativos en las sierras de Córdoba.", "civil", "reforestacion", "https://ecosistemasarg.org.ar", "https://instagram.com/ecosistemasarg"],
      ["Grupo Sierras Grandes", "Grupo interdisciplinario que articula conocimiento científico, técnico y comunitario para la gestión integrada de las Sierras Grandes.", "civil", "general", "", ""],
      ["CERNAR – UNC", "Centro de Ecología y Recursos Naturales Renovables de la UNC. Investigan ecología de bosques serranos, incendios y restauración.", "civil", "general", "", ""],
      ["PN Quebrada del Condorito", "Parque Nacional que protege pastizales de altura y bosques de tabaquillo. Hábitat del cóndor andino.", "civil", "biodiversidad", "https://www.argentina.gob.ar/parquesnacionales/quebradadelcondorito", ""],
      ["Alto Rumbo Turismo Aventura", "Empresa de turismo aventura en Traslasierra. Trekking al Champaquí, cabalgatas y excursiones guiadas.", "comercial", "ecoturismo", "", ""],
    ];
    for (const [nombre, descripcion, tipo, eje, web, instagram] of orgs) {
      await sql`INSERT INTO organizaciones (nombre, descripcion, tipo, eje, web, instagram) VALUES (${nombre}, ${descripcion}, ${tipo}, ${eje}, ${web}, ${instagram})`;
    }
    console.log("  ✓ organizaciones seeded");
  }

  // ── Seed alojamientos ──
  const alojCount = await sql`SELECT count(*) as n FROM alojamientos`;
  if (Number(alojCount[0].n) === 0) {
    console.log("  Seeding alojamientos...");
    const alojs = [
      ["Refugio Los Gigantes", "Refugio de montaña al pie de Los Gigantes, ~2100 msnm.", "refugio", "sierras_altas"],
      ["Camping Quebrada del Condorito", "Área de acampe cerca del Parque Nacional.", "camping", "sierras_altas"],
      ["Camping La Cumbrecita", "Camping en la villa peatonal de La Cumbrecita.", "camping", "calamuchita"],
      ["Cabañas en Villa Alpina", "Cabañas a los pies del cerro Champaquí.", "cabanas", "calamuchita"],
      ["Hostería de Copina", "Hostería rural camino a las altas cumbres.", "hosteria", "sierras_altas"],
      ["Camping Los Hornillos", "Camping en Traslasierra, cercanía a ríos y senderos.", "camping", "traslasierra"],
    ];
    for (const [nombre, descripcion, tipo_aloj, zona] of alojs) {
      await sql`INSERT INTO alojamientos (nombre, descripcion, tipo_aloj, zona) VALUES (${nombre}, ${descripcion}, ${tipo_aloj}, ${zona})`;
    }
    console.log("  ✓ alojamientos seeded");
  }

  console.log("\nDone! Database initialized.");
}

main().catch(console.error);
