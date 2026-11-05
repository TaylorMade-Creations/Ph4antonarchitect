"use client";

import { ChangeEvent, useState } from "react";

import { parseCatalogCsv } from "@/lib/catalog/csv.mjs";

type CatalogImport = {
  rows: Array<Record<string, unknown>>;
  summary: {
    totalRows: number;
    validRows: number;
    issueCount: number;
    duplicateSkuCount: number;
  };
};

export default function CatalogCsvImport() {
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<CatalogImport | null>(null);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError("");
    setResult(null);

    try {
      setResult(parseCatalogCsv(await file.text()) as unknown as CatalogImport);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not read this CSV");
    }
  }

  function downloadReview() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "product-intelligence-review.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-lg border border-[#d8d2c4] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#746a54]">
            Vendor-neutral catalog intake
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Review any catalog CSV</h2>
          <p className="mt-3 text-sm leading-6 text-[#5d594e]">
            Start with a Stone Wick export or use the same workflow for clothing,
            candles, fragrance, or another catalog. The file is parsed in your
            browser, normalized for review, and never written to a store.
          </p>
          <p className="mt-3 text-xs leading-5 text-[#746a54]">
            Recognized columns include title/name, SKU, price, description, tags,
            product URL, and image URL. Other columns are preserved as attributes.
          </p>
        </div>

        <div className="rounded-lg bg-[#f6f4ef] p-4">
          <label className="block text-sm font-semibold text-[#313229]" htmlFor="catalog-csv">
            Choose a CSV file
          </label>
          <input
            accept=".csv,text/csv"
            className="mt-3 block w-full rounded-md border border-[#cfc7b7] bg-white px-3 py-2 text-sm text-[#181916]"
            id="catalog-csv"
            onChange={handleFileChange}
            type="file"
          />
          {fileName && <p className="mt-2 text-xs text-[#746a54]">Loaded: {fileName}</p>}
          {error && <p className="mt-3 text-sm font-semibold text-[#9b2c2c]">{error}</p>}

          {result && (
            <div className="mt-4 border-t border-[#d8d2c4] pt-4">
              <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                <Metric label="Rows" value={result.summary.totalRows} />
                <Metric label="Ready" value={result.summary.validRows} />
                <Metric label="Issues" value={result.summary.issueCount} />
                <Metric label="Duplicate SKUs" value={result.summary.duplicateSkuCount} />
              </div>
              <button
                className="mt-4 rounded-md bg-[#20251f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#30382e]"
                onClick={downloadReview}
                type="button"
              >
                Download review JSON
              </button>
              <p className="mt-2 text-xs leading-5 text-[#746a54]">
                Review the flagged rows before any future store connection or catalog
                sync is enabled.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[#d8d2c4] bg-white px-3 py-2">
      <div className="text-xs uppercase tracking-[0.08em] text-[#746a54]">{label}</div>
      <div className="mt-1 text-xl font-semibold text-[#181916]">{value}</div>
    </div>
  );
}
