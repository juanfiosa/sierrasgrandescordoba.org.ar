"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mountain,
  Map,
  BookOpen,
  BarChart3,
  LayoutDashboard,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Users,
  Briefcase,
  Tent,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { href: "/", label: "Inicio", icon: Mountain },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/ejes", label: "Ejes Temáticos", icon: BarChart3 },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/biblioteca", label: "Biblioteca", icon: BookOpen },
  { href: "/organizaciones", label: "ONGs", icon: Users },
  { href: "/empresas", label: "Empresas", icon: Briefcase },
  { href: "/alojamientos", label: "Alojamientos", icon: Tent },
  { href: "/investigadores", label: "Investigadores", icon: GraduationCap },
  { href: "/quienes-somos", label: "Quiénes Somos", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-green-800"
        >
          <Mountain className="h-6 w-6" />
          <span className="hidden sm:inline">Grupo Sierras Grandes</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-green-50 text-green-800"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <div className="ml-2 border-l pl-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  {user.nombre}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                <LogIn className="h-4 w-4" />
                Ingresar
              </Link>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-white px-4 py-2 md:hidden">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium",
                pathname === href
                  ? "bg-green-50 text-green-800"
                  : "text-gray-600"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <div className="mt-2 border-t pt-2">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  {user.nombre}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-2.5 text-sm font-medium text-white"
              >
                <LogIn className="h-4 w-4" />
                Ingresar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
