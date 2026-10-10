import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { consultaImage } from "@/lib/product-images";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre a ${brand.name}` },
      {
        name: "description",
        content: `A ${brand.name} vende equipamentos de diagnóstico rápido para clínicas, farmácias e profissionais de saúde.`,
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
              <h1 className="h2">Exame na hora, dentro do seu atendimento.</h1>
              <p className="lead">
                A {brand.name} leva equipamentos de diagnóstico rápido para clínicas, farmácias,
                nutricionistas e empresas. Nosso trabalho não termina na entrega: a gente ajuda a
                implantar o serviço, precificar o teste e atender com segurança.
              </p>
              <p className="lead">
                Vendemos o que conhecemos, com nota fiscal, garantia e atendimento humano do pedido
                até o primeiro paciente.
              </p>
            </div>
            <img
              src={consultaImage}
              alt="Profissional de saúde atendendo paciente"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
