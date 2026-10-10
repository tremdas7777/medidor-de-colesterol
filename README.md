# Glicomax Store

Loja do glicosímetro GlicoMax, feita a partir da estrutura da loja AiDEX (painel `/admin`,
checkout Pix/cartão, order bumps, upsell, envio expresso, UTMify, Meta e Rotasync).

## Antes de publicar

- **Banco**: ative o Lovable Cloud e rode as migrações de `supabase/migrations`.
- **Segredos** (Lovable Cloud): `ADMIN_PASSWORD`, `PIXGATE_API_KEY`, `RASTREIO_API_KEY`
  (Rotasync; opcional `RASTREIO_API_URL`). HyperCash, UTMify e Meta são cadastrados no `/admin`.
- **Marca e empresa**: `src/lib/brand.ts` (razão social, CNPJ, e-mail, domínio, WhatsApp).
- **Preços e kits**: `src/lib/bundles.ts` · **order bumps**: `src/lib/order-bump.ts`.
- **Pixels do `<head>`**: `src/lib/pixels.ts` (Meta, TikTok, UTMify).
- **Fotos**: `src/lib/product-images.ts` e `src/assets/` (as atuais são provisórias).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ff46747-1aac-4ef1-a971-98ecd6b77f2a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
