const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Taylor Made Candle & Wax Co.</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f1e8;
        --panel: rgba(255, 252, 247, 0.86);
        --text: #231f1a;
        --muted: #6e6254;
        --accent: #8b5e34;
        --accent-2: #2f5d50;
        --border: rgba(107, 82, 57, 0.16);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: Georgia, "Times New Roman", serif;
        color: var(--text);
        background:
          radial-gradient(circle at top, rgba(255, 255, 255, 0.72), transparent 35%),
          linear-gradient(135deg, #efe1cf 0%, #f7f1e8 42%, #ead7bd 100%);
      }

      main {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 32px;
      }

      .card {
        width: min(920px, 100%);
        padding: clamp(28px, 5vw, 56px);
        border: 1px solid var(--border);
        border-radius: 28px;
        background: var(--panel);
        box-shadow: 0 20px 80px rgba(61, 43, 22, 0.12);
        backdrop-filter: blur(10px);
      }

      .eyebrow {
        margin: 0 0 18px;
        text-transform: uppercase;
        letter-spacing: 0.24em;
        font-size: 0.74rem;
        color: var(--muted);
      }

      h1 {
        margin: 0;
        font-size: clamp(2.8rem, 8vw, 5.8rem);
        line-height: 0.95;
        letter-spacing: -0.04em;
      }

      .lead {
        max-width: 52ch;
        margin: 22px 0 0;
        font-size: clamp(1.05rem, 2.1vw, 1.35rem);
        line-height: 1.7;
        color: var(--muted);
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 28px;
      }

      .pill {
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.7);
        font-size: 0.95rem;
      }

      .pill strong {
        color: var(--accent);
      }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <p class="eyebrow">Taylor Made Candle & Wax Co.</p>
        <h1>Hand-poured warmth, now live on your custom domain.</h1>
        <p class="lead">
          The site has been published and is ready for the `www.stone-wick.com`
          DNS connection. This page is a lightweight storefront placeholder
          while the broader Taylor Made app continues to evolve.
        </p>
        <div class="meta">
          <div class="pill"><strong>Status:</strong> Published</div>
          <div class="pill"><strong>Domain:</strong> www.stone-wick.com</div>
          <div class="pill"><strong>Brand:</strong> Taylor Made Candle & Wax Co.</div>
        </div>
      </section>
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
