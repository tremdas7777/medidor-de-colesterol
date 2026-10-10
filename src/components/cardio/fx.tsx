import { useEffect, useRef, useState, type ReactNode } from "react";
import deviceCutout from "@/assets/cardiochek-recorte.png";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Anima a entrada dos elementos com [data-reveal] quando aparecem na tela.
 * Use uma vez por página, no elemento raiz.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduced()) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Dispara uma vez quando o elemento entra na tela. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (reduced()) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setSeen(true), {
      threshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

/** Número que conta de 0 até `to` quando aparece na tela. */
export function CountUp({
  to,
  suffix = "",
  ms = 1400,
}: {
  to: number;
  suffix?: string;
  ms?: number;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) return setN(to);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, ms]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** Faixa de texto correndo na horizontal. */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (
    <span className="mq-row">
      {items.map((t) => (
        <span key={t}>
          {t}
          <i aria-hidden />
        </span>
      ))}
    </span>
  );
  return (
    <div className="mq" aria-label={items.join(", ")}>
      <div className="mq-track" aria-hidden>
        {row}
        {row}
      </div>
    </div>
  );
}

export const LCD_SEQUENCE = [
  ["CHOL", "215", "Colesterol total"],
  ["HDL", "48", "HDL"],
  ["TRIG", "162", "Triglicérides"],
  ["GLU", "94", "Glicose"],
  ["LDL", "135", "LDL (calculado)"],
  ["TC/HDL", "4.5", "Razão CT/HDL"],
] as const;

/** Índice do resultado mostrado no visor, trocando a cada 2,2 s. */
export function useLcdCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setI((x) => (x + 1) % LCD_SEQUENCE.length), 2200);
    return () => clearInterval(t);
  }, []);
  return i;
}

/** Aparelho recortado (foto oficial) com o visor mostrando resultados ilustrativos em sequência. */
export function Device({
  className = "",
  float = false,
  children,
}: {
  className?: string;
  float?: boolean;
  children?: ReactNode;
}) {
  const i = useLcdCycle();
  const [k, v] = LCD_SEQUENCE[i]!;
  return (
    <div className={`dev ${float ? "float" : ""} ${className}`}>
      <img src={deviceCutout} alt="Analisador CardioChek PA" width={293} height={606} />
      <div className="dev-lcd" aria-hidden>
        <span className="k">{k}</span>
        <span className="v" key={i}>
          {v}
        </span>
        <span className="u" style={{ visibility: k === "TC/HDL" ? "hidden" : "visible" }}>
          mg/dL
        </span>
      </div>
      {children}
    </div>
  );
}
