import { FullMap } from "@/components/map/DynamicMap";

export const metadata = {
  title: "Mapa Interactivo — Sierras Grandes",
};

export default function MapaPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <FullMap />
    </div>
  );
}
