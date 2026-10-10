import { Link } from "@tanstack/react-router";
import { Check, Truck } from "lucide-react";
import {
  FREE_SHIPPING_MIN,
  getUpgradeBundle,
  isFreeShippingEligible,
  type Bundle,
} from "@/lib/bundles";
import { cn } from "@/lib/utils";
import { brl } from "./parts";

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Frete grátis a partir de FREE_SHIPPING_MIN.
 * - Já liberado: "Você ganhou frete grátis".
 * - Na etapa do frete (`offerUpgrade`), abaixo do mínimo: as duas escolhas lado a lado, com o
 *   total de cada uma — manter o kit e pagar o frete, ou trocar para o kit seguinte e não pagar.
 * - No resumo lateral: só uma linha curta, sem repetir a oferta.
 */
export function FreeShippingProgress({
  bundle,
  subtotal,
  className,
  offerUpgrade = true,
  freteCost,
}: {
  bundle: Bundle;
  /** Produtos + order bump, sem frete. */
  subtotal: number;
  className?: string;
  /** Mostra as duas escolhas (etapa do frete). */
  offerUpgrade?: boolean;
  /** Frete mais barato pago, para calcular o total de quem não troca. */
  freteCost?: number;
}) {
  const eligible = isFreeShippingEligible(subtotal);
  const upgrade = getUpgradeBundle(bundle);
  const upgradeSubtotal = upgrade ? round(subtotal - bundle.price + upgrade.price) : 0;
  const canUpgrade = !!upgrade && isFreeShippingEligible(upgradeSubtotal);

  if (eligible) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-[var(--ck-ok)] bg-[var(--ck-badge)]/40 px-4 py-3 text-[13px]",
          className,
        )}
      >
        <Truck className="h-4 w-4 shrink-0 text-[var(--ck-ok)]" />
        <span>
          Você ganhou <b className="text-[var(--ck-ok)]">FRETE GRÁTIS</b> (pedido acima de{" "}
          {brl(FREE_SHIPPING_MIN)}).
        </span>
      </div>
    );
  }

  // Resumo lateral, ou não há kit maior que libere o frete: só a informação, sem oferta.
  if (!offerUpgrade || !canUpgrade || !upgrade) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-[13px]",
          className,
        )}
      >
        <Truck className="h-4 w-4 shrink-0 text-amber-600" />
        <span>
          Frete grátis a partir de <b>{brl(FREE_SHIPPING_MIN)}</b>. Faltam{" "}
          <b>{brl(round(FREE_SHIPPING_MIN - subtotal))}</b>.
        </span>
      </div>
    );
  }

  const frete = freteCost ?? 0;
  const keepTotal = round(subtotal + frete);
  const upgradeTotal = upgradeSubtotal;
  const extra = round(upgradeTotal - keepTotal);
  const moreStrips = upgrade.strips - bundle.strips;

  return (
    <div
      className={cn("rounded-lg border border-amber-300 bg-amber-50 p-4 text-[13px]", className)}
    >
      <p className="flex items-center gap-2 text-[14px] font-semibold">
        <Truck className="h-4 w-4 shrink-0 text-amber-600" />
        Frete grátis a partir de {brl(FREE_SHIPPING_MIN)}
      </p>
      <p className="mt-1 text-muted-foreground">
        Seu pedido está em <b className="text-foreground">{brl(subtotal)}</b>. Escolha uma das
        opções:
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {/* Opção 1: manter o kit e pagar o frete */}
        <div className="rounded-md border border-border bg-white p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Opção 1
          </p>
          <p className="mt-1 font-semibold">Manter o {bundle.name}</p>
          <p className="mt-1 text-muted-foreground">
            {brl(subtotal)} + frete {brl(frete)}
          </p>
          <p className="mt-2 text-[15px] font-bold">Total {brl(keepTotal)}</p>
          <p className="mt-1 text-[12px] text-muted-foreground">Escolha o frete logo abaixo.</p>
        </div>

        {/* Opção 2: trocar para o kit que libera o frete */}
        <div className="rounded-md border-2 border-[var(--ck-ok)] bg-white p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--ck-ok)]">
            Opção 2 · Mais vantajosa
          </p>
          <p className="mt-1 font-semibold">Trocar para o {upgrade.name}</p>
          <p className="mt-1 text-muted-foreground">{upgrade.description}</p>
          <p className="mt-2 text-[15px] font-bold">
            Total {brl(upgradeTotal)} <span className="text-[var(--ck-ok)]">· frete grátis</span>
          </p>
          <ul className="mt-2 space-y-1 text-[12px]">
            {moreStrips > 0 && (
              <li className="flex gap-1.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ck-ok)]" />
                Leva {moreStrips} tiras a mais
              </li>
            )}
            <li className="flex gap-1.5">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ck-ok)]" />
              {extra > 0
                ? `Só ${brl(extra)} a mais que a opção 1`
                : extra === 0
                  ? "Mesmo valor da opção 1"
                  : `${brl(-extra)} a menos que a opção 1`}
            </li>
          </ul>
          <Link
            to="/checkout"
            search={{ plano: upgrade.id }}
            replace
            resetScroll={false}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[var(--ck-ok)] px-3 py-2.5 text-[13px] font-bold text-white transition hover:opacity-90"
          >
            Trocar e ganhar frete grátis
          </Link>
        </div>
      </div>
      <p className="mt-2 text-[12px] text-muted-foreground">
        Ao trocar, seus dados continuam preenchidos.
      </p>
    </div>
  );
}
