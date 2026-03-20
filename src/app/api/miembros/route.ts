import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET — list all members ordered by 'orden' field
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, nombre, apellido, rol, bio, foto_url, cv_url, email, orden, created_at
      FROM miembros
      ORDER BY orden ASC, created_at ASC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/miembros error:", error);
    return NextResponse.json({ error: "Error al obtener miembros" }, { status: 500 });
  }
}

// POST — create a new member
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, apellido, rol, bio, foto_url, cv_url, email, orden } = body;

    if (!nombre?.trim() || !apellido?.trim()) {
      return NextResponse.json(
        { error: "Nombre y apellido son obligatorios" },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO miembros (nombre, apellido, rol, bio, foto_url, cv_url, email, orden)
      VALUES (
        ${nombre.trim()},
        ${apellido.trim()},
        ${(rol || "").trim()},
        ${(bio || "").trim()},
        ${(foto_url || "").trim()},
        ${(cv_url || "").trim()},
        ${(email || "").trim()},
        ${orden || 0}
      )
      RETURNING *
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/miembros error:", error);
    return NextResponse.json({ error: "Error al crear miembro" }, { status: 500 });
  }
}
