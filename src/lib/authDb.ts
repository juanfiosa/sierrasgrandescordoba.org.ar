import { sql } from "@/lib/db";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

// Tabla de usuarios (idempotente). Los correos se guardan en minúscula.
export async function ensureUsuariosTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      nombre TEXT DEFAULT '',
      pass_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}

// Hash con salt (scrypt). Formato almacenado: "salt:derivada".
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = (stored || "").split(":");
  if (!salt || !key) return false;
  const derived = scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(key, "hex");
  if (keyBuf.length !== derived.length) return false;
  return timingSafeEqual(keyBuf, derived);
}

// Contraseña temporal para la recuperación (10 caracteres).
export function generarPasswordTemporal(): string {
  return randomBytes(5).toString("hex");
}
