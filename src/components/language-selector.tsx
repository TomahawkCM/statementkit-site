"use client";

import { useState, useRef, useEffect } from "react";
import { LOCALE_METADATA, LOCALES } from "@/i18n/use-landing-translations";

interface LanguageSelectorProps {
  locale: string;
  onChangeLocale: (locale: string) => void;
  loading: boolean;
  label: string;
  polyglotLinkText: string;
}

export function LanguageSelector({
  locale,
  onChangeLocale,
  loading,
  label,
  polyglotLinkText,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = LOCALES.filter((code) => {
    const meta = LOCALE_METADATA[code];
    const query = filter.toLowerCase();
    return meta.label.toLowerCase().includes(query) || code.toLowerCase().includes(query);
  });

  const handleSelect = (code: string) => {
    onChangeLocale(code);
    setOpen(false);
    setFilter("");
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b-2 border-emerald-500/30 bg-zinc-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2">
        <span className="text-xs text-zinc-400 hidden sm:inline">
          {label}{" "}
          <a
            href="https://polyglot-kit-site.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
          >
            {polyglotLinkText}
          </a>
        </span>
        <div className="flex items-center gap-2 ml-auto relative" ref={containerRef}>
          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
          )}
          <button
            onClick={() => setOpen(!open)}
            className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-md px-3 py-1.5 text-xs hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
          >
            <span>{LOCALE_METADATA[locale]?.label || locale}</span>
            <span className="text-zinc-500 text-[10px]">{"\u25BC"}</span>
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-1 w-[300px] max-sm:fixed max-sm:left-2 max-sm:right-2 max-sm:w-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50">
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
                  filtered.map((code) => (
                    <button
                      key={code}
                      onClick={() => handleSelect(code)}
                      className={`w-full text-left px-3 py-2.5 text-sm min-h-[44px] hover:bg-zinc-800 cursor-pointer transition-colors flex items-center justify-between ${
                        code === locale ? "bg-zinc-800 text-white" : "text-zinc-300"
                      }`}
                    >
                      <span>{LOCALE_METADATA[code].label}</span>
                      <span className="text-zinc-500 text-xs">{code}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
