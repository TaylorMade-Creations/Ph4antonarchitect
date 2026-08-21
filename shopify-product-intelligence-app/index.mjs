const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Taylor Made Fragrance | Stone Wick</title>
    <meta
      name="description"
      content="Taylor Made Fragrance storefront for candles, oils, and signature scent collections."
    />
    <style>
      :root {
        color-scheme: light;
        --bg: #f6efe5;
        --panel: rgba(255, 253, 249, 0.9);
        --panel-strong: #ffffff;
        --text: #1d1712;
        --muted: #6f6254;
        --soft: #b89a7f;
        --accent: #7f5539;
        --accent-2: #2f5d50;
        --border: rgba(71, 52, 34, 0.14);
        --shadow: 0 30px 70px rgba(53, 35, 20, 0.12);
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
          radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.85), transparent 32%),
          radial-gradient(circle at 85% 8%, rgba(191, 162, 130, 0.22), transparent 24%),
          linear-gradient(135deg, #efe3d5 0%, #f6efe5 42%, #f1e7d9 100%);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .frame {
        min-height: 100vh;
        padding: 18px;
      }

      .page {
        width: min(1320px, 100%);
        margin: 0 auto;
        border: 1px solid var(--border);
        border-radius: 32px;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.74), rgba(255, 251, 245, 0.96));
        box-shadow: var(--shadow);
        backdrop-filter: blur(14px);
      }

      .announcement {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 12px 20px;
        background: linear-gradient(90deg, #2b241e, #4c3828);
        color: #f8f2ea;
        font-size: 0.88rem;
        letter-spacing: 0.03em;
        text-transform: uppercase;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 24px 28px;
        border-bottom: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.65);
      }

      .brand {
        display: grid;
        gap: 3px;
      }

      .brand strong {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 1.25rem;
        letter-spacing: 0.02em;
      }

      .brand span {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--muted);
      }

      .nav {
        display: flex;
        flex-wrap: wrap;
        gap: 18px;
        align-items: center;
        color: var(--muted);
        font-size: 0.96rem;
      }

      .nav a {
        transition: color 160ms ease;
      }

      .nav a:hover {
        color: var(--text);
      }

      .nav-cta {
        padding: 10px 16px;
        border-radius: 999px;
        background: var(--text);
        color: #fff;
        font-weight: 600;
      }

      .hero {
        display: grid;
        grid-template-columns: 1.08fr 0.92fr;
        gap: 28px;
        padding: 34px 28px 10px;
      }

      .hero-copy {
        padding: clamp(12px, 2vw, 24px) 0;
      }

      .eyebrow {
        margin: 0 0 18px;
        text-transform: uppercase;
        letter-spacing: 0.26em;
        font-size: 0.74rem;
        color: var(--muted);
      }

      h1 {
        margin: 0;
        max-width: 10ch;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(3rem, 7vw, 6.7rem);
        line-height: 0.92;
        letter-spacing: -0.05em;
      }

      .lead {
        max-width: 58ch;
        margin: 22px 0 0;
        font-size: clamp(1.03rem, 1.45vw, 1.2rem);
        line-height: 1.8;
        color: var(--muted);
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 28px;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 48px;
        padding: 0 20px;
        border-radius: 999px;
        border: 1px solid var(--border);
        font-weight: 600;
        transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
      }

      .button:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(53, 35, 20, 0.08);
      }

      .button.primary {
        background: var(--accent);
        color: white;
      }

      .button.secondary {
        background: rgba(255, 255, 255, 0.9);
      }

      .hero-card {
        position: relative;
        border-radius: 28px;
        overflow: hidden;
        min-height: 520px;
        background:
          radial-gradient(circle at 22% 26%, rgba(255, 244, 224, 0.5), transparent 26%),
          radial-gradient(circle at 82% 16%, rgba(47, 93, 80, 0.3), transparent 22%),
          linear-gradient(145deg, #2a221d 0%, #5d4434 44%, #a37c61 100%);
        color: #f8f1e8;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .hero-card::before {
        content: "";
        position: absolute;
        inset: 18px;
        border-radius: 22px;
        border: 1px solid rgba(255, 255, 255, 0.14);
      }

      .hero-media {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(180deg, rgba(22, 16, 12, 0.08), rgba(22, 16, 12, 0.2)),
          url("https://images.unsplash.com/photo-1515372039744-b8f9de3d0b61?auto=format&fit=crop&w=1200&q=80");
        background-position: center;
        background-size: cover;
        mix-blend-mode: screen;
        opacity: 0.14;
      }

      .hero-panel {
        position: absolute;
        inset: auto 24px 24px 24px;
        padding: 22px;
        border-radius: 22px;
        background: rgba(16, 12, 10, 0.34);
        border: 1px solid rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(12px);
      }

      .hero-panel p {
        margin: 0;
        line-height: 1.6;
        color: rgba(248, 241, 232, 0.86);
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin-top: 18px;
      }

      .stat {
        padding: 16px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.1);
      }

      .stat strong {
        display: block;
        font-size: 1.1rem;
      }

      .stat span {
        display: block;
        margin-top: 4px;
        font-size: 0.8rem;
        color: rgba(248, 241, 232, 0.7);
        text-transform: uppercase;
        letter-spacing: 0.14em;
      }

      .strip {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        padding: 18px 28px 0;
      }

      .strip-card {
        padding: 18px;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid var(--border);
      }

      .strip-card h3 {
        margin: 10px 0 8px;
        font-size: 1rem;
      }

      .strip-card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.55;
        font-size: 0.92rem;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 11px;
        border-radius: 999px;
        background: rgba(127, 85, 57, 0.1);
        color: var(--accent);
        font-size: 0.76rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
      }

      .section {
        padding: 48px 28px 0;
      }

      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 18px;
        margin-bottom: 18px;
      }

      .section-head h2 {
        margin: 6px 0 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(2rem, 3vw, 3rem);
        letter-spacing: -0.04em;
      }

      .section-head p {
        margin: 0;
        max-width: 52ch;
        color: var(--muted);
        line-height: 1.7;
      }

      .products {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }

      .product {
        overflow: hidden;
        border-radius: 24px;
        background: var(--panel-strong);
        border: 1px solid var(--border);
        box-shadow: 0 12px 28px rgba(53, 35, 20, 0.08);
      }

      .product-media {
        height: 260px;
        background-size: cover;
        background-position: center;
      }

      .product-body {
        padding: 18px;
      }

      .product-body h3 {
        margin: 0;
        font-size: 1.2rem;
      }

      .product-body p {
        margin: 10px 0 16px;
        color: var(--muted);
        line-height: 1.6;
      }

      .meta-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
      }

      .price {
        font-weight: 700;
        font-size: 1.05rem;
      }

      .mini-link {
        color: var(--accent);
        font-weight: 600;
        font-size: 0.92rem;
      }

      .story {
        display: grid;
        grid-template-columns: 0.88fr 1.12fr;
        gap: 16px;
        align-items: stretch;
      }

      .story-panel {
        padding: 26px;
        border-radius: 26px;
        border: 1px solid var(--border);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(247, 240, 231, 0.96));
      }

      .story-panel p {
        margin: 0;
        color: var(--muted);
        line-height: 1.8;
      }

      .story-panel .button {
        margin-top: 18px;
      }

      .story-visual {
        border-radius: 26px;
        overflow: hidden;
        min-height: 340px;
        background:
          linear-gradient(180deg, rgba(24, 19, 14, 0.16), rgba(24, 19, 14, 0.36)),
          url("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80");
        background-position: center;
        background-size: cover;
        position: relative;
        color: white;
      }

      .story-visual .overlay {
        position: absolute;
        inset: auto 24px 24px 24px;
        padding: 20px;
        border-radius: 20px;
        background: rgba(18, 14, 11, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(12px);
      }

      .testimonials {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }

      .quote {
        padding: 20px;
        border-radius: 22px;
        border: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.8);
      }

      .quote p {
        margin: 0;
        color: #4c4035;
        line-height: 1.72;
      }

      .quote strong {
        display: block;
        margin-top: 16px;
      }

      .newsletter {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 18px;
        align-items: center;
        padding: 24px 28px 34px;
      }

      .newsletter-inner {
        padding: 24px;
        border-radius: 26px;
        background: linear-gradient(135deg, #2b241f, #4d3a2c 55%, #9a7460);
        color: #f7f1e8;
      }

      .newsletter-inner h2 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(2rem, 4vw, 3rem);
        letter-spacing: -0.04em;
      }

      .newsletter-inner p {
        margin: 12px 0 0;
        max-width: 56ch;
        line-height: 1.7;
        color: rgba(247, 241, 232, 0.82);
      }

      .footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 16px;
        padding: 18px 28px 28px;
        border-top: 1px solid var(--border);
        color: var(--muted);
        font-size: 0.92rem;
      }

      @media (max-width: 1080px) {
        .hero,
        .story,
        .newsletter {
          grid-template-columns: 1fr;
        }

        .strip,
        .products,
        .testimonials {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 720px) {
        .frame {
          padding: 0;
        }

        .page {
          border-radius: 0;
          border-left: 0;
          border-right: 0;
        }

        .header,
        .hero,
        .strip,
        .section,
        .newsletter,
        .footer {
          padding-left: 18px;
          padding-right: 18px;
        }

        .header {
          align-items: start;
          flex-direction: column;
        }

        .products,
        .strip,
        .testimonials,
        .stats {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="frame">
      <div class="page">
        <div class="announcement">
          <span>Free shipping over $75</span>
          <span>Fresh batches every week</span>
          <span>Stone Wick domain connected</span>
        </div>

        <header class="header">
          <div class="brand">
            <strong>Taylor Made Fragrance</strong>
            <span>Stone Wick Collection</span>
          </div>
          <nav class="nav" aria-label="Primary">
            <a href="#shop">Shop</a>
            <a href="#story">About</a>
            <a href="#journal">Journal</a>
            <a href="#reviews">Reviews</a>
            <a class="nav-cta" href="#shop">Shop best sellers</a>
          </nav>
        </header>

        <section class="hero">
          <div class="hero-copy">
            <p class="eyebrow">Shopify-style luxury storefront</p>
            <h1>Scents for slow mornings, bright rooms, and nightly rituals.</h1>
            <p class="lead">
              A warm, editorial storefront inspired by the best of Shopify:
              clean product cards, rich imagery, and a focused shopping flow for
              Taylor Made Fragrance. The placeholder page is gone.
            </p>
            <div class="actions">
              <a class="button primary" href="#shop">Shop the collection</a>
              <a class="button secondary" href="#story">Read the brand story</a>
            </div>
            <div class="stats">
              <div class="stat">
                <strong>24</strong>
                <span>signature scents</span>
              </div>
              <div class="stat">
                <strong>48h</strong>
                <span>fresh pour window</span>
              </div>
              <div class="stat">
                <strong>4.9/5</strong>
                <span>customer rating</span>
              </div>
            </div>
          </div>

          <div class="hero-card" aria-hidden="true">
            <div class="hero-media"></div>
            <div class="hero-panel">
              <span class="chip">Featured scent</span>
              <p style="margin-top: 12px; font-size: 1.05rem;">
                Velvet Ember, a cozy amber blend with cedar, vanilla, and a
                soft smoky finish.
              </p>
              <div class="stats">
                <div class="stat">
                  <strong>$28</strong>
                  <span>glass candle</span>
                </div>
                <div class="stat">
                  <strong>$18</strong>
                  <span>travel tin</span>
                </div>
                <div class="stat">
                  <strong>$34</strong>
                  <span>perfume oil</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="strip" id="journal">
          <div class="strip-card">
            <span class="chip">Best seller</span>
            <h3>Velvet Ember</h3>
            <p>Amber, cedar, smoked vanilla, and a clean burn finish.</p>
          </div>
          <div class="strip-card">
            <span class="chip">Fresh</span>
            <h3>Cashmere Orchid</h3>
            <p>Floral softness with pear, iris, and warm sandalwood.</p>
          </div>
          <div class="strip-card">
            <span class="chip">Clean</span>
            <h3>Coastal Linen</h3>
            <p>Airy citrus, sea salt, and crisp cotton vibes for the home.</p>
          </div>
          <div class="strip-card">
            <span class="chip">Night</span>
            <h3>Midnight Resin</h3>
            <p>Dark woods, resin, incense, and a deep cozy base.</p>
          </div>
        </section>

        <section class="section" id="shop">
          <div class="section-head">
            <div>
              <p class="eyebrow">Shop the collection</p>
              <h2>Simple product discovery, just like a polished Shopify home.</h2>
            </div>
            <p>
              Product tiles, strong hierarchy, and a clear call to action keep
              the browsing experience focused on the scent itself.
            </p>
          </div>

          <div class="products">
            <article class="product">
              <div
                class="product-media"
                style="background-image: linear-gradient(180deg, rgba(31, 24, 20, 0.12), rgba(31, 24, 20, 0.28)), url('https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80');"
              ></div>
              <div class="product-body">
                <span class="chip">Candle</span>
                <h3>Velvet Ember</h3>
                <p>Amber, cedar, smoked vanilla, and sandalwood in a glass vessel.</p>
                <div class="meta-row">
                  <span class="price">$28.00</span>
                  <a class="mini-link" href="#">View details</a>
                </div>
              </div>
            </article>

            <article class="product">
              <div
                class="product-media"
                style="background-image: linear-gradient(180deg, rgba(31, 24, 20, 0.12), rgba(31, 24, 20, 0.28)), url('https://images.unsplash.com/photo-1615634262417-0c4c4b9db0c5?auto=format&fit=crop&w=1200&q=80');"
              ></div>
              <div class="product-body">
                <span class="chip">Perfume Oil</span>
                <h3>Cashmere Orchid</h3>
                <p>Pear, iris, cashmere woods, and soft musk for everyday wear.</p>
                <div class="meta-row">
                  <span class="price">$34.00</span>
                  <a class="mini-link" href="#">View details</a>
                </div>
              </div>
            </article>

            <article class="product">
              <div
                class="product-media"
                style="background-image: linear-gradient(180deg, rgba(31, 24, 20, 0.12), rgba(31, 24, 20, 0.28)), url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80');"
              ></div>
              <div class="product-body">
                <span class="chip">Room Mist</span>
                <h3>Coastal Linen</h3>
                <p>Citrus peel, sea salt, linen, and a fresh airy finish.</p>
                <div class="meta-row">
                  <span class="price">$18.00</span>
                  <a class="mini-link" href="#">View details</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="section" id="story">
          <div class="story">
            <div class="story-panel">
              <p class="eyebrow">Brand story</p>
              <h2 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2rem, 3vw, 2.8rem); letter-spacing: -0.04em;">
                Built like a premium Shopify storefront, but tuned for Taylor Made.
              </h2>
              <p style="margin-top: 14px;">
                This layout leans into the classic Shopify home-page rhythm:
                a strong hero, concise value props, clean product cards, and a
                straightforward shopping path. It keeps the warmth of a candle
                brand while feeling current, fast, and polished on desktop and
                mobile.
              </p>
              <a class="button primary" href="#reviews">See customer notes</a>
            </div>
            <div class="story-visual">
              <div class="overlay">
                <span class="chip">Editorial note</span>
                <p style="margin-top: 12px;">
                  Hand-poured details, warm materials, and a product grid that
                  feels like a real DTC storefront.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="section" id="reviews">
          <div class="section-head">
            <div>
              <p class="eyebrow">Customer love</p>
              <h2>Confidence builders that feel native to Shopify.</h2>
            </div>
            <p>
              Social proof, scent notes, and simple value statements help the
              homepage feel complete without clutter.
            </p>
          </div>

          <div class="testimonials">
            <div class="quote">
              <p>
                "The product photos and layout feel like a real Shopify theme.
                It instantly looks more trustworthy."
              </p>
              <strong>Jordan M.</strong>
            </div>
            <div class="quote">
              <p>
                "Warm, elegant, and easy to shop on mobile. The new homepage
                finally matches the brand."
              </p>
              <strong>Alyssa T.</strong>
            </div>
            <div class="quote">
              <p>
                "It reads like a premium fragrance storefront, not an app
                placeholder."
              </p>
              <strong>Monique R.</strong>
            </div>
          </div>
        </section>

        <section class="newsletter">
          <div class="newsletter-inner">
            <p class="eyebrow" style="color: rgba(247, 241, 232, 0.72);">
              Stay in the loop
            </p>
            <h2>Drop your email for launches, batches, and seasonal returns.</h2>
            <p>
              A polished, Shopify-style signup keeps the storefront feeling
              complete while giving the brand a real conversion path.
            </p>
          </div>
          <a class="button primary" href="#">Join the list</a>
        </section>

        <footer class="footer">
          <span>Taylor Made Fragrance</span>
          <span>Stone Wick domain ready</span>
          <span>Shopify-inspired storefront rebuild complete</span>
        </footer>
      </div>
    </main>
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
