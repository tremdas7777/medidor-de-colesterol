import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { availableBundles, brl, type Bundle } from "@/lib/bundles";
import { brand } from "@/lib/brand";
import { BONUS, FAQ, PERSONAS, REVIEWS, STEPS } from "@/lib/store-content";
import { trackCheckoutClick } from "@/lib/analytics";
import { getSiteSettings } from "@/lib/site-settings.functions";
import imgPensativo from "@/assets/pensativo.webp";
import imgMedico from "@/assets/medico.webp";
import { CountUp, Device, useInView } from "./fx";

export const off = (b: Bundle) =>
  b.compareAtPrice ? Math.round((1 - b.price / b.compareAtPrice) * 100) : 0;

export function goToCheckout(b: Bundle, source: string) {
  trackCheckoutClick({ source, bundleId: b.id, bundleName: b.name, value: b.price });
  window.location.href = b.checkoutUrl;
}

/** Página do produto com o kit já selecionado (botões de compra da home). */
export const productUrl = (b: Bundle) => `/produto?plano=${b.id}`;
export function goToProduct(b: Bundle) {
  window.location.href = productUrl(b);
}

/** Destino dos botões de compra: na home vai para o produto; no produto, para o checkout. */
export type BuyTarget = "product" | "checkout";
const buy = (target: BuyTarget, b: Bundle, source: string) =>
  target === "product" ? goToProduct(b) : goToCheckout(b, source);

export const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** Custo por medição do kit (tiras inclusas). */
const perTest = (b: Bundle) => (b.strips ? b.price / b.strips : null);

export function Credentials() {
  return (
    <div className="creds">
      <div className="wrap">
        <div>
          <b>Diretrizes NCEP</b>Critérios de exatidão e precisão para colesterol
        </div>
        <div>
          <b>Certificação CRMLN</b>Colesterol total e HDL na tira de painel lipídico
        </div>
        <div>
          <b>1 gota, 90 segundos</b>Sem agulha na veia, sem esperar dias
        </div>
        <div>
          <b>Tiras sem geladeira</b>Guardadas em temperatura ambiente
        </div>
      </div>
    </div>
  );
}

