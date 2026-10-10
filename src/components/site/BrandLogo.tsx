import { cn } from "@/lib/utils";
import { HeartMark } from "./HeartMark";

/** Logo em texto da CardioMed (troque por uma imagem quando houver o arquivo do logo). */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-bold leading-none tracking-tight text-[#16181b] whitespace-nowrap",
        className,
      )}
      style={{ fontFamily: "Archivo, system-ui, sans-serif" }}
      aria-label="CardioMed"
    >
      <HeartMark size={40} className="h-[0.9em] w-[0.9em]" />
      CardioMed
    </span>
  );
}
