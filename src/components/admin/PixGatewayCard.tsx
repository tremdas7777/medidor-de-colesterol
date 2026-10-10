import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deleteSagacePayKeyFn,
  getSagacePayStatus,
  saveSagacePayKeyFn,
  testSagacePayFn,
} from "@/lib/pix-gateway.functions";

type KeyInfo = { key: string | null; source: "admin" | "secret" | null };

/** Gateway do Pix (SagacePay): chave da API salva no painel, com teste e exclusão. */
export function PixGatewayCard({ password }: { password: string }) {
  const statusFn = useServerFn(getSagacePayStatus);
  const saveFn = useServerFn(saveSagacePayKeyFn);
  const deleteFn = useServerFn(deleteSagacePayKeyFn);
  const testFn = useServerFn(testSagacePayFn);

  const [info, setInfo] = useState<KeyInfo | null>(null);
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = () => {
    statusFn({ data: { password } })
      .then(setInfo)
      .catch(() => setInfo(null));
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

  const save = () =>
    run("save", async () => {
      await saveFn({ data: { password, key: key.trim() } });
      return "Chave da SagacePay salva. Os próximos Pix já usam esta chave.";
    }).then((ok) => ok && setKey(""));

  const remove = () =>
    run("delete", async () => {
      await deleteFn({ data: { password } });
      return "Chave da SagacePay apagada do painel.";
    });

  /** Consulta a SagacePay com a chave em uso, sem gerar Pix nem pedido. */
  const test = () =>
    run("test", async () => {
      const r = await testFn({ data: { password } });
      return r.ok
        ? "Chave da SagacePay aceita (teste sem gerar pedido)."
        : `Chave da SagacePay com problema: ${r.error ?? `erro ${r.status ?? ""}`}`;
    });

  const label =
    info === null
      ? "…"
      : info.source === "admin"
        ? "Chave do painel"
        : info.source === "secret"
          ? "Secret do Lovable"
          : "Sem chave";

  return (
    <Card className="mt-3 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <QrCode className="w-5 h-5 text-muted-foreground" aria-hidden />
          <div>
            <div className="font-medium">Gateway do Pix: SagacePay</div>
            <div className="text-xs text-muted-foreground">
              Todos os Pix da loja são gerados na SagacePay. A chave salva aqui tem prioridade; sem
              ela, vale o secret SAGACEPAY_API_KEY do Lovable.
            </div>
          </div>
        </div>
        <span
          className={`text-xs whitespace-nowrap ${info?.source ? "text-emerald-600" : "text-destructive"}`}
        >
          {label}
        </span>
      </div>

      <Input
        type="password"
        autoComplete="off"
        aria-label="Chave da API SagacePay"
        placeholder={
          info?.key ? `Chave em uso (${info.key})` : "Chave da API SagacePay (sk_live_…)"
        }
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" disabled={key.trim().length < 10 || !!busy} onClick={save}>
          {busy === "save" ? "Salvando…" : "Salvar chave"}
        </Button>
        <Button size="sm" variant="outline" disabled={!info?.source || !!busy} onClick={test}>
          {busy === "test" ? "Testando…" : "Testar chave"}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={info?.source !== "admin" || !!busy}
          onClick={remove}
        >
          {busy === "delete" ? "Apagando…" : "Apagar chave do painel"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Webhook: a loja informa sozinha o endereço <code>/api/public/pix-webhook</code> em cada
        cobrança. Não precisa cadastrar nada na SagacePay.
      </p>
      {msg && <p className="text-xs">{msg}</p>}
    </Card>
  );
}
