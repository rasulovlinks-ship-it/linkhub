import type { BiText, ScentProduct } from "@/lib/types";

/** One product as the ownlink shop's GET /api/products returns it (the fields used here) */
export type ShopItem = {
  id: number;
  name_uz: string;
  name_ru: string | null;
  brand: string | null;
  price: number;
  sizes: string[];
  size_prices: Record<string, number>;
  images: string[];
};

const som = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, " ");

/** "10 ml · 480 000 so'm"; "250 ml dan · 230 000 so'm" when there are several sizes; plain price without sizes */
function priceText(p: ShopItem): BiText {
  const options = p.sizes.map((size) => [size, p.size_prices[size] ?? p.price] as const);
  if (!options.length) return { uz: `${som(p.price)} so'm`, ru: `${som(p.price)} сум` };
  const [size, price] = options.reduce((a, b) => (b[1] < a[1] ? b : a));
  const ruSize = size.replace(/ ml$/i, " мл").replace(/ l$/i, " л").replace(/ g$/i, " г");
  const several = options.length > 1;
  return {
    uz: `${size}${several ? " dan" : ""} · ${som(price)} so'm`,
    ru: `${several ? "от " : ""}${ruSize} · ${som(price)} сум`,
  };
}

/** "Dior Sauvage" under the brand "Dior" → "Sauvage" (the card shows the brand above the name) */
function withoutBrand(name: string, brand: string | null): string {
  if (!brand || !name.toLowerCase().startsWith(brand.toLowerCase() + " ")) return name;
  const rest = name.slice(brand.length + 1).trim();
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

/** A shop product as a shelf card; photos come from the shop, uploaded ones as their small copy */
export function fromShop(p: ShopItem, shop: string): ScentProduct {
  const image = (p.images[0] ?? "").replace(/^\/img\/(\d+)(\.\w+)$/, "/img/$1-s$2");
  return {
    id: String(p.id),
    photoUrl: image.startsWith("http") ? image : `${shop}${image}`,
    brand: p.brand ?? "",
    name: { uz: withoutBrand(p.name_uz, p.brand), ru: withoutBrand(p.name_ru || p.name_uz, p.brand) },
    price: priceText(p),
    url: `${shop}/p/${p.id}`,
  };
}

/** The shop's starred products, or null when the shop can't be reached */
export async function fetchStarred(source: { api: string; shop: string }, init?: RequestInit): Promise<ScentProduct[] | null> {
  try {
    const res = await fetch(source.api, { ...init, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const { items } = (await res.json()) as { items: ShopItem[] };
    return items.map((p) => fromShop(p, source.shop));
  } catch {
    return null;
  }
}
