import { sql } from "@/lib/db";
import { ensureComunidadTables } from "@/lib/comunidadDb";
import { ADMIN_EMAILS } from "@/lib/admins";
import { NextRequest, NextResponse } from "next/server";

const CATEGORIAS = ["demanda", "problema", "iniciativa"];

function esAdmin(email: string) {
  const e = email.trim().toLowerCase();
  return !!e && ADMIN_EMAILS.some((a) => a.trim().toLowerCase() === e);
}

// GET ?me= — lista los temas con cantidad de respuestas y marca "esMio".
export async function GET(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const me = (req.nextUrl.searchParams.get("me") || "").trim().toLowerCase();
    const rows = await sql`
      SELECT p.id, p.categoria, p.titulo, p.cuerpo, p.autor, p.created_at,
        (SELECT COUNT(*) FROM comunidad_respuestas r WHERE r.post_id = p.id)::int AS respuestas,
        (${me !== ""} AND lower(p.autor_email) = ${me}) AS "esMio"
      FROM comunidad_posts p
      ORDER BY p.created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/comunidad error:", error);
    return NextResponse.json({ error: "Error al obtener la comunidad" }, { status: 500 });
  }
}

// POST — crea un tema nuevo.
export async function POST(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const { categoria, titulo, cuerpo, autor, autor_email } = await req.json();

    if (!titulo?.trim()) {
      return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });
    }
    if (!autor_email?.trim()) {
      return NextResponse.json({ error: "Tenés que iniciar sesión para publicar" }, { status: 401 });
    }

    const cat = CATEGORIAS.includes(categoria) ? categoria : "iniciativa";
    const rows = await sql`
      INSERT INTO comunidad_posts (categoria, titulo, cuerpo, autor, autor_email)
      VALUES (${cat}, ${titulo.trim()}, ${(cuerpo || "").trim()}, ${(autor || "").trim()}, ${autor_email.trim()})
      RETURNING id, categoria, titulo, cuerpo, autor, created_at
    `;
    return NextResponse.json({ ...rows[0], respuestas: 0, esMio: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/comunidad error:", error);
    return NextResponse.json({ error: "Error al crear la publicación" }, { status: 500 });
  }
}

// PATCH — edita un tema (solo autor o admin).
export async function PATCH(req: NextRequest) {
  try {
    await ensureComunidadTables();
    const { id, titulo, cuerpo, categoria, email } = await req.json();
    if (!id || !titulo?.trim()) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }
    const e = (email || "").trim().toLowerCase();
    const admin = esAdmin(e);
    const cat = CATEGORIAS.includes(categoria) ? categoria : "iniciativa";
    const rows = await sql`
      UPDATE comunidad_posts
      SET titulo = ${titulo.trim()}, cuerpo = ${(cuerpo || "").trim()}, categoria = ${cat}
      WHERE id = ${id} AND (${admin} OR lower(autor_email) = ${e})
      RETURNING id, categoria, titulo, cuerpo, autor, created_at
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("PATCH /api/comunidad error:", error);
    return NextResponse.json({ error: "Error al editar" }, { status: 500 });
  }
}

// DELETE ?id=&email= — elimina un tema y sus respuestas (solo autor o admin).
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
      DELETE FROM comunidad_posts
      WHERE id = ${Number(id)} AND (${admin} OR lower(autor_email) = ${e})
      RETURNING id
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/comunidad error:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
