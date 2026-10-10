import { useEffect } from "react";
import { metaTrack } from "@/lib/meta-pixel";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FaqSection, CtaFinal, ProductUsageSection } from "@/components/site/sections";
import { BundleSelector } from "@/components/site/BundleSelector";
import {
  availableBundles,
  getBundle,
  brl,
  bundleDurationLabel,
  bundleShippingLabel,
  FREE_SHIPPING_LABEL,
  FREE_SHIPPING_MIN,
  unitsLabel,
  type BundleId,
} from "@/lib/bundles";
import { brand } from "@/lib/brand";
import { useState } from "react";
import { productGallery, productHeroImage, productKitImage } from "@/lib/product-images";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { ShieldCheck, Truck, RotateCcw, Activity, HeartPulse, Sun, Fingerprint, Package } from "lucide-react";
import { StoreImage } from "@/components/site/StoreImage";
import { trackCheckoutClick } from "@/lib/analytics";

const entryPrice = availableBundles[0]!.price;

export const Route = createFileRoute("/produto")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Glicosímetro GlicoMax — Kits de 1 a 3 unidades | GlicoMax" },
      {
        name: "description",
        content: `Compre o glicosímetro GlicoMax: mede a glicose no sangue sem furar o dedo, pelo sensor, e também a frequência cardíaca, com tela colorida. Kits de 1 a 3 unidades. ${FREE_SHIPPING_LABEL}.`,
      },
      { property: "og:title", content: "Glicosímetro GlicoMax" },
      {
        property: "og:description",
        content: `Glicose e batimentos sem furar o dedo, em segundos. A partir de ${brl(entryPrice)}.`,
      },
      { property: "og:url", content: "/produto" },
      { property: "og:image", content: productHeroImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/produto" }],
  }),
  component: Page,
});

const baseFeatures = [
  { Icon: Activity, label: "Glicose no sangue (mg/dL) em segundos" },
  { Icon: HeartPulse, label: "Frequência cardíaca na mesma tela" },
  { Icon: Sun, label: "Tela colorida, fácil de ler" },
  { Icon: Fingerprint, label: "Leitura pelo sensor, sem furar o dedo" },
] as const;

