const EXTERNAL_PREFIXES = ['http://', 'https://', 'data:', 'blob:', 'mailto:', 'tel:', '#'];

/**
 * Resolve a public asset path against the active Vite base URL.
 * Keeps the portfolio working both in dev (`/`) and on GitHub Pages (`/portfolio/`).
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (EXTERNAL_PREFIXES.some((prefix) => path.startsWith(prefix))) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const relativePath = path.startsWith('/') ? path.slice(1) : path;

  return `${normalizedBase}${relativePath}`;
}
