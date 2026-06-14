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
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const nombre = typeof body?.nombre === "string" ? body.nombre.trim() : "";

  if (!EMAIL_REGEX.test(email) || !password) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  if (password.length > 100 || nombre.length > 100) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada");
    return NextResponse.json(
      { error: "El envío de correos no está configurado" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Sierras Grandes <onboarding@resend.dev>",
    to: email,
    subject: "Recuperación de contraseña — Sierras Grandes",
    html: `
      <p>Hola${nombre ? ` ${escapeHtml(nombre)}` : ""},</p>
      <p>Recibimos una solicitud para recuperar tu contraseña en la Plataforma de Gestión Integrada — Sierras Grandes de Córdoba.</p>
      <p>Tu contraseña actual es: <strong>${escapeHtml(password)}</strong></p>
      <p>Si no solicitaste este correo, podés ignorarlo.</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
