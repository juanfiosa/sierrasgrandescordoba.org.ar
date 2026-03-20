# Propuesta v1: Plataforma de Gestion Integrada para las Sierras Grandes de Cordoba

**Fecha:** 16 de marzo de 2026
**Estado:** Borrador inicial para discusion

---

## 1. Vision General

Una plataforma web interactiva que articule el conocimiento cientifico, tecnico y comunitario sobre las Sierras Grandes de Cordoba, permitiendo a investigadores, tecnicos y decisores publicos acceder, contribuir y visualizar informacion integrada sobre reforestacion, gestion hidrica, manejo del ganado y fuego, ecoturismo y mercados de carbono.

---

## 2. Plataformas de Referencia Analizadas

### 2.1 Plataformas internacionales

| Plataforma | URL | Relevancia |
|-----------|-----|-----------|
| **Global Forest Watch** | globalforestwatch.org | Monitoreo forestal con mapas interactivos. Stack: Next.js + MapLibre + PostGIS. Codigo abierto (MIT). Modelo a seguir. |
| **Resource Watch** (WRI) | resourcewatch.org | Datos ambientales con dashboards y widgets embebibles. Similar stack. |
| **GeoNode** | geonode.org | CMS geoespacial open source (Django + GeoServer + PostGIS). Usado por Banco Mundial, PNUD, FAO. |
| **CKAN** | ckan.org | Portal de datos abiertos lider mundial. Usado por datos.gob.ar en Argentina. |
| **OpenForis/SEPAL** (FAO) | sepal.io | Herramientas gratuitas para monitoreo forestal y estimacion de stock de carbono. |
| **Observatorio de Sostenibilidad** | observatoriosostenibilidad.org | Articulacion de conocimiento ambiental para decisores publicos (Espana). |

### 2.2 Plataformas regionales

| Plataforma | URL | Relevancia |
|-----------|-----|-----------|
| **MapBiomas** | mapbiomas.org | Cobertura y uso del suelo en Latinoamerica. Datos de Argentina. |
| **IDECor** (Cordoba) | idecor.cba.gov.ar | IDE provincial. Socio clave. Fuente de capas base e incendios. |
| **Sendero de Chile** | senderodechile.cl | Articulacion ambiental-turistica-comunitaria via senderismo. |

### 2.3 Lecciones clave

1. **Next.js es el estandar** para frontends ambientales modernos (GFW, Resource Watch)
2. **PostGIS es universal** como base de datos espacial
3. **Arquitectura desacoplada** (headless CMS + API + frontend separado)
4. **Tiles vectoriales** (MVT) para rendimiento con muchos datos
5. **Codigo abierto** reduce costos y permite personalizacion total

---

## 3. Arquitectura Tecnologica Propuesta

### 3.1 Stack: Next.js + Strapi + MapLibre + PostGIS

```
+-----------------------------------------------------------+
|                      FRONTEND                              |
|  Next.js 14+ (App Router, TypeScript)                     |
|  - MapLibre GL JS (react-map-gl) -> mapas interactivos    |
|  - Apache ECharts -> graficos y dashboards                |
|  - TipTap -> editor de texto enriquecido                  |
|  - NextAuth.js v5 -> autenticacion                        |
|  - Tailwind CSS + shadcn/ui -> interfaz de usuario        |
+-----------------------------------------------------------+
|                    BACKEND / CMS                           |
|  Strapi v5 (CMS headless)                                 |
|  - Tipos de contenido: Articulos, Informes, Datasets,     |
|    Proyectos, Autores, Organizaciones, Capas GIS          |
|  - Biblioteca de medios (archivos, imagenes, PDFs)        |
|  - Control de acceso por roles (RBAC)                     |
|  - API REST + GraphQL automatica                          |
|  - Flujo editorial (borrador -> revision -> publicar)     |
+-----------------------------------------------------------+
|                 SERVICIOS GEOESPACIALES                    |
|  PostgreSQL 16 + PostGIS 3.4                              |
|  - martin (servidor de tiles vectoriales, Rust)           |
|  - titiler (servidor de tiles raster, Python)             |
|  - Datos: cuencas, cobertura vegetal, senderos,           |
|    areas protegidas, puntos de monitoreo, etc.            |
+-----------------------------------------------------------+
|                   INFRAESTRUCTURA                          |
|  Docker Compose                                            |
|  - PostgreSQL + PostGIS / Strapi / Next.js / martin       |
|  - MinIO (almacenamiento S3-compatible)                   |
|  - Redis (cache y sesiones)                               |
+-----------------------------------------------------------+
```

### 3.2 Justificacion del stack

