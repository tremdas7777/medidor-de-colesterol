import imgVivicap from "@/assets/vivicap.webp";

/**
 * Order bumps do checkout (ofertas logo acima do botão de finalizar).
 * Preços usados no servidor — o cliente só exibe. Lista vazia = checkout sem bump.
 */
export type OrderBumpItem = {
  id: string;
  name: string;
  fullName: string;
  /** Nome enviado ao gateway (fatura). */
  gatewayName: string;
  price: number;
  /** Preço "de" (riscado). Sem ele, a oferta mostra só o preço. */
  compareAt?: number;
  img: string;
  /** Texto de venda exibido no checkout. */
  question: string;
  body: string;
  benefits: string[];
  /** Texto do checkbox; `{preco}` vira o preço formatado. */
  cta: string;
};

export type BumpId = OrderBumpItem["id"];

export const ORDER_BUMPS: readonly OrderBumpItem[] = [
  {
    id: "vivicap",
    name: "ViviCap",
    fullName: "ViviCap — tampa inteligente para caneta de insulina",
    gatewayName: "GlicoMax ViviCap",
    price: 47.9,
    compareAt: 89.9,
    img: imgVivicap,
    question: "Usa caneta de insulina? Proteja ela do calor e do frio.",
    body: "O ViviCap é uma tampa que encaixa na caneta de insulina e mantém a temperatura segura por horas — sem geladeira, sem bolsa térmica e sem gelo. Serve em todas as canetas e cabe no bolso.",
    benefits: [
      "Mantém a insulina na temperatura segura",
      "Serve em todas as canetas de insulina",
      "Sem geladeira, sem gelo, sem bateria",
    ],
    cta: "Sim! Quero o ViviCap por + {preco}",
  },
];

/** Bumps escolhidos, na ordem do checkout (ids repetidos ou desconhecidos são ignorados). */
export const getBumps = (ids: readonly string[]) => ORDER_BUMPS.filter((b) => ids.includes(b.id));

/** Soma dos bumps escolhidos, em reais. */
export const bumpsTotal = (ids: readonly string[]) =>
  Math.round(getBumps(ids).reduce((s, b) => s + b.price * 100, 0)) / 100;
