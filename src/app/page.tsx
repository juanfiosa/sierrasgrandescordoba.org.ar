import Image from "next/image";

export default function Home() {
  return (
    <main className="relative -mt-16 h-screen">
      <Image
        src="/hero-sierras.jpg"
        alt="Cerro de la Cruz, Macizo de Los Gigantes, Sierras Grandes de Córdoba"
        fill
        priority
        className="object-cover object-[center_30%]"
        sizes="100vw"
        quality={90}
      />
      {/* Crédito de la foto — semitransparente, esquina inferior derecha */}
      <div className="absolute bottom-3 right-3 rounded bg-black/40 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
        Cerro de la Cruz, Los Gigantes
      </div>
    </main>
  );
}
