/** Base URL למטא‑דטה (Open Graph, canonical וכו’) וסכמת JSON-LD. */
export function getSiteOrigin(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined);

  if (raw) {
    try {
      const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      const trimmed = withScheme.replace(/\/+$/, "");
      return new URL(trimmed);
    } catch {
      /* כתובת לא חוקית — נופלים ל־localhost */
    }
  }

  return new URL("http://localhost:3000");
}