| Componente | Eleccion | Por que |
|-----------|---------|---------|
| Frontend | Next.js 14+ | SSR/SSG para SEO, usado por Global Forest Watch y Resource Watch |
| Mapas | MapLibre GL JS | Tiles vectoriales, WebGL, rendimiento, basemaps gratuitos |
| CMS | Strapi v5 | Elimina el 70 porciento del backend (CRUD, auth, media, API automatica) |
| BD espacial | PostgreSQL + PostGIS | Estandar de la industria para datos geoespaciales |
| Tile server | martin | Rust, rapido, sirve MVT desde PostGIS |
| Auth | NextAuth.js v5 | OAuth, JWT, roles, integracion con Strapi |
| Graficos | Apache ECharts | 80+ tipos de graficos, grandes datasets |
| Editor | TipTap | Edicion enriquecida, extensible, ProseMirror |
| UI | Tailwind + shadcn/ui | Desarrollo rapido, consistente, accesible |

---

## 4. Modulos Funcionales

### 4.1 Portal Publico (sin autenticacion)

- **Pagina principal**: Mapa interactivo de las Sierras Grandes con capas tematicas
- **Ejes tematicos**: Secciones por eje (reforestacion, agua, ganado/fuego, ecoturismo, carbono)
- **Biblioteca de conocimiento**: Articulos, informes, publicaciones cientificas por tema
- **Dashboards**: Indicadores clave (superficie forestada, caudales, senderos, etc.)
- **Directorio de actores**: Mapa de organizaciones, investigadores e iniciativas
- **Buscador**: Por texto, tema, ubicacion geografica y tipo de contenido

### 4.2 Mapa Georreferenciado (componente central)

**Capas base:**
- Topografia y relieve (DEM)
- Imagen satelital (Sentinel-2 / Landsat)
- Limites administrativos (departamentos, municipios, comunas)
- Areas protegidas (Reserva Hidrica Pampa de Achala, PN Quebrada del Condorito)
- Red hidrografica y cuencas

**Capas tematicas - Reforestacion:**
- Cobertura de bosque nativo (Polylepis australis, bosque chaqueno serrano)
- Plantaciones forestales exoticas
- Areas degradadas / prioritarias para restauracion
- Proyectos de reforestacion activos (Accion Serrana, Ecosistemas Argentinos, etc.)
- Distribucion de especies invasoras

**Capas tematicas - Gestion Hidrica:**
- Cuencas principales (San Roque, Los Molinos, Rio Tercero)
- Puntos de monitoreo de calidad de agua
- Embalses y niveles historicos
- Zonas de recarga hidrica
- Riesgo de erosion

**Capas tematicas - Ganado y Fuego:**
- Uso ganadero del suelo
- Historial de incendios (IDECOR/CONAE)
- Areas quemadas por anio
- Zonas de riesgo de incendio
- Umbrales de carga ganadera (Giorgis et al. 2020)

**Capas tematicas - Ecoturismo:**
- Red de senderos existentes y propuestos
- Puntos de interes (miradores, cascadas, refugios)
- Capacidad de carga por sendero
- Infraestructura turistica
- Accesos y estacionamientos

**Capas tematicas - Carbono:**
- Estimaciones de stock de carbono por cobertura vegetal
- Areas potenciales para proyectos de captura
- Proyectos de bonos de carbono existentes

**Funcionalidades del mapa:**
- Selector de capas con leyenda dinamica
- Herramientas de medicion (distancia, area)
- Dibujo de geometrias (para que investigadores marquen zonas)
- Exportacion de vistas (PNG, PDF)
- Comparacion temporal (slider antes/despues)
- Popups informativos vinculados a cada feature
- Filtros temporales (evolucion por anios)

### 4.3 Sistema de Usuarios y Roles

| Rol | Permisos |
|-----|----------|
| **Visitante** (publico) | Ver contenido publicado, consultar mapas, descargar datos publicos |
| **Investigador/Tecnico** | + Subir contenido (articulos, datasets, capas), editar propio, comentar |
| **Editor** | + Revisar y aprobar contenido de otros, gestionar metadatos |
| **Administrador** | + Gestionar usuarios, configurar plataforma, administrar capas base |

**Flujo de alta de usuarios:**
1. Solicitud de registro con datos institucionales
2. Verificacion por un administrador
3. Asignacion de rol segun perfil
4. Acceso al panel de contribucion

### 4.4 Panel de Contribucion (usuarios autenticados)

- **Subir articulos/informes**: Editor enriquecido con vinculacion a ubicaciones en mapa
- **Subir datasets**: Formulario para Shapefile, GeoJSON, CSV con coordenadas, GeoTIFF
- **Subir capas GIS**: Ingestion automatica a PostGIS con previsualizacion
- **Flujo editorial**: Borrador -> Revision -> Publicado (o devuelto con comentarios)
- **Mi perfil**: Publicaciones, estadisticas, notificaciones

### 4.5 Modulo de Diagnosticos

