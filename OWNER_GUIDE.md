# Pak Oil Co. Owner Guide

## What is connected

The storefront is connected to the Shopify development store created for this project. Products, inventory, cart creation, Shopify checkout, and fulfilment remain managed by Shopify. The website reads the published catalogue through the project’s typed commerce layer, so product cards update when the Shopify catalogue changes.

## Claim and configure the Shopify store

Open the project Management UI and go to **Settings → Integrations → Shopify**. Claim the development store and complete Shopify authorization before using the site for real orders. In Shopify Admin, set the store currency to **PKR**, add the correct Pakistan shipping zones and rates, enable the payment methods you support, and configure **Cash on Delivery** if it is available for your checkout setup. Remove the Shopify password page before launch so customers can access the storefront.

## Edit products

Use Shopify Admin to replace the two starter preview products with the real Pak Oil Co. catalogue. For each product, enter the exact title, product type, description, pack size, price in PKR, inventory quantity, ingredients, usage directions, warnings, and approved product information. Upload real product photography that shares one consistent visual style. Do not publish health or medical claims unless they are accurate, permitted, and supported by your local requirements. Product changes appear in the storefront after Shopify publishes them to the Manus sales channel.

The current two products are preview entries only. Replace their temporary imagery and starter descriptions before accepting customer orders. The storefront displays the explicit `Format` and `Highlights` metadata from each Shopify description as compact chips.

## Change WhatsApp contact

Open `client/src/pages/Home.tsx` and replace the value of `WHATSAPP_NUMBER` with the business WhatsApp number in international format, without plus signs, spaces, or dashes. For example, a Pakistani number should look like `923001234567`. Then rerun the project checks and save a new checkpoint. The header, hero, and contact section will use the same WhatsApp link.

## Test ordering

Add a product to the bag, increase and decrease the quantity, remove an item, and select **Continue to secure checkout**. Shopify should open the checkout URL in a new tab. Test checkout with Shopify’s supported test configuration before accepting live payments. Confirm that the product price, PKR currency, shipping information, and cash-on-delivery message are correct on a phone and desktop browser.

## Publish

After replacing the preview content and confirming checkout, save a project checkpoint from the Management UI. Then click **Publish** in the Management UI. The website will use the project’s generated domain unless a custom domain is configured in Settings → Domains. Publishing is a Management UI action; do not deploy from a local Replit shell.
