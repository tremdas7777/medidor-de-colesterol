import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CardioHome } from "@/components/cardio/Home";

const TITLE = "CardioChek PA | Meça seu colesterol em casa em 90 segundos";
const DESCRIPTION =
  "Saiba como estão seu colesterol, HDL, triglicérides e glicose em casa, com uma gota de sangue do dedo e resultado em 90 segundos. Frete grátis e 7 dias para devolver.";

export const Route = createFileRoute("/")({
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
  return (
    <SiteLayout>
      <CardioHome />
    </SiteLayout>
  );
}
