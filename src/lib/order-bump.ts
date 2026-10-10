import imgTiras from "@/assets/tiras-lipid-panel.webp";

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
    id: "tiras25",
    name: "+25 tiras",
    fullName: "25 tiras de painel lipídico CardioChek PA",
    gatewayName: "Pedido CardioMed",
    price: 990,
    compareAt: 1490,
    img: imgTiras,
    question: "Garanta as próximas medições com desconto.",
    body: "Quem começa a medir em casa quer acompanhar a evolução: depois de mudar a alimentação, de começar a caminhar, de ajustar o remédio. Leve mais 25 tiras agora, no mesmo envio, com o desconto que só aparece nesta tela.",
    benefits: [
      "Mais 25 medições completas de colesterol",
      "Mesmo envio do aparelho, sem frete extra",
      "Não precisa de geladeira",
    ],
    cta: "Sim! Quero +25 tiras por + {preco}",
  },
];

/** Bumps escolhidos, na ordem do checkout (ids repetidos ou desconhecidos são ignorados). */
export const getBumps = (ids: readonly string[]) => ORDER_BUMPS.filter((b) => ids.includes(b.id));

/** Soma dos bumps escolhidos, em reais. */
export const bumpsTotal = (ids: readonly string[]) =>
  Math.round(getBumps(ids).reduce((s, b) => s + b.price * 100, 0)) / 100;
