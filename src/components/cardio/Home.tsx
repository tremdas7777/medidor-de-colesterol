import { useEffect, useState } from "react";
import { brl, DEFAULT_BUNDLE_ID, getBundle } from "@/lib/bundles";
import { metaTrack } from "@/lib/meta-pixel";
import imgCasal from "@/assets/casal.webp";
import imgPensativo from "@/assets/pensativo.webp";
import imgGota from "@/assets/gota.webp";
import { Device, Marquee, useReveal } from "./fx";
import {
  Closing,
  Credentials,
  DoctorBand,
  ExitIntent,
  Faq,
  goToProduct,
  Guarantee,
  KitCards,
  off,
  Pain,
  Personas,
  Race,
  scrollTo,
  Showcase,
  StepByStep,
  StickyBuy,
} from "./sections";
import "./cardio.css";

const SLIDE_MS = 7000;

/** Banner da home: 3 slides que trocam sozinhos (dor → produto → oferta). */
function Hero() {
  const bundle = getBundle(DEFAULT_BUNDLE_ID);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % 3), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, paused]);

  const slides = [
    {
      bg: imgPensativo,
      tab: "O problema",
      body: (
        <>
          <span className="kicker">Colesterol alto não dá sintoma</span>
          <h1>
            Você sabe como está o seu colesterol <em>hoje</em>?
          </h1>
          <p className="sub">
            Muita gente só olha para ele no exame anual, quando faz. Com uma gota do dedo, você
            descobre em casa, em 90 segundos.
          </p>
          <div className="ctas">
            <button type="button" className="btn btn-buy" onClick={() => goToProduct(bundle)}>
              Quero medir em casa
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollTo("como")}>
              Ver como funciona
            </button>
          </div>
        </>
      ),
    },
    {
      bg: imgCasal,
      tab: "O aparelho",
      device: true,
      body: (
        <>
          <span className="kicker">CardioChek PA · PTS Diagnostics</span>
          <h2>
            Colesterol, HDL, triglicérides e glicose em <em>90 segundos</em>.
          </h2>
          <p className="sub">
            O mesmo aparelho usado em consultórios e farmácias, agora na mesa da sua cozinha. Sem
            agulha na veia, sem fila, sem esperar dias.
          </p>
          <div className="ctas">
            <button type="button" className="btn btn-buy" onClick={() => goToProduct(bundle)}>
              Comprar agora
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollTo("aparelho")}>
              Conhecer o aparelho
            </button>
          </div>
        </>
      ),
    },
    {
      bg: imgGota,
      tab: "A oferta",
      body: (
        <>
          <span className="kicker">{bundle.name} · frete grátis</span>
          <h2>
            Uma gota. <em>Seis resultados.</em> Para a família toda.
          </h2>
          <div className="price-tag">
            {bundle.compareAtPrice && <s>{brl(bundle.compareAtPrice)}</s>}
            <b>{brl(bundle.price)}</b>
            {bundle.compareAtPrice && (
              <span style={{ color: "#ff4a4f", fontWeight: 700 }}>{off(bundle)}% off</span>
            )}
          </div>
          <div className="ctas">
            <button type="button" className="btn btn-buy" onClick={() => goToProduct(bundle)}>
              Garantir o meu
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollTo("kits")}>
              Ver todos os kits
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <section
      className="hero"
      aria-roledescription="carrossel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, n) => (
        <div key={s.tab} className={`slide-h ${n === i ? "on" : ""}`} aria-hidden={n !== i}>
          <div className="bg" style={{ backgroundImage: `url(${s.bg})` }} />
          <div className="shade" />
          {s.device && (
            <div className="dev-slot">
              <Device float />
            </div>
          )}
          <div className="wrap in-wrap">
            <div className="txt">{s.body}</div>
          </div>
        </div>
      ))}
      <div className="hero-nav">
        <div className="wrap">
          {slides.map((s, n) => (
            <button
              type="button"
              key={s.tab}
              className={n === i ? "on" : n < i ? "done" : ""}
              style={{
                ["--dur" as string]: `${SLIDE_MS}ms`,
                animationPlayState: paused ? "paused" : "running",
              }}
              onClick={() => setI(n)}
              aria-label={`Slide ${n + 1}: ${s.tab}`}
            >
              <i>
                <b style={{ animationPlayState: paused ? "paused" : "running" }} />
              </i>
              <span>{s.tab}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CardioHome() {
  const ref = useReveal();
  const bundle = getBundle(DEFAULT_BUNDLE_ID);
  useEffect(() => {
    metaTrack("ViewContent", { value: bundle.price, contentName: bundle.name });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="cm" ref={ref}>
      <Hero />
      <Marquee
        items={[
          "Colesterol total",
          "HDL",
          "LDL",
          "Triglicérides",
          "Glicose",
          "Resultado em 90 segundos",
          "Frete grátis",
          "7 dias para devolver",
        ]}
      />
      <Credentials />
      <Pain />
      <Race />
      <Showcase />
      <Personas />
      <StepByStep />
      <DoctorBand />
      <KitCards />
      <Guarantee />
      <Faq limit={6} />
      <Closing bundle={bundle} target="product" />
      <StickyBuy bundle={bundle} anchor=".cm .hero" target="product" />
      <ExitIntent />
    </div>
  );
}
