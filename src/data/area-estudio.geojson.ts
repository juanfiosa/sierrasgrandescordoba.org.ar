import type { FeatureCollection } from "geojson";

/**
 * Límite del área de estudio — Sierras Grandes de Córdoba
 *
 * Delimitación aproximada:
 *  • Norte: zona de Cruz del Eje
 *  • Sur: primeras estribaciones del macizo, zona de Alpa Corral
 *  • Oeste: ruta Mina Clavero – Merlo (por San Javier, Las Rosas, La Población)
 *  • Este: divisoria de aguas de las cumbres de Sierras Chicas
 */
const areaEstudio: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        nombre: "Área de estudio — Sierras Grandes de Córdoba",
        descripcion:
          "Delimitación aproximada del área de alcance del proyecto. Norte: Cruz del Eje. Sur: Alpa Corral. Oeste: ruta Mina Clavero–Merlo. Este: divisoria de aguas de Sierras Chicas.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            // ── Límite norte — zona Cruz del Eje ──
            [-65.10, -30.70],
            [-64.95, -30.68],
            [-64.80, -30.67],
            [-64.65, -30.69],
            [-64.52, -30.72],

            // ── Límite este — divisoria de aguas Sierras Chicas (N→S) ──
            [-64.47, -30.82],
            [-64.44, -30.95],
            [-64.42, -31.05],  // cerca de Capilla del Monte / Uritorco
            [-64.40, -31.15],
            [-64.38, -31.25],  // cerca de La Falda / Huerta Grande
            [-64.37, -31.35],  // cerca de Cosquín
            [-64.36, -31.42],  // cerca de Bialet Massé
            [-64.37, -31.50],  // cerca de Villa Carlos Paz
            [-64.38, -31.58],
            [-64.39, -31.65],  // cerca de Alta Gracia / Falda del Carmen
            [-64.40, -31.75],
            [-64.42, -31.85],
            [-64.44, -31.95],  // al sur de Anisacate
            [-64.47, -32.05],
            [-64.50, -32.15],
            [-64.53, -32.25],
            [-64.56, -32.35],
            [-64.60, -32.45],
            [-64.64, -32.55],
            [-64.68, -32.62],

            // ── Límite sur — zona Alpa Corral ──
            [-64.72, -32.68],  // Alpa Corral
            [-64.80, -32.72],
            [-64.90, -32.74],
            [-65.00, -32.72],

            // ── Límite oeste — ruta Mina Clavero–Merlo (S→N) ──
            [-65.03, -32.60],
            [-65.05, -32.48],
            [-65.05, -32.35],  // zona de Merlo (San Luis)
            [-65.06, -32.22],
            [-65.06, -32.15],  // La Población
            [-65.06, -32.05],  // Las Rosas
            [-65.05, -31.97],  // San Javier
            [-65.04, -31.88],
            [-65.03, -31.80],  // Nono
            [-65.02, -31.72],  // Mina Clavero
            [-65.03, -31.60],
            [-65.05, -31.48],
            [-65.07, -31.35],
            [-65.08, -31.20],
            [-65.09, -31.05],
            [-65.10, -30.90],
            [-65.10, -30.78],

            // ── Cierre: vuelve al punto inicial ──
            [-65.10, -30.70],
          ],
        ],
      },
    },
  ],
};

export default areaEstudio;
