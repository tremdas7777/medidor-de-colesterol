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
      { title: "Analisador CardioChek PA | Kits e preços" },
      {
        name: "description",
        content:
          "Compre o analisador CardioChek PA: colesterol total, HDL, triglicérides e glicose com uma gota de sangue, em até 90 segundos. Kits com tiras e frete grátis.",
      },
      { property: "og:title", content: "Analisador CardioChek PA" },
      { property: "og:url", content: "/produto" },
      { property: "og:image", content: productHeroImage },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
