import Image from "next/image";
import { avales } from "@/data/avales";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-8 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-4xl px-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Con el aval de
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {avales.map((aval) => (
            <Image
              key={aval.src}
              src={aval.src}
              alt={aval.alt}
              width={aval.width}
              height={aval.height}
              className="h-12 w-auto object-contain"
            />
          ))}
        </div>
      </div>

      <p className="mt-8">
        Plataforma de Gestión Integrada — Sierras Grandes de Córdoba
      </p>
      <p className="mt-1">
        Proyecto de investigación y desarrollo · 2026
      </p>
    </footer>
  );
}
