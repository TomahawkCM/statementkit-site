"use client";

import { useState, useRef, useEffect } from "react";

const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", sample: "Jan 15, 2025  GROCERY STORE  -$45.99", parsed: { date: "2025-01-15", desc: "GROCERY STORE", amount: -45.99, currency: "USD" } },
  { code: "de", label: "Deutsch", sample: "15. Januar 2025  SUPERMARKT  -45,99 \u20ac", parsed: { date: "2025-01-15", desc: "SUPERMARKT", amount: -45.99, currency: "EUR" } },
  { code: "fr", label: "Fran\u00e7ais", sample: "15 janvier 2025  BOULANGERIE  -45,99 \u20ac", parsed: { date: "2025-01-15", desc: "BOULANGERIE", amount: -45.99, currency: "EUR" } },
  { code: "es", label: "Espa\u00f1ol", sample: "15 enero 2025  SUPERMERCADO  -$45.99", parsed: { date: "2025-01-15", desc: "SUPERMERCADO", amount: -45.99, currency: "USD" } },
  { code: "pt", label: "Portugu\u00eas", sample: "15 janeiro 2025  MERCADO  -R$45,99", parsed: { date: "2025-01-15", desc: "MERCADO", amount: -45.99, currency: "BRL" } },
  { code: "ja", label: "\u65e5\u672c\u8a9e", sample: "2025\u5e741\u670815\u65e5  \u30b9\u30fc\u30d1\u30fc  -\u00a53,500", parsed: { date: "2025-01-15", desc: "\u30b9\u30fc\u30d1\u30fc", amount: -3500, currency: "JPY" } },
  { code: "zh", label: "\u4e2d\u6587", sample: "2025\u5e741\u670815\u65e5  \u8d85\u5e02\u8d2d\u7269  -\u00a5256.80", parsed: { date: "2025-01-15", desc: "\u8d85\u5e02\u8d2d\u7269", amount: -256.80, currency: "CNY" } },
  { code: "ko", label: "\ud55c\uad6d\uc5b4", sample: "2025\ub144 1\uc6d4 15\uc77c  \uc288\ud37c\ub9c8\ucf13  -\u20a935,000", parsed: { date: "2025-01-15", desc: "\uc288\ud37c\ub9c8\ucf13", amount: -35000, currency: "KRW" } },
  { code: "ar", label: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", sample: "15 \u064a\u0646\u0627\u064a\u0631 2025  \u0633\u0648\u0628\u0631 \u0645\u0627\u0631\u0643\u062a  -45.99 \ufdfc", parsed: { date: "2025-01-15", desc: "\u0633\u0648\u0628\u0631 \u0645\u0627\u0631\u0643\u062a", amount: -45.99, currency: "SAR" } },
  { code: "hi", label: "\u0939\u093f\u0928\u094d\u0926\u0940", sample: "15 \u091c\u0928\u0935\u0930\u0940 2025  \u0915\u093f\u0930\u093e\u0928\u093e \u0938\u094d\u091f\u094b\u0930  -\u20b9500.00", parsed: { date: "2025-01-15", desc: "\u0915\u093f\u0930\u093e\u0928\u093e \u0938\u094d\u091f\u094b\u0930", amount: -500.00, currency: "INR" } },
  { code: "ru", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", sample: "15 \u044f\u043d\u0432\u0430\u0440\u044f 2025  \u0421\u0423\u041f\u0415\u0420\u041c\u0410\u0420\u041a\u0415\u0422  -890,50 \u20bd", parsed: { date: "2025-01-15", desc: "\u0421\u0423\u041f\u0415\u0420\u041c\u0410\u0420\u041a\u0415\u0422", amount: -890.50, currency: "RUB" } },
  { code: "th", label: "\u0e44\u0e17\u0e22", sample: "15 \u0e21\u0e01\u0e23\u0e32\u0e04\u0e21 2025  \u0e0b\u0e39\u0e40\u0e1b\u0e2d\u0e23\u0e4c\u0e21\u0e32\u0e23\u0e4c\u0e40\u0e01\u0e47\u0e15  -\u0e3f350", parsed: { date: "2025-01-15", desc: "\u0e0b\u0e39\u0e40\u0e1b\u0e2d\u0e23\u0e4c\u0e21\u0e32\u0e23\u0e4c\u0e40\u0e01\u0e47\u0e15", amount: -350, currency: "THB" } },
  { code: "tr", label: "T\u00fcrk\u00e7e", sample: "15 Ocak 2025  MARKET  -\u20ba78,50", parsed: { date: "2025-01-15", desc: "MARKET", amount: -78.50, currency: "TRY" } },
  { code: "pl", label: "Polski", sample: "15 stycznia 2025  SKLEP SPO\u017bYWCZY  -45,00 z\u0142", parsed: { date: "2025-01-15", desc: "SKLEP SPO\u017bYWCZY", amount: -45.00, currency: "PLN" } },
  { code: "he", label: "\u05e2\u05d1\u05e8\u05d9\u05ea", sample: "15 \u05d9\u05e0\u05d5\u05d0\u05e8 2025  \u05e1\u05d5\u05e4\u05e8\u05de\u05e8\u05e7\u05d8  -\u20aa89.90", parsed: { date: "2025-01-15", desc: "\u05e1\u05d5\u05e4\u05e8\u05de\u05e8\u05e7\u05d8", amount: -89.90, currency: "ILS" } },
  { code: "id", label: "Bahasa Indonesia", sample: "15 Januari 2025  TOKO KELONTONG  -Rp450.000", parsed: { date: "2025-01-15", desc: "TOKO KELONTONG", amount: -450000, currency: "IDR" } },
];

interface FormatSelectorProps {}

export function FormatSelector({}: FormatSelectorProps) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-rotate every 3 seconds when not interacting
  useEffect(() => {
    if (open) return;
    const timer = setInterval(() => {
      setSelected((prev) => (prev + 1) % SUPPORTED_LANGUAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const lang = SUPPORTED_LANGUAGES[selected];
  const filtered = SUPPORTED_LANGUAGES.filter((l) => {
    const q = filter.toLowerCase();
    return l.label.toLowerCase().includes(q) || l.code.toLowerCase().includes(q);
  });

  return (
    <div className="sticky top-0 z-50 w-full border-b-2 border-emerald-500/30 bg-zinc-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2">
        <div className="flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 shrink-0">Input:</span>
            <code className="text-zinc-300 truncate">{lang.sample}</code>
          </div>
          <div className="flex items-center gap-2 text-xs mt-0.5">
            <span className="text-zinc-500 shrink-0">Parsed:</span>
            <code className="text-emerald-400 truncate">
              {`{ date: "${lang.parsed.date}", desc: "${lang.parsed.desc}", amount: ${lang.parsed.amount}, currency: "${lang.parsed.currency}" }`}
            </code>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 relative" ref={containerRef}>
          <span className="text-xs text-zinc-500 hidden sm:inline">68 languages</span>
          <button
            onClick={() => setOpen(!open)}
            className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-md px-3 py-1.5 text-xs hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
          >
            <span>{lang.label}</span>
            <span className="text-zinc-500 text-[10px]">\u25bc</span>
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-1 w-[280px] max-sm:fixed max-sm:left-2 max-sm:right-2 max-sm:w-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50">
              <input
                ref={inputRef}
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search languages..."
                className="w-full bg-zinc-800 text-zinc-200 border-b border-zinc-700 px-3 py-2.5 text-sm outline-none placeholder:text-zinc-500"
              />
              <div className="max-h-[300px] overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-zinc-500 text-center">No matches</div>
                ) : (
                  filtered.map((l, i) => {
                    const idx = SUPPORTED_LANGUAGES.indexOf(l);
                    return (
                      <button
                        key={l.code}
                        onClick={() => { setSelected(idx); setOpen(false); setFilter(""); }}
                        className={`w-full text-left px-3 py-2.5 text-sm min-h-[44px] hover:bg-zinc-800 cursor-pointer transition-colors flex items-center justify-between ${
                          idx === selected ? "bg-zinc-800 text-white" : "text-zinc-300"
                        }`}
                      >
                        <span>{l.label}</span>
                        <span className="text-zinc-500 text-xs">{l.code}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
