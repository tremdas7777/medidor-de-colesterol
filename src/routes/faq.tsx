import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Closing, Faq } from "@/components/cardio/Store";
import { DEFAULT_BUNDLE_ID, getBundle } from "@/lib/bundles";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas frequentes | CardioChek PA" },
      {
        name: "description",
        content:
          "Dúvidas sobre o analisador CardioChek PA: confiabilidade, tiras, jejum, entrega, pagamento e nota fiscal.",
      },
      { property: "og:title", content: "Perguntas frequentes sobre o CardioChek PA" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: () => (
    <SiteLayout>
      <div className="cm">
        <Faq id="faq" />
        <Closing bundle={getBundle(DEFAULT_BUNDLE_ID)} />
      </div>
    </SiteLayout>
  ),
});
