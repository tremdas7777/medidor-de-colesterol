import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  availableBundles,
  brl,
  getBundle,
  type Bundle,
  type BundleId,
} from "@/lib/bundles";
import { brand } from "@/lib/brand";
import { BONUS, FAQ, PROFILES, REVIEWS } from "@/lib/store-content";
import { consultaImage, productHeroImage } from "@/lib/product-images";
import { trackCheckoutClick } from "@/lib/analytics";
import { metaTrack } from "@/lib/meta-pixel";
import { getSiteSettings } from "@/lib/site-settings.functions";
import "./cardio.css";

const LCD = [
  ["CHOL", "215", "Colesterol total"],
  ["HDL", "48", "HDL"],
  ["TRIG", "162", "Triglicérides"],
  ["GLU", "94", "Glicose"],
  ["LDL", "135", "LDL (calculado)"],
  ["TC/HDL", "4.5", "Razão CT/HDL"],
] as const;

const off = (b: Bundle) =>
  b.compareAtPrice ? Math.round((1 - b.price / b.compareAtPrice) * 100) : 0;

function goToCheckout(b: Bundle, source: string) {
  trackCheckoutClick({ source, bundleId: b.id, bundleName: b.name, value: b.price });
  window.location.href = b.checkoutUrl;
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function CardioStore({
  selected,
  onSelect,
}: {
  selected: BundleId;
  onSelect: (id: BundleId) => void;
}) {
  const bundle = getBundle(selected);
  useEffect(() => {
    metaTrack("ViewContent", { value: bundle.price, contentName: bundle.name });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="cm">
      <div className="wrap">
        <div className="crumbs">
          <a href="/">Início</a> / <span className="cmid">Equipamentos / Analisadores point-of-care / </span>
          CardioChek PA
        </div>
        <ProductBlock bundle={bundle} onSelect={onSelect} />
      </div>
      <Credentials />
      <Problem />
      <Results />
      <Profiles />
      <Roi />
      <How />
      <Bonus />
      <KitTable />
      <Reviews />
      <Fit />
      <Guarantee />
      <Faq />
      <Closing bundle={bundle} />
      <StickyBuy bundle={bundle} />
      <ExitIntent />
    </div>
  );
}

/* ---------- Bloco de compra ---------- */
function ProductBlock({ bundle, onSelect }: { bundle: Bundle; onSelect: (id: BundleId) => void }) {
  const [slide, setSlide] = useState(0);
  const [lcd, setLcd] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLcd((i) => (i + 1) % LCD.length), 2200);
    return () => clearInterval(t);
  }, []);
  const [k, v, cap] = LCD[lcd]!;
  const rating = reviewSummary();

  return (
    <section className="pdp" id="comprar">
      <div className="m-head">
        <div className="brandline">PTS DIAGNOSTICS · CARDIOCHEK PA</div>
        <div className="h1">{brand.productName}</div>
      </div>
      <div className="gallery">
        <div className="stage">
          <div className={`slide ${slide === 0 ? "on" : ""}`}>
            <div className="device">
              <img src={productHeroImage} alt={brand.productName} width={800} height={800} />
              <div className="lcd" aria-hidden>
                <span className="k">{k}</span>
                <span className="v" key={lcd}>
                  {v}
                </span>
                <span className="u" style={{ visibility: k === "TC/HDL" ? "hidden" : "visible" }}>
                  mg/dL
                </span>
              </div>
            </div>
            <span className="stage-cap">
              {cap} · {lcd + 1}/6 · valores ilustrativos
            </span>
          </div>
          <div className={`slide ${slide === 1 ? "on" : ""}`}>
            <img src={consultaImage} alt="Profissional de saúde atendendo paciente no consultório" />
          </div>
        </div>
        <div className="thumbs">
          <button type="button" className={`thumb ${slide === 0 ? "on" : ""}`} onClick={() => setSlide(0)} aria-label="Foto do aparelho">
            <img src={productHeroImage} alt="" />
          </button>
          <button type="button" className={`thumb ${slide === 1 ? "on" : ""}`} onClick={() => setSlide(1)} aria-label="Foto em consultório">
            <img src={consultaImage} alt="" />
          </button>
          <button type="button" className="thumb" onClick={() => scrollTo("resultados")} aria-label="Ver resultados">
            <span className="t">
              <b>6</b>resultados por teste
            </span>
          </button>
          <button type="button" className="thumb" onClick={() => scrollTo("como")} aria-label="Como funciona">
            <span className="t">
              <b>90s</b>perfil completo
            </span>
          </button>
        </div>
      </div>

      <div>
        <div className="d-head">
          <div className="brandline">PTS DIAGNOSTICS · CARDIOCHEK PA</div>
          <h1>{brand.productName}</h1>
        </div>
        <div className="meta">
          {rating && (
            <>
              <span className="stars">{stars(Math.round(rating.avg))}</span>
              <a href="#avaliacoes">{rating.count} avaliações</a>
            </>
          )}
          {brand.anvisa && <span>Registro ANVISA nº {brand.anvisa}</span>}
        </div>
        <p className="pitch">
          Você pede o exame, o paciente diz que vai fazer e não volta. Com o CardioChek PA,
          colesterol, HDL, triglicérides e glicose ficam prontos{" "}
          <strong>em até 90 segundos, ali na consulta</strong>, com uma gota de sangue do dedo.
        </p>

        <div className="specs-mini">
          <div>
            <b>90s</b>
            <span>perfil lipídico completo</span>
          </div>
          <div>
            <b>40µL</b>
            <span>de sangue capilar</span>
          </div>
          <div>
            <b>6</b>
            <span>resultados no mesmo teste</span>
          </div>
          <div>
            <b>NCEP</b>
            <span>diretrizes de precisão</span>
          </div>
        </div>

        <div className="opt-label">
          <span>Escolha o kit</span>
          <a href="#kits">comparar kits</a>
        </div>
        <div className="kits" role="radiogroup" aria-label="Kit">
          {availableBundles.map((b) => (
            <button
              type="button"
              role="radio"
              aria-checked={b.id === bundle.id}
              key={b.id}
              className={`kit ${b.id === bundle.id ? "on" : ""}`}
              onClick={() => onSelect(b.id)}
            >
              <span className="rd" />
              <span>
                <span className="kit-n">
                  {b.name}
                  {b.badge && <em>{b.badge}</em>}
                </span>
                <span className="kit-d">{b.description}</span>
              </span>
              <span className="kit-p">
                {b.compareAtPrice && <s>{brl(b.compareAtPrice)}</s>}
                {brl(b.price)}
              </span>
            </button>
          ))}
        </div>

        <div className="price">
          {bundle.compareAtPrice && (
            <div className="old">
              <s>{brl(bundle.compareAtPrice)}</s>
              <b>{off(bundle)}% off</b>
            </div>
          )}
          <div className="now">{brl(bundle.price)}</div>
          <div className="pix">Pagamento no Pix · aprovação na hora</div>
        </div>

        <button type="button" className="btn btn-buy buy-main" onClick={() => goToCheckout(bundle, "product_buy_box")}>
          Comprar agora
        </button>

        <ShippingEstimate />

        <div className="assure">
          <div>
            <Icon d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" />
            <span>7 dias para devolver, sem precisar justificar. 12 meses de garantia de fábrica.</span>
          </div>
          <div>
            <Icon d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5" />
            <span>Nota fiscal em todos os pedidos.</span>
          </div>
          <div>
            <Icon d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z" />
            <span>Treinamento de implantação com a nossa equipe, por vídeo, depois da entrega.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Prazo estimado pelo CEP (ViaCEP). Frete sempre grátis. */
const ORIGIN_UF = "SP";
const ETA: Record<string, [number, number]> = {
  SP: [2, 4], RJ: [3, 5], MG: [3, 5], ES: [3, 6], PR: [3, 6], SC: [4, 7], RS: [4, 7], DF: [4, 7],
  GO: [4, 7], MS: [5, 8], MT: [5, 9], BA: [5, 9], SE: [6, 10], AL: [6, 10], PE: [6, 10],
  PB: [6, 10], RN: [6, 10], CE: [6, 10], PI: [7, 11], MA: [7, 11], TO: [6, 10], PA: [7, 12],
  AP: [8, 14], AM: [8, 14], RR: [8, 14], RO: [7, 12], AC: [8, 14],
};
function ShippingEstimate() {
  const [cep, setCep] = useState("");
  const [out, setOut] = useState<React.ReactNode>(null);
  const calc = async () => {
    const c = cep.replace(/\D/g, "");
    if (c.length !== 8) return setOut("Digite um CEP com 8 números.");
    setOut("Consultando…");
    try {
      const r = await (await fetch(`https://viacep.com.br/ws/${c}/json/`)).json();
      if (r.erro) return setOut("CEP não encontrado.");
      const [a, b] = r.uf === ORIGIN_UF ? [1, 3] : (ETA[r.uf] ?? [5, 10]);
      setOut(
        <>
          {r.localidade}/{r.uf}: <b>frete grátis</b>, entrega em {a} a {b} dias úteis.
        </>,
      );
    } catch {
      setOut("Não foi possível consultar agora. Frete grátis para todo o Brasil.");
    }
  };
  return (
    <div className="ship">
      <label htmlFor="cepQ">Calcular prazo de entrega</label>
      <div className="ship-f">
        <input
          id="cepQ"
          inputMode="numeric"
          placeholder="Digite seu CEP"
          maxLength={9}
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calc()}
        />
        <button type="button" onClick={calc}>
          OK
        </button>
      </div>
      <div className="ship-out">{out}</div>
    </div>
  );
}

