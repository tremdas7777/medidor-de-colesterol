/**
 * Única regra de "pagamento confirmado" do site (servidor, webhook, página do pedido e admin).
 * A SagacePay usa pending → paid | failed | refunded | expired; só "paid" é venda.
 * Não aceite "approved": em alguns gateways ele significa Pix gerado e ainda não pago.
 */
const PAID_STATUSES = new Set(["paid", "pago", "completed", "concluido", "concluida", "confirmed"]);

export const isPaidStatus = (status: string | null | undefined) =>
  PAID_STATUSES.has(
    String(status ?? "")
      .trim()
      .toLowerCase(),
  );
