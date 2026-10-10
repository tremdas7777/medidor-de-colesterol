import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { homeImages } from "@/lib/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a GlicoMax | Glicosímetro" },
      { name: "description", content: "A GlicoMax reúne em um aparelho de bolso a medição de glicose e os batimentos cardíacos, para acompanhar a saúde em casa." },
      { property: "og:title", content: "Sobre a GlicoMax" },
      { property: "og:description", content: "Glicose e batimentos na ponta do dedo, em segundos." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="pt-32 md:pt-44 pb-20">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow text-[var(--primary)] block mb-6">Sobre</span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance">
              Cuidado simples, <span className="italic">no dia a dia.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              A GlicoMax reúne em um aparelho de bolso duas medidas importantes: a glicose no sangue e os batimentos do coração.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge py-16">
          <StoreImage
            srcMobile={homeImages.lifestyleRunning.mobile}
            srcDesktop={homeImages.lifestyleRunning.desktop}
            alt="Glicosímetro GlicoMax na mesa de cabeceira"
            variant="section-full"
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">01 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Missão</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Facilitar o acompanhamento da saúde em casa com aparelhos simples de usar, fáceis de ler e com preço justo.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">02 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Valores</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Clareza sobre o que cada produto faz, atendimento humano e respeito a cada pessoa que confia na GlicoMax.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
