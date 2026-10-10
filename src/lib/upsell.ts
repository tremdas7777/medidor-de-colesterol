import type { Bundle } from "@/lib/bundles";

/**
 * Oferta principal da tela pós-compra (Pix): impressora de resultados CardioChek/PTS Connect,
 * acessório oficial do CardioChek PA (imprime em papel ou etiqueta, direto da memória do aparelho).
 * Diferente do order bump (tiras). Preço e preço "de" editáveis no /admin → Preços.
 * O id interno da oferta continua "kit" (item físico, vai no mesmo envio e para o rastreio).
 */
export const UPSELL_PACK = {
  name: "Impressora de resultados",
  fullName: "Impressora CardioChek/PTS Connect",
  /** Preço cobrado. */
  price: 790,
  /** Preço de tabela (riscado). */
  listPrice: 1190,
};

/** Desconto da oferta em relação ao preço de tabela (0 a 1). */
export const upsellDiscount = () =>
  UPSELL_PACK.listPrice > UPSELL_PACK.price ? 1 - UPSELL_PACK.price / UPSELL_PACK.listPrice : 0;

/** Nome enviado ao gateway na cobrança do upsell (genérico). */
export const UPSELL_GATEWAY_NAME = "Pedido CardioMed";

export const upsellPrice = (_bundle: Bundle) => UPSELL_PACK.price;

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
};

/** Envio expresso: página própria depois da tela de ofertas (cobrança separada). */
export const EXPRESS_SHIPPING = {
  name: "Envio expresso",
  /** Nome enviado ao gateway. */
  gatewayName: "Envio expresso",
  price: 49.9,
};

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
        label: `${UPSELL_PACK.name} ${Math.round(upsellDiscount() * 100)}% OFF`,
      };
    const o = p === "seguro" ? SHIPPING_INSURANCE : EXPRESS_SHIPPING;
    return { product: p, title: o.gatewayName, price: o.price, label: o.name };
  });
  const total = Math.round(items.reduce((s, i) => s + i.price * 100, 0)) / 100;
  return { products, items, total, label: items.map((i) => i.label).join(" + ") };
}
