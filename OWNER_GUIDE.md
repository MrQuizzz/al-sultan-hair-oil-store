# Al Sultan Hair Oil Owner Guide

## What is connected

The storefront is connected to the Shopify development store created for this project. Products, inventory, cart creation, Shopify checkout, and fulfilment remain managed by Shopify. The website reads the published catalogue through the project’s typed commerce layer, so product cards update when the Shopify catalogue changes.

## Claim and configure the Shopify store

Open the project Management UI and go to **Settings → Integrations → Shopify**. Claim the development store and complete Shopify authorization before using the site for real orders. In Shopify Admin, set the store currency to **PKR**, add the correct Pakistan shipping zones and rates, and configure the payment options you actually support. The recommended launch setup is **Cash on Delivery** plus an optional **bank-transfer** instruction. If you accept Easypaisa or JazzCash, add the account number or merchant instructions clearly in the payment instructions and WhatsApp confirmation flow. Card or wallet checkout should be enabled only through a payment gateway supported by your Shopify store and Pakistan business setup; do not advertise a gateway until its live test succeeds. Remove the Shopify password page before launch so customers can access the storefront.

## Edit products

Use Shopify Admin to replace the preview products with the real Al Sultan Hair Oil catalogue. The first confirmed product is **Al Sultan Herbal Hair Oil**. For each product, enter the exact title, product type, description, pack size, price in PKR, inventory quantity, ingredients, usage directions, warnings, and approved product information. Upload real product photography that shares one consistent visual style. Do not publish health or medical claims unless they are accurate, permitted, and supported by your local requirements. Product changes appear in the storefront after Shopify publishes them to the Manus sales channel.

The current preview catalogue is being replaced with Al Sultan Herbal Hair Oil content. Replace any remaining temporary imagery and starter descriptions before accepting customer orders. The confirmed product price is PKR 1,000; update that price in Shopify so cart and checkout use the same amount. The storefront displays the explicit `Format` and `Highlights` metadata from each Shopify description as compact chips.

## Change WhatsApp contact

The storefront now uses the confirmed WhatsApp number **03025986280**, stored in international format as `923025986280`. Keep this number consistent in Shopify, social profiles, and all advertising materials. The header, hero, and contact section will use the same WhatsApp link.

## Product purchase actions

The product card and detail dialog now provide two clear actions. **Add to bag** uses the Shopify cart flow and should be used after the Shopify product name, price, inventory, and checkout are synchronized. **Buy on WhatsApp** opens a pre-filled order message for Al Sultan Herbal Hair Oil at the confirmed PKR 1,000 display price; this is the safe direct-order option while Shopify approval and catalogue synchronization are pending. Confirm the order, delivery charge, payment method, and customer address on WhatsApp before fulfilment.

## Test ordering

Add a product to the bag, increase and decrease the quantity, remove an item, and select **Continue to secure checkout**. Shopify should open the checkout URL in a new tab. Test checkout with Shopify’s supported test configuration before accepting live payments. Confirm that the product price, PKR currency, shipping information, and cash-on-delivery message are correct on a phone and desktop browser. If bank transfer, Easypaisa, JazzCash, or a card gateway is enabled, place a test order and confirm the payment instructions, transaction reference process, and order status before advertising that method.

## Publish

After replacing the preview content and confirming checkout, save a project checkpoint from the Management UI. Then click **Publish** in the Management UI. The website will use the project’s generated domain unless a custom domain is configured in Settings → Domains. Publishing is a Management UI action; do not deploy from a local Replit shell.

## Public links

The live public storefront is available at https://pakoilshop-uggfyasn.manus.space.

The public GitHub repository is available at https://github.com/MrQuizzz/al-sultan-hair-oil-store.

The storefront currently supports Al Sultan Herbal Hair Oil at PKR 1,000 through the WhatsApp order path and Al Sultan Phaki variants of 250g at PKR 800, 500g at PKR 1,500, and 1,000g at PKR 3,000 through the selected-size WhatsApp order path. Shopify catalogue synchronization remains dependent on Shopify connector approval in the Management UI.

## Help Google discover the website

Google does not guarantee that a new website appears immediately in search results. To request indexing, open [Google Search Console](https://search.google.com/search-console), add the property `https://pakoilshop-uggfyasn.manus.space/`, complete the ownership verification method Google provides, and submit `https://pakoilshop-uggfyasn.manus.space/sitemap.xml` under **Sitemaps**. You can also use **URL inspection** for the home page and choose **Request indexing**. Keep the website public, keep the robots file accessible, and share the public URL on the Al Sultan Facebook, TikTok, Instagram, and WhatsApp profiles so Google can discover it from more places. Search visibility can take time and is controlled by Google’s crawling and indexing systems.
