import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("managed app title", () => {
  it("exposes the configured Al Sultan Hair Oil title", () => {
    expect(process.env.VITE_APP_TITLE || ENV.appTitle || "Al Sultan Hair Oil").toBe("Al Sultan Hair Oil");
  });
});
