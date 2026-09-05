import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/commerce/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Leaf,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "923001234567"; // Replace with the business WhatsApp number.

function money(value: { amount: string; currencyCode: string }) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: value.currencyCode || "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value.amount));
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, loading } = useCart();
  const variant = product.variants[0];
  const image = product.images[0];
  const productType = product.productType || "Product";
  const isPhaki = productType.toLowerCase().includes("phaki");
  const cleanDescription = product.description.replace(/<[^>]+>/g, "");
  const formatMatch = cleanDescription.match(/Format:\s*([^H]+?)(?=Highlights:|$)/i)?.[1]?.trim();
  const highlights = cleanDescription.match(/Highlights:\s*(.*)$/i)?.[1]?.split(";").map((item) => item.trim()).filter(Boolean) ?? [];

  return (
    <article className="product-card group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#f4ead2]">
        {image ? (
          <img src={image.url} alt={image.altText || product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-[#a88b50]"><Leaf size={48} /></div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2"><Badge className="border-0 bg-[#f9cf6b] text-[#174f3b] hover:bg-[#f9cf6b]">{isPhaki ? "Phaki" : "Signature oil"}</Badge><Badge className="border border-white/70 bg-[#fffdf7]/85 text-[#174f3b] hover:bg-[#fffdf7]">Preview image</Badge></div>
      </div>
      <div className="flex flex-1 flex-col px-1 pt-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#c08a2c]">{productType}</p>
        <h3 className="font-display text-2xl leading-tight text-[#174f3b]">{product.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6f796f]">{cleanDescription.split("Format:")[0].trim()}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[#174f3b]">{formatMatch && <span className="rounded-full bg-[#f7f0de] px-3 py-1">{formatMatch}</span>}{highlights.slice(0, 3).map((highlight) => <span key={highlight} className="rounded-full bg-[#edf3e6] px-3 py-1">{highlight}</span>)}</div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-display text-2xl text-[#174f3b]">{money(variant.price)}</span>
          <Button
            className="rounded-full bg-[#174f3b] px-5 text-white shadow-lg shadow-[#174f3b]/15 hover:bg-[#0e392b]"
            disabled={!variant.availableForSale || loading}
            onClick={() => addItem(variant.id)}
          >
            <ShoppingBag size={16} />
            {variant.availableForSale ? "Add to cart" : "Sold out"}
          </Button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem, proceedToCheckout, loading } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#123829]/35 backdrop-blur-sm" onClick={closeCart}>
      <aside className="flex h-full w-full max-w-md flex-col bg-[#fffdf7] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#eadfc7] pb-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c08a2c]">Your selection</p><h2 className="font-display text-3xl text-[#174f3b]">Shopping bag</h2></div>
          <button aria-label="Close cart" onClick={closeCart} className="rounded-full p-2 text-[#174f3b] hover:bg-[#f4ead2]"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-5">
          {!cart?.items.length ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#6f796f]"><ShoppingBag size={42} className="mb-4 text-[#c08a2c]" /><p className="font-display text-2xl text-[#174f3b]">Your bag is waiting.</p><p className="mt-2 max-w-xs text-sm">Add a favourite oil or phaki blend to begin your order.</p></div>
          ) : cart.items.map((item) => (
            <div key={item.lineId} className="flex gap-4 border-b border-[#eadfc7] py-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#f4ead2]">{item.image && <img src={item.image.url} alt={item.productTitle} className="h-full w-full object-cover" />}</div>
              <div className="min-w-0 flex-1"><p className="font-semibold text-[#174f3b]">{item.productTitle}</p><p className="mt-1 text-sm text-[#8a8f86]">{item.variantTitle !== "Default Title" ? item.variantTitle : "Standard pack"}</p><p className="mt-2 font-bold text-[#c08a2c]">{money(item.unitPrice)}</p>
                <div className="mt-2 flex items-center gap-2"><div className="flex items-center rounded-full border border-[#eadfc7] bg-white"><button aria-label="Decrease quantity" disabled={loading} onClick={() => updateQuantity(item.lineId, item.quantity - 1)} className="p-1.5"><Minus size={14} /></button><span className="w-7 text-center text-sm">{item.quantity}</span><button aria-label="Increase quantity" disabled={loading} onClick={() => updateQuantity(item.lineId, item.quantity + 1)} className="p-1.5"><Plus size={14} /></button></div><button onClick={() => removeItem(item.lineId)} className="text-xs font-semibold text-[#b36550]">Remove</button></div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#eadfc7] pt-5">
          <div className="mb-3 flex justify-between text-lg font-bold text-[#174f3b]"><span>Subtotal</span><span>{cart ? money(cart.subtotal) : "PKR 0"}</span></div>
          <p className="mb-4 text-xs leading-5 text-[#6f796f]">Cash on delivery is available across Pakistan. Shipping and final delivery details are confirmed at Shopify checkout.</p>
          <Button disabled={!cart?.items.length || loading} onClick={proceedToCheckout} className="h-12 w-full rounded-full bg-[#c08a2c] text-[#fffdf7] hover:bg-[#a87520]">Continue to secure checkout <ArrowRight size={17} /></Button>
        </div>
      </aside>
    </div>
  );
}

export default function Home() {
  const { data: products = [], isLoading } = trpc.commerce.products.list.useQuery({ first: 25 });
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((product) => product.productType || "Product")))], [products]);
  const visibleProducts = products.filter((product) => filter === "All" || (product.productType || "Product") === filter);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalam-o-Alaikum, I would like to ask about your oil and phaki products.")}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffdf7] text-[#174f3b]">
      <div className="bg-[#174f3b] px-4 py-2 text-center text-xs font-semibold tracking-wide text-[#f9e8b4]">Nationwide delivery across Pakistan · Cash on delivery available</div>
      <header className="sticky top-0 z-40 border-b border-[#eadfc7]/80 bg-[#fffdf7]/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between gap-5">
          <a href="#top" className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f9cf6b] text-[#174f3b]"><Leaf size={23} /></span><span><span className="block font-display text-2xl font-bold leading-none">Pak Oil Co.</span><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c08a2c]">Purely yours</span></span></a>
          <nav className={`${menuOpen ? "absolute left-0 right-0 top-20 flex border-b border-[#eadfc7] bg-[#fffdf7] p-5" : "hidden"} flex-col gap-4 text-sm font-semibold md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a><a href="#care" onClick={() => setMenuOpen(false)}>Why Pak Oil</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>
          <div className="flex items-center gap-2"><a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="hidden rounded-full p-3 text-[#174f3b] hover:bg-[#f4ead2] sm:block"><Phone size={18} /></a><Button onClick={openCart} className="relative rounded-full bg-[#174f3b] px-4 text-white hover:bg-[#0e392b]"><ShoppingBag size={17} /><span className="hidden sm:inline">Bag</span>{itemCount > 0 && <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f9cf6b] px-1 text-[10px] font-bold text-[#174f3b]">{itemCount}</span>}</Button><button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-2 md:hidden"><Menu size={22} /></button></div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section relative isolate overflow-hidden"><div className="container grid min-h-[610px] items-center gap-12 py-20 lg:grid-cols-[1.03fr_.97fr]"><div className="relative z-10 max-w-xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c08a2c]/30 bg-[#fff8e6] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a56f17]"><Sparkles size={15} /> Rooted in everyday care</div><h1 className="font-display text-6xl leading-[.94] text-[#174f3b] sm:text-7xl">A little <span className="text-[#c08a2c]">gold</span> for your everyday ritual.</h1><p className="mt-7 max-w-lg text-lg leading-8 text-[#5f7067]">Thoughtfully presented oils and traditional phaki blends, made to bring warmth, heritage, and confidence to your shelf.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#shop" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#174f3b] px-7 font-semibold text-white shadow-xl shadow-[#174f3b]/20 transition hover:-translate-y-0.5 hover:bg-[#0e392b]">Explore the collection <ArrowRight size={17} /></a><a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#174f3b]/20 bg-white/60 px-6 font-semibold text-[#174f3b] hover:bg-white"><Phone size={17} /> Ask on WhatsApp</a></div></div><div className="relative mx-auto w-full max-w-[500px]"><div className="absolute -inset-6 rounded-[4rem] bg-[#f9cf6b]/35 blur-3xl" /><div className="hero-art relative overflow-hidden rounded-[3rem] border-8 border-white/80 bg-[#d9e0b7] shadow-2xl shadow-[#174f3b]/15"><div className="absolute inset-0 bg-gradient-to-br from-[#174f3b]/20 via-transparent to-[#c08a2c]/30" /><div className="flex min-h-[420px] items-end justify-center gap-4 p-8 sm:min-h-[480px]"><div className="bottle bottle-tall"><span>PAK<br />OIL</span></div><div className="bottle bottle-short"><span>PHaki<br />BLEND</span></div><div className="absolute bottom-5 left-7 rounded-full bg-[#fffdf7]/85 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#174f3b]">Tradition · Care · Trust</div></div></div></div></div></section>

        <section className="border-y border-[#eadfc7] bg-[#f7f0de]"><div className="container grid gap-6 py-7 sm:grid-cols-3"><div className="flex items-center gap-3"><Truck className="text-[#c08a2c]" /><div><p className="font-bold">Delivered nationwide</p><p className="text-sm text-[#6f796f]">Across Pakistan</p></div></div><div className="flex items-center gap-3"><ShieldCheck className="text-[#c08a2c]" /><div><p className="font-bold">Carefully presented</p><p className="text-sm text-[#6f796f]">Clear product information</p></div></div><div className="flex items-center gap-3"><PackageCheck className="text-[#c08a2c]" /><div><p className="font-bold">Cash on delivery</p><p className="text-sm text-[#6f796f]">Simple, familiar checkout</p></div></div></div></section>

        <section id="shop" className="container py-24"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">The collection</p><h2 className="section-title">Find your daily favourite.</h2></div><div className="flex flex-wrap gap-2">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === category ? "bg-[#174f3b] text-white" : "bg-[#f4ead2] text-[#174f3b] hover:bg-[#eadcbf]"}`}>{category}</button>)}</div></div>{isLoading ? <div className="mt-12 grid gap-8 md:grid-cols-2"><div className="skeleton-card" /><div className="skeleton-card" /></div> : <div className="mt-12 grid gap-10 md:grid-cols-2">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>}{!isLoading && !visibleProducts.length && <p className="mt-10 rounded-3xl bg-[#f7f0de] p-8 text-center text-[#6f796f]">Your catalogue is ready for its first products. Add them in Shopify to see them here.</p>}</section>

        <section id="story" className="bg-[#174f3b] text-[#fffdf7]"><div className="container grid gap-12 py-24 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="eyebrow text-[#f9cf6b]">Our story</p><h2 className="section-title text-[#fffdf7]">Heritage, made easy for today.</h2></div><div className="max-w-2xl"><p className="text-xl leading-9 text-[#d8e2cb]">Pak Oil Co. brings the familiar warmth of traditional care into a calm, modern shopping experience. Every product page is designed to make the important details easy to find: what it is, how it is packed, and how it reaches your door.</p><div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="rounded-3xl border border-white/15 bg-white/10 p-6"><Leaf className="mb-4 text-[#f9cf6b]" /><h3 className="font-display text-2xl">Thoughtful ingredients</h3><p className="mt-2 text-sm leading-6 text-[#c7d5c1]">We keep the product details clear so you can shop with confidence and choose what fits your home.</p></div><div className="rounded-3xl border border-white/15 bg-white/10 p-6"><Check className="mb-4 text-[#f9cf6b]" /><h3 className="font-display text-2xl">Clear service</h3><p className="mt-2 text-sm leading-6 text-[#c7d5c1]">From product questions to delivery updates, thoughtful support is always close by.</p></div></div></div></div></section>

        <section id="care" className="container py-24"><div className="max-w-2xl"><p className="eyebrow">Made for your peace of mind</p><h2 className="section-title">A smoother way to order in Pakistan.</h2></div><div className="mt-12 grid gap-6 md:grid-cols-3"><div className="care-card"><span>01</span><h3>Choose your product</h3><p>Browse clear prices in PKR and product formats that fit your routine.</p></div><div className="care-card"><span>02</span><h3>Pay your way</h3><p>Continue to secure Shopify checkout, with cash-on-delivery messaging for local customers.</p></div><div className="care-card"><span>03</span><h3>Stay connected</h3><p>Use WhatsApp for product questions, order support, and friendly updates.</p></div></div></section>

        <section id="contact" className="border-t border-[#eadfc7] bg-[#f7f0de]"><div className="container flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center"><div><p className="eyebrow">Need a hand?</p><h2 className="font-display text-4xl text-[#174f3b]">We are one message away.</h2><p className="mt-3 max-w-xl text-[#6f796f]">Ask about a product, check delivery details, or get help with an order. Our team is happy to guide you.</p></div><a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#174f3b] px-7 py-4 font-bold text-[#f9cf6b] shadow-lg shadow-[#174f3b]/20 hover:bg-[#0e392b]"><Phone size={19} /> Chat on WhatsApp</a></div></section>
      </main>

      <footer className="bg-[#123829] text-[#d8e2cb]"><div className="container flex flex-col justify-between gap-5 py-10 sm:flex-row sm:items-center"><div><p className="font-display text-2xl text-[#fffdf7]">Pak Oil Co.</p><p className="mt-1 text-sm">Warm care, beautifully bottled.</p></div><p className="text-xs text-[#9fb19a]">© {new Date().getFullYear()} Pak Oil Co. · Pakistan</p></div></footer>
      <CartDrawer />
    </div>
  );
}
