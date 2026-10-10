import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import imgCuidar from "@/assets/cuidar-pais.webp";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre a ${brand.name}` },
      {
        name: "description",
        content: `A ${brand.name} leva para casa aparelhos para acompanhar colesterol e glicose.`,
      },
      { property: "og:title", content: `Sobre a ${brand.name}` },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <div className="cm">
        <section className="sec" style={{ borderTop: 0 }}>
          <div className="wrap how">
            <div>
              <span className="label">Sobre</span>
              <h1 className="h2">Saber como está o coração não devia esperar o exame do ano.</h1>
              <p className="lead">
                A {brand.name} leva para dentro de casa aparelhos que antes ficavam só no
                consultório, para você acompanhar seus números e os da sua família entre uma
                consulta e outra.
              </p>
              <p className="lead">
                Vendemos o que conhecemos, com nota fiscal, garantia e atendimento humano do pedido
                até a sua primeira medição.
              </p>
            </div>
            <img src={imgCuidar} alt="Filha cuidando do pai em casa" loading="lazy" />
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
