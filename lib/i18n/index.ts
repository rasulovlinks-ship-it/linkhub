import { uz } from "./uz";
import { ru } from "./ru";
import type { Dict, Lang } from "./uz";

export type { Dict, Lang };

export function getDict(lang: Lang): Dict {
  return lang === "ru" ? ru : uz;
}
