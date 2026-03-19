import type { FeatureCollection } from "geojson";

const incendios: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        nombre: "Incendio Pampa de Achala 2020",
        fecha: "2020-09-15",
        area_km2: 45,
        descripcion: "Gran incendio que afectó pastizales de altura y bosques de tabaquillo.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.85, -31.60],
            [-64.80, -31.58],
            [-64.75, -31.62],
            [-64.78, -31.68],
            [-64.84, -31.67],
            [-64.85, -31.60],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Incendio Valle de Punilla 2021",
        fecha: "2021-08-20",
        area_km2: 32,
        descripcion: "Incendio forestal en la zona serrana del Valle de Punilla.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.65, -31.35],
            [-64.60, -31.38],
            [-64.58, -31.43],
            [-64.62, -31.45],
            [-64.68, -31.42],
            [-64.65, -31.35],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Incendio Calamuchita 2023",
        fecha: "2023-10-05",
        area_km2: 28,
        descripcion: "Incendio en la zona de Calamuchita que afectó bosque serrano.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-64.55, -31.90],
            [-64.50, -31.92],
            [-64.48, -31.97],
            [-64.52, -32.00],
            [-64.58, -31.96],
            [-64.55, -31.90],
          ],
        ],
      },
    },
  ],
};

export default incendios;
