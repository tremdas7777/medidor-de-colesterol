import { createFileRoute } from "@tanstack/react-router";

// Notificação da SagacePay ({ event: "sale.paid", data: { id, ... } }). O corpo não é confiável:
// usamos só o id da venda e sempre confirmamos o status em GET /sales/:id antes de reportar a venda.
export const Route = createFileRoute("/api/public/pix-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- corpo do gateway sem tipo
        const body = (await request.json().catch(() => null)) as any;
        const rawId = body?.data?.id ?? body?.id ?? body?.sale?.id;
        const id = rawId == null ? "" : String(rawId);
        console.log("pix-webhook", body?.event, id);
        if (!/^[\w-]{1,64}$/.test(id)) return Response.json({ ok: true });
        try {
          const { fetchGatewayStatus, reportPaidOnce, isPaidStatus } =
            await import("@/lib/pix-orders.server");
          const { status, amount } = await fetchGatewayStatus(id);
          if (isPaidStatus(status)) await reportPaidOnce(id, amount);
        } catch (e) {
          console.error("pix-webhook failed", e);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
