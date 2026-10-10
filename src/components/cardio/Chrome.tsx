import { Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { FREE_SHIPPING_LABEL } from "@/lib/bundles";
import { HeartMark } from "@/components/site/HeartMark";
import "./cardio.css";

/** Barra fina do topo + cabeçalho. Fica no topo de todas as páginas da vitrine. */
export function CardioHeader() {
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
          <nav aria-label="Principal" className="l">
            <a href="/#como">Como funciona</a>
            <a href="/#para-quem">Para quem é</a>
            <a href="/produto">O aparelho</a>
          </nav>
          <Link to="/" className="logo" aria-label={`${brand.name}, início`}>
            <HeartMark className="hm-mark" />
            {brand.name}
          </Link>
          <nav aria-label="Atalhos" className="r">
            <a href="/#kits">Kits</a>
            <Link to="/faq">Dúvidas</Link>
            <Link to="/rastreio">Rastrear pedido</Link>
          </nav>
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
                <HeartMark className="hm-mark" />
                {brand.name}
              </Link>
              <p>Saúde do coração acompanhada de perto, em casa.</p>
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
            CardioChek® é marca registrada da PTS Diagnostics. Somos revendedores e não temos
            vínculo oficial com o fabricante. O CardioChek PA ajuda a acompanhar seus números e não
            substitui consulta, diagnóstico ou tratamento médico. Leia as instruções de uso antes de
            usar.
            {brand.anvisa && ` Registro ANVISA nº ${brand.anvisa}.`}
          </div>
        </div>
      </footer>
    </div>
  );
}
