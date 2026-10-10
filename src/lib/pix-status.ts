/**
 * Única regra de "pagamento confirmado" do site (servidor, webhook, página do pedido e admin).
 * Vale para os dois gateways (SagacePay e PixGate). Não aceite "approved": a PixGate usa esse
 * status para Pix gerado e ainda não pago.
 */
const PAID_STATUSES = new Set(["paid", "pago", "completed", "concluido", "concluida", "confirmed"]);

export const isPaidStatus = (status: string | null | undefined) =>
  PAID_STATUSES.has(
    String(status ?? "")
      .trim()
      .toLowerCase(),
  );
