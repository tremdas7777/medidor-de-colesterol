import { useEffect, useState } from "react";
import { availableBundles, FREE_SHIPPING_LABEL } from "@/lib/bundles";

const featured = availableBundles.find((b) => b.featured);

const messages = [
  FREE_SHIPPING_LABEL,
  ...(featured ? [`Kit ${featured.name.toLowerCase()} — ${featured.badge?.toLowerCase() ?? "oferta"} · ${featured.savings?.toLowerCase() ?? ""}`] : []),
  "Glicosímetro GlicoMax · Glicose e batimentos em segundos",
  "Compra segura · envio para todo o Brasil",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-[var(--primary)] text-white"
      role="region"
      aria-label="Anúncio da loja"
      aria-live="polite"
    >
      <p
        key={index}
        className="container-edge truncate py-1.5 text-center text-[9px] font-bold uppercase leading-none tracking-[0.11em] md:py-2 md:text-xs md:tracking-[0.18em] animate-in fade-in duration-500"
        title={messages[index]}
      >
        {messages[index]}
      </p>
    </div>
  );
}