const gallery = productGallery;

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/produto" });
  const initialId = getBundle(bundleIdFromSearch(search)).id;
  const [selected, setSelected] = useState<BundleId>(initialId);
  const [activeImg, setActiveImg] = useState(0);
  const bundle = getBundle(selected);
  useEffect(() => {
    metaTrack("ViewContent", { value: bundle.price, contentName: bundle.name });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const active = gallery[activeImg] ?? gallery[0]!;
  const features = [
    ...baseFeatures,
    { Icon: Package, label: `${unitsLabel(bundle.units)} no kit` },
  ];

  const onSelect = (id: BundleId) => {
    setSelected(id);
    navigate({
      search: (previous) => ({ ...previous, plano: id }),
      replace: true,
      resetScroll: false,
    });
  };

  return (
    <SiteLayout>
      <ProductStructuredData />
      {/* ============ HERO PRODUCT ============ */}
      <section className="pt-0 pb-20 md:pb-28">
        <div className="container-edge grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-[calc(var(--site-chrome-h,5.5rem)+0.75rem)]">
            <StoreImage
              key={activeImg}
              src={active.src}
              alt={active.alt}
              variant="product-hero"
              bg={active.bg}
              loading="eager"
            />
            <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]/50">
              {active.caption}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {gallery.map((g, i) => (
                <button
                  key={g.caption}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={g.caption}
                  aria-current={activeImg === i}
                  className={`shrink-0 h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-xl transition-opacity ${
                    activeImg === i ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <StoreImage
                    src={g.src}
                    alt=""
                    variant="product-thumb"
                    bg={g.bg}
                    loading="lazy"
                    frameClassName="h-full w-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5">
            <span className="mb-6 block text-3xl font-extrabold uppercase leading-none tracking-[0.12em] text-[var(--primary)] md:text-4xl">
              {brand.productName}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-balance">
              Glicosímetro <span className="italic">digital.</span>
            </h1>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]">
              <Fingerprint className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span>Sem furar o dedo, sem agulha, sem gota de sangue — sem aplicativo</span>
            </div>
            <p className="mt-5 text-[var(--ink)]/70 leading-relaxed text-[15px]">
              Mede a glicose no sangue (mg/dL) pelo sensor no dedo, sem agulha e sem gota de sangue, e também mostra a
              frequência cardíaca em poucos segundos. Encaixe o dedo, aperte o botão e leia os números na tela colorida.
              Escolha o kit com 1, 2 ou 3 unidades — um para você e outros para quem você cuida.
            </p>

            {/* Bundle selector */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Escolha seu kit
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40">
                  {availableBundles.length} kits
                </span>
              </div>
              <BundleSelector selected={selected} onSelect={onSelect} />
            </div>

            {/* Summary */}
            <div className="mt-8 border-t border-[rgba(13,13,13,0.1)] pt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/50">
                    {bundle.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">
                    {bundleDurationLabel(bundle)}
                  </div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="font-display text-5xl md:text-6xl leading-none">
                      {brl(bundle.price)}
                    </span>
                    {bundle.compareAtPrice && (
                      <span className="text-sm text-[var(--ink)]/40 line-through">
                        {brl(bundle.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={bundle.checkoutUrl}
              onClick={() =>
                trackCheckoutClick({
                  source: "product_buy_box",
                  bundleId: bundle.id,
                  bundleName: bundle.name,
                  value: bundle.price,
                })
              }
              className="mt-6 flex items-center justify-center gap-2 w-full text-center bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.22em] rounded-xl hover:opacity-90 transition-all duration-300 hover:tracking-[0.26em] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Comprar Agora
            </a>

            {/* Trust strip */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <Trust Icon={Truck} title="Frete grátis" sub={`Acima de ${brl(FREE_SHIPPING_MIN)}`} />
              <Trust Icon={ShieldCheck} title="Compra" sub="100% segura" />
              <Trust Icon={RotateCcw} title="7 dias" sub="garantia" />
            </div>

            {/* Features */}
            <ul className="mt-8">
              {features.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-4 border-b border-[rgba(13,13,13,0.06)] py-4 text-sm">
                  <Icon className="w-4 h-4 text-[var(--primary)] shrink-0" strokeWidth={1.5} />
                  <span className="text-[var(--ink)]/80">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ SPECS ============ */}
      <section className="bg-white border-t border-[rgba(13,13,13,0.08)] py-24 md:py-32">
        <div className="container-edge">
          <div className="flex items-baseline gap-4 md:gap-6 mb-16">
            <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">01 —</span>
            <h2 className="font-display text-4xl md:text-6xl text-balance">Especificações técnicas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(13,13,13,0.08)] border border-[rgba(13,13,13,0.08)] rounded-xl overflow-hidden">
            {/* Acrescente aqui os dados do manual do fabricante (alimentação, faixas de medição, precisão). */}
            <Spec k="Mede" v="Glicose e batimentos" />
            <Spec k="Tela" v="Colorida" />
            <Spec k="Indicador" v="Barra de pulso" />
            <Spec k="Operação" v="1 botão" />
            <Spec k="Dimensões" v="5,7 × 3,1 × 3 cm" />
            <Spec k="No kit" v={unitsLabel(bundle.units)} />
            <Spec k="Uso" v="Doméstico · sem agulha" />
            <Spec k="Garantia" v="7 dias + suporte" />
          </div>
        </div>
      </section>

      <ProductUsageSection />

      {/* ============ IN THE BOX ============ */}
      <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.08)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <StoreImage
              src={productKitImage}
              alt="Glicosímetro GlicoMax"
              variant="section-content"
              bg="#ffffff"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-4 md:gap-6 mb-12">
              <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">02 —</span>
              <h2 className="font-display text-4xl md:text-6xl">No seu pedido</h2>
            </div>
            <ul className="space-y-5">
              {[
                [`${bundle.units}× Glicosímetro GlicoMax`, "Sensor no dedo, sem agulha · tela colorida"],
                ["Envio com rastreamento", bundleShippingLabel(bundle)],
                ["Suporte humano", "Ajuda com o pedido e com o uso do aparelho"],
                ["Garantia de 7 dias", "Direito de arrependimento (Código de Defesa do Consumidor)"],
              ].map(([t, s]) => (
                <li key={t} className="flex items-start gap-5 border-b border-[rgba(13,13,13,0.06)] pb-5">
                  <span className="text-[var(--primary)] font-display text-2xl leading-none mt-1">+</span>
                  <div>
                    <div className="text-base font-medium">{t}</div>
                    <div className="text-sm text-[var(--ink)]/55 mt-1">{s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection limit={8} />
      <CtaFinal />
    </SiteLayout>
  );
}

function ProductStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brand.productName,
    image: productHeroImage,
    description:
      "Glicosímetro GlicoMax: mede a glicose no sangue (mg/dL) pelo sensor no dedo, sem furar, e também a frequência cardíaca, com tela colorida. Kits de 1 a 3 unidades.",
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    offers: availableBundles.map((bundle) => ({
      "@type": "Offer",
      name: bundle.name,
      price: bundle.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: bundle.checkoutUrl,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function Trust({ Icon, title, sub }: { Icon: typeof Truck; title: string; sub: string }) {
  return (
    <div className="store-card border border-[rgba(13,13,13,0.1)] p-4 flex flex-col items-center text-center gap-1.5">
      <Icon className="w-4 h-4 text-[var(--ink)]/70" strokeWidth={1.5} />
      <div className="text-[10px] uppercase tracking-[0.18em] font-bold leading-tight">{title}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50 leading-tight">{sub}</div>
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white p-6 md:p-8">
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--ink)]/40">{k}</div>
      <div className="mt-3 font-display text-2xl md:text-3xl leading-tight">{v}</div>
    </div>
  );
}
