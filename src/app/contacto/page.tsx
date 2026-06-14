"use client";

import { useState } from "react";
import { Mail, Copy, Check, Send } from "lucide-react";

const EMAIL = "gruposierrasgrandes@gmail.com";

export default function ContactoPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-10 flex items-center gap-3">
        <Mail className="h-8 w-8 text-green-700" />
        <h1 className="text-3xl font-bold text-gray-900">Contacto</h1>
      </div>
      <p className="mb-10 text-gray-500">
        ¿Tenés consultas, propuestas o querés sumar información a la plataforma?
        Escribinos a la siguiente dirección.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xl font-semibold text-gray-900 break-all">{EMAIL}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
            Enviar email
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg border-2 border-green-600 px-5 py-2.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "¡Copiado!" : "Copiar dirección"}
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Si el botón &quot;Enviar email&quot; no abre tu programa de correo,
          copiá la dirección y escribinos desde tu casilla habitual (Gmail, Outlook, etc.).
        </p>
      </div>
    </main>
  );
}
