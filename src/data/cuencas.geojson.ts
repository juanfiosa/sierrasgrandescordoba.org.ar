import type { FeatureCollection } from "geojson";

const cuencas: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        nombre: "Cuenca del Lago San Roque",
        area_km2: 1750,
        descripcion:
          "Principal fuente de agua para la ciudad de Córdoba. Incluye los ríos Cosquín, San Antonio y Los Chorrillos.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.60, -31.28],
            [-64.50, -31.30],
            [-64.42, -31.35],
            [-64.38, -31.40],
            [-64.40, -31.48],
            [-64.45, -31.52],
            [-64.55, -31.55],
            [-64.65, -31.52],
            [-64.70, -31.45],
            [-64.68, -31.35],
            [-64.60, -31.28],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Cuenca del Embalse Los Molinos",
        area_km2: 986,
        descripcion:
          "Cuenca del embalse Los Molinos, importante reserva de agua y zona de recreación.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.65, -31.72],
            [-64.55, -31.74],
            [-64.48, -31.80],
            [-64.45, -31.88],
            [-64.50, -31.95],
            [-64.58, -31.97],
            [-64.65, -31.94],
            [-64.70, -31.88],
            [-64.72, -31.80],
            [-64.65, -31.72],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Cuenca del Río Tercero",
        area_km2: 3050,
        descripcion:
          "Cuenca del río Tercero (Ctalamochita) y su embalse. La mayor cuenca de las Sierras Grandes.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.55, -31.92],
            [-64.45, -31.95],
            [-64.35, -32.02],
            [-64.30, -32.10],
            [-64.32, -32.18],
            [-64.40, -32.22],
            [-64.50, -32.20],
            [-64.58, -32.12],
            [-64.60, -32.02],
            [-64.55, -31.92],
          ],
        ],
      },
    },
  ],
};

export default cuencas;
