import { products, productCategories } from "./catalog-data.mjs";

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const productCards = products
  .map(
    (product) => `
      <article
        class="product-card"
        data-product-card
        data-product-id="${esc(product.id)}"
        data-category="${esc(product.category)}"
        style="--aura:${product.aura}; --glow:${product.glow}; --accent:${product.accent};"
      >
        <div class="product-art">
          ${
            product.image
              ? `<div class="product-art__photo" style="background-image:url('${esc(product.image)}');"></div>`
              : ""
          }
          <span class="product-ribbon">${esc(product.ribbon)}</span>
          <div class="product-art__orb"></div>
          <div class="product-art__halo"></div>
          <div class="product-art__vessel">
            <span class="product-art__flame"></span>
            <span class="product-art__label">${esc(product.category)}</span>
          </div>
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span>${esc(product.category)}</span>
            <span>${esc(product.size)}</span>
          </div>
          <h3>${esc(product.name)}</h3>
          <p>${esc(product.note)}</p>
          <div class="product-variants">${esc(product.variantSummary)}</div>
          <div class="product-footer">
            <strong>${esc(product.priceLabel)}</strong>
            <span>${product.variantCount} styles</span>
          </div>
          <div class="product-actions">
            <button class="button button-secondary" type="button" data-preview-product="${esc(product.id)}">Preview</button>
            <button class="button button-primary" type="button" data-add-to-cart data-product-id="${esc(product.id)}">Add to cart</button>
          </div>
        </div>
      </article>
    `
  )
  .join("");

