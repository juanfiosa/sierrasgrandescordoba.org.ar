import { sql } from "@/lib/db";
import { ensureUsuariosTable, hashPassword } from "@/lib/authDb";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    await ensureUsuariosTable();
    const body = await req.json();
    const email = (body?.email || "").trim().toLowerCase();
    const password = body?.password || "";
    const nombre = (body?.nombre || "").trim();

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Ingresá un correo electrónico válido" }, { status: 400 });
    }
    if (typeof password !== "string" || password.length < 4) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 4 caracteres" }, { status: 400 });
    }

    const existe = await sql`SELECT 1 FROM usuarios WHERE email = ${email} LIMIT 1`;
    if (existe.length > 0) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con ese correo. Iniciá sesión." },
        { status: 409 }
      );
    }

    await sql`
      INSERT INTO usuarios (email, nombre, pass_hash)
      VALUES (${email}, ${nombre}, ${hashPassword(password)})
    `;
    return NextResponse.json({ username: email, nombre }, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json({ error: "Error al crear la cuenta" }, { status: 500 });
  }
}
