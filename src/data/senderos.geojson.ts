import type { FeatureCollection } from "geojson";

const senderos: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        nombre: "Sendero Quebrada del Condorito",
        dificultad: "moderado",
        longitud_km: 9.5,
        desnivel_m: 450,
        descripcion:
          "Sendero principal del PN Quebrada del Condorito. Desciende hasta el balcón norte con vistas al vuelo de cóndores.",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-64.788, -31.725],
          [-64.785, -31.730],
          [-64.780, -31.738],
          [-64.776, -31.745],
          [-64.773, -31.752],
          [-64.770, -31.760],
          [-64.772, -31.768],
          [-64.770, -31.775],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Sendero Los Gigantes",
        dificultad: "difícil",
        longitud_km: 12.0,
        desnivel_m: 800,
        descripcion:
          "Recorrido por las imponentes formaciones rocosas de Los Gigantes, con escalada opcional.",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-64.810, -31.400],
          [-64.815, -31.405],
          [-64.820, -31.412],
          [-64.818, -31.420],
          [-64.822, -31.428],
          [-64.825, -31.435],
          [-64.830, -31.440],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Sendero Pampa de Achala - Circuito Sur",
        dificultad: "fácil",
        longitud_km: 5.0,
        desnivel_m: 150,
        descripcion:
          "Recorrido suave por la pampa de altura con vistas panorámicas a los valles.",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-64.830, -31.680],
          [-64.835, -31.675],
          [-64.840, -31.672],
          [-64.845, -31.675],
          [-64.842, -31.682],
          [-64.838, -31.685],
          [-64.830, -31.680],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Sendero al Champaquí por Yacanto",
        dificultad: "difícil",
        longitud_km: 18.0,
        desnivel_m: 1200,
        descripcion:
          "Ascenso al cerro Champaquí (2790 m), punto más alto de Córdoba, desde Villa Yacanto.",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-64.900, -31.950],
          [-64.905, -31.955],
          [-64.910, -31.962],
          [-64.915, -31.970],
          [-64.920, -31.978],
          [-64.925, -31.985],
          [-64.930, -31.990],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        nombre: "Sendero Cascada Los Chorrillos",
        dificultad: "fácil",
        longitud_km: 3.5,
        desnivel_m: 200,
        descripcion:
          "Caminata corta hasta una hermosa cascada en el arroyo Los Chorrillos.",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-64.795, -31.640],
          [-64.798, -31.645],
          [-64.800, -31.650],
          [-64.802, -31.655],
        ],
      },
    },
  ],
};

export default senderos;
