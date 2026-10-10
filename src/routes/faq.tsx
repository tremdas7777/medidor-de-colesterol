import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FaqSection, CtaFinal } from "@/components/site/sections";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes | Glicosímetro GlicoMax" },
      {
        name: "description",
        content:
          "Tire dúvidas sobre o glicosímetro GlicoMax: como usar, o que ele mede, a leitura sem furar o dedo, kits, envio e garantia.",
      },
      { property: "og:title", content: "Perguntas frequentes sobre o glicosímetro GlicoMax" },
      {
        property: "og:description",
        content: "Saiba como funciona o glicosímetro GlicoMax, os kits e o envio.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: () => (
    <SiteLayout>
      <FaqSection />
      <CtaFinal />
    </SiteLayout>
  ),
});
