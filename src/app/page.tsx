import Image from "next/image";

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

      {/* Crédito de las fotos */}
      <div className="absolute bottom-3 right-3 z-10 rounded bg-black/40 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
        Sierras Grandes de Córdoba
      </div>
    </main>
  );
}
