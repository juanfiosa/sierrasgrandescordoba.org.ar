import Image from "next/image";
import WelcomePopup from "@/components/WelcomePopup";
import NovedadesSidebar from "@/components/NovedadesSidebar";
import { avales } from "@/data/avales";

export default function Home() {
  return (
    <main className="relative -mt-16 flex h-screen overflow-hidden bg-green-900">
      {/* Panel izquierdo */}
      <div className="relative hidden flex-1 md:block">
        <Image
          src="/hero-left.jpg"
          alt="Cerro Champaquí, Sierras Grandes de Córdoba"
          fill
          className="object-cover object-center"
          sizes="33vw"
          quality={90}
        />
      </div>

      {/* Separador sutil izquierdo */}
      <div className="hidden w-px bg-white/20 md:block" />

      {/* Panel central — foto principal */}
      <div className="relative flex-[1.3]">
        <Image
          src="/hero-sierras.jpg"
          alt="Cerro de la Cruz, Macizo de Los Gigantes, Sierras Grandes de Córdoba"
          fill
          priority
          className="object-cover object-[center_25%]"
          sizes="(min-width: 768px) 40vw, 100vw"
          quality={95}
        />
      </div>

      {/* Separador sutil derecho */}
      <div className="hidden w-px bg-white/20 md:block" />

      {/* Panel derecho */}
      <div className="relative hidden flex-1 md:block">
        <Image
          src="/hero-right.jpg"
          alt="Valle de Los Lisos, Los Gigantes, Sierras Grandes de Córdoba"
          fill
          className="object-cover object-center"
          sizes="33vw"
          quality={90}
        />
      </div>

      <WelcomePopup />

      {/* Barra lateral de novedades (izquierda) — solo aparece si hay novedades activadas */}
      <NovedadesSidebar />

      {/* Logos IDEJUS + CIJS — arriba a la derecha, debajo del navbar */}
      <div className="absolute right-[4.75rem] top-[4.5rem] z-10 flex items-stretch gap-2">
        <div className="flex items-center rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm">
          <Image
            src="/avales/idejus-blanco.png"
            alt="CONICET — Universidad Nacional de Córdoba — IDEJUS"
            width={720}
            height={405}
            className="h-[4.25rem] w-auto object-contain sm:h-[4.75rem]"
          />
        </div>
        <div className="flex items-center rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm">
          <Image
            src="/avales/cijs.jpg"
            alt="CIJS — Centro de Investigaciones Jurídicas y Sociales (UNC)"
            width={120}
            height={120}
            className="h-[4.25rem] w-auto object-contain sm:h-[4.75rem]"
          />
        </div>
      </div>

      {/* Avales institucionales */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-nowrap items-center justify-center gap-3">
        {avales.map((aval) => (
          <div
            key={aval.src}
            className={`rounded-xl px-4 py-2 shadow-lg backdrop-blur-sm ${aval.cardClassName}`}
          >
            <Image
              src={aval.src}
              alt={aval.alt}
              width={aval.width}
              height={aval.height}
              className="h-10 w-auto object-contain sm:h-12"
            />
          </div>
        ))}
      </div>

      {/* Crédito de las fotos */}
      <div className="absolute bottom-3 right-3 z-10 rounded bg-black/40 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
        Sierras Grandes de Córdoba
      </div>
    </main>
  );
}