function Credentials() {
  return (
    <div className="creds">
      <div className="wrap">
        <div>
          <b>Diretrizes NCEP</b>Atende aos critérios de exatidão e precisão para colesterol
        </div>
        <div>
          <b>Certificação CRMLN</b>Colesterol total e HDL na tira de painel lipídico
        </div>
        <div>
          <b>CLIA-waived (EUA)</b>Classificado como teste de baixa complexidade
        </div>
        <div>
          <b>Tiras sem geladeira</b>Armazenamento em temperatura ambiente
        </div>
      </div>
    </div>
  );
}

/* ---------- Problema e cenários ---------- */
function Problem() {
  return (
    <section className="sec" id="problema">
      <div className="wrap problem">
        <div>
          <span className="label">O problema</span>
          <h2 className="h2">
            O exame pedido hoje chega em 15 dias. <em>Isso se o paciente voltar.</em>
          </h2>
          <p className="lead">
            Quem atende sabe como é. O pedido sai do consultório, vai parar na bolsa, a coleta fica
            para "semana que vem" e o retorno nunca é marcado. O paciente fica sem tratamento e você
            fica sem a consulta seguinte.
          </p>
          <p className="lead">
            O CardioChek PA corta esse caminho. O resultado sai na hora, você conduz o caso ali mesmo
            e o paciente vai embora com um número na mão e um motivo para voltar.
          </p>
        </div>
        <ol className="plist">
          {[
            ["O retorno que nunca acontece", "Cada pedido de exame é uma chance de o paciente sumir. Ele adia, esquece ou desanima, e o acompanhamento se perde."],
            ["Orientar sem números", "Sem o lipidograma em mãos, a conversa fica genérica. Você precisa de outra consulta só para olhar o resultado."],
            ["Medo da agulha e da manhã perdida", "Jejum, fila e punção na veia fazem muita gente desistir do exame antes de começar."],
            ["Receita que depende só da consulta", "Sem um serviço a mais, o faturamento tem teto: o número de horários da sua agenda."],
            ["Paciente que não vê evolução", 'Ele segue a dieta por dois meses, não "sente" diferença e abandona. Faltou mostrar o triglicérides caindo.'],
          ].map(([t, d]) => (
            <li key={t}>
              <div>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="wrap">
        <div className="scen">
          <Timeline
            kind="bad"
            title="Consulta sem o CardioChek"
            items={[
              ["Dia 1", "Paciente chega com queixa. Você suspeita de colesterol alto e pede exame."],
              ["Dia 6", 'Ele ainda não marcou a coleta. "Essa semana tá corrida."'],
              ["Dia 14", "Faz o exame, mas o laboratório leva mais alguns dias."],
              ["Dia 30", "Resultado pronto. O retorno não foi agendado."],
              ["Dia 60", "Paciente sem conduta. Consulta de retorno perdida."],
            ]}
          />
          <Timeline
            kind="good"
            title="Consulta com o CardioChek"
            items={[
              ["09:00", "Paciente chega com a mesma queixa."],
              ["09:04", "Uma gota do dedo na tira. Sem agulha na veia."],
              ["09:06", "CT, HDL, LDL, triglicérides e glicose na tela."],
              ["09:15", "Você explica os números e define a conduta."],
              ["09:20", "Paciente sai com plano, resultado e retorno marcado."],
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Timeline({ kind, title, items }: { kind: "bad" | "good"; title: string; items: [string, string][] }) {
  return (
    <div className={`scen-col ${kind}`}>
      <h3>
        <i style={{ background: kind === "bad" ? "var(--cm-red)" : "var(--cm-buy)" }} />
        {title}
      </h3>
      <ol className="tl">
        {items.map(([t, d], i) => (
          <li key={t} className={i === items.length - 1 ? "end" : undefined}>
            <time>{t}</time>
            <span>{d}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Resultados ---------- */
function Results() {
  const rows = [
    ["CHOL", "Colesterol total", "medido"],
    ["HDL", "Colesterol HDL", "medido"],
    ["TRIG", "Triglicérides", "medido"],
    ["GLU", "Glicose", "medido"],
    ["LDL", "Colesterol LDL", "calculado"],
    ["TC/HDL", "Razão colesterol total / HDL", "calculado"],
  ];
  return (
    <section className="sec" id="resultados">
      <div className="wrap res">
        <div>
          <span className="label">O que ele mede</span>
          <h2 className="h2">Lipidograma e glicose com uma única picada no dedo</h2>
          <p className="lead">
            A tira de painel lipídico entrega quatro medições e dois cálculos no mesmo teste. Se
            precisar só de um parâmetro, o teste individual sai em até 45 segundos.
          </p>
        </div>
        <table className="t">
          <thead>
            <tr>
              <th>Sigla</th>
              <th>Parâmetro</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([s, n, t]) => (
              <tr key={s}>
                <td>{s}</td>
                <td>{n}</td>
                <td className="tag">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- Perfis ---------- */
function Profiles() {
  const [i, setI] = useState(0);
  const p = PROFILES[i]!;
  return (
    <section className="sec" id="perfis">
      <div className="wrap">
        <span className="label">Na sua rotina</span>
        <h2 className="h2">Como ele se paga no seu tipo de atendimento</h2>
        <div className="tabs" role="tablist">
          {PROFILES.map((x, n) => (
            <button
              type="button"
              role="tab"
              aria-selected={n === i}
              key={x.tab}
              className={`tab ${n === i ? "on" : ""}`}
              onClick={() => setI(n)}
            >
              {x.tab}
            </button>
          ))}
        </div>
        <div className="panel" role="tabpanel">
          <div>
            <h4>O que acontece hoje</h4>
            <p>{p.pain}</p>
          </div>
          <div>
            <h4>Com o CardioChek PA</h4>
            <p>{p.how}</p>
          </div>
          <div>
            <p className="quote">{p.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Calculadora ---------- */
function Roi() {
  const [price, setPrice] = useState(60);
  const [week, setWeek] = useState(12);
  const [cost, setCost] = useState(25);
  const device = availableBundles[0]!.price;
  const month = (price - cost) * week * 4.3;
  const pays = price > cost;
  const months = device / month;
  return (
    <section className="sec" id="retorno">
      <div className="wrap">
        <span className="label">Faça a conta</span>
        <h2 className="h2">Quanto tempo até o aparelho se pagar?</h2>
        <p className="lead">
          Ajuste com os números da sua realidade. O cálculo considera o preço do aparelho avulso e o
          custo de cada tira.
        </p>
        <div className="calc">
          <div className="calc-in">
            <Range id="rP" label="Quanto você cobra pelo check-up" value={price} min={20} max={150} step={5} onChange={setPrice} fmt={brl} />
            <Range id="rW" label="Testes por semana" value={week} min={1} max={60} step={1} onChange={setWeek} fmt={String} />
            <Range id="rC" label="Custo por tira" value={cost} min={10} max={50} step={1} onChange={setCost} fmt={brl} />
          </div>
          <div className="calc-out">
            <span className="k">Lucro estimado por mês</span>
            <span className="big">{brl(Math.max(0, month))}</span>
            <dl>
              <dt>Em 12 meses</dt>
              <dd>{brl(Math.max(0, month * 12))}</dd>
              <dt>O aparelho se paga em</dt>
              <dd>
                {!pays ? "não se paga" : months < 1 ? `${Math.ceil(months * 30)} dias` : `${months.toFixed(1).replace(".", ",")} meses`}
              </dd>
              <dt>Testes para se pagar</dt>
              <dd>{pays ? `${Math.ceil(device / (price - cost))} testes` : "—"}</dd>
            </dl>
            <button type="button" className="btn btn-dark" onClick={() => scrollTo("kits")}>
              Ver kits e preços
            </button>
            <small>Estimativa. Não inclui impostos nem lancetas. Mês de 4,3 semanas.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function Range(p: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  fmt: (v: number) => string;
}) {
  return (
    <div className="field">
      <label htmlFor={p.id}>
        {p.label} <output>{p.fmt(p.value)}</output>
      </label>
      <input
        type="range"
        id={p.id}
        min={p.min}
        max={p.max}
        step={p.step}
        value={p.value}
        onChange={(e) => p.onChange(Number(e.target.value))}
      />
    </div>
  );
}

/* ---------- Como funciona ---------- */
function How() {
  return (
    <section className="sec" id="como">
      <div className="wrap how">
        <img src={consultaImage} alt="Profissional de saúde conversando com paciente" loading="lazy" />
        <div>
          <span className="label">Como funciona</span>
          <h2 className="h2">Três passos. Dá para usar no mesmo dia em que chega.</h2>
          <div className="steps">
            {[
              ["Insira a tira", "O chip de código que acompanha cada lote informa ao aparelho qual teste será feito."],
              ["Aplique a gota", "40µL de sangue capilar coletado da ponta do dedo com lanceta e capilar."],
              ["Leia o resultado", "Em até 90 segundos o perfil completo aparece na tela, pronto para conversar com o paciente."],
            ].map(([t, d], i) => (
              <div className="step" key={t}>
                <span>{i + 1}</span>
                <div>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bônus ---------- */
function Bonus() {
  if (!BONUS.length) return null;
  const sum = BONUS.reduce((s, b) => s + b.v, 0);
  return (
    <section className="sec" id="bonus">
      <div className="wrap bonus">
        <div>
          <span className="label">Vai junto no pedido</span>
          <h2 className="h2">Você leva o aparelho e o serviço pronto para vender.</h2>
          <p className="lead">
            A maior dificuldade de quem começa não é usar o aparelho, é transformar o teste em
            serviço. Por isso os kits Inicial e Profissional saem com o que você precisa para
            anunciar, precificar e atender desde a primeira semana.
          </p>
        </div>
        <div className="receipt">
          <h4>Incluso nos kits Inicial e Profissional</h4>
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

/* ---------- Tabela de kits ---------- */
function KitTable() {
  const rows: [string, (b: Bundle) => boolean | string][] = [
    ["Analisador CardioChek PA", () => true],
    ["Tiras de painel lipídico", (b) => (b.strips ? String(b.strips) : false)],
    ["Lancetas e capilares", (b) => b.includes.lancetas],
    ["Solução controle", (b) => b.includes.controle],
    ["Maleta de transporte", (b) => b.includes.maleta],
    ["Treinamento de implantação", (b) => b.includes.treinamento],
    ["Artes para divulgação", (b) => b.includes.artes],
    ["Planilha de precificação", (b) => b.includes.planilha],
    ["Modelo de ficha de resultado", (b) => b.includes.ficha],
    ["Suporte prioritário por 6 meses", (b) => b.includes.suporte],
    ["Garantia de fábrica", () => "12 meses"],
  ];
  const cell = (v: boolean | string) =>
    v === true ? <span className="y">✓</span> : v === false ? <span className="n">—</span> : v;
  const hl = (b: Bundle) => (b.featured ? "hl" : undefined);
  return (
    <section className="sec" id="kits">
      <div className="wrap">
        <span className="label">Kits</span>
        <h2 className="h2">Escolha pelo seu volume de atendimentos</h2>
        <div className="kt-wrap">
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

/* ---------- Avaliações (só aparecem com depoimentos reais em store-content.ts) ---------- */
const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
function reviewSummary() {
  if (!REVIEWS.length) return null;
  return { avg: REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length, count: REVIEWS.length };
}
function Reviews() {
  const s = reviewSummary();
  if (!s) return null;
  return (
    <section className="sec" id="avaliacoes">
      <div className="wrap">
        <span className="label">Avaliações</span>
        <h2 className="h2">Quem já usa no dia a dia</h2>
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

/* ---------- Para quem ---------- */
function Fit() {
  return (
    <section className="sec">
      <div className="wrap">
        <span className="label">Antes de comprar</span>
        <h2 className="h2">Para quem faz sentido (e para quem não faz)</h2>
        <div className="fit">
          <div className="yes">
            <h3>Faz sentido se você</h3>
            <ul>
              <li>Atende pacientes com risco cardiovascular, diabetes ou sobrepeso</li>
              <li>Perde retornos porque o paciente não traz o exame</li>
              <li>Quer cobrar por um serviço além da consulta</li>
              <li>Faz ações de saúde em empresas, eventos ou campanhas</li>
              <li>Quer mostrar ao paciente a evolução dele com números</li>
            </ul>
          </div>
          <div className="no">
            <h3>Não é para você se</h3>
            <ul>
              <li>Procura um aparelho para uso pessoal em casa</li>
              <li>Precisa de laudo laboratorial com assinatura de bioquímico</li>
              <li>Precisa de hemoglobina glicada (A1C), que este modelo não mede</li>
              <li>Vai fazer menos de um teste por mês</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="sec">
      <div className="wrap guar">
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
            Se não servir para a sua rotina, você devolve.
          </h2>
          <p>
            Você tem 7 dias depois de receber para testar o CardioChek PA. Se não fizer sentido,
            devolve e recebe o valor integral. Além disso, são 12 meses de garantia contra defeito de
            fabricação, com suporte da nossa equipe durante todo esse período.
          </p>
          <p className="sign">Equipe {brand.name}</p>
        </div>
      </div>
    </section>
  );
}

export function Faq({ id = "duvidas" }: { id?: string }) {
  return (
    <section className="sec" id={id}>
      <div className="wrap">
        <span className="label">Dúvidas</span>
        <h2 className="h2">Perguntas que recebemos todo dia</h2>
        <div className="faq">
          {FAQ.map((f) => (
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

export function Closing({ bundle }: { bundle: Bundle }) {
  return (
    <section className="sec closing">
      <div className="wrap grid">
        <div>
          <h2 className="h2">Na próxima consulta, o resultado pode sair antes de o paciente ir embora.</h2>
          <p className="lead">Frete grátis, Pix com aprovação na hora e 7 dias para devolver. O risco de testar é nosso.</p>
        </div>
        <div className="closing-card">
          <img src={productHeroImage} alt="" />
          <div>
            <div style={{ fontWeight: 600 }}>{bundle.name}</div>
            <div className="pp">{brl(bundle.price)}</div>
            <div style={{ color: "var(--cm-muted)", fontSize: ".88rem" }}>{bundle.description}</div>
          </div>
          <button type="button" className="btn btn-buy" onClick={() => goToCheckout(bundle, "closing")}>
            Comprar agora
          </button>
        </div>
      </div>
    </section>
  );
}

/** Barra de compra fixa no celular, quando o botão principal sai da tela. */
function StickyBuy({ bundle }: { bundle: Bundle }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.querySelector(".cm .buy-main");
    if (!el) return;
    const io = new IntersectionObserver(([e]) =>
      setShow(!!e && !e.isIntersecting && e.boundingClientRect.top < 0),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`sticky ${show ? "show" : ""}`}>
      <div className="sp">
        <b>{brl(bundle.price)}</b>
        <small>{bundle.name} · Pix</small>
      </div>
      <button type="button" className="btn btn-buy" onClick={() => goToCheckout(bundle, "sticky_mobile")}>
        Comprar
      </button>
    </div>
  );
}

/** Ao tentar sair da página: convite para tirar dúvidas no WhatsApp (uma vez por visitante). */
function ExitIntent() {
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
  const href = `https://wa.me/${brand.whatsapp.phoneE164}?text=${encodeURIComponent(
    "Olá! Quero saber mais sobre o CardioChek PA.",
  )}`;
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
          Fale com um especialista pelo WhatsApp. A gente te ajuda a escolher o kit e a calcular o
          retorno com os números do seu consultório ou farmácia.
        </p>
        <a className="btn btn-buy" href={href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
          Conversar no WhatsApp
        </a>
        <button type="button" className="no" onClick={() => setOpen(false)}>
          Agora não
        </button>
      </div>
    </div>
  );
}
