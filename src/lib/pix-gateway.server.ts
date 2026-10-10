// Gateway do Pix: SagacePay (único gateway da loja). Somente servidor.
// O id do pedido é o id da venda na SagacePay, então status, webhook e admin consultam direto nela.
import { sagaceCashin, sagaceStatus } from "@/lib/sagacepay.server";

export type PixCustomer = { name: string; email: string; phone: string; cpf: string };

/** O Pix expira em 30 minutos (mesmo prazo mostrado no checkout). */
export const PIX_EXPIRES_IN_SECONDS = 30 * 60;

/** Gera a cobrança Pix. Valor em centavos. */
export async function createPix(o: {
  amount: number;
  customer: PixCustomer;
  /** Nome genérico enviado ao gateway, sem detalhes do produto real. */
  description: string;
  origin: string;
}): Promise<{ id: string; qrcode: string; status: string }> {
  return sagaceCashin({
    amountCents: o.amount,
    customer: o.customer,
    description: o.description,
    postbackUrl: `${new URL(o.origin).origin}/api/public/pix-webhook`,
    externalId: crypto.randomUUID(),
    expiresInSeconds: PIX_EXPIRES_IN_SECONDS,
  });
}

/** Status real de um pedido Pix na SagacePay. Valor em centavos. */
export const fetchPixStatus = (id: string) => sagaceStatus(id);
