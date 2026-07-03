import { sql } from "@/lib/db";
import { ensureComunidadTables } from "@/lib/comunidadDb";
import { ADMIN_EMAILS } from "@/lib/admins";
import { NextRequest, NextResponse } from "next/server";

function esAdmin(email: string) {
  const e = email.trim().toLowerCase();
  return !!e && ADMIN_EMAILS.some((a) => a.trim().toLowerCase() === e);
}

// GET ?postId=&me= — respuestas de un tema, con marca "esMio".
export async function GET(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const postId = req.nextUrl.searchParams.get("postId");
    const me = (req.nextUrl.searchParams.get("me") || "").trim().toLowerCase();
    if (!postId) {
      return NextResponse.json({ error: "Falta postId" }, { status: 400 });
    }
    const rows = await sql`
      SELECT id, post_id, cuerpo, autor, created_at,
        (${me !== ""} AND lower(autor_email) = ${me}) AS "esMio"
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
    const { postId, cuerpo, autor, autor_email } = await req.json();
    if (!postId || !cuerpo?.trim()) {
      return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });
    }
    if (!autor_email?.trim()) {
      return NextResponse.json({ error: "Tenés que iniciar sesión para responder" }, { status: 401 });
    }
    const rows = await sql`
      INSERT INTO comunidad_respuestas (post_id, cuerpo, autor, autor_email)
      VALUES (${Number(postId)}, ${cuerpo.trim()}, ${(autor || "").trim()}, ${autor_email.trim()})
      RETURNING id, post_id, cuerpo, autor, created_at
    `;
    return NextResponse.json({ ...rows[0], esMio: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/comunidad/respuestas error:", error);
    return NextResponse.json({ error: "Error al responder" }, { status: 500 });
  }
}

// PATCH — edita una respuesta (solo autor o admin).
export async function PATCH(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const { id, cuerpo, email } = await req.json();
    if (!id || !cuerpo?.trim()) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }
    const e = (email || "").trim().toLowerCase();
    const admin = esAdmin(e);
    const rows = await sql`
      UPDATE comunidad_respuestas
      SET cuerpo = ${cuerpo.trim()}
      WHERE id = ${id} AND (${admin} OR lower(autor_email) = ${e})
      RETURNING id, post_id, cuerpo, autor, created_at
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("PATCH /api/comunidad/respuestas error:", error);
    return NextResponse.json({ error: "Error al editar" }, { status: 500 });
  }
}

// DELETE ?id=&email= — elimina una respuesta (solo autor o admin).
export async function DELETE(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const id = req.nextUrl.searchParams.get("id");
    const e = (req.nextUrl.searchParams.get("email") || "").trim().toLowerCase();
    if (!id) {
      return NextResponse.json({ error: "Falta el id" }, { status: 400 });
    }
    const admin = esAdmin(e);
    const rows = await sql`
      DELETE FROM comunidad_respuestas
      WHERE id = ${Number(id)} AND (${admin} OR lower(autor_email) = ${e})
      RETURNING id
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/comunidad/respuestas error:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
