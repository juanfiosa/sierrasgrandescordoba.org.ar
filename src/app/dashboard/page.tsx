"use client";

import ReactECharts from "echarts-for-react";
import { BarChart3, TrendingUp, TreePine, Droplets } from "lucide-react";

const coberturaData = {
  title: { text: "Cobertura vegetal por tipo", left: "center", textStyle: { fontSize: 14 } },
  tooltip: { trigger: "item" },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 8, borderColor: "#fff", borderWidth: 2 },
      label: { show: true, formatter: "{b}: {d}%" },
      data: [
        { value: 35, name: "Pastizal de altura", itemStyle: { color: "#86efac" } },
        { value: 22, name: "Bosque nativo", itemStyle: { color: "#22c55e" } },
        { value: 15, name: "Bosque serrano", itemStyle: { color: "#15803d" } },
        { value: 12, name: "Plantación exótica", itemStyle: { color: "#facc15" } },
        { value: 10, name: "Áreas degradadas", itemStyle: { color: "#f87171" } },
        { value: 6, name: "Roca/suelo desnudo", itemStyle: { color: "#d1d5db" } },
      ],
    },
  ],
};

const incendiosAnuales = {
  title: { text: "Superficie afectada por incendios (ha)", left: "center", textStyle: { fontSize: 14 } },
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category" as const,
    data: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  },
  yAxis: { type: "value" as const, name: "Hectáreas" },
  series: [
    {
      data: [1200, 800, 3500, 2100, 8500, 5200, 1800, 4300, 2800, 1500],
      type: "bar",
      itemStyle: {
        color: (params: { dataIndex: number }) => {
          const colors = ["#fbbf24", "#fbbf24", "#f97316", "#fbbf24", "#ef4444", "#f97316", "#fbbf24", "#f97316", "#fbbf24", "#fbbf24"];
          return colors[params.dataIndex];
        },
      },
    },
  ],
};

const caudalMensual = {
  title: { text: "Caudal medio mensual - Río Cosquín (m³/s)", left: "center", textStyle: { fontSize: 14 } },
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category" as const,
    data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  },
  yAxis: { type: "value" as const, name: "m³/s" },
  series: [
    {
      name: "2024",
      data: [12.5, 15.2, 11.8, 6.3, 3.1, 2.0, 1.5, 1.2, 2.8, 5.5, 8.2, 10.1],
      type: "line",
      smooth: true,
      lineStyle: { color: "#3b82f6", width: 3 },
      itemStyle: { color: "#3b82f6" },
      areaStyle: { color: "rgba(59,130,246,0.15)" },
    },
    {
      name: "2025",
      data: [14.1, 16.8, 13.2, 7.1, 3.8, 2.3, 1.8, 1.5, 3.2, 6.1, 9.0, 11.5],
      type: "line",
      smooth: true,
      lineStyle: { color: "#22c55e", width: 3 },
      itemStyle: { color: "#22c55e" },
      areaStyle: { color: "rgba(34,197,94,0.15)" },
    },
  ],
  legend: { data: ["2024", "2025"], bottom: 0 },
};

const reforestacionProgreso = {
  title: { text: "Progreso de reforestación por proyecto (ha)", left: "center", textStyle: { fontSize: 14 } },
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" as const } },
  xAxis: { type: "value" as const, name: "Hectáreas" },
  yAxis: {
    type: "category" as const,
    data: ["Acción Serrana", "Ecosistemas Arg.", "PN Condorito", "Comunidad Achala", "CERNAR-UNC"],
  },
  series: [
    {
      name: "Completado",
      type: "bar",
      stack: "total",
      data: [120, 85, 45, 30, 60],
      itemStyle: { color: "#22c55e" },
    },
    {
      name: "En progreso",
      type: "bar",
      stack: "total",
      data: [50, 35, 25, 20, 15],
      itemStyle: { color: "#86efac" },
    },
    {
      name: "Planificado",
      type: "bar",
      stack: "total",
      data: [80, 60, 30, 50, 25],
      itemStyle: { color: "#d1d5db" },
    },
  ],
  legend: { bottom: 0 },
};

const stats = [
  { icon: TreePine, label: "Hectáreas reforestadas", value: "340", change: "+45 este año", color: "text-green-600 bg-green-50" },
  { icon: Droplets, label: "Estaciones de monitoreo", value: "12", change: "3 cuencas", color: "text-blue-600 bg-blue-50" },
  { icon: BarChart3, label: "Proyectos activos", value: "8", change: "5 organizaciones", color: "text-purple-600 bg-purple-50" },
  { icon: TrendingUp, label: "tCO₂ capturadas (est.)", value: "1.250", change: "+180 este año", color: "text-emerald-600 bg-emerald-50" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-gray-500">
        Indicadores clave de la gestión integrada de las Sierras Grandes.
      </p>

      {/* KPI cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <ReactECharts option={coberturaData} style={{ height: 350 }} />
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <ReactECharts option={incendiosAnuales} style={{ height: 350 }} />
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <ReactECharts option={caudalMensual} style={{ height: 350 }} />
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <ReactECharts option={reforestacionProgreso} style={{ height: 350 }} />
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-400">
        Datos de ejemplo para demostración. Se alimentarán desde PostGIS y Strapi en producción.
      </p>
    </div>
  );
}
