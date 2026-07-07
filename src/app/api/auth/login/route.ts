import { sql } from "@/lib/db";
import { ensureUsuariosTable, verifyPassword } from "@/lib/authDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ensureUsuariosTable();
    const body = await req.json();
    const email = (body?.email || "").trim().toLowerCase();
    const password = body?.password || "";

    const rows = await sql`
      SELECT email, nombre, pass_hash FROM usuarios WHERE email = ${email} LIMIT 1
    `;
    if (rows.length === 0 || !verifyPassword(password, rows[0].pass_hash)) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }
    return NextResponse.json({ username: rows[0].email, nombre: rows[0].nombre });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
  }
}
