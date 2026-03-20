import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET — list all investigators
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, nombre, apellido, especialidad, email, telefono, institucion, link, created_at
      FROM investigadores
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/investigadores error:", error);
    return NextResponse.json({ error: "Error al obtener investigadores" }, { status: 500 });
  }
}

// POST — create a new investigator
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, apellido, especialidad, email, telefono, institucion, link } = body;

    if (!nombre?.trim() || !apellido?.trim() || !especialidad?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Nombre, apellido, especialidad y email son obligatorios" },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO investigadores (nombre, apellido, especialidad, email, telefono, institucion, link)
      VALUES (${nombre.trim()}, ${apellido.trim()}, ${especialidad.trim()}, ${email.trim()}, ${(telefono || "").trim()}, ${(institucion || "").trim()}, ${(link || "").trim()})
      RETURNING *
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/investigadores error:", error);
    return NextResponse.json({ error: "Error al crear investigador" }, { status: 500 });
  }
}
