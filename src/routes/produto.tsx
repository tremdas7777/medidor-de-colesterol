import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CardioStore } from "@/components/cardio/Store";
import { DEFAULT_BUNDLE_ID, parseBundleId, type BundleId } from "@/lib/bundles";
import { productHeroImage } from "@/lib/product-images";
import { planSearchSchema } from "@/lib/plan-search";

export const Route = createFileRoute("/produto")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Medidor de Colesterol CardioChek PA | Kits, preço e como usar" },
      {
        name: "description",
        content:
          "CardioChek PA para usar em casa: colesterol total, HDL, LDL, triglicérides e glicose com uma gota de sangue, em até 90 segundos. Kits com tiras, frete grátis acima de R$ 90 e 7 dias para devolver.",
      },
      { property: "og:title", content: "Medidor de Colesterol CardioChek PA" },
      { property: "og:url", content: "/produto" },
      { property: "og:image", content: productHeroImage },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/produto" }],
  }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/produto" });
  const selected = parseBundleId(search.plano) ?? DEFAULT_BUNDLE_ID;
  const onSelect = (id: BundleId) =>
    navigate({ search: (prev) => ({ ...prev, plano: id }), replace: true, resetScroll: false });
  return (
    <SiteLayout>
      <CardioStore selected={selected} onSelect={onSelect} />
    </SiteLayout>
  );
}
