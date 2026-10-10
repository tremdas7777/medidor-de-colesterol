import { useEffect, useState, type ReactNode } from "react";
import {
  availableBundles,
  brl,
  FREE_SHIPPING_LABEL,
  FREE_SHIPPING_MIN,
  getBundle,
  isFreeShippingEligible,
  type Bundle,
  type BundleId,
} from "@/lib/bundles";
import { brand } from "@/lib/brand";
import { metaTrack } from "@/lib/meta-pixel";
import imgGota from "@/assets/gota.webp";
import imgCasal from "@/assets/casal.webp";
import imgCuidar from "@/assets/cuidar-pais.webp";
import { Device, LCD_SEQUENCE, useLcdCycle, useReveal } from "./fx";
import {
  Anatomy,
  Bonus,
  Closing,
  Credentials,
  ExitIntent,
  Faq,
  Fit,
  goToCheckout,
  Guarantee,
  KitTable,
  Numbers,
  off,
  Pain,
  Race,
  reviewSummary,
  Reviews,
  scrollTo,
  stars,
  StepByStep,
  StickyBuy,
} from "./sections";
import "./cardio.css";

/** Página do produto: bloco de compra + explicação completa do aparelho. */
export function CardioStore({
  selected,
  onSelect,
}: {
  selected: BundleId;
  onSelect: (id: BundleId) => void;
}) {
  const ref = useReveal();
  const bundle = getBundle(selected);
  useEffect(() => {
    metaTrack("ViewContent", { value: bundle.price, contentName: bundle.name });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="cm" ref={ref}>
      <div className="wrap">
        <div className="crumbs">
          <a href="/">Início</a> / <span className="cmid">Saúde em casa / Colesterol / </span>
          CardioChek PA
        </div>
        <ProductBlock bundle={bundle} onSelect={onSelect} />
      </div>
      <Credentials />
      <Numbers />
      <StepByStep />
      <Anatomy />
      <Race />
      <Pain />
      <Bonus />
      <KitTable />
      <Reviews />
      <Fit />
      <Guarantee />
      <Faq />
      <Closing bundle={bundle} />
      <StickyBuy bundle={bundle} anchor=".cm .buy-main" />
      <ExitIntent />
    </div>
  );
}

type Slide = { thumb: ReactNode; view: ReactNode; label: string };

function ProductBlock({ bundle, onSelect }: { bundle: Bundle; onSelect: (id: BundleId) => void }) {
  const [slide, setSlide] = useState(0);
  const lcd = useLcdCycle();
  const rating = reviewSummary();
  const photo = (src: string, alt: string) => <img src={src} alt={alt} loading="lazy" />;

  const slides: Slide[] = [
    {
      label: "Aparelho",
      thumb: <Device />,
      view: (
        <div className="stage-dev">
          <Device float />
          <span className="stage-cap">
            {LCD_SEQUENCE[lcd]![2]} · {lcd + 1}/6 · valores ilustrativos
          </span>
        </div>
      ),
    },
    {
      label: "Uma gota",
      thumb: photo(imgGota, ""),
      view: photo(imgGota, "Gota de sangue na ponta do dedo"),
    },
    {
      label: "Em casa",
      thumb: photo(imgCasal, ""),
      view: photo(imgCasal, "Casal tomando café em casa"),
    },
    {
      label: "Família",
      thumb: photo(imgCuidar, ""),
      view: photo(imgCuidar, "Filha cuidando do pai em casa"),
    },
  ];

  return (
    <section className="pdp" id="comprar">
      <div className="m-head">
        <div className="brandline">PTS DIAGNOSTICS · CARDIOCHEK PA</div>
        <div className="h1">{brand.productName}</div>
      </div>
      <div className="gallery">
        <div className="stage">
          {slides.map((s, n) => (
            <div key={s.label} className={`slide ${slide === n ? "on" : ""}`}>
              {s.view}
            </div>
          ))}
        </div>
        <div className="thumbs">
          {slides.map((s, n) => (
            <button
              type="button"
              key={s.label}
              className={`thumb ${slide === n ? "on" : ""} ${n === 0 ? "thumb-dev" : ""}`}
              onClick={() => setSlide(n)}
              aria-label={s.label}
            >
              {s.thumb}
            </button>
          ))}
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
          Saiba como estão seu colesterol, HDL, triglicérides e glicose{" "}
          <strong>em 90 segundos, em casa</strong>, com uma gota de sangue do dedo. Sem agulha na
          veia, sem fila de laboratório, sem esperar dias pelo resultado.
        </p>

        <div className="specs-mini">
          <div>
            <b>90s</b>
            <span>perfil completo</span>
          </div>
          <div>
            <b>1 gota</b>
            <span>da ponta do dedo</span>
          </div>
          <div>
            <b>6</b>
            <span>resultados por teste</span>
          </div>
          <div>
            <b>NCEP</b>
            <span>padrão de precisão</span>
          </div>
        </div>

        <div className="opt-label">
          <span>Escolha o kit</span>
          <a href="#kits" onClick={(e) => (e.preventDefault(), scrollTo("kits"))}>
            o que vem em cada um
          </a>
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
                <span className={`kit-ship ${isFreeShippingEligible(b.price) ? "ok" : ""}`}>
                  {isFreeShippingEligible(b.price)
                    ? "Frete grátis"
                    : `+ frete (grátis a partir de ${brl(FREE_SHIPPING_MIN)})`}
                </span>
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

        <button
          type="button"
          className="btn btn-buy buy-main"
          onClick={() => goToCheckout(bundle, "product_buy_box")}
        >
          Comprar agora
        </button>

        <ShippingEstimate />

        <div className="assure">
          <div>
            <Icon d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" />
            <span>
              7 dias para devolver, sem precisar justificar. 12 meses de garantia de fábrica.
            </span>
          </div>
          <div>
            <Icon d="M3 7h13v10H3zM16 10h4l1 3v4h-5" />
            <span>{FREE_SHIPPING_LABEL} e envio em até 1 dia útil, com rastreio.</span>
          </div>
          <div>
            <Icon d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z" />
            <span>Videoaula e suporte no WhatsApp para a primeira medição.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

/** Prazo estimado pelo CEP (ViaCEP). Frete sempre grátis. */
const ORIGIN_UF = "SP";
const ETA: Record<string, [number, number]> = {
  SP: [2, 4],
  RJ: [3, 5],
  MG: [3, 5],
  ES: [3, 6],
  PR: [3, 6],
  SC: [4, 7],
  RS: [4, 7],
  DF: [4, 7],
  GO: [4, 7],
  MS: [5, 8],
  MT: [5, 9],
  BA: [5, 9],
  SE: [6, 10],
  AL: [6, 10],
  PE: [6, 10],
  PB: [6, 10],
  RN: [6, 10],
  CE: [6, 10],
  PI: [7, 11],
  MA: [7, 11],
  TO: [6, 10],
  PA: [7, 12],
  AP: [8, 14],
  AM: [8, 14],
  RR: [8, 14],
  RO: [7, 12],
  AC: [8, 14],
};
function ShippingEstimate() {
  const [cep, setCep] = useState("");
  const [out, setOut] = useState<ReactNode>(null);
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
          {r.localidade}/{r.uf}: entrega em {a} a {b} dias úteis. <b>{FREE_SHIPPING_LABEL}.</b>
        </>,
      );
    } catch {
      setOut(`Não foi possível consultar agora. ${FREE_SHIPPING_LABEL}.`);
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

export { Faq, Closing };
