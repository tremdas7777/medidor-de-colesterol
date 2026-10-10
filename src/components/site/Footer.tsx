import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  HeartPulse,
  Mail,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { brand } from "@/lib/brand";
import { FREE_SHIPPING_LABEL } from "@/lib/bundles";
import { getSiteSettings } from "@/lib/site-settings.functions";


const productLinks = [
  { label: "Glicosímetro GlicoMax", to: "/produto" as const },
  { label: "Kits", href: "/#planos" },
  { label: "Como funciona", href: "/#tecnologia" },
  { label: "Especificações", to: "/produto" as const },
] as const;

const supportLinks = [
  { label: "FAQ", to: "/faq" as const },
  { label: "Rastrear pedido", to: "/rastreio" as const },
  { label: "Contato", to: "/contato" as const },
  { label: "Sobre", to: "/sobre" as const },
] as const;

const legalLinks = [
  { label: "Envio", to: "/politica-envio" as const },
  { label: "Privacidade", to: "/politica-privacidade" as const },
  { label: "Reembolso", to: "/politica-reembolso" as const },
] as const;

const highlights = [
  { Icon: Truck, label: FREE_SHIPPING_LABEL },
  { Icon: Activity, label: "Glicose" },
  { Icon: HeartPulse, label: "Batimentos" },
  { Icon: Zap, label: "Leitura em segundos" },
  { Icon: ShieldCheck, label: "SSL seguro" },
  { Icon: Package, label: "Rastreio" },
] as const;

function FooterLink({
  item,
}: {
  item: { label: string; to?: string; href?: string };
}) {
  const className = "text-sm text-white/65 hover:text-[var(--primary)] transition-colors";
  if ("to" in item && item.to) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className}>
      {item.label}
    </a>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
        {title}
      </h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const fetchSettings = useServerFn(getSiteSettings);
  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => fetchSettings(),
    staleTime: 60_000,
  });
  const whatsappEnabled = settings?.whatsappEnabled ?? false;
  const whatsappHref = `https://wa.me/${brand.whatsapp.phoneE164}?text=${encodeURIComponent(
    "Olá! Quero tirar uma dúvida sobre o glicosímetro GlicoMax.",
  )}`;


  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="border-b border-white/10 bg-[var(--primary-deep)]">
        <div className="container-edge py-6 md:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-display text-xl md:text-2xl leading-tight text-balance">
            Glicose e batimentos na ponta do dedo, em segundos.
          </p>
          <Link
            to="/produto"
            className="inline-flex shrink-0 items-center justify-center bg-[var(--primary)] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] rounded-xl hover:opacity-90"
          >
            Ver kits
          </Link>
        </div>
      </div>

      <div className="container-edge py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8">
          <div className="col-span-2 md:col-span-4">
            <Link to="/" aria-label="GlicoMax — início" className="inline-block group">
              <span className="inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] ring-1 ring-white/15 transition-transform group-hover:scale-[1.01]">
                <BrandLogo className="text-[1.9rem] md:text-[2.1rem]" />
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/60 leading-relaxed">
              {brand.productName} · {brand.taglineShort}.
            </p>
            {brand.email && (
              <a
                href={`mailto:${brand.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-white/75 hover:text-[var(--primary)]"
              >
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                {brand.email}
              </a>
            )}
            {whatsappEnabled && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition hover:opacity-95 hover:shadow-[0_14px_30px_-14px_rgba(0,0,0,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label={`Chamar no WhatsApp ${brand.whatsapp.display}`}
              >
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                WhatsApp {brand.whatsapp.display}
              </a>
            )}

          </div>

          <div className="col-span-1 md:col-span-2">
            <FooterColumn title="Produto">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="col-span-1 md:col-span-2">
            <FooterColumn title="Suporte">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="col-span-2 md:col-span-4">
            <FooterColumn title="Legal">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </FooterColumn>
            <p className="mt-4 text-[10px] leading-relaxed text-white/35 md:max-w-xs">
              Uso doméstico. Não substitui avaliação médica. {FREE_SHIPPING_LABEL}.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-x-5 gap-y-2">
          {highlights.map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-[10px] text-white/50">
              <Icon className="w-3.5 h-3.5 text-[var(--primary)]" strokeWidth={1.5} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-edge py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-white/40">
          <span>
            © {year} {brand.name}
            {brand.company.legalName && <> · {brand.company.legalName}</>}
            {brand.company.cnpj && <> · CNPJ {brand.company.cnpj}</>}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/politica-privacidade" className="hover:text-[var(--primary)]">
              Privacidade
            </Link>
            <Link to="/politica-envio" className="hover:text-[var(--primary)]">
              Envio
            </Link>
            <Link to="/contato" className="hover:text-[var(--primary)]">
              Suporte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
