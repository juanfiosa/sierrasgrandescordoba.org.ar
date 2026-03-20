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
  ChevronDown,
  Network,
  Info,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const mainLinks = [
  { href: "/", label: "Inicio", icon: Mountain },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/ejes", label: "Ejes Temáticos", icon: BarChart3 },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/biblioteca", label: "Biblioteca", icon: BookOpen },
];

const actoresLinks = [
  { href: "/organizaciones", label: "ONGs", icon: Users },
  { href: "/empresas", label: "Empresas", icon: Briefcase },
  { href: "/alojamientos", label: "Alojamientos", icon: Tent },
  { href: "/investigadores", label: "Investigadores", icon: GraduationCap },
];

const extraLinks = [
  { href: "/quienes-somos", label: "Quiénes Somos", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [actoresOpen, setActoresOpen] = useState(false);
  const [mobileActoresOpen, setMobileActoresOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActoresActive = actoresLinks.some((l) => pathname === l.href);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActoresOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-green-700/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white"
        >
          <Mountain className="h-6 w-6" />
          <span className="hidden sm:inline">Grupo Sierras Grandes</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {mainLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-green-900/40 text-white"
                  : "text-green-100 hover:bg-green-600 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* Actores dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setActoresOpen(!actoresOpen)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActoresActive
                  ? "bg-green-900/40 text-white"
                  : "text-green-100 hover:bg-green-600 hover:text-white"
              )}
            >
              <Network className="h-4 w-4" />
              Actores
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  actoresOpen && "rotate-180"
                )}
              />
            </button>

            {actoresOpen && (
              <div className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-green-600 bg-green-800 py-1 shadow-lg">
                {actoresLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setActoresOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                      pathname === href
                        ? "bg-green-900/40 text-white"
                        : "text-green-100 hover:bg-green-700 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {extraLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-green-900/40 text-white"
                  : "text-green-100 hover:bg-green-600 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <div className="ml-2 border-l border-green-600 pl-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-green-100">
                  <User className="h-4 w-4" />
                  {user.nombre}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-green-200 transition-colors hover:bg-red-600/30 hover:text-red-200"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-md bg-white/20 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30"
              >
                <LogIn className="h-4 w-4" />
                Ingresar
              </Link>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="text-white md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-green-600 bg-green-800 px-4 py-2 md:hidden">
          {mainLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium",
                pathname === href
                  ? "bg-green-900/40 text-white"
                  : "text-green-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* Actores accordion — mobile */}
          <button
            onClick={() => setMobileActoresOpen(!mobileActoresOpen)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium",
              isActoresActive ? "bg-green-900/40 text-white" : "text-green-100"
            )}
          >
            <span className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Actores
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                mobileActoresOpen && "rotate-180"
              )}
            />
          </button>

          {mobileActoresOpen && (
            <div className="ml-4 border-l-2 border-green-500 pl-2">
              {actoresLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    setOpen(false);
                    setMobileActoresOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === href
                      ? "bg-green-900/40 text-white"
                      : "text-green-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          )}

          {extraLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium",
                pathname === href
                  ? "bg-green-900/40 text-white"
                  : "text-green-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <div className="mt-2 border-t border-green-600 pt-2">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="flex items-center gap-2 text-sm text-green-100">
                  <User className="h-4 w-4" />
                  {user.nombre}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="text-sm text-red-300 hover:text-red-200"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md bg-white/20 px-3 py-2.5 text-sm font-medium text-white"
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