/* ---------- A dor ---------- */
export function Pain() {
  return (
    <section className="sec" id="problema">
      <div className="wrap problem">
        <div className="stick">
          <figure className="pain-photo" data-reveal>
            <img src={imgPensativo} alt="Homem pensativo na cozinha de casa" loading="lazy" />
            <figcaption>"Faço o exame quando der tempo."</figcaption>
          </figure>
        </div>
        <div>
          <span className="label" data-reveal>
            O problema
          </span>
          <h2 className="h2" data-reveal>
            Colesterol alto não dói. <em>Não avisa.</em> E fica para depois.
          </h2>
          <p className="lead" data-reveal>
            Você só olha para ele quando o médico pede o exame, uma vez por ano, se lembrar. Até lá,
            são meses sem saber se a dieta, o remédio ou a caminhada estão fazendo efeito.
          </p>
          <ol className="plist" style={{ marginTop: 32 }}>
            {[
              [
                "O exame que sempre fica para depois",
                "Pedir guia, marcar horário, sair de casa, pegar fila, tirar sangue da veia e esperar dias pelo resultado. Não é à toa que a gente adia.",
              ],
              [
                "Meses no escuro",
                "Você mudou a alimentação, começou a caminhar, tomou o remédio certinho. Mas só vai saber se funcionou na próxima consulta.",
              ],
              [
                "Medo de agulha",
                "Para muita gente, a punção na veia é o motivo de não fazer o exame. Aqui é uma picada na ponta do dedo.",
              ],
              [
                "Cuidar de quem você ama dá trabalho",
                "Levar pai ou mãe ao laboratório toma a manhã inteira, às vezes o dia.",
              ],
              [
                "Doença do coração não manda aviso",
                "Doenças cardiovasculares são a principal causa de morte no Brasil, e o colesterol alto costuma passar anos sem nenhum sintoma.",
              ],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
                <div>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Laboratório × CardioChek (barras animadas) ---------- */
export function Race() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  return (
    <section className="sec" id="tempo">
      <div className="wrap">
        <span className="label" data-reveal>
          Faça a conta do seu tempo
        </span>
        <h2 className="h2" data-reveal>
          Do jeito de sempre, são dias. Com o CardioChek, 90 segundos.
        </h2>
        <div ref={ref} className={`race ${seen ? "in" : ""}`}>
          <div className="race-row">
            <div>
              <h4>Laboratório</h4>
              <small>do pedido ao resultado</small>
            </div>
            <div>
              <div className="race-bar lab">
                <b>2 a 5 dias</b>
              </div>
              <div className="race-steps">
                {[
                  "pedir a guia",
                  "agendar",
                  "deslocamento",
                  "fila",
                  "agulha na veia",
                  "esperar o resultado",
                ].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="race-row">
            <div>
              <h4>CardioChek PA</h4>
              <small>na mesa da sua casa</small>
            </div>
            <div>
              <div className="race-bar cc">
                <b>90 segundos</b>
              </div>
              <div className="race-steps">
                {["uma gota do dedo", "resultado na tela"].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Vitrine escura com o aparelho ---------- */
export function Showcase() {
  return (
    <section className="sec showcase" id="aparelho">
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <span className="label" data-reveal>
            O aparelho
          </span>
          <h2 className="h2" data-reveal style={{ margin: "0 auto" }}>
            Um laboratório de colesterol que cabe na palma da mão.
          </h2>
          <p className="lead" data-reveal style={{ margin: "18px auto 0" }}>
            O mesmo CardioChek PA usado em consultórios e farmácias, agora na sua casa. Uma gota do
            dedo e o perfil completo aparece na tela.
          </p>
        </div>
        <div className="showcase-grid">
          <div className="callouts r">
            <div className="callout" data-reveal>
              <b>
                <CountUp to={90} suffix="s" />
              </b>
              <span>para o perfil completo</span>
            </div>
            <div className="callout" data-reveal style={{ ["--d" as string]: ".1s" }}>
              <b>
                <CountUp to={40} suffix="µL" />
              </b>
              <span>uma gota de sangue do dedo</span>
            </div>
          </div>
          <div className="glow" data-reveal>
            <Device float />
          </div>
          <div className="callouts">
            <div className="callout" data-reveal>
              <b>
                <CountUp to={6} />
              </b>
              <span>resultados no mesmo teste</span>
            </div>
            <div className="callout" data-reveal style={{ ["--d" as string]: ".1s" }}>
              <b>
                <CountUp to={45} suffix="s" />
              </b>
              <span>para um teste individual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Para quem é ---------- */
export function Personas() {
  return (
    <section className="sec" id="para-quem">
      <div className="wrap">
        <span className="label" data-reveal>
          Para quem é
        </span>
        <h2 className="h2" data-reveal>
          Feito para quem quer saber, e não só esperar o próximo exame.
        </h2>
        <div className="personas">
          {PERSONAS.map((p, i) => (
            <article
              className="persona"
              key={p.title}
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }}
            >
              <div className="ph">
                <img src={p.img} alt="" loading="lazy" />
              </div>
              <div className="bd">
                <h3>{p.title}</h3>
                <p>{p.pain}</p>
                <p className="gain">{p.gain}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Passo a passo com imagens ---------- */
export function StepByStep() {
  return (
    <section className="sec" id="como">
      <div className="wrap">
        <span className="label" data-reveal>
          Passo a passo
        </span>
        <h2 className="h2" data-reveal>
          Como medir em casa, do começo ao resultado.
        </h2>
        <p className="lead" data-reveal>
          Oito passos, do jeito que o fabricante orienta. Na primeira vez leva uns 5 minutos.
          Depois, você faz no automático.
        </p>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <article
              className="stp"
              key={s.title}
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }}
            >
              {s.img ? (
                <div className="ph">
                  <img src={s.img} alt={s.title} loading="lazy" />
                </div>
              ) : "illustration" in s ? (
                <div className="ph illus">
                  <LancetIllustration />
                </div>
              ) : (
                <div className={`ph devph ${"device" in s ? s.device : ""}`}>
                  <Device />
                  {"device" in s && s.device === "chip" && (
                    <span className="arrow down" aria-hidden />
                  )}
                  {"device" in s && s.device === "strip" && <span className="arrow" aria-hidden />}
                  {"device" in s && s.device === "result" && <span className="ring" aria-hidden />}
                </div>
              )}
              <div className="bd">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Onde furar o dedo (como no desenho do guia do fabricante): lateral da polpa, nunca centro ou unha. */
function LancetIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Fure a lateral da ponta do dedo, longe do centro e da unha"
    >
      <rect width="400" height="300" fill="#f4f2ed" />
      {/* dedo visto pela palma */}
      <path
        d="M150 300 V120 C150 62 250 62 250 120 V300"
        fill="#f1cdb3"
        stroke="#c99a7c"
        strokeWidth="2"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${172 - i * 4} ${150 + i * 9} Q200 ${118 + i * 9} ${228 + i * 4} ${150 + i * 9}`}
          fill="none"
          stroke="#d9ad90"
          strokeWidth="1.4"
        />
      ))}
      <line x1="150" y1="212" x2="250" y2="212" stroke="#d9ad90" strokeWidth="1.6" />
      {/* centro: evitar */}
      <g transform="translate(200 128)">
        <circle r="13" fill="none" stroke="#9b9993" strokeWidth="2" strokeDasharray="4 3" />
        <path
          d="M-6 -6 L6 6 M6 -6 L-6 6"
          stroke="#9b9993"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
      {/* laterais: onde furar */}
      <circle cx="158" cy="132" r="9" fill="#c4161c" opacity=".18" />
      <circle cx="242" cy="132" r="9" fill="#c4161c" opacity=".18" />
      <circle cx="242" cy="132" r="4.5" fill="#c4161c" />
      {/* lanceta chegando pela lateral */}
      <g transform="translate(262 132)">
        <rect
          x="18"
          y="-11"
          width="70"
          height="22"
          rx="5"
          fill="#fff"
          stroke="#16181b"
          strokeWidth="2"
        />
        <rect x="6" y="-4" width="12" height="8" rx="2" fill="#16181b" />
        <path d="M-2 0 H6" stroke="#16181b" strokeWidth="2" />
      </g>
      <g fontFamily="IBM Plex Sans, sans-serif" fontSize="16" fill="#3c4249">
        <text x="300" y="176" textAnchor="middle">
          lateral da ponta
        </text>
        <text x="300" y="196" textAnchor="middle" fill="#c4161c" fontWeight="600">
          fure aqui
        </text>
        <text x="96" y="92" textAnchor="middle">
          centro e unha:
        </text>
        <text x="96" y="112" textAnchor="middle" fontWeight="600">
          evite
        </text>
      </g>
      <path
        d="M118 100 Q160 104 186 124"
        fill="none"
        stroke="#9b9993"
        strokeWidth="1.4"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

/* ---------- Leve para o médico ---------- */
export function DoctorBand() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="doc" data-reveal>
          <img src={imgMedico} alt="Médica conversando com paciente" loading="lazy" />
          <div className="bd">
            <span className="label">Junto com o seu médico</span>
            <h2 className="h2" style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)" }}>
              Chegue na consulta com o histórico, não com dúvidas.
            </h2>
            <p className="lead">
              O CardioChek não substitui o seu médico. Ele dá a você os números de cada mês para
              levar na consulta. Com o histórico na mão, fica mais fácil ver o que está funcionando
              e ajustar o que não está.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Kits em cartões (home) ---------- */
const KIT_ITEMS: Record<string, string[]> = {
  "1": ["Medidor de Colesterol CardioChek PA", "Garantia de 12 meses", "Videoaula de uso"],
  "2": [
    "Medidor de Colesterol CardioChek PA",
    "25 tiras de painel lipídico",
    "Lancetas e capilares",
    "Solução controle",
    "Guia, planilha e suporte no WhatsApp",
  ],
  "3": [
    "Medidor de Colesterol CardioChek PA",
    "75 tiras de painel lipídico",
    "Lancetas e capilares",
    "Solução controle e estojo",
    "Guia, planilha e suporte prioritário",
  ],
};
export function KitCards() {
  return (
    <section className="sec" id="kits">
      <div className="wrap">
        <span className="label" data-reveal>
          Kits
        </span>
        <h2 className="h2" data-reveal>
          Escolha o seu e comece a medir esta semana.
        </h2>
        <p className="lead" data-reveal>
          Frete grátis para todo o Brasil, Pix com aprovação na hora e 7 dias para devolver.
        </p>
        <div className="kitcards">
          {availableBundles.map((b, i) => {
            const pt = perTest(b);
            return (
              <div
                className={`kc ${b.featured ? "best" : ""}`}
                key={b.id}
                data-reveal
                style={{ ["--d" as string]: `${i * 0.08}s` }}
              >
                {b.badge && <span className="flag">{b.badge}</span>}
                <h3>{b.name}</h3>
                <div className="aud">{b.audience}</div>
                {b.compareAtPrice && (
                  <s>
                    {brl(b.compareAtPrice)} · {off(b)}% off
                  </s>
                )}
                <div className="pp">{brl(b.price)}</div>
                <div className="per">
                  {pt ? `${b.strips} medições inclusas` : "Tiras vendidas à parte"}
                </div>
                <ul>
                  {(KIT_ITEMS[b.id] ?? []).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn ${b.featured ? "btn-buy" : "btn-line"}`}
                  onClick={() => goToProduct(b)}
                >
                  Comprar {b.short}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- O que cada número significa (produto) ---------- */
export function Numbers() {
  const rows = [
    [
      "CHOL",
      "Colesterol total",
      "A soma do colesterol no sangue. É o número mais conhecido, mas sozinho não conta a história toda.",
      "medido",
    ],
    [
      "HDL",
      'HDL, o colesterol "bom"',
      "Ajuda a tirar o excesso de colesterol das artérias. Em geral, quanto mais alto, melhor.",
      "medido",
    ],
    [
      "LDL",
      'LDL, o colesterol "ruim"',
      "É o que se acumula nas artérias. Costuma ser o principal alvo do tratamento.",
      "calculado",
    ],
    [
      "TRIG",
      "Triglicérides",
      "Gordura que sobe com açúcar, álcool e excesso de carboidrato. Responde rápido a mudanças na alimentação.",
      "medido",
    ],
    [
      "GLU",
      "Glicose",
      "O açúcar no sangue. Importante para quem tem diabetes, pré-diabetes ou histórico na família.",
      "medido",
    ],
    [
      "TC/HDL",
      "Razão CT/HDL",
      "Relação entre o colesterol total e o HDL, usada para ter uma visão geral do risco.",
      "calculado",
    ],
  ];
  return (
    <section className="sec" id="resultados">
      <div className="wrap">
        <span className="label" data-reveal>
          O que ele mede
        </span>
        <h2 className="h2" data-reveal>
          Seis números, uma gota. Entenda cada um.
        </h2>
        <p className="lead" data-reveal>
          Quem define a sua meta para cada número é o seu médico. O CardioChek mostra onde você está
          hoje e como está mudando.
        </p>
        <div className="nums">
          {rows.map(([sg, t, d, tag], i) => (
            <div
              className="num"
              key={sg}
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 0.06}s` }}
            >
              <span className="sg">{sg}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="tag">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Anatomia do aparelho (produto) ---------- */
export function Anatomy() {
  const parts = [
    {
      x: 50,
      y: 8,
      t: "Entrada do chip do lote",
      d: "Cada caixa de tiras vem com um chip que ajusta o aparelho para aquele lote.",
    },
    { x: 86, y: 29, t: "Tela", d: "Mostra cada resultado em mg/dL, um de cada vez." },
    { x: 79, y: 57, t: "Botões", d: "Dois botões: confirmar e avançar. Só isso para navegar." },
    {
      x: 50,
      y: 86,
      t: "Entrada da tira",
      d: "Onde a tira é encaixada e a gota de sangue é aplicada.",
    },
  ];
  return (
    <section className="sec" id="anatomia">
      <div className="wrap">
        <span className="label" data-reveal>
          Conheça o aparelho
        </span>
        <h2 className="h2" data-reveal>
          Simples de propósito. Quatro partes, dois botões.
        </h2>
        <div className="anat">
          <ol>
            {parts.slice(0, 2).map((p, i) => (
              <li key={p.t} data-reveal>
                <b>{i + 1}</b>
                <div>
                  <h4>{p.t}</h4>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal>
            <Device>
              {parts.map((p, i) => (
                <span key={p.t} className="hot" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  {i + 1}
                </span>
              ))}
            </Device>
          </div>
          <ol>
            {parts.slice(2).map((p, i) => (
              <li key={p.t} data-reveal>
                <b>{i + 3}</b>
                <div>
                  <h4>{p.t}</h4>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bônus ---------- */
export function Bonus() {
  if (!BONUS.length) return null;
  const sum = BONUS.reduce((s, b) => s + b.v, 0);
  return (
    <section className="sec" id="bonus">
      <div className="wrap bonus">
        <div data-reveal>
          <span className="label">Vai junto no pedido</span>
          <h2 className="h2">Você não fica sozinho com o aparelho.</h2>
          <p className="lead">
            Nos kits Essencial e Família você recebe tudo para medir certo desde a primeira vez e
            entender o que os números querem dizer.
          </p>
        </div>
        <div className="receipt" data-reveal>
          <h4>Incluso nos kits Essencial e Família</h4>
          {BONUS.map((b) => (
            <div className="rl" key={b.n}>
              <span>
                {b.n}
                <small>{b.d}</small>
              </span>
              <span>{brl(b.v)}</span>
            </div>
          ))}
          <div className="rl sum">
            <span>Valor dos bônus</span>
            <span>
              <s>{brl(sum)}</s>
            </span>
          </div>
          <div className="rl sum big">
            <span>Você paga pelos bônus</span>
            <span>R$ 0,00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tabela de kits (produto) ---------- */
export function KitTable() {
  const rows: [string, (b: Bundle) => boolean | string][] = [
    ["Medidor de Colesterol CardioChek PA", () => true],
    ["Tiras de painel lipídico", (b) => (b.strips ? String(b.strips) : false)],
    ["Lancetas e capilares", (b) => b.includes.lancetas],
    ["Solução controle", (b) => b.includes.controle],
    ["Estojo para guardar", (b) => b.includes.maleta],
    ["Videoaula de uso", (b) => b.includes.treinamento],
    ["Guia: o que cada número significa", (b) => b.includes.artes],
    ["Planilha de acompanhamento", (b) => b.includes.planilha],
    ["Suporte no WhatsApp", (b) => b.includes.ficha],
    ["Suporte prioritário por 6 meses", (b) => b.includes.suporte],
    ["Garantia de fábrica", () => "12 meses"],
  ];
  const cell = (v: boolean | string) =>
    v === true ? <span className="y">✓</span> : v === false ? <span className="n">—</span> : v;
  const hl = (b: Bundle) => (b.featured ? "hl" : undefined);
  return (
    <section className="sec" id="kits">
      <div className="wrap">
        <span className="label" data-reveal>
          O que vem em cada kit
        </span>
        <h2 className="h2" data-reveal>
          Compare e escolha.
        </h2>
        <div className="kt-wrap" data-reveal>
          <table className="kt">
            <thead>
              <tr>
                <th />
                {availableBundles.map((b) => (
                  <th key={b.id} className={hl(b)}>
                    <span className="flag">{b.badge ?? " "}</span>
                    <h3>{b.short}</h3>
                    <div className="pp">{brl(b.price)}</div>
                    <div className="ps">{b.audience}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([n, f]) => (
                <tr key={n}>
                  <td>{n}</td>
                  {availableBundles.map((b) => (
                    <td key={b.id} className={hl(b)}>
                      {cell(f(b))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td />
                {availableBundles.map((b) => (
                  <td key={b.id} className={hl(b)}>
                    <button
                      type="button"
                      className={`btn ${b.featured ? "btn-buy" : "btn-line"}`}
                      onClick={() => goToCheckout(b, "kit_table")}
                    >
                      Escolher
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------- Avaliações (só com depoimentos reais) ---------- */
export const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
export function reviewSummary() {
  if (!REVIEWS.length) return null;
  return { avg: REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length, count: REVIEWS.length };
}
export function Reviews() {
  const s = reviewSummary();
  if (!s) return null;
  return (
    <section className="sec" id="avaliacoes">
      <div className="wrap">
        <span className="label">Avaliações</span>
        <h2 className="h2">Quem já mede em casa</h2>
        <div className="revs">
          <div className="rsum">
            <div className="avg">{s.avg.toFixed(1).replace(".", ",")}</div>
            <div className="stars" style={{ margin: "6px 0 4px" }}>
              {stars(Math.round(s.avg))}
            </div>
            <div style={{ color: "var(--cm-muted)", fontSize: ".85rem", marginBottom: 14 }}>
              {s.count} avaliações
            </div>
            {[5, 4, 3, 2, 1].map((n) => {
              const c = REVIEWS.filter((r) => r.stars === n).length;
              return (
                <div className="bar" key={n}>
                  <span>{n}★</span>
                  <i>
                    <b style={{ width: `${(c / s.count) * 100}%` }} />
                  </i>
                  <span>{c}</span>
                </div>
              );
            })}
          </div>
          <div>
            {REVIEWS.map((r, i) => (
              <div className="rv" key={i}>
                <div className="rv-h">
                  <span>
                    <b>{r.name}</b> · {r.role}
                  </span>
                  <span>{r.date}</span>
                </div>
                <div className="stars" style={{ fontSize: ".85rem", marginBottom: 6 }}>
                  {stars(r.stars)}
                </div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Fit() {
  return (
    <section className="sec">
      <div className="wrap">
        <span className="label" data-reveal>
          Antes de comprar
        </span>
        <h2 className="h2" data-reveal>
          Para quem faz sentido (e para quem não faz)
        </h2>
        <div className="fit" data-reveal>
          <div className="yes">
            <h3>Faz sentido se você</h3>
            <ul>
              <li>Tem colesterol ou triglicérides alto, ou toma remédio para isso</li>
              <li>Quer saber se a dieta e o exercício estão funcionando</li>
              <li>Cuida de pais ou familiares e quer evitar idas ao laboratório</li>
              <li>Tem infarto, AVC ou diabetes na família</li>
              <li>Quer chegar na consulta com seu histórico na mão</li>
            </ul>
          </div>
          <div className="no">
            <h3>Não é para você se</h3>
            <ul>
              <li>Quer substituir o acompanhamento com o seu médico</li>
              <li>Precisa de um laudo de laboratório para um processo oficial</li>
              <li>Precisa de hemoglobina glicada (A1C), que este modelo não mede</li>
              <li>Vai medir uma única vez e nunca mais</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section className="sec">
      <div className="wrap guar" data-reveal>
        <div className="seal">
          <div>
            <b>7</b>
            <span>
              dias para
              <br />
              devolver
            </span>
          </div>
        </div>
        <div>
          <span className="label" style={{ marginBottom: 8 }}>
            Garantia
          </span>
          <h2 className="h2" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
            Teste em casa. Se não gostar, devolve.
          </h2>
          <p>
            Você tem 7 dias depois de receber para usar o CardioChek PA. Se não fizer sentido para
            você, devolve e recebe o valor integral. Além disso, são 12 meses de garantia contra
            defeito de fabricação, com suporte da nossa equipe.
          </p>
          <p className="sign">Equipe {brand.name}</p>
        </div>
      </div>
    </section>
  );
}

export function Faq({ id = "duvidas", limit }: { id?: string; limit?: number }) {
  const items = limit ? FAQ.slice(0, limit) : FAQ;
  return (
    <section className="sec" id={id}>
      <div className="wrap">
        <span className="label">Dúvidas</span>
        <h2 className="h2">Perguntas que recebemos todo dia</h2>
        <div className="faq">
          {items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing({ bundle, target = "checkout" }: { bundle: Bundle; target?: BuyTarget }) {
  return (
    <section className="sec closing">
      <div className="wrap grid">
        <div data-reveal>
          <h2 className="h2">
            Daqui a 90 segundos você pode saber o que o exame do ano que vem diria.
          </h2>
          <p className="lead">
            Frete grátis, Pix com aprovação na hora e 7 dias para devolver. O risco de testar é
            nosso.
          </p>
        </div>
        <div className="closing-card" data-reveal>
          <Device />
          <div>
            <div style={{ fontWeight: 600 }}>{bundle.name}</div>
            <div className="pp">{brl(bundle.price)}</div>
            <div style={{ color: "var(--cm-muted)", fontSize: ".88rem" }}>{bundle.description}</div>
          </div>
          <button
            type="button"
            className="btn btn-buy"
            onClick={() => buy(target, bundle, "closing")}
          >
            Comprar agora
          </button>
        </div>
      </div>
    </section>
  );
}

/** Barra de compra fixa no celular, quando `anchor` (seletor) sai da tela. */
export function StickyBuy({
  bundle,
  anchor,
  target = "checkout",
}: {
  bundle: Bundle;
  anchor: string;
  target?: BuyTarget;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.querySelector(anchor);
    if (!el) return;
    const io = new IntersectionObserver(([e]) =>
      setShow(!!e && !e.isIntersecting && e.boundingClientRect.top < 0),
    );
    io.observe(el);
    return () => io.disconnect();
  }, [anchor]);
  return (
    <div className={`sticky ${show ? "show" : ""}`}>
      <div className="sp">
        <b>{brl(bundle.price)}</b>
        <small>{bundle.name} · Pix</small>
      </div>
      <button
        type="button"
        className="btn btn-buy"
        onClick={() => buy(target, bundle, "sticky_mobile")}
      >
        Comprar
      </button>
    </div>
  );
}

/** Ao tentar sair da página: convite para tirar dúvidas no WhatsApp (uma vez por visitante). */
export function ExitIntent() {
  const fetchSettings = useServerFn(getSiteSettings);
  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => fetchSettings(),
    staleTime: 60_000,
  });
  const enabled = !!data?.whatsappEnabled && !!brand.whatsapp.phoneE164;
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  useEffect(() => {
    if (!enabled) return;
    try {
      shown.current = !!localStorage.getItem("cm_exit");
    } catch {
      /* storage indisponível */
    }
    const show = () => {
      if (shown.current) return;
      shown.current = true;
      try {
        localStorage.setItem("cm_exit", "1");
      } catch {
        /* storage indisponível */
      }
      setOpen(true);
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY < 10 && window.scrollY > 600) show();
    };
    document.addEventListener("mouseout", onOut);
    const t = setTimeout(() => {
      if (window.matchMedia("(max-width:940px)").matches && window.scrollY > 1500) show();
    }, 45_000);
    return () => {
      document.removeEventListener("mouseout", onOut);
      clearTimeout(t);
    };
  }, [enabled]);
  if (!open) return null;
  const href = `https://wa.me/${brand.whatsapp.phoneE164}?text=${encodeURIComponent("Olá! Quero saber mais sobre o CardioChek PA.")}`;
  return (
    <div className="exit" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="exit-card" role="dialog" aria-modal="true" aria-labelledby="exit-t">
        <button type="button" className="x" onClick={() => setOpen(false)} aria-label="Fechar">
          ×
        </button>
        <span className="label" style={{ marginBottom: 10 }}>
          Antes de sair
        </span>
        <h3 id="exit-t">Ficou alguma dúvida sobre o CardioChek PA?</h3>
        <p>
          Fale com a gente pelo WhatsApp. A gente te ajuda a escolher o kit e explica como medir em
          casa.
        </p>
        <a
          className="btn btn-buy"
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          Conversar no WhatsApp
        </a>
        <button type="button" className="no" onClick={() => setOpen(false)}>
          Agora não
        </button>
      </div>
    </div>
  );
}
