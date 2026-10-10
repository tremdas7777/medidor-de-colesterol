import { brand } from "@/lib/brand";

/** Kits: só o aparelho, Kit Essencial (25 tiras) e Kit Família (75 tiras). */
export type BundleId = "1" | "2" | "3";

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Valor mínimo (produtos, sem frete) para liberar o frete grátis. Todos os kits passam dele. */
export const FREE_SHIPPING_MIN = 0;
export const FREE_SHIPPING_LABEL = "Frete grátis para todo o Brasil";

export const isFreeShippingEligible = (subtotal: number) => subtotal >= FREE_SHIPPING_MIN;

/** Selo de frete por kit. */
export const bundleShippingLabel = (_b: { price: number }) => FREE_SHIPPING_LABEL;

export type Bundle = {
  id: BundleId;
  name: string;
  /** Nome curto (tabela de comparação). */
  short: string;
  /** Analisadores no kit (usado em relatórios e no upsell). */
  units: number;
  /** Tiras de painel lipídico que vão no kit. */
  strips: number;
  price: number;
  compareAtPrice?: number;
  /** Texto curto abaixo do preço. */
  priceNote: string;
  description: string;
  /** Para quem é o kit (tabela de comparação). */
  audience: string;
  checkoutProductName: string;
  checkoutProductDescription: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
  /** Itens da tabela de comparação. */
  includes: {
    lancetas: boolean;
    controle: boolean;
    maleta: boolean;
    treinamento: boolean;
    artes: boolean;
    planilha: boolean;
    ficha: boolean;
    suporte: boolean;
  };
};

const PRODUCT_SUMMARY =
  "analisador portátil que mede colesterol total, HDL, triglicérides e glicose com uma gota de sangue capilar e calcula LDL e razão CT/HDL, com resultado em até 90 segundos";

export const bundles: Bundle[] = [
  {
    id: "1",
    name: "Só o aparelho",
    short: "Só o aparelho",
    units: 1,
    strips: 0,
    price: 5240,
    compareAtPrice: 7490,
    priceNote: "Para quem já tem tiras",
    description: "Analisador, para quem já tem tiras e lancetas",
    audience: "Já tem tiras em casa",
    checkoutProductName: brand.productName,
    checkoutProductDescription: `${brand.productName}: ${PRODUCT_SUMMARY}.`,
    checkoutUrl: "/checkout?plano=1",
    includes: {
      lancetas: false,
      controle: false,
      maleta: false,
      treinamento: true,
      artes: false,
      planilha: false,
      ficha: false,
      suporte: false,
    },
  },
  {
    id: "2",
    name: "Kit Essencial",
    short: "Kit Essencial",
    units: 1,
    strips: 25,
    price: 6490,
    compareAtPrice: 9990,
    priceNote: "Aparelho + 25 tiras + lancetas",
    description: "Aparelho + 25 tiras + lancetas e capilares",
    audience: "Para você acompanhar",
    checkoutProductName: `${brand.productName} — Kit Essencial`,
    checkoutProductDescription: `${brand.productName} com 25 tiras de painel lipídico, lancetas, capilares e solução controle: ${PRODUCT_SUMMARY}.`,
    checkoutUrl: "/checkout?plano=2",
    featured: true,
    badge: "Mais escolhido",
    includes: {
      lancetas: true,
      controle: true,
      maleta: false,
      treinamento: true,
      artes: true,
      planilha: true,
      ficha: true,
      suporte: false,
    },
  },
  {
    id: "3",
    name: "Kit Família",
    short: "Kit Família",
    units: 1,
    strips: 75,
    price: 8990,
    compareAtPrice: 14990,
    priceNote: "Aparelho + 75 tiras + estojo",
    description: "Aparelho + 75 tiras + estojo, para a casa toda",
    audience: "Para a casa toda",
    checkoutProductName: `${brand.productName} — Kit Família`,
    checkoutProductDescription: `${brand.productName} com 75 tiras de painel lipídico, estojo, lancetas, capilares e solução controle: ${PRODUCT_SUMMARY}.`,
    checkoutUrl: "/checkout?plano=3",
    badge: "Melhor custo por teste",
    includes: {
      lancetas: true,
      controle: true,
      maleta: true,
      treinamento: true,
      artes: true,
      planilha: true,
      ficha: true,
      suporte: true,
    },
  },
];

/** Kits visíveis na loja. */
export const availableBundles = bundles;

/** Kit que abre selecionado na loja. */
export const DEFAULT_BUNDLE_ID: BundleId = "2";

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
  return bundle.strips ? `Analisador + ${bundle.strips} tiras` : "Somente o analisador";
}
