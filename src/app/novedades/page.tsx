import type { Metadata } from "next";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Novedades — Sierras Grandes",
};

export default function NovedadesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10 flex items-center gap-3">
        <Newspaper className="h-8 w-8 text-green-700" />
        <h1 className="text-3xl font-bold text-gray-900">Novedades</h1>
      </div>
      <p className="mb-12 text-gray-500">
        Actualizaciones, noticias e informes recientes sobre las Sierras Grandes de Córdoba.
      </p>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-24 text-center">
        <Newspaper className="mb-4 h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium text-gray-400">Próximamente</p>
        <p className="mt-1 text-sm text-gray-400">
          Aquí aparecerán las novedades de la plataforma.
        </p>
      </div>
    </main>
  );
}