Seccion para los 6 diagnosticos tematicos del proyecto:
1. Reforestacion y restauracion ecologica
2. Manejo del ganado
3. Manejo del fuego
4. Gestion hidrica
5. Ecoturismo y senderismo
6. Captacion y mercados de carbono

Cada uno incluye: estado del arte, mapeo de actores, analisis de brechas, recomendaciones, y visualizaciones georreferenciadas.

### 4.6 Modulo de Consulta para Decisores

- **Reportes por zona**: Seleccionar area en mapa y obtener resumen integrado de todos los ejes
- **Comparador de escenarios**: Reforestar X hectareas vs. mantener uso actual
- **Fichas de politica publica**: Recomendaciones con costo, plazo y actores
- **Exportacion**: Documentos PDF con datos y mapas seleccionados

---

## 5. Cronograma (12 meses)

### Fase 1 - Relevamiento (meses 1-3)
**Plataforma:** Diseno de arquitectura, setup de desarrollo, autenticacion, CMS basico, primer mapa con capas base.
**Entregable:** Demo navegable con mapa base y login.

### Fase 2 - Diagnostico (meses 3-6)
**Plataforma:** Panel de contribucion, carga de capas tematicas, integracion de datos de talleres, dashboards por eje.
**Entregable:** Plataforma con diagnosticos y capas tematicas principales.

### Fase 3 - Desarrollo tecnologico (meses 6-9)
**Plataforma:** Funcionalidades avanzadas del mapa (comparacion temporal, analisis), modulo de decisores, busqueda avanzada.
**Entregable:** Prototipo funcional completo (pre-TRL 6).

### Fase 4 - Validacion (meses 9-12)
**Plataforma:** Prueba piloto con funcionarios, ajustes de usabilidad (SUS), documentacion, configuracion de produccion.
**Entregable:** Plataforma TRL 6 validada con usuarios reales.

---

## 6. Integraciones con Fuentes de Datos

| Fuente | Tipo de datos | Integracion |
|--------|-------------|-------------|
| **IDECor** | Capas base, incendios, limites | WMS/WFS o descarga |
| **MapBiomas Argentina** | Cobertura de suelo | API o GeoTIFF |
| **CONAE** | Imagenes satelitales | Catalogo |
| **CERNAR/IMBIV** | Vegetacion, Polylepis | CSV/Shapefile via investigadores |
| **ISEA/APRHI** | Datos hidricos, caudales | CSV/API |
| **Senderos de Cordoba** | Trazas de senderos | GPX/GeoJSON |
| **SEPAL (FAO)** | Estimaciones de carbono | GeoTIFF/CSV |
| **Sentinel Hub** | Imagenes Sentinel-2 | API gratuita (cuenta academica) |

---

## 7. Recursos Tecnicos Estimados

### Equipo minimo
- 1 desarrollador full-stack senior (Next.js + Strapi + PostGIS) - dedicacion completa
- 1 especialista GIS (PostGIS, capas, georreferenciacion) - media dedicacion
- Equipo de investigacion para contenido y validacion

### Infraestructura (produccion)
- Servidor VPS: 4 CPU, 16GB RAM, 200GB SSD (aprox. USD 40-80/mes)
- Dominio y certificado SSL
- Almacenamiento de archivos
- Backup automatico
- **Costo anual estimado: USD 500-1000**

---

## 8. Sostenibilidad Post-Proyecto

- **Codigo abierto** (licencia MIT): replicable en otras regiones
- **Documentacion tecnica** completa para mantenimiento
- **Hosting institucional**: UNC o organismo adoptante
- **Comunidad**: Investigadores dados de alta siguen contribuyendo
- **Escalabilidad**: Agregar ejes, regiones o funcionalidades sin reescritura

---

## 9. Proximos Pasos

1. Revisar y discutir esta propuesta con el equipo
2. Definir prioridades de funcionalidades para el MVP
3. Identificar fuentes de datos disponibles inmediatamente
4. Seleccionar/confirmar equipo de desarrollo
5. Disenar wireframes de pantallas principales
6. Configurar entorno de desarrollo (repositorio, Docker, CI/CD)

---

## Fuentes y Referencias

- Global Forest Watch (GitHub): https://github.com/wri/gfw
- GeoNode: https://geonode.org
- CKAN: https://ckan.org
- MapBiomas: https://mapbiomas.org
- IDECor: https://idecor.cba.gov.ar
- SEPAL/OpenForis (FAO): https://sepal.io
- Observatorio de Sostenibilidad: https://www.observatoriosostenibilidad.org
- MapLibre GL JS: https://maplibre.org
- Strapi: https://strapi.io
- PostGIS: https://postgis.net
- martin tile server: https://github.com/maplibre/martin
- Plan de Manejo de la Reserva Hidrica Provincial de Achala (2022)
