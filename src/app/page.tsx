import Image from "next/image";

export default function Home() {
  return (
    <main className="relative" style={{ height: "calc(100vh - 4rem)" }}>
      <Image
        src="/hero-sierras.jpg"
        alt="Macizo de Los Gigantes y Cumbres de Achala, Sierras Grandes de Córdoba"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />
      {/* Crédito de la foto — semitransparente, esquina inferior derecha */}
      <div className="absolute bottom-3 right-3 rounded bg-black/40 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
        Pampa de Achala — CC BY-SA 4.0
      </div>
    </main>
  );
}
