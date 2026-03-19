"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
      Cargando mapa...
    </div>
  ),
});

export function HeroMap() {
  return <MapView className="h-full w-full" interactive={false} />;
}

export function FullMap() {
  return <MapView className="h-full w-full" interactive={true} />;
}
