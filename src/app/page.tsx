import Link from "next/link";
import { ArrowRight, TreePine, Droplets, Flame, Beef, Footprints, Leaf, Bug, Thermometer, Scale } from "lucide-react";
import { HeroMap } from "@/components/map/DynamicMap";

const ejes = [
  {
    icon: TreePine,
    title: "Reforestación",
    desc: "Restauración ecológica y bosque nativo",
    color: "bg-green-50 text-green-700",
    href: "/ejes#reforestacion",
  },
  {
    icon: Droplets,
    title: "Gestión Hídrica",
    desc: "Cuencas, embalses y calidad de agua",
    color: "bg-blue-50 text-blue-700",
    href: "/ejes#hidrica",
  },
  {
    icon: Beef,
    title: "Manejo de Ganado",
    desc: "Carga ganadera y sustentabilidad de pastizales",
    color: "bg-yellow-50 text-yellow-700",
    href: "/ejes#ganado",
  },
  {
    icon: Flame,
    title: "Manejo del Fuego",
    desc: "Incendios forestales y estrategias de prevención",
    color: "bg-orange-50 text-orange-700",
    href: "/ejes#fuego",
  },
  {
    icon: Bug,
    title: "Biodiversidad",
    desc: "Vegetación nativa y especies invasoras",
    color: "bg-teal-50 text-teal-700",
    href: "/ejes#biodiversidad",
  },
  {
    icon: Thermometer,
    title: "Cambio Climático",
    desc: "Dendrocronología y adaptación climática",
    color: "bg-red-50 text-red-700",
    href: "/ejes#clima",
  },
  {
    icon: Footprints,
    title: "Ecoturismo",
    desc: "Senderos, capacidad de carga y turismo sustentable",
    color: "bg-amber-50 text-amber-700",
    href: "/ejes#ecoturismo",
  },
  {
    icon: Leaf,
    title: "Carbono",
    desc: "Captura de carbono y mercados de bonos",
    color: "bg-emerald-50 text-emerald-700",
    href: "/ejes#carbono",
  },
  {
    icon: Scale,
    title: "Propuestas Normativas",
    desc: "Marco legal y ordenamiento territorial",
    color: "bg-indigo-50 text-indigo-700",
    href: "/ejes#normativa",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero con mapa */}
      <section className="relative h-[60vh] min-h-[400px]">
        <HeroMap />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="max-w-2xl px-4 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Sierras Grandes de Córdoba
            </h1>
            <p className="mt-4 text-lg text-gray-100">
              Plataforma de gestión integrada para la articulación del
              conocimiento científico, técnico y comunitario.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/mapa"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700"
              >
                Explorar el mapa <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ejes"
                className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-5 py-2.5 font-medium text-white backdrop-blur hover:bg-white/30"
              >
                Ejes temáticos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ejes temáticos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Ejes Temáticos
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-500">
          Nueve líneas de trabajo articuladas para la gestión sustentable de las
          Sierras Grandes.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ejes.map((eje) => (
            <Link
              key={eje.title}
              href={eje.href}
              className="group rounded-xl border p-5 transition-shadow hover:shadow-md"
            >
              <div className={`inline-flex rounded-lg p-2.5 ${eje.color}`}>
                <eje.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-green-700">
                {eje.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{eje.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Estadísticas */}
      <section className="border-t bg-gray-50 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 px-4 text-center sm:grid-cols-4">
          {[
            { value: "120k", label: "ha de reserva hídrica" },
            { value: "3", label: "cuencas principales" },
            { value: "2790m", label: "Cerro Champaquí" },
            { value: "9", label: "ejes de trabajo" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-green-700">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
