import { Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import {
  FREE_SHIPPING_MIN,
  getUpgradeBundle,
  isFreeShippingEligible,
  type Bundle,
} from "@/lib/bundles";
import { cn } from "@/lib/utils";
import { brl } from "./parts";

/** Barra "faltam R$ X para frete grátis", com atalho para o kit que libera o frete. */
export function FreeShippingProgress({
  bundle,
  subtotal,
  className,
  offerUpgrade = true,
  freteCost,
}: {
  bundle: Bundle;
  subtotal: number;
  className?: string;
  /** Mostra a oferta de trocar para o kit que libera o frete (etapa do frete). */
  offerUpgrade?: boolean;
  /** Valor do frete que o cliente pagaria sem o upgrade (para comparar). */
  freteCost?: number;
}) {
  const eligible = isFreeShippingEligible(subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));
  const upgrade = getUpgradeBundle(bundle);
  const showUpgrade = offerUpgrade && !eligible && upgrade && isFreeShippingEligible(upgrade.price);
  const diff = upgrade ? Math.round((upgrade.price - bundle.price) * 100) / 100 : 0;

  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-[13px]",
        eligible ? "border-[var(--ck-ok)] bg-[var(--ck-badge)]/40" : "border-amber-300 bg-amber-50",
        className,
      )}
    >
      <p className="flex items-center gap-2">
        <Truck
          className={cn("h-4 w-4 shrink-0", eligible ? "text-[var(--ck-ok)]" : "text-amber-600")}
        />
        {eligible ? (
          <span>
            Parabéns! Você ganhou <b className="text-[var(--ck-ok)]">FRETE GRÁTIS</b>
          </span>
        ) : (
          <span>
            Faltam <b>{brl(FREE_SHIPPING_MIN - subtotal)}</b> para você ganhar <b>FRETE GRÁTIS</b>
          </span>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            eligible ? "bg-[var(--ck-ok)]" : "bg-amber-500",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showUpgrade && (
        <div className="mt-3 rounded-md border border-[var(--ck-ok)]/30 bg-white p-3">
          <p className="text-[13px] leading-snug">
            Por só <b className="text-[var(--ck-ok)]">+{brl(diff)}</b> você leva o{" "}
            <b>{upgrade.name}</b> ({upgrade.description.toLowerCase()})
            {freteCost ? (
              <>
                {" "}
                e <b>não paga os {brl(freteCost)} de frete</b>.
              </>
            ) : (
              <>
                {" "}
                e ganha <b>FRETE GRÁTIS</b>.
              </>
            )}
          </p>
          <Link
            to="/checkout"
            search={{ plano: upgrade.id }}
            replace
            resetScroll={false}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[var(--ck-ok)] px-3 py-2.5 text-[13px] font-bold text-white transition hover:opacity-90"
          >
            <Truck className="h-4 w-4" /> Trocar para o {upgrade.name} com frete grátis
          </Link>
        </div>
      )}
    </div>
  );
}
