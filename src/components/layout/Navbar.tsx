"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mountain,
  Map,
  BarChart3,
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
  Mail,
  Search,
  Newspaper,
  Camera,
  CalendarDays,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const mainLinks = [
  { href: "/", label: "Inicio", icon: Mountain },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/ejes", label: "Ejes Temáticos", icon: BarChart3 },
];

const actoresLinks = [
  { href: "/organizaciones", label: "ONGs", icon: Users },
  { href: "/empresas", label: "Empresas", icon: Briefcase },
  { href: "/alojamientos", label: "Alojamientos", icon: Tent },
  { href: "/investigadores", label: "Investigadores", icon: GraduationCap },
];

const comunidadLinks = [
  { href: "/novedades", label: "Novedades", icon: Newspaper },
  { href: "/galeria", label: "Galería", icon: Camera },
  { href: "/calendario", label: "Calendario", icon: CalendarDays },
];

const nosotrosLinks = [
  { href: "/quienes-somos", label: "Quiénes Somos", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [actoresOpen, setActoresOpen] = useState(false);
  const [comunidadOpen, setComunidadOpen] = useState(false);
  const [nosotrosOpen, setNosotrosOpen] = useState(false);
  const [mobileActoresOpen, setMobileActoresOpen] = useState(false);
  const [mobileComunidadOpen, setMobileComunidadOpen] = useState(false);
  const [mobileNosotrosOpen, setMobileNosotrosOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();

  const actoresRef = useRef<HTMLDivElement>(null);
  const comunidadRef = useRef<HTMLDivElement>(null);
  const nosotrosRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isActoresActive = actoresLinks.some((l) => pathname === l.href);
  const isComunidadActive = comunidadLinks.some((l) => pathname === l.href);
  const isNosotrosActive =
    nosotrosLinks.some((l) => pathname === l.href) ||
    pathname === "/contacto";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (actoresRef.current && !actoresRef.current.contains(e.target as Node))
        setActoresOpen(false);
      if (comunidadRef.current && !comunidadRef.current.contains(e.target as Node))
        setComunidadOpen(false);
      if (nosotrosRef.current && !nosotrosRef.current.contains(e.target as Node))
        setNosotrosOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function closeAllDropdowns() {
    setActoresOpen(false);
    setComunidadOpen(false);
    setNosotrosOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-green-700/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <Mountain className="h-6 w-6" />
          <span className="hidden sm:inline">Grupo Sierras Grandes</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">

          {/* Main links */}
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
          <div className="relative" ref={actoresRef}>
            <button
              onClick={() => { setActoresOpen(!actoresOpen); setComunidadOpen(false); setNosotrosOpen(false); }}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActoresActive
                  ? "bg-green-900/40 text-white"
                  : "text-green-100 hover:bg-green-600 hover:text-white"
              )}
            >
              <Network className="h-4 w-4" />
              Actores
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", actoresOpen && "rotate-180")} />
            </button>
            {actoresOpen && (
              <div className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-green-600 bg-green-800 py-1 shadow-lg">
                {actoresLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeAllDropdowns}
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

          {/* Comunidad dropdown */}
          <div className="relative" ref={comunidadRef}>
            <button
              onClick={() => { setComunidadOpen(!comunidadOpen); setActoresOpen(false); setNosotrosOpen(false); }}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isComunidadActive
                  ? "bg-green-900/40 text-white"
                  : "text-green-100 hover:bg-green-600 hover:text-white"
              )}
            >
              <Newspaper className="h-4 w-4" />
              Comunidad
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", comunidadOpen && "rotate-180")} />
            </button>
            {comunidadOpen && (
              <div className="absolute left-0 top-full mt-1 w-44 rounded-lg border border-green-600 bg-green-800 py-1 shadow-lg">
                {comunidadLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeAllDropdowns}
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

          {/* Nosotros dropdown */}
          <div className="relative" ref={nosotrosRef}>
            <button
              onClick={() => { setNosotrosOpen(!nosotrosOpen); setActoresOpen(false); setComunidadOpen(false); }}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isNosotrosActive
                  ? "bg-green-900/40 text-white"
                  : "text-green-100 hover:bg-green-600 hover:text-white"
              )}
            >
              <Info className="h-4 w-4" />
              Nosotros
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", nosotrosOpen && "rotate-180")} />
            </button>
            {nosotrosOpen && (
              <div className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-green-600 bg-green-800 py-1 shadow-lg">
                {nosotrosLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeAllDropdowns}
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
                <a
                  href="mailto:gruposierrasgrandes@gmail.com"
                  onClick={closeAllDropdowns}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-green-100 transition-colors hover:bg-green-700 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Contacto
                </a>
              </div>
            )}
          </div>

          {/* Search icon */}
          <div className="relative ml-1" ref={searchRef}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center justify-center rounded-md p-2 text-green-100 transition-colors hover:bg-green-600 hover:text-white"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-1 w-72 rounded-lg border border-green-600 bg-green-800 p-3 shadow-lg">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en la plataforma..."
                  className="w-full rounded-md bg-green-700 px-3 py-2 text-sm text-white placeholder-green-300 outline-none ring-1 ring-green-600 focus:ring-white"
                />
                <p className="mt-2 text-center text-xs text-green-400">
                  Búsqueda global — próximamente
                </p>
              </div>
            )}
          </div>

          {/* Auth */}
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

          {/* Main links */}
          {mainLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium",
                pathname === href ? "bg-green-900/40 text-white" : "text-green-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* Actores accordion */}
          <button
            onClick={() => setMobileActoresOpen(!mobileActoresOpen)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium",
              isActoresActive ? "bg-green-900/40 text-white" : "text-green-100"
            )}
          >
            <span className="flex items-center gap-2"><Network className="h-4 w-4" />Actores</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileActoresOpen && "rotate-180")} />
          </button>
          {mobileActoresOpen && (
            <div className="ml-4 border-l-2 border-green-500 pl-2">
              {actoresLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => { setOpen(false); setMobileActoresOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === href ? "bg-green-900/40 text-white" : "text-green-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Comunidad accordion */}
          <button
            onClick={() => setMobileComunidadOpen(!mobileComunidadOpen)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium",
              isComunidadActive ? "bg-green-900/40 text-white" : "text-green-100"
            )}
          >
            <span className="flex items-center gap-2"><Newspaper className="h-4 w-4" />Comunidad</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileComunidadOpen && "rotate-180")} />
          </button>
          {mobileComunidadOpen && (
            <div className="ml-4 border-l-2 border-green-500 pl-2">
              {comunidadLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => { setOpen(false); setMobileComunidadOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === href ? "bg-green-900/40 text-white" : "text-green-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Nosotros accordion */}
          <button
            onClick={() => setMobileNosotrosOpen(!mobileNosotrosOpen)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium",
              isNosotrosActive ? "bg-green-900/40 text-white" : "text-green-100"
            )}
          >
            <span className="flex items-center gap-2"><Info className="h-4 w-4" />Nosotros</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileNosotrosOpen && "rotate-180")} />
          </button>
          {mobileNosotrosOpen && (
            <div className="ml-4 border-l-2 border-green-500 pl-2">
              {nosotrosLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => { setOpen(false); setMobileNosotrosOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === href ? "bg-green-900/40 text-white" : "text-green-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <a
                href="mailto:gruposierrasgrandes@gmail.com"
                onClick={() => { setOpen(false); setMobileNosotrosOpen(false); }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-green-100"
              >
                <Mail className="h-4 w-4" />
                Contacto
              </a>
            </div>
          )}

          {/* Mobile search */}
          <div className="mt-1 px-3 py-2">
            <div className="flex items-center gap-2 rounded-md bg-green-700 px-3 py-2">
              <Search className="h-4 w-4 text-green-300" />
              <input
                type="text"
                placeholder="Buscar... (próximamente)"
                disabled
                className="flex-1 bg-transparent text-sm text-green-300 placeholder-green-400 outline-none"
              />
            </div>
          </div>

          {/* Auth */}
          <div className="mt-2 border-t border-green-600 pt-2">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="flex items-center gap-2 text-sm text-green-100">
                  <User className="h-4 w-4" />
                  {user.nombre}
                </span>
                <button
                  onClick={() => { logout(); setOpen(false); }}
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
