// Administradores habilitados para gestionar Novedades.
// El login usa el correo electrónico como "username", así que la lista
// contiene correos. La comparación es sin distinguir mayúsculas/minúsculas.
//
// Para agregar o quitar administradores, editá esta lista.
export const ADMIN_EMAILS: string[] = [
  "juanfiosa@gmail.com",
  "cecilia.suarez@mi.unc.edu.ar",
  "dramartajulia@gmail.com",
  "valentina.insua.chasseur@mi.unc.edu.ar",
  "milagroskekutt@mi.unc.edu.ar",
  "kekuttmilagros@hotmail.com",
];

export function isAdmin(user: { username?: string } | null | undefined): boolean {
  const email = user?.username?.trim().toLowerCase();
  if (!email) return false;
  return ADMIN_EMAILS.some((e) => e.trim().toLowerCase() === email);
}