const spotlight = products[0];

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Taylor Made Fragrance | Stone Wick Storefront</title>
    <meta
      name="description"
      content="A luxury Stone Wick storefront preview with 71 products, cart drawer, and checkout flow for Taylor Made Fragrance."
    />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&display=swap');

      :root {
        color-scheme: dark;
        --bg: #080502;
        --bg-soft: #140d08;
        --panel: rgba(22, 14, 10, 0.9);
        --panel-strong: rgba(33, 21, 14, 0.98);
        --text: #f8ebd2;
        --muted: #d5b98c;
        --muted-2: rgba(248, 235, 210, 0.68);
        --accent: #f3b64c;
        --accent-2: #ef7d2f;
        --border: rgba(243, 182, 76, 0.2);
        --border-strong: rgba(243, 182, 76, 0.35);
        --shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
        --radius-xl: 30px;
        --radius-lg: 24px;
        --radius-md: 18px;
        --radius-sm: 12px;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        min-height: 100vh;
        color: var(--text);
        background:
          radial-gradient(circle at 14% 8%, rgba(243, 182, 76, 0.18), transparent 18%),
          radial-gradient(circle at 78% 16%, rgba(239, 125, 47, 0.16), transparent 18%),
          radial-gradient(circle at 50% 100%, rgba(255, 166, 77, 0.12), transparent 24%),
          linear-gradient(180deg, #120b07 0%, #090503 45%, #050301 100%);
        font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button,
      input,
      textarea,
      select {
        font: inherit;
      }

      button {
        cursor: pointer;
      }

      .shell {
        position: relative;
        width: min(1480px, calc(100% - 24px));
        margin: 12px auto;
        border: 1px solid var(--border);
        border-radius: 34px;
        overflow: hidden;
        background:
          radial-gradient(circle at top, rgba(255, 196, 92, 0.15), transparent 28%),
          linear-gradient(180deg, rgba(25, 15, 10, 0.98), rgba(11, 7, 4, 0.98));
        box-shadow: var(--shadow);
      }

      .shell::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.08), transparent 2px),
          radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.08), transparent 2px),
          radial-gradient(circle at 60% 35%, rgba(255, 255, 255, 0.08), transparent 2px),
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05), transparent 2px),
          radial-gradient(circle at 90% 70%, rgba(255, 255, 255, 0.05), transparent 2px);
        opacity: 0.7;
      }

      .topbar {
        position: sticky;
        top: 0;
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 18px 26px;
        backdrop-filter: blur(16px);
        background: rgba(9, 5, 3, 0.82);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
        min-width: 0;
      }

      .brand-mark {
        position: relative;
        display: grid;
        place-items: center;
        width: 48px;
        height: 48px;
        border-radius: 999px;
        color: #120b07;
        background:
          radial-gradient(circle at 30% 30%, #fff7d6, #ffc14a 48%, #a95a05 100%);
        box-shadow: 0 0 0 1px rgba(255, 200, 120, 0.35), 0 10px 24px rgba(255, 175, 60, 0.18);
      }

      .brand-mark::before {
        content: "";
        position: absolute;
        inset: 11px;
        border: 2px solid rgba(255, 255, 255, 0.28);
        border-radius: 999px;
      }

      .brand-mark svg {
        width: 26px;
        height: 26px;
        display: block;
      }

      .brand-copy {
        display: grid;
        gap: 3px;
        min-width: 0;
      }

      .brand-copy strong {
        font-family: "Fraunces", Georgia, serif;
        font-size: 1.05rem;
        letter-spacing: 0.02em;
        line-height: 1.1;
      }

      .brand-copy span {
        color: var(--muted-2);
        font-size: 0.84rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .nav {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        color: var(--muted-2);
      }

      .nav a {
        padding: 8px 6px;
        transition: color 140ms ease;
      }

      .nav a:hover {
        color: var(--text);
      }

      .nav .ghost {
        padding: 11px 15px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.03);
      }

      .page {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(330px, 0.78fr);
        gap: 22px;
        padding: 22px;
      }

      .content {
        display: grid;
        gap: 22px;
        min-width: 0;
      }

      .hero,
      .collection,
      .story,
      .testimonials {
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: var(--radius-xl);
        background: rgba(255, 255, 255, 0.02);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
      }

      .hero {
        position: relative;
        overflow: hidden;
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 20px;
        padding: 28px;
      }

      .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 50% 0%, rgba(243, 182, 76, 0.12), transparent 28%),
          radial-gradient(circle at 20% 20%, rgba(239, 125, 47, 0.08), transparent 18%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 50%);
        pointer-events: none;
      }

      .hero-copy {
        position: relative;
        z-index: 1;
        padding-right: 8px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin: 0 0 18px;
        padding: 9px 13px;
        border-radius: 999px;
        border: 1px solid rgba(255, 194, 99, 0.18);
        background: rgba(255, 194, 99, 0.08);
        color: #ffd88a;
        font-size: 0.77rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .hero h1 {
        margin: 0;
        max-width: 10ch;
        font-family: "Fraunces", Georgia, serif;
        font-size: clamp(3.3rem, 7vw, 6.8rem);
        line-height: 0.92;
        letter-spacing: -0.05em;
      }

      .lead {
        max-width: 60ch;
        margin: 18px 0 0;
        color: var(--muted);
        font-size: clamp(1rem, 1.45vw, 1.12rem);
        line-height: 1.8;
      }

      .hero-actions,
      .product-actions,
      .chip-row,
      .tab-row,
      .order-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .hero-actions {
        margin-top: 24px;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 48px;
        padding: 0 18px;
        border-radius: 999px;
        border: 1px solid var(--border-strong);
        font-weight: 700;
        letter-spacing: 0.01em;
        transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease, color 150ms ease;
      }

      .button:hover {
        transform: translateY(-1px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
      }

      .button-primary {
        background: linear-gradient(180deg, #ffd16d, #f3b64c);
        color: #241606;
        border-color: #ffd16d;
      }

      .button-secondary {
        background: rgba(255, 255, 255, 0.04);
        color: var(--text);
      }

      .button-ghost {
        background: transparent;
        color: var(--muted);
        border-color: rgba(255, 255, 255, 0.12);
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-top: 24px;
      }

      .metric {
        padding: 14px 16px;
        border-radius: var(--radius-md);
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
      }

      .metric strong {
        display: block;
        font-size: 1.05rem;
        letter-spacing: 0.01em;
      }

      .metric span {
        display: block;
        margin-top: 5px;
        color: var(--muted-2);
        font-size: 0.76rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .hero-visual {
        position: relative;
        z-index: 1;
        min-height: 560px;
        padding: 20px;
        border-radius: 28px;
        background:
          radial-gradient(circle at 50% 12%, rgba(243, 182, 76, 0.22), transparent 20%),
          radial-gradient(circle at 30% 38%, rgba(255, 215, 130, 0.1), transparent 18%),
          linear-gradient(180deg, rgba(33, 21, 14, 0.96), rgba(15, 8, 5, 0.92));
        overflow: hidden;
        border: 1px solid rgba(255, 194, 99, 0.16);
      }

      .hero-visual::before {
        content: "";
        position: absolute;
        inset: 18px;
        border-radius: 22px;
        border: 1px solid rgba(255, 220, 150, 0.12);
        pointer-events: none;
      }

      .hero-visual::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 50% 16%, rgba(255, 211, 122, 0.24), transparent 12%),
          radial-gradient(circle at 20% 80%, rgba(255, 190, 87, 0.12), transparent 12%),
          radial-gradient(circle at 80% 78%, rgba(255, 190, 87, 0.12), transparent 12%);
        opacity: 0.9;
        pointer-events: none;
      }

      .hero-altar {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 18px;
        height: 100%;
      }

      .hero-rune {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }

      .hero-rune strong {
        font-family: "Fraunces", Georgia, serif;
        font-size: 1.2rem;
        letter-spacing: 0.03em;
      }

      .hero-rune span {
        color: var(--muted-2);
        font-size: 0.82rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .hero-product {
        display: grid;
        gap: 16px;
        padding: 18px;
        border-radius: 24px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
          radial-gradient(circle at 50% 20%, var(--aura), transparent 24%);
        border: 1px solid rgba(255, 194, 99, 0.14);
        min-height: 250px;
      }

      .hero-product__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .hero-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid rgba(255, 194, 99, 0.18);
        background: rgba(255, 194, 99, 0.08);
        color: #ffd88a;
        font-size: 0.78rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .hero-price {
        font-family: "Fraunces", Georgia, serif;
        font-size: 1.7rem;
      }

      .hero-product h2 {
        margin: 0;
        font-family: "Fraunces", Georgia, serif;
        font-size: clamp(1.9rem, 3vw, 2.8rem);
        line-height: 1;
        letter-spacing: -0.04em;
      }

      .hero-product p {
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      .hero-product__actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .hero-mini-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .mini-card {
        min-height: 126px;
        padding: 14px;
        border-radius: 20px;
        background:
          radial-gradient(circle at top, rgba(255, 209, 109, 0.18), transparent 34%),
          rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 194, 99, 0.12);
      }

      .mini-card strong {
        display: block;
        font-family: "Fraunces", Georgia, serif;
        font-size: 1rem;
      }

      .mini-card span {
        display: block;
        margin-top: 6px;
        color: var(--muted-2);
        font-size: 0.78rem;
        line-height: 1.55;
      }

      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 16px;
        margin-bottom: 18px;
      }

      .section-head h2 {
        margin: 0;
        font-family: "Fraunces", Georgia, serif;
        font-size: clamp(2rem, 3vw, 3rem);
        letter-spacing: -0.04em;
      }

      .section-head p {
        margin: 0;
        max-width: 46ch;
        color: var(--muted);
        line-height: 1.7;
      }

      .collection {
        padding: 22px;
      }

      .collection-tools {
        display: grid;
        gap: 14px;
        margin-bottom: 18px;
      }

      .collection-search {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
      }

      .search-field {
        display: grid;
        gap: 8px;
      }

      .search-field input {
        width: 100%;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid rgba(255, 194, 99, 0.18);
        background: rgba(255, 255, 255, 0.03);
        color: var(--text);
        font: inherit;
      }

      .search-field input::placeholder {
        color: rgba(248, 235, 210, 0.4);
      }

      .result-count {
        color: var(--muted-2);
        font-size: 0.84rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .filters {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .filter-chip {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--muted-2);
        background: rgba(255, 255, 255, 0.02);
      }

      .filter-chip.is-active {
        color: #241606;
        border-color: #ffd16d;
        background: linear-gradient(180deg, #ffd16d, #f3b64c);
      }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }

      .product-card {
        overflow: hidden;
        border-radius: 24px;
        background:
          radial-gradient(circle at top, var(--aura), transparent 28%),
          linear-gradient(180deg, rgba(33, 21, 14, 0.98), rgba(17, 10, 7, 0.98));
        border: 1px solid rgba(255, 194, 99, 0.14);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
      }

      .product-art {
        position: relative;
        min-height: 252px;
        padding: 18px;
        overflow: hidden;
        background:
          radial-gradient(circle at 50% 20%, rgba(255, 230, 160, 0.16), transparent 18%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
      }

      .product-art__photo {
        position: absolute;
        inset: 18px 18px 38px;
        border-radius: 20px;
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: contain;
        filter: drop-shadow(0 26px 34px rgba(0, 0, 0, 0.32));
        opacity: 0.96;
      }

      .product-art::before {
        content: "";
        position: absolute;
        inset: 14px;
        border-radius: 18px;
        border: 1px solid rgba(255, 228, 160, 0.08);
      }

      .product-art__orb {
        position: absolute;
        left: 50%;
        top: 40%;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle at 35% 30%, rgba(255, 245, 209, 0.7), rgba(243, 182, 76, 0.92) 48%, rgba(129, 76, 19, 0.9) 100%);
        box-shadow:
          0 0 0 1px rgba(255, 236, 188, 0.18),
          0 0 60px var(--glow),
          0 0 120px rgba(243, 182, 76, 0.08);
      }

      .product-art__orb::before {
        content: "";
        position: absolute;
        inset: 22px 26px auto;
        height: 30px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.16);
        filter: blur(2px);
      }

      .product-art__halo {
        position: absolute;
        inset: 44px 56px auto;
        height: 72px;
        border-radius: 999px;
        border: 2px solid rgba(255, 228, 160, 0.16);
        border-bottom-color: transparent;
        opacity: 0.8;
      }

      .product-art__vessel {
        position: absolute;
        left: 50%;
        bottom: 24px;
        width: 148px;
        height: 126px;
        transform: translateX(-50%);
        border-radius: 24px 24px 20px 20px;
        background:
          linear-gradient(180deg, rgba(255, 238, 195, 0.94), rgba(161, 106, 43, 0.96));
        border: 1px solid rgba(255, 239, 189, 0.35);
        box-shadow: inset 0 -18px 28px rgba(56, 30, 8, 0.25);
      }

      .product-art__vessel::before {
        content: "";
        position: absolute;
        inset: -18px 16px auto;
        height: 22px;
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(255, 245, 215, 0.48), rgba(84, 50, 15, 0.98));
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.22);
      }

      .product-art__vessel::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -8px;
        width: 110px;
        height: 16px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: rgba(255, 191, 78, 0.4);
        filter: blur(10px);
      }

      .product-art__flame {
        position: absolute;
        left: 50%;
        top: -48px;
        width: 24px;
        height: 52px;
        transform: translateX(-50%);
        border-radius: 50% 50% 50% 50% / 62% 62% 38% 38%;
        background: radial-gradient(circle at 50% 22%, #fff8d8, #ffd15d 40%, #ef7d2f 100%);
        box-shadow: 0 0 36px rgba(255, 198, 76, 0.68);
      }

      .product-art__flame::before {
        content: "";
        position: absolute;
        inset: 10px 5px 8px;
        border-radius: 50% 50% 50% 50% / 58% 58% 42% 42%;
        background: radial-gradient(circle at 50% 28%, #fff, rgba(255, 255, 255, 0.35) 28%, transparent 68%);
        opacity: 0.6;
      }

      .product-art__label {
        position: absolute;
        left: 50%;
        bottom: 14px;
        transform: translateX(-50%);
        padding: 7px 10px;
        border-radius: 999px;
        background: rgba(10, 6, 4, 0.44);
        border: 1px solid rgba(255, 236, 184, 0.14);
        color: #fff2d0;
        font-size: 0.74rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .product-ribbon {
        position: absolute;
        left: 18px;
        top: 18px;
        z-index: 1;
        padding: 8px 11px;
        border-radius: 999px;
        border: 1px solid rgba(255, 194, 99, 0.18);
        background: rgba(255, 194, 99, 0.08);
        color: #ffd88a;
        font-size: 0.73rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .product-body {
        display: grid;
        gap: 13px;
        padding: 18px 18px 20px;
      }

      .product-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        color: var(--muted-2);
        font-size: 0.77rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .product-body h3 {
        margin: 0;
        font-family: "Fraunces", Georgia, serif;
        font-size: 1.45rem;
        line-height: 1.05;
        letter-spacing: -0.03em;
      }

      .product-body p {
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      .product-variants {
        color: #f0d6a2;
        font-size: 0.82rem;
        line-height: 1.6;
      }

      .product-footer {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted-2);
      }

      .product-footer strong {
        color: var(--text);
        font-size: 1.08rem;
      }

      .product-actions {
        margin-top: 4px;
      }

      .product-actions .button {
        flex: 1 1 0;
        min-width: 120px;
      }

      .story {
        padding: 24px;
        display: grid;
        grid-template-columns: 0.95fr 1.05fr;
        gap: 18px;
        align-items: stretch;
      }

      .story-panel,
      .story-visual {
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
      }

      .story-panel {
        padding: 22px;
      }

      .story-panel h2 {
        margin: 0;
        font-family: "Fraunces", Georgia, serif;
        font-size: clamp(2rem, 3vw, 3rem);
        line-height: 1;
        letter-spacing: -0.04em;
      }

      .story-panel p {
        margin: 16px 0 0;
        color: var(--muted);
        line-height: 1.8;
      }

      .story-facts {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin-top: 18px;
      }

      .fact {
        padding: 14px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
      }

      .fact strong {
        display: block;
        font-family: "Fraunces", Georgia, serif;
        font-size: 1.03rem;
      }

      .fact span {
        display: block;
        margin-top: 6px;
        color: var(--muted-2);
        line-height: 1.55;
        font-size: 0.78rem;
      }

      .story-visual {
        position: relative;
        overflow: hidden;
        min-height: 320px;
        background:
          radial-gradient(circle at 20% 25%, rgba(243, 182, 76, 0.18), transparent 20%),
          radial-gradient(circle at 80% 18%, rgba(239, 125, 47, 0.18), transparent 18%),
          linear-gradient(180deg, rgba(38, 24, 15, 0.9), rgba(13, 8, 5, 0.98));
      }

      .story-visual::before {
        content: "";
        position: absolute;
        inset: 18px;
        border-radius: 20px;
        border: 1px solid rgba(255, 220, 150, 0.14);
      }

      .story-visual__scene {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
      }

      .orbit {
        position: absolute;
        width: min(86%, 470px);
        aspect-ratio: 1;
        border-radius: 50%;
        border: 2px solid rgba(255, 212, 127, 0.24);
        border-top-color: rgba(255, 212, 127, 0.55);
        transform: rotate(-9deg);
      }

      .moon {
        position: absolute;
        top: 38px;
        width: 82px;
        height: 82px;
        border-radius: 50%;
        background: radial-gradient(circle at 38% 32%, #fff7cb, #ffc84f 62%, #a35b08 100%);
        box-shadow: 0 0 44px rgba(255, 192, 76, 0.55);
      }

      .moon::before {
        content: "";
        position: absolute;
        inset: 16px 18px 14px 26px;
        border-radius: 50%;
        background: rgba(20, 12, 7, 0.98);
      }

      .sunburst {
        position: absolute;
        width: 280px;
        height: 280px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 50% 50%, rgba(255, 228, 156, 0.8), rgba(255, 170, 52, 0.36) 38%, rgba(255, 170, 52, 0) 62%);
        filter: blur(0.5px);
      }

      .jar-row {
        position: absolute;
        bottom: 36px;
        display: flex;
        align-items: end;
        gap: 16px;
      }

      .jar {
        position: relative;
        width: 112px;
        border-radius: 18px 18px 22px 22px;
        background: linear-gradient(180deg, rgba(255, 235, 192, 0.96), rgba(158, 108, 46, 0.98));
        box-shadow: inset 0 -18px 26px rgba(52, 26, 6, 0.22);
      }

      .jar::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -14px;
        width: 84px;
        height: 18px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(255, 241, 194, 0.88), rgba(95, 58, 14, 1));
      }

      .jar::after {
        content: "";
        position: absolute;
        inset: auto 22px 18px;
        height: 42px;
        border-radius: 999px;
        background: rgba(10, 6, 4, 0.46);
        filter: blur(2px);
      }

      .jar .flame {
        position: absolute;
        left: 50%;
        top: -48px;
        width: 22px;
        height: 50px;
        transform: translateX(-50%);
        border-radius: 50% 50% 50% 50% / 62% 62% 38% 38%;
        background: radial-gradient(circle at 50% 22%, #fff9df, #ffd25a 40%, #ef7d2f 100%);
        box-shadow: 0 0 30px rgba(255, 196, 70, 0.72);
      }

      .jar .flame::before {
        content: "";
        position: absolute;
        inset: 10px 5px 8px;
        border-radius: 50% 50% 50% 50% / 58% 58% 42% 42%;
        background: rgba(255, 255, 255, 0.25);
      }

      .testimonials {
        padding: 22px;
      }

      .quote-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }

      .quote {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
      }

      .quote p {
        margin: 0;
        color: var(--muted);
        line-height: 1.75;
      }

      .quote strong {
        display: block;
        margin-top: 16px;
        color: var(--text);
      }

      .preview-rail {
        position: sticky;
        top: 86px;
        align-self: start;
        display: grid;
        gap: 16px;
        min-width: 0;
      }

      .preview-shell {
        border-radius: var(--radius-xl);
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
          radial-gradient(circle at 20% 0%, rgba(243, 182, 76, 0.12), transparent 20%),
          linear-gradient(180deg, rgba(33, 21, 14, 0.98), rgba(16, 9, 6, 0.98));
        box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
        overflow: hidden;
      }

      .preview-head {
        padding: 20px 20px 16px;
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

      .preview-head h2 {
        margin: 0;
        font-family: "Fraunces", Georgia, serif;
        font-size: 2rem;
        line-height: 1;
        letter-spacing: -0.04em;
      }

      .preview-head p {
        margin: 8px 0 0;
        color: var(--muted);
        line-height: 1.6;
      }

      .preview-count {
        padding: 9px 12px;
        border-radius: 999px;
        border: 1px solid rgba(255, 194, 99, 0.18);
        background: rgba(255, 194, 99, 0.08);
        color: #ffd88a;
        white-space: nowrap;
      }

      .tab-row {
        padding: 16px 20px 0;
      }

      .tab {
        flex: 1 1 0;
        padding: 12px 14px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        color: var(--muted-2);
      }

      .tab.is-active {
        color: #241606;
        background: linear-gradient(180deg, #ffd16d, #f3b64c);
        border-color: #ffd16d;
      }

      .preview-body {
        padding: 18px 20px 20px;
      }

      .panel {
        display: none;
      }

      .panel.is-active {
        display: grid;
        gap: 16px;
      }

      .empty-cart,
      .receipt {
        padding: 18px;
        border-radius: 20px;
        border: 1px dashed rgba(255, 194, 99, 0.16);
        background: rgba(255, 255, 255, 0.03);
        color: var(--muted);
        line-height: 1.7;
      }

      .cart-list {
        display: grid;
        gap: 12px;
      }

      .cart-item {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 12px;
        align-items: center;
        padding: 12px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
      }

      .cart-item__swatch {
        width: 54px;
        height: 54px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
          radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.22), transparent 26%),
          linear-gradient(180deg, var(--aura), rgba(255, 255, 255, 0.02));
      }

      .cart-item__title {
        display: grid;
        gap: 3px;
      }

      .cart-item__title strong {
        font-size: 0.98rem;
      }

      .cart-item__title span {
        color: var(--muted-2);
        font-size: 0.82rem;
      }

      .cart-item__meta {
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 8px;
      }

      .quantity {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .quantity button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 0;
        color: var(--text);
        background: rgba(255, 255, 255, 0.04);
      }

      .quantity span {
        min-width: 18px;
        text-align: center;
        font-weight: 700;
      }

      .summary {
        display: grid;
        gap: 10px;
        padding: 16px 0 0;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .summary-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted-2);
      }

      .summary-row strong {
        color: var(--text);
      }

      .summary-row.total {
        padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 1.05rem;
        color: var(--text);
      }

      .discount-form,
      .checkout-form {
        display: grid;
        gap: 12px;
      }

      .field-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .field {
        display: grid;
        gap: 6px;
      }

      .field label {
        font-size: 0.78rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--muted-2);
      }

      .field input,
      .field textarea,
      .field select {
        width: 100%;
        padding: 13px 14px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.03);
        color: var(--text);
      }

      .field textarea {
        min-height: 90px;
        resize: vertical;
      }

      .payment-row {
        display: grid;
        gap: 10px;
      }

      .payment-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
      }

      .payment-option input {
        accent-color: var(--accent);
      }

      .preview-note {
        color: var(--muted-2);
        line-height: 1.65;
        font-size: 0.92rem;
      }

      .footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 24px 26px;
        color: var(--muted-2);
        font-size: 0.9rem;
      }

      @media (max-width: 1180px) {
        .page {
          grid-template-columns: 1fr;
        }

        .preview-rail {
          position: static;
        }
      }

      @media (max-width: 980px) {
        .hero,
        .story {
          grid-template-columns: 1fr;
        }

        .product-grid,
        .quote-grid,
        .hero-mini-grid,
        .story-facts,
        .metrics {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 720px) {
        .shell {
          width: 100%;
          margin: 0;
          border-radius: 0;
          border-left: 0;
          border-right: 0;
        }

        .topbar,
        .page,
        .footer {
          padding-left: 16px;
          padding-right: 16px;
        }

        .topbar {
          align-items: start;
          flex-direction: column;
        }

        .page {
          padding-top: 16px;
          padding-bottom: 16px;
        }

        .hero,
        .collection,
        .story,
        .testimonials {
          border-radius: 24px;
        }

        .product-grid,
        .quote-grid,
        .hero-mini-grid,
        .story-facts,
        .metrics,
        .field-row {
          grid-template-columns: 1fr;
        }

        .hero-visual {
          min-height: 470px;
        }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.4a1 1 0 0 1 1.05 1.1 6.8 6.8 0 0 0 2.22 6.08 6.8 6.8 0 0 0 6.03 1.46 1 1 0 0 1 1.18 1.18 10 10 0 1 1-11.48-11.85Z" fill="#120b07"/>
            </svg>
          </div>
          <div class="brand-copy">
            <strong>Taylor Made Fragrance</strong>
            <span>Stone Wick collection store</span>
          </div>
        </div>
        <nav class="nav" aria-label="Primary">
          <a href="#shop">Shop</a>
          <a href="#story">Story</a>
          <a href="#checkout">Checkout</a>
          <button class="ghost" type="button" data-open-cart>Cart preview (<span data-cart-count>0</span>)</button>
        </nav>
      </header>

      <div class="page">
        <main class="content">
          <section class="hero">
            <div class="hero-copy">
              <p class="eyebrow">Live storefront preview</p>
              <h1>Stone Wick scents, styled like a luxury Shopify home.</h1>
              <p class="lead">
                This storefront now behaves like a real shop: browse the full 71-product catalog,
                preview a product, add items to the cart, apply a discount code, and move through
                a checkout preview without leaving the page.
              </p>
              <div class="hero-actions">
                <a class="button button-primary" href="#shop">Shop the collection</a>
                <button class="button button-secondary" type="button" data-open-cart>Open cart drawer</button>
                <a class="button button-ghost" href="#checkout">Jump to checkout</a>
              </div>
              <div class="metrics" aria-label="Store stats">
                <div class="metric">
                  <strong>71 products</strong>
                  <span>Imported from CSV</span>
                </div>
                <div class="metric">
                  <strong>Drawer cart</strong>
                  <span>Theme matched</span>
                </div>
                <div class="metric">
                  <strong>5 forms</strong>
                  <span>Bottle, roll-on, body care, spray, single item</span>
                </div>
                <div class="metric">
                  <strong>Checkout</strong>
                  <span>Search + receipt included</span>
                </div>
              </div>
            </div>

            <div class="hero-visual" aria-hidden="true">
              <div class="hero-altar">
                <div class="hero-rune">
                  <strong>Birthstone candles</strong>
                  <span>Amber gold / obsidian black</span>
                </div>

                <article class="hero-product" style="--aura:${spotlight.aura};">
                  <div class="hero-product__top">
                    <span class="hero-pill">${spotlight.ribbon}</span>
                    <span class="hero-price">$${spotlight.price.toFixed(2)}</span>
                  </div>
                  <h2>${esc(spotlight.name)}</h2>
                  <p>${esc(spotlight.note)}</p>
                  <div class="hero-product__actions">
                    <button class="button button-primary" type="button" data-add-to-cart data-product-id="${esc(spotlight.id)}">Add featured scent</button>
                    <button class="button button-secondary" type="button" data-preview-product="${esc(spotlight.id)}">Swap spotlight</button>
                  </div>
                </article>

                <div class="hero-mini-grid">
                  <div class="mini-card">
                    <strong>Gilded jars</strong>
                    <span>Warm label art, glowing flames, and a rich nighttime palette.</span>
                  </div>
                  <div class="mini-card">
                    <strong>Quick add</strong>
                    <span>Every product card can be added straight into the cart rail.</span>
                  </div>
                  <div class="mini-card">
                    <strong>Checkout preview</strong>
                    <span>Shipping, discount codes, payment selection, and receipt state.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="collection" id="shop">
            <div class="section-head">
              <div>
                <p class="eyebrow">Shop the collection</p>
                <h2>Browse the full Stone Wick lineup and keep the flow on one page.</h2>
              </div>
              <p>
                The collection filter mirrors a real storefront pattern, while each product card
                keeps its own add-to-cart and preview controls. Search works across names, notes,
                and variant summaries.
              </p>
            </div>

            <div class="collection-tools">
              <div class="collection-search">
                <label class="search-field" for="product-search">
                  <span class="result-count" data-result-count>71 products</span>
                  <input id="product-search" data-search type="search" placeholder="Search the collection" />
                </label>
                <span class="result-count" data-visible-count>71 visible</span>
              </div>

              <div class="filters" role="tablist" aria-label="Collection filters">
                <button class="filter-chip is-active" type="button" data-filter="All">All</button>
                <button class="filter-chip" type="button" data-filter="Bottle">Bottles</button>
                <button class="filter-chip" type="button" data-filter="Roll-on">Roll-ons</button>
                <button class="filter-chip" type="button" data-filter="Body care">Body care</button>
                <button class="filter-chip" type="button" data-filter="Spray">Sprays</button>
                <button class="filter-chip" type="button" data-filter="Single item">Singles</button>
              </div>
            </div>

            <div class="product-grid">
              ${productCards}
            </div>
          </section>

          <section class="story" id="story">
            <div class="story-panel">
              <p class="eyebrow">Brand story</p>
              <h2>Built from the Stone Wick palette, but made to sell like a live shop.</h2>
              <p>
                The page uses a deep amber-and-obsidian visual language pulled from the logo
                references you shared, then pairs it with a practical cart drawer and checkout
                preview. It is meant to feel premium, clear, and shoppable on desktop and mobile.
              </p>
              <div class="story-facts">
                <div class="fact">
                  <strong>Preview mode</strong>
                  <span>Visible cart and checkout states, not a dead mockup.</span>
                </div>
                <div class="fact">
                  <strong>Gift ready</strong>
                  <span>Every card has a retail-friendly title, size, and price.</span>
                </div>
                <div class="fact">
                  <strong>Fast flow</strong>
                  <span>Add items, apply a code, and move to receipt in one view.</span>
                </div>
              </div>
            </div>

            <div class="story-visual">
              <div class="story-visual__scene">
                <div class="orbit"></div>
                <div class="sunburst"></div>
                <div class="moon"></div>
                <div class="jar-row">
                  <div class="jar">
                    <span class="flame"></span>
                  </div>
                  <div class="jar" style="transform: translateY(12px);">
                    <span class="flame"></span>
                  </div>
                  <div class="jar" style="height: 110px;">
                    <span class="flame"></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="testimonials">
            <div class="section-head">
              <div>
                <p class="eyebrow">Customer love</p>
                <h2>Social proof that feels native to the storefront.</h2>
              </div>
              <p>
                The text below is set up as a clean trust row, similar to a polished Shopify home.
              </p>
            </div>

            <div class="quote-grid">
              <div class="quote">
                <p>
                  "The new layout finally looks like a real fragrance brand and not a placeholder."
                </p>
                <strong>Jordan M.</strong>
              </div>
              <div class="quote">
                <p>
                  "Cart and checkout are easy to follow, and the product cards feel premium."
                </p>
                <strong>Alyssa T.</strong>
              </div>
              <div class="quote">
                <p>
                  "The gold-and-black direction matches the Stone Wick identity really well."
                </p>
                <strong>Monique R.</strong>
              </div>
            </div>
          </section>
        </main>

        <aside class="preview-rail" id="checkout" aria-label="Cart and checkout preview">
          <section class="preview-shell">
            <div class="preview-head">
              <div>
                <p class="eyebrow" style="margin-bottom: 10px;">Cart drawer</p>
                <h2>Shopping preview</h2>
                <p>Switch between cart, checkout, and receipt without leaving the page.</p>
              </div>
              <div class="preview-count"><span data-cart-count>0</span> items</div>
            </div>

            <div class="tab-row">
              <button class="tab is-active" type="button" data-view="cart">Cart</button>
              <button class="tab" type="button" data-view="checkout">Checkout</button>
              <button class="tab" type="button" data-view="receipt">Receipt</button>
            </div>

            <div class="preview-body">
              <section class="panel is-active" data-panel="cart">
                <div class="empty-cart" data-empty-cart>
                  Your cart is empty. Add a candle, wax melt, roll-on, or room mist to see the order
                  summary update here.
                </div>

                <div class="cart-list" data-cart-list hidden></div>

                <div class="summary">
                  <div class="summary-row"><span>Subtotal</span><strong data-subtotal>$0.00</strong></div>
                  <div class="summary-row"><span>Discount</span><strong data-discount>$0.00</strong></div>
                  <div class="summary-row"><span>Shipping</span><strong data-shipping>$0.00</strong></div>
                  <div class="summary-row total"><span>Total</span><strong data-total>$0.00</strong></div>
                </div>

                <form class="discount-form" data-discount-form>
                  <div class="field">
                    <label for="discount-code">Discount code</label>
                    <input id="discount-code" name="discount-code" placeholder="STONE10" />
                  </div>
                  <button class="button button-secondary" type="submit">Apply code</button>
                </form>

                <div class="order-actions">
                  <button class="button button-primary" type="button" data-open-checkout>Checkout</button>
                  <button class="button button-ghost" type="button" data-clear-cart>Clear cart</button>
                </div>
              </section>

              <section class="panel" data-panel="checkout">
                <form class="checkout-form" data-checkout-form>
                  <div class="field-row">
                    <div class="field">
                      <label for="first-name">First name</label>
                      <input id="first-name" name="first-name" autocomplete="given-name" required />
                    </div>
                    <div class="field">
                      <label for="last-name">Last name</label>
                      <input id="last-name" name="last-name" autocomplete="family-name" required />
                    </div>
                  </div>
                  <div class="field">
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" autocomplete="email" required />
                  </div>
                  <div class="field">
                    <label for="address">Shipping address</label>
                    <input id="address" name="address" autocomplete="shipping street-address" required />
                  </div>
                  <div class="field-row">
                    <div class="field">
                      <label for="city">City</label>
                      <input id="city" name="city" autocomplete="shipping address-level2" required />
                    </div>
                    <div class="field">
                      <label for="zip">ZIP</label>
                      <input id="zip" name="zip" autocomplete="shipping postal-code" required />
                    </div>
                  </div>
                  <div class="field">
                    <label for="notes">Gift note</label>
                    <textarea id="notes" name="notes" placeholder="Add a short gift note or delivery note."></textarea>
                  </div>

                  <div class="payment-row">
                    <label class="payment-option">
                      <input type="radio" name="payment" value="shop-pay" checked />
                      <span>Shop Pay preview</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payment" value="card" />
                      <span>Credit card preview</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payment" value="apple-pay" />
                      <span>Apple Pay preview</span>
                    </label>
                  </div>

                  <div class="summary">
                    <div class="summary-row"><span>Items</span><strong data-checkout-items>0</strong></div>
                    <div class="summary-row"><span>Promo</span><strong data-checkout-promo>None</strong></div>
                    <div class="summary-row"><span>Estimated total</span><strong data-checkout-total>$0.00</strong></div>
                  </div>

                  <button class="button button-primary" type="submit">Complete preview order</button>
                </form>
                <p class="preview-note">
                  This is a working storefront preview. It simulates the cart and checkout flow on
                  the page so you can review layout, behavior, and pricing before connecting live
                  commerce.
                </p>
              </section>

              <section class="panel" data-panel="receipt">
                <div class="receipt" data-receipt-state>
                  Complete a preview checkout to generate a receipt summary here.
                </div>
                <div class="order-actions">
                  <button class="button button-primary" type="button" data-view-cart>Back to cart</button>
                  <button class="button button-secondary" type="button" data-open-checkout>Checkout again</button>
                </div>
              </section>
            </div>
          </section>

          <section class="preview-shell">
            <div class="preview-head">
              <div>
                <p class="eyebrow" style="margin-bottom: 10px;">Spotlight</p>
                <h2 data-spotlight-name>${esc(spotlight.name)}</h2>
                <p data-spotlight-copy>${esc(spotlight.note)}</p>
              </div>
            </div>
            <div class="preview-body">
              <article class="hero-product" data-spotlight style="--aura:${spotlight.aura};">
                <div class="hero-product__top">
                  <span class="hero-pill" data-spotlight-ribbon>${esc(spotlight.ribbon)}</span>
                  <span class="hero-price" data-spotlight-price>$${spotlight.price.toFixed(2)}</span>
                </div>
                <h2 data-spotlight-title>${esc(spotlight.name)}</h2>
                <p data-spotlight-size>${esc(spotlight.size)}</p>
                <div class="hero-product__actions">
                  <button class="button button-primary" type="button" data-add-to-cart data-product-id="${esc(spotlight.id)}">Add spotlight scent</button>
                  <button class="button button-secondary" type="button" data-open-cart>See cart drawer</button>
                </div>
              </article>
            </div>
          </section>
        </aside>
      </div>

      <footer class="footer">
        <span>Taylor Made Fragrance</span>
        <span>Stone Wick collection storefront preview</span>
        <span>Cart, discount code, checkout, and receipt states included</span>
      </footer>
    </div>

    <script>
      window.__CATALOG__ = ${JSON.stringify(products)};
      (function () {
        const catalog = window.__CATALOG__ || [];
        const body = document.body;
        const cartCountNodes = Array.from(document.querySelectorAll('[data-cart-count]'));
        const cartList = document.querySelector('[data-cart-list]');
        const emptyCart = document.querySelector('[data-empty-cart]');
        const subtotalNode = document.querySelector('[data-subtotal]');
        const discountNode = document.querySelector('[data-discount]');
        const shippingNode = document.querySelector('[data-shipping]');
        const totalNode = document.querySelector('[data-total]');
        const checkoutItemsNode = document.querySelector('[data-checkout-items]');
        const checkoutPromoNode = document.querySelector('[data-checkout-promo]');
        const checkoutTotalNode = document.querySelector('[data-checkout-total]');
        const receiptNode = document.querySelector('[data-receipt-state]');
        const viewButtons = Array.from(document.querySelectorAll('[data-view]'));
        const panels = Array.from(document.querySelectorAll('[data-panel]'));
        const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
        const searchInput = document.querySelector('[data-search]');
        const resultCountNode = document.querySelector('[data-result-count]');
        const visibleCountNode = document.querySelector('[data-visible-count]');
        const previewButtons = Array.from(document.querySelectorAll('[data-preview-product]'));
        const addButtons = Array.from(document.querySelectorAll('[data-add-to-cart]'));
        const openCartButtons = Array.from(document.querySelectorAll('[data-open-cart]'));
        const openCheckoutButtons = Array.from(document.querySelectorAll('[data-open-checkout]'));
        const viewCartButtons = Array.from(document.querySelectorAll('[data-view-cart]'));
        const clearCartButtons = Array.from(document.querySelectorAll('[data-clear-cart]'));
        const discountForm = document.querySelector('[data-discount-form]');
        const checkoutForm = document.querySelector('[data-checkout-form]');
        const productCards = Array.from(document.querySelectorAll('[data-product-card]'));
        const spotlightShell = document.querySelector('[data-spotlight]');
        const spotlightName = document.querySelector('[data-spotlight-name]');
        const spotlightCopy = document.querySelector('[data-spotlight-copy]');
        const spotlightRibbon = document.querySelector('[data-spotlight-ribbon]');
        const spotlightPrice = document.querySelector('[data-spotlight-price]');
        const spotlightTitle = document.querySelector('[data-spotlight-title]');
        const spotlightSize = document.querySelector('[data-spotlight-size]');
        const cart = new Map();
        let activeView = 'cart';
        let activeFilter = 'All';
        let selectedProductId = catalog[0] ? catalog[0].id : null;
        let appliedDiscount = 0;
        let appliedCode = '';
        let lastReceipt = '';
        let hasReceipt = false;
        let searchTerm = '';

        const money = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        function productById(id) {
          return catalog.find((item) => item.id === id);
        }

        function updateCollectionVisibility() {
          const query = searchTerm.trim().toLowerCase();
          let visibleCount = 0;
          productCards.forEach((card) => {
            const product = productById(card.dataset.productId);
            if (!product) return;
            const matchesCategory = activeFilter === 'All' || card.dataset.category === activeFilter;
            const haystack = [
              product.name,
              product.note,
              product.variantSummary,
              product.category,
              ...(product.variants || []),
            ]
              .join(' ')
              .toLowerCase();
            const matchesSearch = !query || haystack.includes(query);
            const visible = matchesCategory && matchesSearch;
            card.hidden = !visible;
            if (visible) visibleCount += 1;
          });
          if (resultCountNode) resultCountNode.textContent = catalog.length + ' products';
          if (visibleCountNode) visibleCountNode.textContent = visibleCount + ' visible';
        }

        function setView(view) {
          activeView = view;
          body.dataset.view = view;
          viewButtons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.view === view);
          });
          panels.forEach((panel) => {
            panel.classList.toggle('is-active', panel.dataset.panel === view);
          });
        }

        function setFilter(filter) {
          activeFilter = filter;
          filterButtons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.filter === filter);
          });
          updateCollectionVisibility();
        }

        function setSearch(term) {
          searchTerm = term;
          updateCollectionVisibility();
        }

        function subtotal() {
          return Array.from(cart.values()).reduce((sum, line) => sum + line.product.price * line.qty, 0);
        }

        function cartCount() {
          return Array.from(cart.values()).reduce((sum, line) => sum + line.qty, 0);
        }

        function shippingCost(subtotalValue) {
          if (!cartCount()) return 0;
          return subtotalValue >= 75 ? 0 : 6.95;
        }

        function discountValue(subtotalValue) {
          return subtotalValue * appliedDiscount;
        }

        function totalValue() {
          const sub = subtotal();
          const discount = discountValue(sub);
          const shipping = shippingCost(sub);
          return Math.max(0, sub - discount + shipping);
        }

        function renderSpotlight(product) {
          if (!product) return;
          selectedProductId = product.id;
          body.style.setProperty('--spotlight-aura', product.aura);
          spotlightShell.style.setProperty('--aura', product.aura);
          spotlightName.textContent = product.name;
          spotlightCopy.textContent = product.note;
          spotlightRibbon.textContent = product.ribbon;
          spotlightPrice.textContent = product.priceLabel || money.format(product.price);
          spotlightTitle.textContent = product.name;
          spotlightSize.textContent = product.size;
          document.querySelectorAll('[data-preview-product]').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.previewProduct === product.id);
          });
        }

        function renderCart() {
          const lines = Array.from(cart.values());
          const count = cartCount();
          const sub = subtotal();
          const discount = discountValue(sub);
          const shipping = shippingCost(sub);
          const total = totalValue();

          cartCountNodes.forEach((node) => {
            node.textContent = String(count);
          });

          if (!count) {
            emptyCart.hidden = false;
            cartList.hidden = true;
            cartList.innerHTML = '';
          } else {
            emptyCart.hidden = true;
            cartList.hidden = false;
            cartList.innerHTML = lines
              .map((line) => {
                return [
                  '<article class="cart-item" style="--aura:', line.product.aura, ';">',
                  '<div class="cart-item__swatch"></div>',
                  '<div class="cart-item__title">',
                  '<strong>', line.product.name, '</strong>',
                  '<span>', line.product.category, ' · ', line.product.size, '</span>',
                  '</div>',
                  '<div class="cart-item__meta">',
                  '<strong>', money.format(line.product.price * line.qty), '</strong>',
                  '<div class="quantity">',
                  '<button type="button" data-qty="-1" data-product-id="', line.product.id, '">-</button>',
                  '<span>', line.qty, '</span>',
                  '<button type="button" data-qty="1" data-product-id="', line.product.id, '">+</button>',
                  '</div>',
                  '</div>',
                  '</article>'
                ].join('');
              })
              .join('');
          }

          subtotalNode.textContent = money.format(sub);
          discountNode.textContent = discount ? '-' + money.format(discount) : money.format(0);
          shippingNode.textContent = money.format(shipping);
          totalNode.textContent = money.format(total);
          checkoutItemsNode.textContent = String(count);
          checkoutPromoNode.textContent = appliedCode || 'None';
          checkoutTotalNode.textContent = money.format(total);

          if (receiptNode) {
            receiptNode.innerHTML = hasReceipt
              ? lastReceipt
              : count
                ? 'Your preview order is ready. Open checkout to finish the demo flow, or review the cart summary again.'
                : 'Complete a preview checkout to generate a receipt summary here.';
          }
        }

        function addItem(id, qty = 1) {
          const product = productById(id);
          if (!product) return;
          const current = cart.get(id);
          if (current) {
            current.qty += qty;
          } else {
            cart.set(id, { product, qty });
          }
          renderCart();
          setView('cart');
        }

        function adjustItem(id, delta) {
          const current = cart.get(id);
          if (!current) return;
          current.qty += delta;
          if (current.qty <= 0) {
            cart.delete(id);
          }
          renderCart();
        }

        function clearCart() {
          cart.clear();
          appliedDiscount = 0;
          appliedCode = '';
          hasReceipt = false;
          lastReceipt = '';
          const discountInput = document.getElementById('discount-code');
          if (discountInput) discountInput.value = '';
          renderCart();
          setView('cart');
        }

        function scrollToPreview() {
          document.querySelector('.preview-rail').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        viewButtons.forEach((button) => {
          button.addEventListener('click', () => setView(button.dataset.view));
        });

        filterButtons.forEach((button) => {
          button.addEventListener('click', () => setFilter(button.dataset.filter));
        });

        if (searchInput) {
          searchInput.addEventListener('input', () => setSearch(searchInput.value || ''));
        }

        previewButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const product = productById(button.dataset.previewProduct);
            if (!product) return;
            renderSpotlight(product);
            setView('cart');
            scrollToPreview();
          });
        });

        addButtons.forEach((button) => {
          button.addEventListener('click', () => {
            addItem(button.dataset.productId, 1);
            scrollToPreview();
          });
        });

        openCartButtons.forEach((button) => {
          button.addEventListener('click', () => {
            setView('cart');
            scrollToPreview();
          });
        });

        openCheckoutButtons.forEach((button) => {
          button.addEventListener('click', () => {
            setView('checkout');
            scrollToPreview();
          });
        });

        viewCartButtons.forEach((button) => {
          button.addEventListener('click', () => setView('cart'));
        });

        clearCartButtons.forEach((button) => {
          button.addEventListener('click', clearCart);
        });

        discountForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const input = discountForm.querySelector('input[name="discount-code"]');
          const value = (input.value || '').trim().toUpperCase();
          appliedDiscount = value === 'STONE10' || value === 'WICK10' ? 0.1 : 0;
          appliedCode = appliedDiscount ? value : '';
          renderCart();
          setView('cart');
          input.focus();
          input.select();
        });

        checkoutForm.addEventListener('submit', (event) => {
          event.preventDefault();
          if (!cartCount()) {
            setView('cart');
            return;
          }
          const orderNumber = 'SW-' + String(Date.now()).slice(-6);
          lastReceipt = [
            '<strong>Preview order complete.</strong><br />',
            'Order ', orderNumber, ' is ready for handoff.<br /><br />',
            'Items: ', String(cartCount()), '<br />',
            'Total: ', money.format(totalValue()), '<br />',
            'Payment preview: ', checkoutForm.querySelector('input[name="payment"]:checked')?.value || 'shop-pay', '<br />',
            'Discount code: ', appliedCode || 'None'
          ].join('');
          hasReceipt = true;
          receiptNode.innerHTML = lastReceipt;
          setView('receipt');
          cart.clear();
          renderCart();
        });

        document.addEventListener('click', (event) => {
          const qtyButton = event.target.closest('[data-qty]');
          if (qtyButton) {
            adjustItem(qtyButton.dataset.productId, Number(qtyButton.dataset.qty));
          }
        });

        renderSpotlight(spotlight);
        setFilter('All');
        renderCart();
        updateCollectionVisibility();
        setView('cart');
      })();
    </script>
  </body>
</html>`;

export default {
  async fetch() {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  },
};
