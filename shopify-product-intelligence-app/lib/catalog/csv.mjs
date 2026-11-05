const FIELD_ALIASES = {
  title: new Set(["title", "name", "product name", "product title", "product_name"]),
  sku: new Set(["sku", "variant sku", "product sku", "stock keeping unit"]),
  price: new Set(["price", "sale price", "regular price", "unit price"]),
  description: new Set(["description", "product description", "body", "body html"]),
  tags: new Set(["tags", "tag", "keywords"]),
  sourceUrl: new Set(["url", "product url", "product_url", "source url", "source_url", "handle"]),
  imageUrl: new Set(["image", "image url", "image_url", "featured image"]),
};

function normalizeHeader(value) {
  return value
    .replace(/^\ufeff/, "")
    .trim()
    .toLowerCase()
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ");
}

function parseCsvRows(input) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const next = input[index + 1];

    if (character === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (!quoted && character === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!quoted && (character === "\n" || character === "\r")) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += character;
  }

  if (cell !== "" || row.length > 0) {
    row.push(cell);
    if (row.some((value) => value.trim() !== "")) rows.push(row);
  }

  if (quoted) throw new Error("CSV contains an unclosed quoted field");
  return rows;
}

function splitTags(value) {
  return value
    .split(/[|;,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function aliasFor(header) {
  const normalized = normalizeHeader(header);
  return Object.entries(FIELD_ALIASES).find(([, aliases]) => aliases.has(normalized))?.[0];
}

export function parseCatalogCsv(input) {
  const rows = parseCsvRows(input);
  if (rows.length === 0) throw new Error("CSV is empty");

  const headers = rows[0].map((header, index) => header.trim() || `Column ${index + 1}`);
  const mappedHeaders = headers.map(aliasFor);
  const seenSkus = new Set();
  const normalizedRows = rows.slice(1).map((values) => {
    const raw = Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? "").trim()]));
    const row = {};
    const attributes = {};

    mappedHeaders.forEach((field, index) => {
      const value = (values[index] ?? "").trim();
      if (!value) return;
      if (field === "tags") row.tags = splitTags(value);
      else if (field === "price") row.price = Number(value.replace(/[$,]/g, ""));
      else if (field) row[field] = value;
    });

    headers.forEach((header, index) => {
      if (!mappedHeaders[index] && raw[header]) attributes[header] = raw[header];
    });
    if (Object.keys(attributes).length > 0) row.attributes = attributes;

    const issues = [];
    if (!row.title) issues.push("Missing product title");
    if (raw[headers[mappedHeaders.indexOf("price")]] && !Number.isFinite(row.price)) {
      issues.push("Invalid price");
    }
    if (row.sku) {
      if (seenSkus.has(row.sku)) issues.push(`Duplicate SKU: ${row.sku}`);
      seenSkus.add(row.sku);
    }
    if (issues.length > 0) row.issues = issues;
    return row;
  });

  const issueCount = normalizedRows.reduce((total, row) => total + (row.issues?.length ?? 0), 0);
  return {
    headers,
    rows: normalizedRows,
    summary: {
      totalRows: normalizedRows.length,
      validRows: normalizedRows.filter((row) => !row.issues?.length).length,
      issueCount,
      duplicateSkuCount: normalizedRows.filter((row) => row.issues?.some((issue) => issue.startsWith("Duplicate SKU:"))).length,
    },
  };
}
