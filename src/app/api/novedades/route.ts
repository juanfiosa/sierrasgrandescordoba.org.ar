import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Crea la tabla si no existe (idempotente y barato).
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS novedades (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      cuerpo TEXT DEFAULT '',
      mostrar BOOLEAN DEFAULT true,
      autor TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}

// GET — lista novedades. Con ?visibles=1 devuelve solo las marcadas para mostrar.
export async function GET(req: NextRequest) {
  try {
    await ensureTable();
    const soloVisibles = req.nextUrl.searchParams.get("visibles") === "1";
    const rows = soloVisibles
      ? await sql`
          SELECT id, titulo, cuerpo, mostrar, autor, created_at
          FROM novedades
          WHERE mostrar = true
          ORDER BY created_at DESC
        `
      : await sql`
          SELECT id, titulo, cuerpo, mostrar, autor, created_at
          FROM novedades
          ORDER BY created_at DESC
        `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/novedades error:", error);
    return NextResponse.json({ error: "Error al obtener novedades" }, { status: 500 });
  }
}

// POST — crea una novedad.
export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const body = await req.json();
    const { titulo, cuerpo, mostrar, autor } = body;

    if (!titulo?.trim()) {
      return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO novedades (titulo, cuerpo, mostrar, autor)
      VALUES (
        ${titulo.trim()},
        ${(cuerpo || "").trim()},
        ${mostrar === false ? false : true},
        ${(autor || "").trim()}
      )
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/novedades error:", error);
    return NextResponse.json({ error: "Error al crear novedad" }, { status: 500 });
  }
}

// PATCH — actualiza una novedad (editar o mostrar/ocultar). Requiere id.
export async function PATCH(req: NextRequest) {
  try {
    await ensureTable();
    const body = await req.json();
    const { id, titulo, cuerpo, mostrar } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta el id" }, { status: 400 });
    }
    if (!titulo?.trim()) {
      return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });
    }

    const rows = await sql`
      UPDATE novedades
      SET titulo = ${titulo.trim()},
          cuerpo = ${(cuerpo || "").trim()},
          mostrar = ${mostrar === false ? false : true}
      WHERE id = ${id}
      RETURNING *
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "Novedad no encontrada" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("PATCH /api/novedades error:", error);
    return NextResponse.json({ error: "Error al actualizar novedad" }, { status: 500 });
  }
}

// DELETE — elimina una novedad. Requiere ?id=.
export async function DELETE(req: NextRequest) {
  try {
    await ensureTable();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Falta el id" }, { status: 400 });
    }
    await sql`DELETE FROM novedades WHERE id = ${Number(id)}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/novedades error:", error);
    return NextResponse.json({ error: "Error al eliminar novedad" }, { status: 500 });
  }
}
