import { Link } from "@tanstack/react-router";
import { bannerGallery } from "@/lib/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { FREE_SHIPPING_LABEL } from "@/lib/bundles";

const slide = bannerGallery[0];

/**
 * O fundo do banner é um azul-claro quase uniforme. Estas camadas reproduzem
 * exatamente essa cor (medida na própria foto) para cobrir a legenda impressa
 * na imagem e escrever a mensagem principal por cima — a foto não é alterada.
 */
const coverDesktop =
  "linear-gradient(90deg,#f0f9ff 0%,#eff8ff 5%,#edf8fe 11%,#edf8fe 16%,#ecf6ff 21%,#e9f6fe 26%,#e8f5fd 31%,#e5f2fa 36%,#dceaf3 41%,#d9e7f0 45%,rgba(217,231,240,0) 52%)";

const coverMobile =
  "linear-gradient(90deg,#f0f9ff 0%,#edf8fe 11%,#e9f6fe 22%,#e7f6fd 33%,#e4f2fb 50%,#dff0fa 67%,#daeef9 83%,#d8ebf9 96%)";

const maskMobile = "linear-gradient(180deg,#000 0%,#000 80%,rgba(0,0,0,0) 100%)";

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: slide.bg }}>
      <div className="relative">
        <StoreImage
          srcMobile={slide.mobile}
          srcDesktop={slide.desktop}
          alt={slide.alt}
          variant="banner"
          bg={slide.bg}
          loading="eager"
          draggable={false}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[44%] md:hidden"
          style={{ backgroundImage: coverMobile, maskImage: maskMobile, WebkitMaskImage: maskMobile }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{ backgroundImage: coverDesktop }}
        />

        <div className="pointer-events-none absolute inset-0">
          <div className="container-edge flex h-full flex-col items-start justify-start pt-7 md:justify-center md:pt-0">
            <div className="pointer-events-auto max-w-[19rem] sm:max-w-[26rem] md:max-w-[26rem] lg:max-w-[32rem]">
              <p className="eyebrow text-[var(--primary-deep)]">Glicosímetro digital</p>
              <h1 className="mt-2.5 font-display text-[1.75rem] leading-[1.06] text-[var(--ink)] sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                Meça a glicose
                <br />
                <span className="italic text-[var(--primary-deep)]">sem furar o dedo.</span>
              </h1>
              <p className="mt-3 hidden max-w-[24rem] text-[0.78rem] leading-relaxed text-[var(--ink)]/70 md:block md:text-sm">
                Sensor no dedo: sem agulha, sem lanceta, sem gota de sangue e sem tiras. Os batimentos
                aparecem na mesma tela.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-6 md:gap-3">
                <Link
                  to="/produto"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--primary-foreground)] shadow-[0_12px_30px_-14px_rgba(3,105,161,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] md:px-6 md:py-3 md:text-xs md:tracking-[0.18em]"
                >
                  Ver kits
                </Link>
                <a
                  href="/#tecnologia"
                  className="inline-flex items-center justify-center rounded-xl border border-[rgba(13,13,13,0.18)] bg-white/70 px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--ink)] transition-colors duration-300 hover:border-[rgba(13,13,13,0.35)] hover:bg-white md:px-6 md:py-3 md:text-xs md:tracking-[0.18em]"
                >
                  Como funciona
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[rgba(13,13,13,0.08)] bg-[var(--paper)]">
        <div className="container-edge flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center sm:py-6">
          <p className="text-sm leading-relaxed text-[var(--ink)]/70 md:hidden">
            Sensor no dedo: sem agulha, sem lanceta, sem gota de sangue e sem tiras.
          </p>
          <p className="hidden text-xs font-medium uppercase tracking-[0.16em] text-[var(--ink)]/55 md:block">
            Glicosímetro GlicoMax · Glicose e batimentos em segundos · Sem furar o dedo · {FREE_SHIPPING_LABEL}
          </p>
          <div className="flex items-center md:hidden">
            <Link
              to="/produto"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary-foreground)] shadow-[0_12px_30px_-14px_rgba(3,105,161,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_16px_34px_-14px_rgba(3,105,161,0.95)]"
            >
              Ver kits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
