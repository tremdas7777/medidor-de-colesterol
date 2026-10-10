import { afterEach, describe, expect, it } from "vitest";
import { applyPrices, DEFAULT_PRICES } from "@/lib/prices";
import {
  FREE_SHIPPING_MIN,
  getBundle,
  getUpgradeBundle,
  isFreeShippingEligible,
} from "@/lib/bundles";

describe("frete grátis", () => {
  afterEach(() => applyPrices(null));

  it("só libera a partir de R$ 90 em produtos", () => {
    expect(FREE_SHIPPING_MIN).toBe(90);
    expect(isFreeShippingEligible(89.99)).toBe(false);
    expect(isFreeShippingEligible(90)).toBe(true);
  });

  it("o kit de entrada não ganha frete e o upgrade sugerido é o Kit Essencial, que ganha", () => {
    const p = structuredClone(DEFAULT_PRICES);
    p.bundles["1"] = { price: 69.9, compareAt: null };
    p.bundles["2"] = { price: 99.9, compareAt: null };
    p.bundles["3"] = { price: 129.9, compareAt: null };
    applyPrices(p);
    const entrada = getBundle("1");
    const upgrade = getUpgradeBundle(entrada)!;
    expect(isFreeShippingEligible(entrada.price)).toBe(false);
    expect(upgrade.name).toBe("Kit Essencial");
    expect(isFreeShippingEligible(upgrade.price)).toBe(true);
  });
});
