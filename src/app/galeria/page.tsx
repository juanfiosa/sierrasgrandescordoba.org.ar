import type { Metadata } from "next";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Galería — Sierras Grandes",
};

export default function GaleriaPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10 flex items-center gap-3">
        <Camera className="h-8 w-8 text-green-700" />
        <h1 className="text-3xl font-bold text-gray-900">Galería</h1>
      </div>
      <p className="mb-12 text-gray-500">
        Registro fotográfico del territorio: paisajes, flora, fauna, actividades y trabajo de campo.
      </p>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-24 text-center">
        <Camera className="mb-4 h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium text-gray-400">Próximamente</p>
        <p className="mt-1 text-sm text-gray-400">
          Aquí se cargará el registro fotográfico de las Sierras Grandes.
        </p>
      </div>
    </main>
  );
}
