import type { FeatureCollection } from "geojson";

const areasProtegidas: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        nombre: "Reserva Hídrica Provincial Pampa de Achala",
        categoria: "Reserva Hídrica",
        area_km2: 120000,
        descripcion:
          "Reserva hídrica que protege las nacientes de los principales ríos de Córdoba. Alberga pastizales de altura y bosques de tabaquillo.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.95, -31.50],
            [-64.88, -31.48],
            [-64.78, -31.50],
            [-64.70, -31.55],
            [-64.65, -31.62],
            [-64.63, -31.70],
            [-64.65, -31.78],
            [-64.68, -31.85],
            [-64.72, -31.90],
            [-64.78, -31.92],
            [-64.85, -31.90],
            [-64.92, -31.85],
            [-64.97, -31.78],
            [-64.99, -31.70],
            [-64.98, -31.60],
            [-64.95, -31.50],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Parque Nacional Quebrada del Condorito",
        categoria: "Parque Nacional",
        area_km2: 37344,
        descripcion:
          "Parque nacional creado en 1996 para proteger el hábitat del cóndor andino. Incluye la impresionante Quebrada del Condorito.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.82, -31.70],
            [-64.78, -31.69],
            [-64.73, -31.71],
            [-64.71, -31.74],
            [-64.70, -31.78],
            [-64.72, -31.82],
            [-64.75, -31.84],
            [-64.80, -31.83],
            [-64.84, -31.80],
            [-64.85, -31.76],
            [-64.84, -31.72],
            [-64.82, -31.70],
          ],
        ],
      },
    },
  ],
};

export default areasProtegidas;
