"use client";

import { useRef, useState, useCallback } from "react";
import MapGL, {
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
  Popup,
  type MapRef,
  type MapLayerMouseEvent,
} from "react-map-gl/maplibre";
import type maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layers, Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

import areasProtegidas from "@/data/areas-protegidas.geojson";
import cuencas from "@/data/cuencas.geojson";
import senderos from "@/data/senderos.geojson";
import puntosInteres from "@/data/puntos-interes.geojson";
import incendios from "@/data/incendios.geojson";

// Fallback style when CARTO tiles can't load
const FALLBACK_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "Blank",
  sources: {},
  layers: [
    { id: "background", type: "background", paint: { "background-color": "#e8e4d8" } },
  ],
};

interface LayerDef {
  id: string;
  label: string;
  data: GeoJSON.FeatureCollection;
  type: "fill" | "line" | "circle";
  paint: Record<string, unknown>;
  visible: boolean;
  color: string;
}

const defaultLayers: LayerDef[] = [
  {
    id: "areas-protegidas",
    label: "Areas Protegidas",
    data: areasProtegidas,
    type: "fill",
    paint: { "fill-color": "#22c55e", "fill-opacity": 0.35, "fill-outline-color": "#15803d" },
    visible: true,
    color: "#22c55e",
  },
  {
    id: "cuencas",
    label: "Cuencas Hidricas",
    data: cuencas,
    type: "fill",
    paint: { "fill-color": "#3b82f6", "fill-opacity": 0.25, "fill-outline-color": "#1d4ed8" },
    visible: true,
    color: "#3b82f6",
  },
  {
    id: "incendios",
    label: "Incendios Historicos",
    data: incendios,
    type: "fill",
    paint: { "fill-color": "#ef4444", "fill-opacity": 0.3, "fill-outline-color": "#b91c1c" },
    visible: false,
    color: "#ef4444",
  },
  {
    id: "senderos",
    label: "Senderos",
    data: senderos,
    type: "line",
    paint: { "line-color": "#f59e0b", "line-width": 3 },
    visible: true,
    color: "#f59e0b",
  },
  {
    id: "puntos-interes",
    label: "Puntos de Interes",
    data: puntosInteres,
    type: "circle",
    paint: { "circle-color": "#7c3aed", "circle-radius": 7, "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" },
    visible: true,
    color: "#7c3aed",
  },
];

interface PopupInfo {
  lng: number;
  lat: number;
  properties: Record<string, unknown>;
}

interface MapViewProps {
  className?: string;
  interactive?: boolean;
}

export default function MapView({ className, interactive = true }: MapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const [layers, setLayers] = useState(defaultLayers);
  const [showPanel, setShowPanel] = useState(true);
  const [popup, setPopup] = useState<PopupInfo | null>(null);
  const [mapStyle, setMapStyle] = useState<string | maplibregl.StyleSpecification>(
    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  );
  const [styleError, setStyleError] = useState(false);

  const toggleLayer = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  }, []);

  const interactiveLayerIds = layers
    .filter((l) => l.visible)
    .map((l) => `${l.id}-layer`);

  const handleClick = useCallback((e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature) {
      setPopup(null);
      return;
    }
    setPopup({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      properties: feature.properties || {},
    });
  }, []);

  const handleMapError = useCallback(() => {
    if (!styleError) {
      setStyleError(true);
      setMapStyle(FALLBACK_STYLE);
    }
  }, [styleError]);

  return (
    <div className={cn("relative", className)}>
      <MapGL
        ref={mapRef}
        initialViewState={{ longitude: -64.78, latitude: -31.72, zoom: 9 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        interactive={interactive}
        interactiveLayerIds={interactive ? interactiveLayerIds : []}
        onClick={interactive ? handleClick : undefined}
        cursor={interactive ? "pointer" : "default"}
        onError={handleMapError}
      >
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-left" />
        {interactive && <GeolocateControl position="top-right" />}

        {layers
          .filter((l) => l.visible)
          .map((layer) => (
            <Source key={layer.id} id={layer.id} type="geojson" data={layer.data}>
              <Layer
                id={`${layer.id}-layer`}
                type={layer.type}
                paint={layer.paint as never}
              />
            </Source>
          ))}

        {popup && (
          <Popup
            longitude={popup.lng}
            latitude={popup.lat}
            onClose={() => setPopup(null)}
            closeOnClick={false}
            maxWidth="320px"
          >
            <div className="max-w-xs">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900">
                  {popup.properties.emoji ? `${popup.properties.emoji} ` : ""}
                  {String(popup.properties.nombre || "Sin nombre")}
                </h3>
                <button onClick={() => setPopup(null)} className="rounded p-0.5 hover:bg-gray-100">
                  <X className="h-3.5 w-3.5 text-gray-400" />
                </button>
              </div>

              {popup.properties.categoria ? (
                <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  {String(popup.properties.categoria)}
                </span>
              ) : null}
              {popup.properties.tipo ? (
                <span className="mt-1 inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                  {String(popup.properties.tipo)}
                </span>
              ) : null}
              {popup.properties.dificultad ? (
                <span className={cn(
                  "mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                  popup.properties.dificultad === "facil" && "bg-green-100 text-green-700",
                  popup.properties.dificultad === "moderado" && "bg-yellow-100 text-yellow-700",
                  popup.properties.dificultad === "dificil" && "bg-red-100 text-red-700",
                )}>
                  {String(popup.properties.dificultad)}
                </span>
              ) : null}

              {popup.properties.descripcion ? (
                <p className="mt-2 text-xs text-gray-600">{String(popup.properties.descripcion)}</p>
              ) : null}

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                {popup.properties.area_km2 ? <span>{Number(popup.properties.area_km2).toLocaleString()} km2</span> : null}
                {popup.properties.longitud_km ? <span>{String(popup.properties.longitud_km)} km</span> : null}
                {popup.properties.desnivel_m ? <span>Desnivel: {String(popup.properties.desnivel_m)} m</span> : null}
                {popup.properties.altitud_m ? <span>Altitud: {String(popup.properties.altitud_m)} m</span> : null}
                {popup.properties.fecha ? <span>{String(popup.properties.fecha)}</span> : null}
              </div>
            </div>
          </Popup>
        )}
      </MapGL>

      {interactive && (
        <div className="absolute left-3 top-3 z-10">
          <button
            onClick={() => setShowPanel(!showPanel)}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-md hover:bg-gray-50"
          >
            <Layers className="h-4 w-4" />
            Capas
          </button>

          {showPanel && (
            <div className="mt-2 w-60 rounded-lg bg-white p-3 shadow-lg">
              <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Capas tematicas</h3>
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-50"
                >
                  {layer.visible ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: layer.color }} />
                  {layer.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
