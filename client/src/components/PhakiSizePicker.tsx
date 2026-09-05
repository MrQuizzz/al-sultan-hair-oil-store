import React, { useState } from "react";
import { createPhakiWhatsAppMessage, getPhakiPrice, PHAKI_VARIANTS } from "@/lib/phaki";

export function PhakiSizePicker({ phoneNumber }: { phoneNumber: string }) {
  const [size, setSize] = useState<string>(PHAKI_VARIANTS[0].size);
  const message = createPhakiWhatsAppMessage(size);
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div data-testid="phaki-size-picker" className="mt-5 rounded-3xl border border-[#eadfc7] bg-[#f7f0de] p-4">
      <label htmlFor="phaki-size" className="mb-2 block text-sm font-bold text-[#174f3b]">Choose size</label>
      <select id="phaki-size" value={size} onChange={(event) => setSize(event.target.value)} className="h-11 w-full rounded-full border border-[#eadfc7] bg-white px-4 text-sm text-[#174f3b]">
        {PHAKI_VARIANTS.map((variant) => <option key={variant.size} value={variant.size}>{variant.size} — PKR {variant.price.toLocaleString("en-PK")}</option>)}
      </select>
      <p className="mt-3 text-sm font-semibold text-[#174f3b]">Selected price: PKR {getPhakiPrice(size).toLocaleString("en-PK")}</p>
      <a data-testid="phaki-whatsapp-order" href={href} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#174f3b] px-5 py-3 text-sm font-bold text-white hover:bg-[#0e392b]">Order selected size on WhatsApp</a>
    </div>
  );
}
