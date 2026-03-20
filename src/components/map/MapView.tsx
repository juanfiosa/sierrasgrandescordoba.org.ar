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
import { Layers, Eye, EyeOff, X, Map, Mountain, Satellite, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import areasProtegidas from "@/data/areas-protegidas.geojson";
import cuencas from "@/data/cuencas.geojson";
import senderos from "@/data/senderos.geojson";
import puntosInteres from "@/data/puntos-interes.geojson";
import incendios from "@/data/incendios.geojson";
import areaEstudio from "@/data/area-estudio.geojson";

// ── Base map styles ──
interface BaseMapStyle {
  id: string;
  label: string;
  icon: "map" | "satellite" | "mountain" | "mappin";
  style: string | maplibregl.StyleSpecification;
  preview: string; // CSS color for the preview swatch
}

const ESRI_SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "ESRI Satellite",
  sources: {
    "esri-satellite": {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "© Esri, Maxar, Earthstar Geographics",
      maxzoom: 19,
    },
  },
  layers: [
    { id: "esri-satellite-layer", type: "raster", source: "esri-satellite" },
  ],
};

const OSM_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "OpenStreetMap",
  sources: {
    "osm-tiles": {
      type: "raster",
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
      maxzoom: 19,
    },
  },
  layers: [
    { id: "osm-layer", type: "raster", source: "osm-tiles" },
  ],
};

const ESRI_TOPO_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "Topográfico",
  sources: {
    "esri-topo": {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "© Esri, HERE, Garmin, USGS",
      maxzoom: 19,
    },
  },
  layers: [
    { id: "esri-topo-layer", type: "raster", source: "esri-topo" },
  ],
};

const HYBRID_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "Satélite + Calles",
  sources: {
    "esri-satellite": {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "© Esri, Maxar, Earthstar Geographics",
      maxzoom: 19,
    },
    "carto-labels": {
      type: "raster",
      tiles: [
        "https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© CARTO",
      maxzoom: 19,
    },
  },
  layers: [
    { id: "esri-satellite-layer", type: "raster", source: "esri-satellite" },
    { id: "carto-labels-layer", type: "raster", source: "carto-labels" },
  ],
};

const baseMapStyles: BaseMapStyle[] = [
  {
    id: "osm",
    label: "Calles",
    icon: "map",
    style: OSM_STYLE,
    preview: "#e2e0d8",
  },
  {
    id: "satellite",
    label: "Satélite",
    icon: "satellite",
    style: ESRI_SATELLITE_STYLE,
    preview: "#1a3a2a",
  },
  {
    id: "hybrid",
    label: "Híbrido",
    icon: "mappin",
    style: HYBRID_STYLE,
    preview: "#2d5a3d",
  },
  {
    id: "topo",
    label: "Topográfico",
    icon: "mountain",
    style: ESRI_TOPO_STYLE,
    preview: "#d4c9a8",
  },
  {
    id: "positron",
    label: "Claro",
    icon: "map",
    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    preview: "#f2f0eb",
  },
  {
    id: "dark",
    label: "Oscuro",
    icon: "map",
    style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
    preview: "#2c2c2c",
  },
];

// Fallback style when tiles can't load
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
  const [activeBaseMap, setActiveBaseMap] = useState("osm");
  const [mapStyle, setMapStyle] = useState<string | maplibregl.StyleSpecification>(OSM_STYLE);
  const [styleError, setStyleError] = useState(false);
  const [showBaseMapPanel, setShowBaseMapPanel] = useState(false);

  const switchBaseMap = useCallback((bm: BaseMapStyle) => {
    setActiveBaseMap(bm.id);
    setMapStyle(bm.style);
    setStyleError(false);
    setShowBaseMapPanel(false);
  }, []);

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

        {/* Área de estudio — siempre visible, línea roja fina */}
        <Source id="area-estudio" type="geojson" data={areaEstudio}>
          <Layer
            id="area-estudio-fill"
            type="fill"
            paint={{ "fill-color": "#dc2626", "fill-opacity": 0.04 }}
          />
          <Layer
            id="area-estudio-line"
            type="line"
            paint={{
              "line-color": "#dc2626",
              "line-width": 2,
              "line-dasharray": [4, 3],
            }}
          />
        </Source>

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
        <>
          {/* Capas temáticas — panel unificado (toggle + leyenda) */}
          <div className="absolute left-3 top-3 z-10">
            <button
              onClick={() => setShowPanel(!showPanel)}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-md hover:bg-gray-50"
            >
              <Layers className="h-4 w-4" />
              Capas temáticas
            </button>

            {showPanel && (
              <div className="mt-2 w-64 rounded-lg bg-white p-3 shadow-lg">
                {/* Área de estudio — siempre visible, no togglable */}
                <div className="mb-1 flex items-center gap-2 px-2 py-1">
                  <svg width="20" height="10" className="shrink-0">
                    <line
                      x1="0" y1="5" x2="20" y2="5"
                      stroke="#dc2626"
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Límite área de estudio</span>
                </div>

                <hr className="my-1.5 border-gray-200" />

                {/* Capas togglables */}
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
                    {layer.type === "fill" ? (
                      <svg width="14" height="14" className="shrink-0">
                        <rect
                          x="1" y="1" width="12" height="12" rx="2"
                          fill={layer.color}
                          fillOpacity={0.4}
                          stroke={layer.color}
                          strokeWidth="1"
                        />
                      </svg>
                    ) : layer.type === "line" ? (
                      <svg width="14" height="14" className="shrink-0">
                        <line
                          x1="1" y1="7" x2="13" y2="7"
                          stroke={layer.color}
                          strokeWidth="2.5"
                        />
                      </svg>
                    ) : (
                      <svg width="14" height="14" className="shrink-0">
                        <circle
                          cx="7" cy="7" r="5"
                          fill={layer.color}
                          stroke="white"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                    {layer.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Base map style switcher — bottom-left */}
          <div className="absolute bottom-8 left-3 z-10">
            <button
              onClick={() => setShowBaseMapPanel(!showBaseMapPanel)}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-md hover:bg-gray-50"
            >
              <Map className="h-4 w-4" />
              Mapa base
            </button>

            {showBaseMapPanel && (
              <div className="mb-2 w-72 rounded-lg bg-white p-3 shadow-lg" style={{ position: "absolute", bottom: "100%" }}>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Tipo de mapa</h3>
                <div className="grid grid-cols-3 gap-2">
                  {baseMapStyles.map((bm) => {
                    const isActive = activeBaseMap === bm.id;
                    const IconComponent = bm.icon === "satellite" ? Satellite
                      : bm.icon === "mountain" ? Mountain
                      : bm.icon === "mappin" ? MapPin
                      : Map;
                    return (
                      <button
                        key={bm.id}
                        onClick={() => switchBaseMap(bm)}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-lg border-2 p-2 text-xs font-medium transition-all hover:shadow-md",
                          isActive
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        )}
                      >
                        <div
                          className="flex h-10 w-full items-center justify-center rounded"
                          style={{ backgroundColor: bm.preview }}
                        >
                          <IconComponent className={cn("h-5 w-5", bm.preview === "#2c2c2c" || bm.preview === "#1a3a2a" || bm.preview === "#2d5a3d" ? "text-white" : "text-gray-600")} />
                        </div>
                        {bm.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
