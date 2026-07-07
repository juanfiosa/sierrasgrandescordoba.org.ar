"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  username: string; // el correo electrónico
  nombre: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    nombre: string
  ) => Promise<{ ok: boolean; error?: string }>;
  recoverPassword: (email: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "sg_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  function guardarSesion(u: User) {
    setUser(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
  }

  async function login(email: string, password: string) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        return { ok: false, error: d.error || "No se pudo iniciar sesión" };
      }
      const u = await res.json();
      guardarSesion({ username: u.username, nombre: u.nombre });
      return { ok: true };
    } catch {
      return { ok: false, error: "No se pudo conectar con el servidor" };
    }
  }

  async function register(email: string, password: string, nombre: string) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nombre }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        return { ok: false, error: d.error || "No se pudo crear la cuenta" };
      }
      const u = await res.json();
      guardarSesion({ username: u.username, nombre: u.nombre });
      return { ok: true };
    } catch {
      return { ok: false, error: "No se pudo conectar con el servidor" };
    }
  }

  async function recoverPassword(email: string) {
    try {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        return { ok: false, error: d.error || "No se pudo recuperar la contraseña" };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "No se pudo conectar con el servidor" };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, recoverPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
