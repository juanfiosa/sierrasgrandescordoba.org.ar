"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, UserPlus, KeyRound, Eye, EyeOff, CheckCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { login, register, recoverPassword } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register" | "recover">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [recoverSent, setRecoverSent] = useState(false);
  const [recoverLoading, setRecoverLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  function switchMode(next: "login" | "register" | "recover") {
    setMode(next);
    setError("");
    setRecoverSent(false);
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Completá todos los campos");
      return;
    }

    if (mode === "register") {
      if (!nombre.trim()) {
        setError("Ingresá tu nombre completo");
        return;
      }
      if (!EMAIL_REGEX.test(username.trim())) {
        setError("Ingresá un correo electrónico válido");
        return;
      }
    }

    setAuthLoading(true);
    const result =
      mode === "login"
        ? await login(username.trim(), password)
        : await register(username.trim(), password, nombre.trim());
    setAuthLoading(false);

    if (!result.ok) {
      setError(result.error || "Error desconocido");
      return;
    }

    router.push("/biblioteca");
  }

  async function handleRecover(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(username.trim())) {
      setError("Ingresá un correo electrónico válido");
      return;
    }

    setRecoverLoading(true);
    const result = await recoverPassword(username.trim());
    setRecoverLoading(false);

    if (!result.ok) {
      setError(result.error || "Error desconocido");
      return;
    }

    setRecoverSent(true);
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              {mode === "login" && <LogIn className="h-6 w-6 text-green-700" />}
              {mode === "register" && <UserPlus className="h-6 w-6 text-green-700" />}
              {mode === "recover" && <KeyRound className="h-6 w-6 text-green-700" />}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === "login" && "Iniciar Sesión"}
              {mode === "register" && "Crear Cuenta"}
              {mode === "recover" && "Recuperar Contraseña"}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {mode === "login" && "Ingresá tus credenciales para acceder"}
              {mode === "register" && "Registrate para contribuir a la biblioteca"}
              {mode === "recover" && "Te enviaremos tu contraseña por correo electrónico"}
            </p>
          </div>

          {mode === "recover" ? (
            recoverSent ? (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <p className="text-sm text-gray-600">
                  Te enviamos un correo a{" "}
                  <span className="font-medium">{username.trim()}</span> con tu
                  contraseña. Si no lo ves, revisá la carpeta de spam.
                </p>
                <button
                  onClick={() => switchMode("login")}
                  className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                  Volver a iniciar sesión
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecover} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="tu@email.com"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={recoverLoading}
                  className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
                >
                  {recoverLoading ? "Enviando..." : "Enviar contraseña por correo"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="text-sm text-green-600 hover:text-green-700 hover:underline"
                  >
                    Volver a iniciar sesión
                  </button>
                </div>
              </form>
            )
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="Juan Pérez"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => switchMode("recover")}
                        className="text-xs text-green-600 hover:text-green-700 hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
                >
                  {authLoading
                    ? "Procesando…"
                    : mode === "login"
                      ? "Ingresar"
                      : "Crear cuenta"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => switchMode(mode === "login" ? "register" : "login")}
                  className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                  {mode === "login"
                    ? "¿No tenés cuenta? Registrate"
                    : "¿Ya tenés cuenta? Iniciá sesión"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
