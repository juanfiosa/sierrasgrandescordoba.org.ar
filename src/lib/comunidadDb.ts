import { sql } from "@/lib/db";

// Crea las tablas del foro de comunidad si no existen (idempotente).
export async function ensureComunidadTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS comunidad_posts (
      id SERIAL PRIMARY KEY,
      categoria TEXT DEFAULT 'iniciativa',
      titulo TEXT NOT NULL,
      cuerpo TEXT DEFAULT '',
      autor TEXT DEFAULT '',
      autor_email TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS comunidad_respuestas (
      id SERIAL PRIMARY KEY,
      post_id INTEGER NOT NULL REFERENCES comunidad_posts(id) ON DELETE CASCADE,
      cuerpo TEXT NOT NULL,
      autor TEXT DEFAULT '',
      autor_email TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}
