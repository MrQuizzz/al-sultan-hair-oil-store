import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PhakiSizePicker } from "./PhakiSizePicker";

describe("PhakiSizePicker", () => {
  afterEach(() => cleanup());
  it.each([
    ["250g", "800"],
    ["500g", "1,500"],
    ["1,000g", "3,000"],
  ])("updates selected price and WhatsApp order for %s", (size, price) => {
    render(<PhakiSizePicker phoneNumber="923025986280" />);
    fireEvent.change(screen.getByLabelText("Choose size"), { target: { value: size } });

    expect(screen.getByText(`Selected price: PKR ${price}`)).toBeTruthy();
    const orderLink = screen.getByTestId("phaki-whatsapp-order");
    const href = orderLink.getAttribute("href") ?? "";
    expect(decodeURIComponent(href)).toContain(`Al Sultan Phaki ${size} for PKR ${price}`);
  });
});
