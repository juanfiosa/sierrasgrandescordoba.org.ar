import { sql } from "@/lib/db";
import { ensureUsuariosTable, hashPassword, generarPasswordTemporal } from "@/lib/authDb";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    await ensureUsuariosTable();
    const body = await req.json().catch(() => null);
    const email = (body?.email || "").trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Ingresá un correo electrónico válido" }, { status: 400 });
    }

    const rows = await sql`SELECT email, nombre FROM usuarios WHERE email = ${email} LIMIT 1`;
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No encontramos una cuenta con ese correo" },
        { status: 404 }
      );
    }
    const nombre = rows[0].nombre || "";

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurada");
      return NextResponse.json({ error: "El envío de correos no está configurado" }, { status: 500 });
    }

    // Genera una contraseña temporal nueva y la guarda hasheada.
    const temporal = generarPasswordTemporal();
    await sql`UPDATE usuarios SET pass_hash = ${hashPassword(temporal)} WHERE email = ${email}`;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Sierras Grandes <onboarding@resend.dev>",
      to: email,
      subject: "Recuperación de contraseña — Sierras Grandes",
      html: `
        <p>Hola${nombre ? ` ${escapeHtml(nombre)}` : ""},</p>
        <p>Generamos una <strong>contraseña temporal</strong> para tu cuenta en la Plataforma de Gestión Integrada — Sierras Grandes de Córdoba.</p>
        <p>Tu nueva contraseña es: <strong>${escapeHtml(temporal)}</strong></p>
        <p>Ingresá con ella y, si querés, podés seguir usándola como tu contraseña.</p>
        <p>Si no solicitaste este correo, escribinos: alguien intentó recuperar tu cuenta.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/auth/recover error:", error);
    return NextResponse.json({ error: "No se pudo recuperar la contraseña" }, { status: 500 });
  }
}
