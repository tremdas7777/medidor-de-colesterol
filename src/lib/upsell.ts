import type { Bundle } from "@/lib/bundles";

/** Upsell pós-compra no Pix: pacote de 50 tiras de painel lipídico com desconto. */
export const UPSELL_DISCOUNT = 0.4;

/** Pacote oferecido na tela pós-compra. */
export const UPSELL_PACK = {
  strips: 50,
  name: "50 tiras de painel lipídico",
  /** Preço de tabela (riscado). */
  listPrice: 2980,
} as const;

/** Nome enviado ao gateway na cobrança do upsell (genérico). */
export const UPSELL_GATEWAY_NAME = "Pedido CardioMed";

export const upsellPrice = (_bundle: Bundle) =>
  Math.round(UPSELL_PACK.listPrice * (1 - UPSELL_DISCOUNT) * 100) / 100;

/** Ofertas da tela pós-compra. */
export const UPSELL_PRODUCTS = ["kit", "seguro", "expresso"] as const;
export type UpsellProduct = (typeof UPSELL_PRODUCTS)[number];

/** Seguro de entrega (pós-compra): reenvio ou reembolso em caso de extravio ou dano no transporte. */
export const SHIPPING_INSURANCE = {
  name: "Seguro de entrega",
  fullName: "Seguro de entrega — reenvio ou reembolso",
  /** Nome enviado ao gateway. */
  gatewayName: "Seguro de entrega",
  price: 89.9,
} as const;

/** Envio expresso: página própria depois da tela de ofertas (cobrança separada). */
export const EXPRESS_SHIPPING = {
  name: "Envio expresso",
  /** Nome enviado ao gateway. */
  gatewayName: "Envio expresso",
  price: 49.9,
} as const;

/**
 * O que o cliente escolheu na tela pós-compra, numa cobrança só (preços do servidor).
 * Itens repetidos ou desconhecidos são ignorados; a ordem segue UPSELL_PRODUCTS.
 */
export function upsellSelection(bundle: Bundle, chosen: readonly string[]) {
  const products = UPSELL_PRODUCTS.filter((p) => chosen.includes(p));
  const items = products.map((p) => {
    if (p === "kit")
      return {
        product: p,
        title: UPSELL_GATEWAY_NAME,
        price: upsellPrice(bundle),
        label: `${UPSELL_PACK.name} ${Math.round(UPSELL_DISCOUNT * 100)}% OFF`,
      };
    const o = p === "seguro" ? SHIPPING_INSURANCE : EXPRESS_SHIPPING;
    return { product: p, title: o.gatewayName, price: o.price, label: o.name };
  });
  const total = Math.round(items.reduce((s, i) => s + i.price * 100, 0)) / 100;
  return { products, items, total, label: items.map((i) => i.label).join(" + ") };
}
