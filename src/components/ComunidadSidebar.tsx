"use client";

import { useEffect, useState, useCallback } from "react";
import {
  MessagesSquare,
  Plus,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { isAdmin } from "@/lib/admins";

interface Post {
  id: number;
  categoria: string;
  titulo: string;
  cuerpo: string;
  autor: string;
  created_at: string;
  respuestas: number;
  esMio?: boolean;
}

interface Respuesta {
  id: number;
  post_id: number;
  cuerpo: string;
  autor: string;
  created_at: string;
  esMio?: boolean;
}

const CATEGORIAS = [
  { value: "demanda", label: "Demanda", chip: "bg-amber-200 text-amber-900" },
  { value: "problema", label: "Problema", chip: "bg-rose-200 text-rose-900" },
  { value: "iniciativa", label: "Iniciativa", chip: "bg-sky-200 text-sky-900" },
];

function chipDe(cat: string) {
  return CATEGORIAS.find((c) => c.value === cat) ?? CATEGORIAS[2];
}

function formatFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
  } catch {
    return "";
  }
}

export default function ComunidadSidebar() {
  const { user } = useAuth();
  const admin = isAdmin(user);
  const email = user?.username ?? "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [publicando, setPublicando] = useState(false);
  const [categoria, setCategoria] = useState("iniciativa");
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [expandido, setExpandido] = useState<number | null>(null);
  const [respuestas, setRespuestas] = useState<Record<number, Respuesta[]>>({});
  const [textoRespuesta, setTextoRespuesta] = useState("");
  const [respondiendo, setRespondiendo] = useState(false);

  // Edición
  const [editPost, setEditPost] = useState<number | null>(null);
  const [ePTitulo, setEPTitulo] = useState("");
  const [ePCuerpo, setEPCuerpo] = useState("");
  const [ePCat, setEPCat] = useState("iniciativa");
  const [editResp, setEditResp] = useState<number | null>(null);
  const [eRTexto, setERTexto] = useState("");

  const cargar = useCallback(async () => {
    try {
      const res = await fetch(`/api/comunidad?me=${encodeURIComponent(email)}`);
      const data = res.ok ? await res.json() : [];
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    }
  }, [email]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!titulo.trim()) {
      setError("Poné un título");
      return;
    }
    setGuardando(true);
    try {
      const res = await fetch("/api/comunidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria, titulo, cuerpo, autor: user?.nombre ?? "", autor_email: email }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "No se pudo publicar");
        return;
      }
      setTitulo("");
      setCuerpo("");
      setCategoria("iniciativa");
      setPublicando(false);
      await cargar();
    } catch {
      setError("No se pudo publicar");
    } finally {
      setGuardando(false);
    }
  }

  async function abrir(postId: number) {
    if (expandido === postId) {
      setExpandido(null);
      return;
    }
    setExpandido(postId);
    setTextoRespuesta("");
    try {
      const res = await fetch(
        `/api/comunidad/respuestas?postId=${postId}&me=${encodeURIComponent(email)}`
      );
      const data = res.ok ? await res.json() : [];
      setRespuestas((r) => ({ ...r, [postId]: Array.isArray(data) ? data : [] }));
    } catch {
      setRespuestas((r) => ({ ...r, [postId]: [] }));
    }
  }

  async function responder(postId: number) {
    if (!textoRespuesta.trim()) return;
    setRespondiendo(true);
    try {
      const res = await fetch("/api/comunidad/respuestas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, cuerpo: textoRespuesta, autor: user?.nombre ?? "", autor_email: email }),
      });
      if (res.ok) {
        const nueva = await res.json();
        setRespuestas((r) => ({ ...r, [postId]: [...(r[postId] ?? []), nueva] }));
        setPosts((ps) => ps.map((p) => (p.id === postId ? { ...p, respuestas: p.respuestas + 1 } : p)));
        setTextoRespuesta("");
      }
    } finally {
      setRespondiendo(false);
    }
  }

  function empezarEditarPost(p: Post) {
    setEditPost(p.id);
    setEPTitulo(p.titulo);
    setEPCuerpo(p.cuerpo);
    setEPCat(p.categoria);
  }

  async function guardarPost(id: number) {
    if (!ePTitulo.trim()) return;
    const res = await fetch("/api/comunidad", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, titulo: ePTitulo, cuerpo: ePCuerpo, categoria: ePCat, email }),
    });
    if (res.ok) {
      const upd = await res.json();
      setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, ...upd } : p)));
      setEditPost(null);
    }
  }

  async function eliminarPost(p: Post) {
    if (!confirm(`¿Eliminar el tema "${p.titulo}" y sus respuestas?`)) return;
    const res = await fetch(`/api/comunidad?id=${p.id}&email=${encodeURIComponent(email)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setPosts((ps) => ps.filter((x) => x.id !== p.id));
      if (expandido === p.id) setExpandido(null);
    }
  }

  async function guardarResp(r: Respuesta) {
    if (!eRTexto.trim()) return;
    const res = await fetch("/api/comunidad/respuestas", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id, cuerpo: eRTexto, email }),
    });
    if (res.ok) {
      const upd = await res.json();
      setRespuestas((rs) => ({
        ...rs,
        [r.post_id]: (rs[r.post_id] ?? []).map((x) => (x.id === r.id ? { ...x, ...upd } : x)),
      }));
      setEditResp(null);
    }
  }

  async function eliminarResp(r: Respuesta) {
    if (!confirm("¿Eliminar esta respuesta?")) return;
    const res = await fetch(`/api/comunidad/respuestas?id=${r.id}&email=${encodeURIComponent(email)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setRespuestas((rs) => ({
        ...rs,
        [r.post_id]: (rs[r.post_id] ?? []).filter((x) => x.id !== r.id),
      }));
      setPosts((ps) =>
        ps.map((p) => (p.id === r.post_id ? { ...p, respuestas: Math.max(0, p.respuestas - 1) } : p))
      );
    }
  }

  return (
    <aside className="absolute bottom-24 right-0 top-[4.5rem] z-10 hidden w-1/5 min-w-[240px] px-3 md:block">
      <div className="flex h-full flex-col rounded-xl border border-green-200/40 bg-green-100/30 shadow-lg backdrop-blur-md">
        {/* Encabezado */}
        <div className="flex items-center justify-between gap-2 border-b border-green-300/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <MessagesSquare className="h-5 w-5 text-green-700" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-green-800">Comunidad</h2>
          </div>
          {user &&
            (publicando ? (
              <button
                onClick={() => setPublicando(false)}
                aria-label="Cerrar"
                className="rounded-full p-1 text-green-700 transition-colors hover:bg-green-200"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setPublicando(true)}
                className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-green-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Publicar
              </button>
            ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {!user && (
            <p className="mb-3 rounded-lg bg-white/60 px-3 py-2 text-xs text-gray-700">
              <Link href="/login" className="font-semibold text-green-700 underline">
                Iniciá sesión
              </Link>{" "}
              para publicar una demanda, problema o iniciativa y sumarte a la conversación.
            </p>
          )}

          {user && publicando && (
            <form onSubmit={publicar} className="mb-4 rounded-lg border border-green-300/70 bg-white/80 p-3">
              <div className="mb-2 flex flex-wrap gap-1">
                {CATEGORIAS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategoria(c.value)}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                      categoria === c.value ? c.chip + " ring-2 ring-green-500" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título"
                className="mb-2 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-green-500 focus:outline-none"
              />
              <textarea
                value={cuerpo}
                onChange={(e) => setCuerpo(e.target.value)}
                placeholder="Contá tu demanda, problema o iniciativa…"
                rows={3}
                className="mb-2 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-green-500 focus:outline-none"
              />
              {error && <p className="mb-2 text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={guardando}
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-green-600 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
              >
                {guardando && <Loader2 className="h-4 w-4 animate-spin" />}
                Publicar
              </button>
            </form>
          )}

          {posts.length === 0 ? (
            <p className="py-8 text-center text-xs text-gray-600">
              Todavía no hay publicaciones. ¡Sé la primera persona en abrir un tema!
            </p>
          ) : (
            <div className="space-y-3">
              {posts.map((p) => {
                const chip = chipDe(p.categoria);
                const abierto = expandido === p.id;
                const reps = respuestas[p.id] ?? [];
                const puedeP = p.esMio || admin;
                return (
                  <article
                    key={p.id}
                    className="rounded-lg border border-white/50 bg-white/55 p-3 backdrop-blur-sm"
                  >
                    {editPost === p.id ? (
                      /* ---- edición del tema ---- */
                      <div>
                        <div className="mb-2 flex flex-wrap gap-1">
                          {CATEGORIAS.map((c) => (
                            <button
                              key={c.value}
                              type="button"
                              onClick={() => setEPCat(c.value)}
                              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                ePCat === c.value ? c.chip + " ring-2 ring-green-500" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                        <input
                          value={ePTitulo}
                          onChange={(e) => setEPTitulo(e.target.value)}
                          className="mb-2 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none"
                        />
                        <textarea
                          value={ePCuerpo}
                          onChange={(e) => setEPCuerpo(e.target.value)}
                          rows={3}
                          className="mb-2 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none"
                        />
                        <div className="flex gap-1">
                          <button
                            onClick={() => guardarPost(p.id)}
                            className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditPost(null)}
                            className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ---- vista del tema ---- */
                      <>
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${chip.chip}`}>
                            {chip.label}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-500">{formatFecha(p.created_at)}</span>
                            {puedeP && (
                              <>
                                <button
                                  onClick={() => empezarEditarPost(p)}
                                  aria-label="Editar tema"
                                  className="rounded p-0.5 text-gray-400 hover:text-green-700"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => eliminarPost(p)}
                                  aria-label="Eliminar tema"
                                  className="rounded p-0.5 text-gray-400 hover:text-red-600"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <h3 className="text-sm font-semibold leading-snug text-gray-900">{p.titulo}</h3>
                        {p.cuerpo && (
                          <p
                            className={`mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-900 ${
                              abierto ? "" : "line-clamp-3"
                            }`}
                          >
                            {p.cuerpo}
                          </p>
                        )}
                        {p.autor && <p className="mt-1 text-[10px] text-gray-500">por {p.autor}</p>}
                      </>
                    )}

                    <button
                      onClick={() => abrir(p.id)}
                      className="mt-2 flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-800"
                    >
                      {abierto ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      {p.respuestas === 0
                        ? "Responder"
                        : `${p.respuestas} ${p.respuestas === 1 ? "respuesta" : "respuestas"}`}
                    </button>

                    {abierto && (
                      <div className="mt-2 border-t border-green-200 pt-2">
                        {reps.length > 0 && (
                          <div className="mb-2 space-y-2">
                            {reps.map((r) => (
                              <div key={r.id} className="rounded-md bg-white/60 px-2 py-1.5">
                                {editResp === r.id ? (
                                  <div>
                                    <textarea
                                      value={eRTexto}
                                      onChange={(e) => setERTexto(e.target.value)}
                                      rows={2}
                                      className="mb-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none"
                                    />
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => guardarResp(r)}
                                        className="rounded-md bg-green-600 px-2 py-0.5 text-xs text-white hover:bg-green-700"
                                      >
                                        Guardar
                                      </button>
                                      <button
                                        onClick={() => setEditResp(null)}
                                        className="rounded-md border border-gray-300 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-50"
                                      >
                                        Cancelar
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <p className="whitespace-pre-line text-sm leading-relaxed text-gray-900">
                                      {r.cuerpo}
                                    </p>
                                    <div className="mt-0.5 flex items-center justify-between">
                                      <p className="text-[10px] text-gray-500">
                                        {r.autor || "Anónimo"} · {formatFecha(r.created_at)}
                                      </p>
                                      {(r.esMio || admin) && (
                                        <div className="flex items-center gap-1">
                                          <button
                                            onClick={() => {
                                              setEditResp(r.id);
                                              setERTexto(r.cuerpo);
                                            }}
                                            aria-label="Editar respuesta"
                                            className="rounded p-0.5 text-gray-400 hover:text-green-700"
                                          >
                                            <Pencil className="h-3 w-3" />
                                          </button>
                                          <button
                                            onClick={() => eliminarResp(r)}
                                            aria-label="Eliminar respuesta"
                                            className="rounded p-0.5 text-gray-400 hover:text-red-600"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {user ? (
                          <div className="flex items-end gap-1">
                            <textarea
                              value={textoRespuesta}
                              onChange={(e) => setTextoRespuesta(e.target.value)}
                              placeholder="Escribí una respuesta…"
                              rows={2}
                              className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none"
                            />
                            <button
                              onClick={() => responder(p.id)}
                              disabled={respondiendo || !textoRespuesta.trim()}
                              aria-label="Enviar respuesta"
                              className="rounded-md bg-green-600 p-1.5 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                            >
                              {respondiendo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </button>
                          </div>
                        ) : (
                          <p className="text-[11px] text-gray-600">
                            <Link href="/login" className="font-semibold text-green-700 underline">
                              Iniciá sesión
                            </Link>{" "}
                            para responder.
                          </p>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
