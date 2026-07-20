const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(source) {
  if (!source || /^(?:https?:|data:|blob:)/i.test(source)) return source;

  const normalized = source.startsWith("/") ? source : `/${source}`;
  if (!basePath || normalized === basePath || normalized.startsWith(`${basePath}/`)) {
    return normalized;
  }

  return `${basePath}${normalized}`;
}
