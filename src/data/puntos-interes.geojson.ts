import type { FeatureCollection } from "geojson";

const puntosInteres: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        nombre: "Mirador del Cóndor",
        tipo: "mirador",
        altitud_m: 1900,
        descripcion: "Punto de observación de cóndores en la Quebrada del Condorito.",
        emoji: "🦅",
      },
      geometry: { type: "Point", coordinates: [-64.770, -31.775] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Cascada Los Chorrillos",
        tipo: "cascada",
        altitud_m: 1650,
        descripcion: "Cascada en el arroyo Los Chorrillos, accesible por sendero corto.",
        emoji: "💧",
      },
      geometry: { type: "Point", coordinates: [-64.802, -31.655] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Refugio Pampa de Achala",
        tipo: "refugio",
        altitud_m: 2100,
        descripcion: "Refugio de montaña en Pampa de Achala, punto de partida para varios senderos.",
        emoji: "🏠",
      },
      geometry: { type: "Point", coordinates: [-64.830, -31.680] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Cerro Champaquí",
        tipo: "cumbre",
        altitud_m: 2790,
        descripcion: "Punto más alto de las Sierras Grandes y de toda la provincia de Córdoba.",
        emoji: "⛰️",
      },
      geometry: { type: "Point", coordinates: [-64.930, -31.990] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Los Gigantes",
        tipo: "mirador",
        altitud_m: 2100,
        descripcion: "Formaciones rocosas imponentes, meca de la escalada en Córdoba.",
        emoji: "🧗",
      },
      geometry: { type: "Point", coordinates: [-64.830, -31.440] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Embalse Los Molinos",
        tipo: "embalse",
        altitud_m: 760,
        descripcion: "Embalse sobre el río Los Molinos, importante reserva hídrica.",
        emoji: "🌊",
      },
      geometry: { type: "Point", coordinates: [-64.530, -31.830] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Embalse San Roque",
        tipo: "embalse",
        altitud_m: 643,
        descripcion: "Principal fuente de agua potable para la ciudad de Córdoba.",
        emoji: "🌊",
      },
      geometry: { type: "Point", coordinates: [-64.460, -31.380] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Cuchi Corral",
        tipo: "mirador",
        altitud_m: 1500,
        descripcion: "Balcón natural con vistas espectaculares al Valle de Punilla.",
        emoji: "🦅",
      },
      geometry: { type: "Point", coordinates: [-64.720, -31.430] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Proyecto Reforestación Acción Serrana",
        tipo: "reforestacion",
        altitud_m: 1800,
        descripcion: "Proyecto de restauración de bosque nativo de tabaquillo en las sierras altas.",
        emoji: "🌱",
      },
      geometry: { type: "Point", coordinates: [-64.800, -31.600] },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Estación de Monitoreo Hídrico - Río Cosquín",
        tipo: "monitoreo",
        altitud_m: 900,
        descripcion: "Estación de medición de caudal y calidad de agua del río Cosquín.",
        emoji: "📊",
      },
      geometry: { type: "Point", coordinates: [-64.580, -31.420] },
    },
  ],
};

export default puntosInteres;
