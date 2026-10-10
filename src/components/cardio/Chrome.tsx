import { Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { DEFAULT_BUNDLE_ID, FREE_SHIPPING_LABEL, getBundle } from "@/lib/bundles";
import { trackCheckoutClick } from "@/lib/analytics";
import "./cardio.css";

/** Barra fina do topo + cabeçalho. Fica no topo de todas as páginas da vitrine. */
export function CardioHeader() {
  const b = getBundle(DEFAULT_BUNDLE_ID);
  return (
    <div className="cm">
      <div className="cm-util">
        <div className="wrap">
          <span>
            {FREE_SHIPPING_LABEL.replace(" para todo o Brasil", "")}
            <span className="hm"> para todo o Brasil</span> · <b>Pix com aprovação na hora</b>
          </span>
          <div className="r">
            <span>Nota fiscal em todos os pedidos</span>
            <span>Envio em até 1 dia útil</span>
          </div>
        </div>
      </div>
      <header className="cm-hdr">
        <div className="wrap">
          <Link to="/" className="logo" aria-label={`${brand.name}, início`}>
            <i />
            {brand.name}
          </Link>
          <nav aria-label="Principal">
            <a href="/#problema">Por que ter um</a>
            <a href="/#resultados">Resultados</a>
            <a href="/#retorno">Retorno</a>
            <a href="/#kits">Kits</a>
            <Link to="/rastreio">Rastrear pedido</Link>
          </nav>
          <a
            className="btn btn-buy buy"
            href={b.checkoutUrl}
            onClick={() =>
              trackCheckoutClick({
                source: "header",
                bundleId: b.id,
                bundleName: b.name,
                value: b.price,
              })
            }
          >
            Comprar
          </a>
        </div>
      </header>
    </div>
  );
}

export function CardioFooter() {
  const { legalName, cnpj } = brand.company;
  const wa = brand.whatsapp.phoneE164;
  return (
    <div className="cm">
      <footer className="cm-ft">
        <div className="wrap">
          <div className="cols">
            <div>
              <Link to="/" className="logo">
                <i />
                {brand.name}
              </Link>
              <p>Equipamentos de diagnóstico rápido para clínicas, farmácias e profissionais de saúde.</p>
            </div>
            <div>
              <h5>Loja</h5>
              <Link to="/">CardioChek PA</Link>
              <a href="/#kits">Kits</a>
              <Link to="/faq">Dúvidas</Link>
              <Link to="/rastreio">Rastrear pedido</Link>
            </div>
            <div>
              <h5>Políticas</h5>
              <Link to="/politica-reembolso">Trocas e devoluções</Link>
              <Link to="/politica-envio">Envio</Link>
              <Link to="/politica-privacidade">Privacidade</Link>
            </div>
            <div>
              <h5>Atendimento</h5>
              <Link to="/contato">Contato</Link>
              {wa && (
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
                  WhatsApp {brand.whatsapp.display}
                </a>
              )}
              {brand.email && <a href={`mailto:${brand.email}`}>{brand.email}</a>}
              <span>Seg. a sex., 8h às 18h</span>
            </div>
          </div>
          <div className="legal">
            {(legalName || cnpj) && (
              <>
                {[legalName, cnpj && `CNPJ ${cnpj}`].filter(Boolean).join(" · ")}
                <br />
              </>
            )}
            CardioChek® é marca registrada da PTS Diagnostics. Somos revendedores e não temos vínculo
            oficial com o fabricante. Equipamento de uso profissional. Os resultados não substituem
            avaliação médica.
            {brand.anvisa && ` Registro ANVISA nº ${brand.anvisa}.`}
          </div>
        </div>
      </footer>
    </div>
  );
}
