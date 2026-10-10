import { brand } from "@/lib/brand";

/** Kit por quantidade de glicosímetros (1 / 2 / 3 unidades) */
export type BundleId = "1" | "2" | "3";

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Valor mínimo (produtos, sem frete) para liberar o frete grátis. */
export const FREE_SHIPPING_MIN = 87.9;
export const FREE_SHIPPING_LABEL = `Frete grátis em compras acima de ${brl(FREE_SHIPPING_MIN)}`;

export const isFreeShippingEligible = (subtotal: number) => subtotal >= FREE_SHIPPING_MIN;

/** Selo de frete por kit: grátis quando o próprio kit já passa do mínimo. */
export const bundleShippingLabel = (b: { price: number }) =>
  isFreeShippingEligible(b.price) ? "Frete grátis para todo o Brasil" : FREE_SHIPPING_LABEL;

export type Bundle = {
  id: BundleId;
  name: string;
  units: number;
  price: number;
  compareAtPrice?: number;
  /** Texto curto abaixo do preço (ex.: valor por unidade). */
  priceNote: string;
  description: string;
  checkoutProductName: string;
  checkoutProductDescription: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
  savings?: string;
};

const PRODUCT_SUMMARY =
  "glicosímetro que mede a glicose no sangue (mg/dL) pelo sensor no dedo, sem furar e sem agulha, e também mostra os batimentos cardíacos, com tela colorida e operação por um botão";

export const bundles: Bundle[] = [
  {
    id: "1",
    name: "1 Glicosímetro",
    units: 1,
    price: 57.9,
    priceNote: "Para uso pessoal",
    description: "1 glicosímetro GlicoMax · glicose e batimentos",
    checkoutProductName: `${brand.productName} — 1 unidade`,
    checkoutProductDescription: `${brand.productName}: ${PRODUCT_SUMMARY}. ${FREE_SHIPPING_LABEL}.`,
    checkoutUrl: "/checkout?plano=1",
  },
  {
    id: "2",
    name: "2 Glicosímetros",
    units: 2,
    price: 87.9,
    // "De": 2 unidades compradas separadas (2 × R$ 57,90).
    compareAtPrice: 115.8,
    priceNote: `${brl(87.9 / 2)} cada`,
    description: "2 glicosímetros GlicoMax · um para você, outro para quem você cuida",
    checkoutProductName: `${brand.productName} — 2 unidades`,
    checkoutProductDescription: `${brand.productName} (2 unidades): ${PRODUCT_SUMMARY}. Frete grátis para todo o Brasil.`,
    checkoutUrl: "/checkout?plano=2",
    featured: true,
    badge: "Mais vendido",
    savings: "Economize R$ 27,90",
  },
  {
    id: "3",
    name: "3 Glicosímetros",
    units: 3,
    price: 119.9,
    // "De": 3 unidades compradas separadas (3 × R$ 57,90).
    compareAtPrice: 173.7,
    priceNote: `${brl(119.9 / 3)} cada`,
    description: "3 glicosímetros GlicoMax · kit para a família",
    checkoutProductName: `${brand.productName} — 3 unidades`,
    checkoutProductDescription: `${brand.productName} (3 unidades): ${PRODUCT_SUMMARY}. Frete grátis para todo o Brasil.`,
    checkoutUrl: "/checkout?plano=3",
    badge: "Kit família",
    savings: "Economize R$ 53,80",
  },
];

/** Kits visíveis na loja. */
export const availableBundles = bundles;

export function parseBundleId(raw: string | undefined): BundleId | undefined {
  if (raw === "1" || raw === "2" || raw === "3") return raw;
  return undefined;
}

export function getBundle(id: string | undefined): Bundle {
  const parsed = parseBundleId(id);
  return availableBundles.find((b) => b.id === parsed) ?? availableBundles[0]!;
}

export function getCheckoutUrl(id: string | undefined) {
  return getBundle(id).checkoutUrl;
}

/** Próximo kit para upsell (1→2, 2→3) */
export function getUpgradeBundle(current: Bundle): Bundle | null {
  if (current.id === "1") return availableBundles.find((b) => b.id === "2") ?? null;
  if (current.id === "2") return availableBundles.find((b) => b.id === "3") ?? null;
  return null;
}

/** "1 unidade" / "3 unidades" */
export const unitsLabel = (units: number) => `${units} ${units > 1 ? "unidades" : "unidade"}`;

export function bundleDurationLabel(bundle: Bundle) {
  return `${unitsLabel(bundle.units)} · glicose e batimentos`;
}
