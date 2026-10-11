# CardioMed Store (CardioChek PA)

Loja do analisador CardioChek PA, feita a partir da estrutura da loja AiDEX/GlicoMax (painel
`/admin` com pedidos, lucro, checkouts abandonados, integrações; checkout Pix, order bump, upsell,
envio expresso, UTMify, Meta e Rotasync).

**Pagamento: Pix, pela SagacePay, PixGate ou MagicPay.** No `/admin` → Integrações você escolhe
qual gera os próximos Pix (padrão: SagacePay). Cada pedido guarda em qual gateway nasceu (PixGate
com prefixo `pg_` e MagicPay com `mp_` no id), então status, webhook (`/api/public/pix-webhook`), upsell, envio expresso e
relatórios consultam sempre o gateway certo, mesmo depois de uma troca.

## Antes de publicar

- **Banco**: ative o Lovable Cloud (projeto novo, não use o banco da GlicoMax) e rode as migrações de
  `supabase/migrations`.
- **Segredos** (Lovable Cloud): `ADMIN_PASSWORD`, `RASTREIO_API_KEY` (Rotasync; opcional
  `RASTREIO_API_URL`). As chaves da **SagacePay**, da **PixGate** e da **MagicPay** (pública + secreta) são
  cadastradas no `/admin` → Integrações (com botão de testar); os secrets `SAGACEPAY_API_KEY`,
  `PIXGATE_API_KEY`, `MAGICPAY_PUBLIC_KEY` e `MAGICPAY_SECRET_KEY` servem de reserva. UTMify e Meta também ficam no `/admin`.
- **Marca e empresa**: `src/lib/brand.ts` (razão social, CNPJ, ANVISA, e-mail, domínio, WhatsApp).
- **Preços e kits**: `src/lib/bundles.ts` · **order bump**: `src/lib/order-bump.ts` ·
  **upsell**: `src/lib/upsell.ts`.
- **Textos da vitrine** (perfis, bônus, avaliações, FAQ): `src/lib/store-content.ts`. A seção de
  avaliações só aparece quando houver depoimentos reais em `REVIEWS`.
- **Pixels do `<head>`**: `src/lib/pixels.ts` (Meta, TikTok, UTMify).
- **Fotos**: `src/lib/product-images.ts` e `src/assets/`.

This project was built with [Lovable](https://lovable.dev).

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
