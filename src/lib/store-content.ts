/**
 * Textos da vitrine que mudam com frequência: perfis, bônus, avaliações e perguntas.
 * Preços e itens dos kits ficam em bundles.ts.
 */

/** Abas "Como ele se paga no seu tipo de atendimento". */
export const PROFILES = [
  {
    tab: "Farmácia",
    pain: "O cliente entra, compra o remédio e vai embora. A margem do produto é apertada e não há serviço que gere recorrência.",
    how: "Monte um check-up de balcão com valor fixo. Cada medição vira atendimento farmacêutico, indicação de produto e um motivo para o cliente voltar no mês seguinte.",
    quote: "O teste vira a porta de entrada para o atendimento farmacêutico.",
  },
  {
    tab: "Clínica e consultório",
    pain: "O paciente sai com o pedido de exame e o caso fica parado até ele voltar, quando volta. A agenda fica cheia de retornos só para ver resultado.",
    how: "Faça o lipidograma durante a consulta, defina a conduta na hora e use o retorno para acompanhar, não para ler papel.",
    quote: "Decisão na primeira consulta. Retorno com evolução.",
  },
  {
    tab: "Nutrição",
    pain: "O paciente segue o plano, não sente diferença e cancela no segundo ou terceiro mês.",
    how: "Meça no primeiro atendimento e a cada retorno. Mostrar a queda de triglicérides e LDL em números é o que sustenta a adesão.",
    quote: "Paciente que vê o número mudar não abandona o plano.",
  },
  {
    tab: "Academia e personal",
    pain: "Avaliação física igual à de todo mundo e concorrência por preço com a academia do bairro.",
    how: "Inclua o perfil metabólico na avaliação e reavalie a cada ciclo. É um diferencial concreto para planos premium e acompanhamento.",
    quote: "Avaliação com dado de saúde justifica um ticket maior.",
  },
  {
    tab: "Saúde ocupacional",
    pain: "Levar dezenas de colaboradores ao laboratório custa caro e toma dias de logística.",
    how: "Faça a triagem dentro da empresa, em uma manhã, com baixo custo por teste. Ideal para SIPAT e programas de qualidade de vida.",
    quote: "A triagem vai até o colaborador, não o contrário.",
  },
] as const;

/** Itens que acompanham os kits Inicial e Profissional. Entregue tudo o que estiver aqui. */
export const BONUS = [
  {
    n: "Treinamento de implantação por vídeo",
    d: "uso, controle de qualidade e atendimento",
    v: 497,
  },
  { n: "Pacote de artes para divulgação", d: "posts para Instagram e cartaz de balcão", v: 297 },
  { n: "Planilha de precificação e controle", d: "custo por teste, margem e histórico", v: 147 },
  { n: "Modelo de ficha de resultado", d: "para entregar ao paciente com sua marca", v: 97 },
] as const;

export type Review = {
  name: string;
  role: string;
  stars: number;
  date: string;
  text: string;
};

/**
 * Avaliações REAIS de clientes. Enquanto a lista estiver vazia, a seção e as estrelas
 * não aparecem na loja. Nunca publique depoimento inventado.
 */
export const REVIEWS: Review[] = [];

export const FAQ = [
  {
    q: "O resultado é confiável?",
    a: "O CardioChek PA atende às diretrizes do NCEP (National Cholesterol Education Program) para exatidão e precisão, e a tira de painel lipídico tem certificação CRMLN para colesterol total e HDL. Para manter a confiabilidade, recomendamos rodar a solução controle a cada novo lote de tiras.",
  },
  {
    q: "Vale a pena para quem atende pouco?",
    a: "Na maioria dos casos, sim. Com agenda pequena, cada paciente que abandona o acompanhamento pesa mais no faturamento. Use a calculadora da página com seus números: mesmo com poucos testes por semana o aparelho costuma se pagar em alguns meses.",
  },
  {
    q: "Precisa de jejum?",
    a: "A necessidade de jejum segue a orientação clínica de cada caso, como no exame laboratorial. A diferença é que, com o resultado na hora, você não depende do paciente voltar outro dia.",
  },
  {
    q: "As tiras vão para a geladeira?",
    a: "Não. As tiras de teste ficam em temperatura ambiente, o que facilita o uso no consultório e em ações externas.",
  },
  {
    q: "Onde compro tiras de reposição?",
    a: "Aqui na loja. Quem já comprou o aparelho tem condição especial na recompra de tiras, lancetas e solução controle.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Despachamos em até 1 dia útil depois da confirmação do pagamento, com código de rastreio. Você acompanha tudo na página de rastreio.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "O pagamento é por Pix. O código é gerado na hora, vale por 30 minutos e a aprovação é imediata, então o pedido já entra para separação.",
  },
  {
    q: "Emitem nota fiscal para CNPJ?",
    a: "Sim. Todo pedido sai com nota fiscal. O Pix é feito no CPF de quem paga; se quiser a nota no CNPJ da empresa, é só avisar no atendimento depois da compra.",
  },
] as const;
