"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // La página de inicio es una vista a pantalla completa (h-screen):
  // ocultamos el footer para que entre todo en una sola mirada, sin scroll.
  if (pathname === "/") return null;

  return (
    <footer className="border-t bg-gray-50 py-8 text-center text-sm text-gray-500">
      <p>
        Plataforma de Gestión Integrada — Sierras Grandes de Córdoba
      </p>
      <p className="mt-1">
        Proyecto de investigación y desarrollo · 2026
      </p>
    </footer>
  );
}
