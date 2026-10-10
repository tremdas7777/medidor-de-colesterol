import { cn } from "@/lib/utils";

/** Logo em texto da GlicoMax (troque por uma imagem quando houver o arquivo do logo). */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-display leading-none tracking-tight text-[var(--ink)] whitespace-nowrap", className)}
      aria-label="GlicoMax"
    >
      Glico<span className="italic text-[var(--primary)]">Max</span>
    </span>
  );
}
