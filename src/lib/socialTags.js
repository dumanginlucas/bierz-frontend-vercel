// Frontend-only social tags (admin-managed)
// Persisted in localStorage so you can create / delete / disable tags without backend.

export const DEFAULT_SOCIAL_TAGS = [
  { key: "destaque", label: "Destaque", enabled: true },
  { key: "mais_vendidos", label: "Mais vendidos", enabled: true },
  { key: "mais_pedido_semana", label: "Mais pedido da semana", enabled: true },
  { key: "preferido_aniversarios", label: "Preferido para aniversários", enabled: true },
  { key: "preferido_churrascos", label: "Preferido para churrascos", enabled: true },
  { key: "perfeito_eventos", label: "Perfeito para eventos", enabled: true },
  { key: "escolha_da_casa", label: "Escolha da casa", enabled: true },
];

const LS_KEY = "bierz_social_tags_v1";

export function slugifyTagKey(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
}

export function readSocialTags() {
  try {
    if (typeof window === "undefined") return DEFAULT_SOCIAL_TAGS;
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_SOCIAL_TAGS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_SOCIAL_TAGS;
    // sanitize
    const cleaned = parsed
      .map((t) => ({
        key: slugifyTagKey(t?.key),
        label: String(t?.label || "").trim(),
        enabled: t?.enabled !== false,
      }))
      .filter((t) => t.key && t.label);

    return cleaned.length ? cleaned : DEFAULT_SOCIAL_TAGS;
  } catch {
    return DEFAULT_SOCIAL_TAGS;
  }
}

export function writeSocialTags(tags) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(tags));
  } catch {
    // ignore
  }
}

export function getEnabledSocialTags() {
  return readSocialTags().filter((t) => t.enabled !== false);
}

export function getSocialTagLabel(key) {
  if (!key) return null;
  const tags = readSocialTags();
  const found = tags.find((t) => t.key === key);
  return found?.label || null;
}
