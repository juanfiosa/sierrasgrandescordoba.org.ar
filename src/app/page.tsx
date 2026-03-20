import Image from "next/image";

export default function Home() {
  return (
    <main className="relative -mt-16 h-screen overflow-hidden bg-black">
      {/* Contenedor de la imagen: mostramos solo los 2/3 superiores
          escalando la imagen al ancho de pantalla y dejando que el
          tercio inferior quede oculto por overflow-hidden */}
      <div className="absolute inset-0 flex items-start justify-center">
        <Image
          src="/hero-sierras.jpg"
          alt="Cerro de la Cruz, Macizo de Los Gigantes, Sierras Grandes de Córdoba"
          width={736}
          height={981}
          priority
          className="w-full max-w-4xl object-contain object-top"
          sizes="100vw"
          quality={95}
        />
      </div>
      {/* Crédito de la foto — semitransparente, esquina inferior derecha */}
      <div className="absolute bottom-3 right-3 z-10 rounded bg-black/40 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
        Cerro de la Cruz, Los Gigantes
      </div>
    </main>
  );
}
