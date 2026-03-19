"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  username: string;
  nombre: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  register: (username: string, password: string, nombre: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface StoredUser {
  username: string;
  password: string;
  nombre: string;
}

const USERS_KEY = "sg_users";
const SESSION_KEY = "sg_session";

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

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

  function login(username: string, password: string) {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return { ok: false, error: "Usuario o contraseña incorrectos" };
    const session: User = { username: found.username, nombre: found.nombre };
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true };
  }

  function register(username: string, password: string, nombre: string) {
    const users = getStoredUsers();
    if (users.some((u) => u.username === username)) {
      return { ok: false, error: "El usuario ya existe" };
    }
    users.push({ username, password, nombre });
    saveStoredUsers(users);
    const session: User = { username, nombre };
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
