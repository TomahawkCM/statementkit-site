import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Documentation - StatementKit",
  description:
    "StatementKit documentation. Learn how to parse bank statements in 11 formats across 120+ banks with a single SDK.",
};

const SECTIONS = [
  {
    href: "/docs/getting-started",
    title: "Getting Started",
    description:
      "Install StatementKit, parse your first CSV, and explore auto-detection.",
  },
  {
    href: "/docs/api-reference",
    title: "API Reference",
    description:
      "Complete reference for every exported function, type, and error class.",
  },
  {
    href: "/docs/cli",
    title: "CLI",
    description:
      "Parse, detect, and export bank statements from the command line.",
  },
  {
    href: "/docs/bank-configs",
    title: "Bank Configs",
    description:
      "120+ built-in banks. Register custom configs, validate with Zod, load from JSON.",
  },
  {
    href: "/docs/formats",
    title: "Formats",
    description:
      "CSV, OFX/QFX, PDF/OCR, QIF, MT940, MT942, CAMT.052/.053/.054, and more.",
  },
  {
    href: "/docs/ai-enrichment",
    title: "AI Enrichment",
    description:
      "Bring-your-own-key AI provider interface for merchant matching and categorization.",
  },
];

export default function DocsIndex() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        StatementKit is a privacy-first bank statement parser SDK. 120+ banks,
        11 formats, 68 languages, 70+ currencies. 100% offline. Zero external
        services.
      </p>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Quick Install</h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>npm install statementkit</code>
        </pre>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Hello World</h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`import { parseCSVContent, detectBankWithConfidence, convertToTransactions, getBank } from 'statementkit';

const rows = parseCSVContent(csvString);
const { bank } = detectBankWithConfidence(rows[0]);
const transactions = convertToTransactions(rows, getBank(bank), 'my-account');

console.log(transactions);
// [{ date, description, amount, currency, ... }]`}</code>
        </pre>
      </div>

      <h2 className="text-xl font-semibold mb-6">Explore the Docs</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card className="h-full transition-colors group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5">
              <CardHeader>
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
