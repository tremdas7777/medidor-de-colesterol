/** Marca da loja — CardioMed (revenda do analisador CardioChek PA) */
export const brand = {
  name: "CardioMed",
  productName: "Analisador CardioChek PA",
  /** Descrição genérica enviada ao gateway na cobrança (sem detalhes do produto). */
  chargeDescription: "Pedido CardioMed",
  tagline: "Perfil lipídico e glicose em até 90 segundos",
  taglineShort: "Lipidograma com uma gota de sangue",
  /**
   * Dados da empresa — preencha antes de publicar. Campos vazios ficam ocultos
   * no rodapé, no contato e nas políticas.
   */
  company: {
    legalName: "",
    cnpj: "",
  },
  /** Registro ANVISA do produto revendido (aparece na página do produto). */
  anvisa: "",
  email: "",
  /** Domínio da loja (ex.: "https://cardiomed.com.br"), sem barra no final. Usado no sitemap e no og:image. */
  siteUrl: "",
  whatsapp: {
    /** Número em E.164 (DDI + DDD + número), sem símbolos */
    phoneE164: "",
    display: "",
  },
  colors: {
    primary: "#16181b",
    primaryDark: "#000000",
    primaryDeep: "#000000",
    onPrimary: "#ffffff",
    surfaceTint: "#faf9f6",
  },
};
