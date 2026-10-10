import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CardioStore } from "@/components/cardio/Store";
import { DEFAULT_BUNDLE_ID, parseBundleId, type BundleId } from "@/lib/bundles";
import { planSearchSchema } from "@/lib/plan-search";

const TITLE = "Analisador CardioChek PA | Colesterol, HDL, Triglicérides e Glicose";
const DESCRIPTION =
  "CardioChek PA: perfil lipídico e glicose com uma gota de sangue, resultado em até 90 segundos. Frete grátis, nota fiscal e Pix com aprovação na hora.";

export const Route = createFileRoute("/")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const selected = parseBundleId(search.plano) ?? DEFAULT_BUNDLE_ID;
  const onSelect = (id: BundleId) =>
    navigate({ search: (prev) => ({ ...prev, plano: id }), replace: true, resetScroll: false });
  return (
    <SiteLayout>
      <CardioStore selected={selected} onSelect={onSelect} />
    </SiteLayout>
  );
}
