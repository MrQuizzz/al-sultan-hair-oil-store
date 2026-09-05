import { describe, expect, it } from "vitest";
import { createPhakiWhatsAppMessage, getPhakiPrice } from "./phaki";

describe("Al Sultan Phaki size dashboard", () => {
  it.each([
    ["250g", 800],
    ["500g", 1500],
    ["1,000g", 3000],
  ])("maps %s to PKR %s and the matching WhatsApp order message", (size, price) => {
    expect(getPhakiPrice(size)).toBe(price);
    expect(createPhakiWhatsAppMessage(size)).toContain(`Al Sultan Phaki ${size} for PKR ${price.toLocaleString("en-PK")}`);
  });
});
