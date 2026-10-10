/**
 * Textos da vitrine que mudam com frequência: perfis, passo a passo, bônus, avaliações e
 * perguntas. Preços e itens dos kits ficam em bundles.ts (e no /admin → Preços).
 */
import imgMedico from "@/assets/medico.webp";
import imgCuidarPais from "@/assets/cuidar-pais.webp";
import imgVidaSaudavel from "@/assets/vida-saudavel.webp";
import imgAcademia from "@/assets/academia.webp";
import imgDieta from "@/assets/dieta.webp";
import imgCasal from "@/assets/casal.webp";
import imgMaos from "@/assets/passo-maos.webp";
import imgAlcool from "@/assets/passo-alcool.webp";
import imgCapilar from "@/assets/passo-capilar.webp";
import imgAnotar from "@/assets/passo-anotar.webp";

/** "Para quem é": perfis de quem compra para usar em casa. */
export const PERSONAS = [
  {
    img: imgMedico,
    title: "Tem colesterol alto ou toma remédio",
    pain: "Você só sabe se o tratamento está funcionando quando faz exame, e isso acontece uma ou duas vezes por ano.",
    gain: "Acompanhe entre as consultas e leve os números para o seu médico.",
  },
  {
    img: imgCuidarPais,
    title: "Cuida dos pais",
    pain: "Levar pai ou mãe ao laboratório é um dia inteiro: transporte, fila, agulha e espera.",
    gain: "Meça em casa, no sofá, em 90 segundos. Sem tirar ninguém de casa.",
  },
  {
    img: imgVidaSaudavel,
    title: "Mudou a alimentação",
    pain: "Você cortou fritura, açúcar, começou a caminhar. Mas não sabe se está fazendo efeito.",
    gain: "Veja o triglicérides e o LDL mudarem. Número na tela motiva a continuar.",
  },
  {
    img: imgAcademia,
    title: "Treina e quer resultado de verdade",
    pain: "A balança não mostra o que acontece por dentro.",
    gain: "Acompanhe HDL, triglicérides e glicose junto com o treino.",
  },
  {
    img: imgDieta,
    title: "Está em dieta com nutricionista",
    pain: "Entre um retorno e outro, você fica no escuro.",
    gain: "Chegue na consulta com seus números do mês, não só com a balança.",
  },
  {
    img: imgCasal,
    title: "Tem infarto ou AVC na família",
    pain: "Histórico familiar pesa, e colesterol alto não dá sinal nenhum.",
    gain: "Fique de olho na família toda com o mesmo aparelho.",
  },
] as const;

/**
 * Passo a passo de uma medição, conforme o guia do usuário do CardioChek PA (PTS Diagnostics).
 * `img: null` = passo com o aparelho (foto oficial animada) ou ilustração.
 */
export const STEPS = [
  {
    img: null,
    device: "chip",
    title: "Prepare o aparelho",
    text: "Coloque o aparelho numa mesa firme, longe de sol direto. Encaixe no topo o chip MEMo que vem na caixa de tiras: ele ajusta o aparelho para aquele lote.",
  },
  {
    img: null,
    device: "strip",
    title: "Coloque a tira",
    text: "Encaixe a tira até o fim na entrada de baixo. Quando a tela mostrar APPLY SAMPLE, o aparelho está pronto para a gota.",
  },
  {
    img: imgMaos,
    title: "Lave e aqueça as mãos",
    text: "Lave com água morna e sabão e seque bem. Deixe o braço um pouco para baixo: isso ajuda o sangue a chegar na ponta do dedo.",
  },
  {
    img: imgAlcool,
    title: "Limpe com álcool",
    text: "Passe o lenço com álcool na ponta do dedo e espere secar por completo. Dedo molhado dilui a gota e altera o resultado.",
  },
  {
    img: null,
    illustration: "lancet",
    title: "Fure a lateral do dedo",
    text: "Use uma lanceta descartável na lateral da ponta do dedo, não no centro nem perto da unha. Dói menos e a gota se forma melhor.",
  },
  {
    img: imgCapilar,
    title: "Colete a segunda gota",
    text: "Limpe a primeira gota com gaze. Com o dedo para baixo, encoste o capilar na segunda gota até o sangue chegar à faixa preta, sem bolhas.",
  },
  {
    img: null,
    device: "result",
    title: "Aplique e espere 90 segundos",
    text: "Segure o capilar sobre a janela da tira, sem encostar, e aperte o êmbolo devagar. Em cerca de 90 segundos os resultados aparecem na tela.",
  },
  {
    img: imgAnotar,
    title: "Anote e leve ao médico",
    text: "O aparelho guarda até 30 resultados na memória, com data e hora. Anote também e leve o histórico na próxima consulta.",
  },
] as const;

/** Itens que acompanham os kits Essencial e Família. Entregue tudo o que estiver aqui. */
export const BONUS = [
  { n: "Videoaula: como medir sem erro", d: "passo a passo filmado, do chip à leitura", v: 97 },
  {
    n: "Guia: o que cada número significa",
    d: "colesterol, HDL, LDL, triglicérides e glicose",
    v: 67,
  },
  { n: "Planilha de acompanhamento", d: "para anotar e levar ao médico", v: 47 },
  { n: "Suporte no WhatsApp", d: "tire dúvidas de uso com a nossa equipe", v: 97 },
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
    q: "Dá para usar sozinho, em casa?",
    a: "Dá. São poucos passos: lavar as mãos, colocar a tira, furar o dedo com a lanceta, aplicar a gota e ler o resultado. Mandamos uma videoaula e você tem suporte no WhatsApp se tiver dúvida.",
  },
  {
    q: "O resultado é confiável?",
    a: "O CardioChek PA atende às diretrizes do NCEP (National Cholesterol Education Program) para exatidão e precisão, e a tira de painel lipídico tem certificação CRMLN para colesterol total e HDL. Para manter a confiabilidade, use a solução controle a cada caixa nova de tiras.",
  },
  {
    q: "Substitui o exame de laboratório e o médico?",
    a: "Não. Ele serve para você acompanhar seus números entre as consultas. Quem interpreta, define a sua meta e decide o tratamento é o seu médico. Leve as suas anotações para ele.",
  },
  {
    q: "Dói?",
    a: "É uma picada na ponta do dedo com lanceta, como a de quem mede glicose. Bem diferente de tirar sangue da veia.",
  },
  {
    q: "Precisa de jejum?",
    a: "Para o perfil completo, o fabricante recomenda jejum de 12 horas (só água), igual ao exame de laboratório: o triglicérides muda bastante depois de comer. Siga também a orientação do seu médico e meça sempre nas mesmas condições, para comparar um mês com o outro.",
  },
  {
    q: "Quantas vezes posso medir?",
    a: "Cada tira é uma medição. Com o Kit Essencial você tem 25 medições, com o Kit Família, 75. Dá para a família toda usar o mesmo aparelho, cada um com a sua tira.",
  },
  {
    q: "As tiras vão para a geladeira?",
    a: "Não. As tiras ficam em temperatura ambiente, longe do sol e da umidade.",
  },
  {
    q: "Como funciona o pagamento e a entrega?",
    a: "O pagamento é por Pix, com aprovação na hora. Despachamos em até 1 dia útil, com frete grátis e código de rastreio.",
  },
] as const;
