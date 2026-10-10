import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deleteGatewayKeyFn,
  getPixGatewayStatus,
  saveGatewayKeyFn,
  setPixGatewayFn,
  testGatewayKeyFn,
} from "@/lib/pix-gateway.functions";

type Gateway = "sagacepay" | "pixgate";
type KeyInfo = { key: string | null; source: "admin" | "secret" | null };
type Status = {
  selected: Gateway;
  active: Gateway;
  configured: Record<Gateway, boolean>;
  keys: Record<Gateway, KeyInfo>;
};

const GATEWAYS: Gateway[] = ["sagacepay", "pixgate"];
const LABEL: Record<Gateway, string> = { sagacepay: "SagacePay", pixgate: "PixGate" };
const SECRET: Record<Gateway, string> = {
  sagacepay: "SAGACEPAY_API_KEY",
  pixgate: "PIXGATE_API_KEY",
};
const PLACEHOLDER: Record<Gateway, string> = {
  sagacepay: "Chave da API SagacePay (sk_live_…)",
  pixgate: "Chave da API PixGate",
};

/** Escolha do gateway do Pix (SagacePay ou PixGate) + chave de cada um. */
export function PixGatewayCard({ password }: { password: string }) {
  const statusFn = useServerFn(getPixGatewayStatus);
  const setFn = useServerFn(setPixGatewayFn);
  const saveFn = useServerFn(saveGatewayKeyFn);
  const deleteFn = useServerFn(deleteGatewayKeyFn);
  const testFn = useServerFn(testGatewayKeyFn);

  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = () => {
    statusFn({ data: { password } })
      .then(setStatus)
      .catch(() => setStatus(null));
  };

  useEffect(() => {
    if (password) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  /** Executa a ação e mostra o resultado; devolve se deu certo. */
  const run = async (label: string, fn: () => Promise<string>): Promise<boolean> => {
    setBusy(label);
    setMsg(null);
    try {
      setMsg(await fn());
      return true;
    } catch (e) {
      setMsg(e instanceof Error && e.message ? e.message : "Algo deu errado. Tente de novo.");
      return false;
    } finally {
      setBusy(null);
      refresh();
    }
  };

  const choose = (gateway: Gateway) =>
    run(`set-${gateway}`, async () => {
      await setFn({ data: { password, gateway } });
      return `Pronto: os próximos Pix saem pela ${LABEL[gateway]}. Pedidos já gerados continuam no gateway de origem.`;
    });

  const saveKey = (gateway: Gateway, key: string) =>
    run(`save-${gateway}`, async () => {
      await saveFn({ data: { password, gateway, key } });
      return `Chave da ${LABEL[gateway]} salva.`;
    });

  const deleteKey = (gateway: Gateway) =>
    run(`delete-${gateway}`, async () => {
      await deleteFn({ data: { password, gateway } });
      return `Chave da ${LABEL[gateway]} apagada do painel.`;
    });

  /** Consulta o gateway com a chave em uso, sem gerar Pix nem pedido. */
  const testKey = (gateway: Gateway) =>
    run(`test-${gateway}`, async () => {
      const r = await testFn({ data: { password, gateway } });
      return r.ok
        ? `Chave da ${LABEL[gateway]} aceita (teste sem gerar pedido).`
        : `Chave da ${LABEL[gateway]} com problema: ${r.error ?? `erro ${r.status ?? ""}`}`;
    });

  return (
    <Card className="mt-3 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ArrowLeftRight className="w-5 h-5 text-muted-foreground" aria-hidden />
          <div>
            <div className="font-medium">Gateway do Pix</div>
            <div className="text-xs text-muted-foreground">
              Escolha quem gera os próximos Pix (padrão: SagacePay). A troca vale na hora; pedidos
              já gerados continuam sendo confirmados pelo gateway em que foram criados.
            </div>
          </div>
        </div>
        <span className="text-xs whitespace-nowrap text-emerald-600">
          {status ? `Em uso: ${LABEL[status.active]}` : "…"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {GATEWAYS.map((g) => (
          <Button
            key={g}
            size="sm"
            variant={status?.selected === g ? "default" : "outline"}
            disabled={!status || !!busy || status.selected === g}
            onClick={() => choose(g)}
          >
            {busy === `set-${g}` ? "Salvando…" : LABEL[g]}
            {status && !status.configured[g] ? " (sem chave)" : ""}
          </Button>
        ))}
      </div>

      {status && status.active !== status.selected && (
        <p className="text-xs text-destructive">
          A {LABEL[status.selected]} está escolhida mas sem chave, então o checkout está usando a{" "}
          {LABEL[status.active]}. Cadastre a chave para ela entrar em uso.
        </p>
      )}

      {GATEWAYS.map((g) => (
        <KeySection
          key={g}
          gateway={g}
          info={status?.keys[g] ?? null}
          loading={status === null}
          busy={busy}
          onSave={(key) => saveKey(g, key)}
          onDelete={() => deleteKey(g)}
          onTest={() => testKey(g)}
        />
      ))}
      <p className="text-xs text-muted-foreground">
        Webhook: a loja informa sozinha o endereço <code>/api/public/pix-webhook</code> em cada
        cobrança, nos dois gateways. Não precisa cadastrar nada.
      </p>
      {msg && <p className="text-xs">{msg}</p>}
    </Card>
  );
}

function KeySection({
  gateway,
  info,
  loading,
  busy,
  onSave,
  onDelete,
  onTest,
}: {
  gateway: Gateway;
  info: KeyInfo | null;
  loading: boolean;
  busy: string | null;
  onSave: (key: string) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
  onTest: () => Promise<boolean>;
}) {
  const [key, setKey] = useState("");
  const label = loading
    ? "…"
    : info?.source === "admin"
      ? "Chave do painel"
      : info?.source === "secret"
        ? "Secret do Lovable"
        : "Sem chave";

  return (
    <div className="flex flex-col gap-2 border-t pt-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-medium">Chave da API {LABEL[gateway]}</div>
        <span
          className={`text-xs whitespace-nowrap ${info?.source ? "text-emerald-600" : "text-destructive"}`}
        >
          {label}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">
        A chave salva aqui tem prioridade. Sem ela, vale o secret {SECRET[gateway]} do Lovable.
      </div>
      <Input
        type="password"
        autoComplete="off"
        aria-label={`Chave da API ${LABEL[gateway]}`}
        placeholder={info?.key ? `Chave em uso (${info.key})` : PLACEHOLDER[gateway]}
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          disabled={key.trim().length < 10 || !!busy}
          onClick={() => onSave(key.trim()).then((ok) => ok && setKey(""))}
        >
          {busy === `save-${gateway}` ? "Salvando…" : `Salvar chave ${LABEL[gateway]}`}
        </Button>
        <Button size="sm" variant="outline" disabled={!info?.source || !!busy} onClick={onTest}>
          {busy === `test-${gateway}` ? "Testando…" : `Testar chave ${LABEL[gateway]}`}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={info?.source !== "admin" || !!busy}
          onClick={onDelete}
        >
          {busy === `delete-${gateway}` ? "Apagando…" : "Apagar chave do painel"}
        </Button>
      </div>
    </div>
  );
}
