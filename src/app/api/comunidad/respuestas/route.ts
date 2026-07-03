import { sql } from "@/lib/db";
import { ensureComunidadTables } from "@/lib/comunidadDb";
import { NextRequest, NextResponse } from "next/server";

// GET ?postId= — lista las respuestas de un tema.
export async function GET(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const postId = req.nextUrl.searchParams.get("postId");
    if (!postId) {
      return NextResponse.json({ error: "Falta postId" }, { status: 400 });
    }
    const rows = await sql`
      SELECT id, post_id, cuerpo, autor, created_at
      FROM comunidad_respuestas
      WHERE post_id = ${Number(postId)}
      ORDER BY created_at ASC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/comunidad/respuestas error:", error);
    return NextResponse.json({ error: "Error al obtener respuestas" }, { status: 500 });
  }
}

// POST — agrega una respuesta a un tema.
export async function POST(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const body = await req.json();
    const { postId, cuerpo, autor, autor_email } = body;

    if (!postId || !cuerpo?.trim()) {
      return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });
    }
    if (!autor_email?.trim()) {
      return NextResponse.json({ error: "Tenés que iniciar sesión para responder" }, { status: 401 });
    }

    const rows = await sql`
      INSERT INTO comunidad_respuestas (post_id, cuerpo, autor, autor_email)
      VALUES (
        ${Number(postId)},
        ${cuerpo.trim()},
        ${(autor || "").trim()},
        ${autor_email.trim()}
      )
      RETURNING id, post_id, cuerpo, autor, created_at
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/comunidad/respuestas error:", error);
    return NextResponse.json({ error: "Error al responder" }, { status: 500 });
  }
}
