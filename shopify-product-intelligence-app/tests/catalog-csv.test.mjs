import assert from "node:assert/strict";
import test from "node:test";

import { parseCatalogCsv } from "../lib/catalog/csv.mjs";

test("CSV intake normalizes common catalog columns and preserves extra fields", () => {
  const result = parseCatalogCsv(
    '\ufeffProduct Name,SKU,Price,Description,Tags,Custom Collection\n"Amber Candle",SW-001,18.50,"Warm soy wax",candle|amber,Seasonal'
  );

  assert.equal(result.rows.length, 1);
  assert.deepEqual(result.rows[0], {
    title: "Amber Candle",
    sku: "SW-001",
    price: 18.5,
    description: "Warm soy wax",
    tags: ["candle", "amber"],
    attributes: { "Custom Collection": "Seasonal" },
  });
  assert.deepEqual(result.summary, {
    totalRows: 1,
    validRows: 1,
    issueCount: 0,
    duplicateSkuCount: 0,
  });
});

test("CSV intake flags missing titles, invalid prices, and duplicate SKUs", () => {
  const result = parseCatalogCsv(
    "title,sku,price\n,SW-001,not-a-price\nSecond,SW-001,12"
  );

  assert.equal(result.rows.length, 2);
  assert.deepEqual(result.rows[0].issues, ["Missing product title", "Invalid price"]);
  assert.deepEqual(result.rows[1].issues, ["Duplicate SKU: SW-001"]);
  assert.deepEqual(result.summary, {
    totalRows: 2,
    validRows: 0,
    issueCount: 3,
    duplicateSkuCount: 1,
  });
});

test("CSV intake handles quoted commas, blank lines, and alternate headers", () => {
  const result = parseCatalogCsv(
    'name,product_url,stock\n"Candle, Large",https://stone-wick.com/products/candle,8\n\n'
  );

  assert.equal(result.rows[0].title, "Candle, Large");
  assert.equal(result.rows[0].sourceUrl, "https://stone-wick.com/products/candle");
  assert.equal(result.rows[0].attributes.stock, "8");
  assert.equal(result.summary.validRows, 1);
});
