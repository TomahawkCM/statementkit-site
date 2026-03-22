import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Getting Started - StatementKit Docs",
  description:
    "Install StatementKit, parse your first bank statement, and learn the core concepts.",
};

export default function GettingStartedPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Getting Started
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        Get up and running with StatementKit in under five minutes.
      </p>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="installation">
          Installation
        </h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-4">
          <code>npm install statementkit</code>
        </pre>
        <p className="text-sm text-muted-foreground mb-3">
          Or with your preferred package manager:
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`yarn add statementkit
pnpm add statementkit`}</code>
        </pre>
      </section>

      {/* Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="requirements">
          Requirements
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">&#x2714;</span>
                <span>
                  <strong>Node.js 18+</strong> or any modern browser
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">&#x2714;</span>
                <span>
                  <strong>TypeScript 5.0+</strong> (optional but recommended)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">&#x2714;</span>
                <span>
                  <strong>Zero runtime dependencies</strong> for core parsing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground mt-0.5">*</span>
                <span>
                  PDF/OCR features require <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">pdfjs-dist</code> and{" "}
                  <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">tesseract.js</code> (peer dependencies)
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Quick Start: CSV */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="quick-start-csv">
          Quick Start: Parse a CSV
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          The most common flow: parse a CSV file from a known bank.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-4">
          <code>{`import {
  parseCSVContent,
  convertToTransactions,
  getBank,
} from 'statementkit';

// 1. Read your CSV file
const csvContent = fs.readFileSync('statement.csv', 'utf-8');

// 2. Parse raw CSV into rows
const rows = parseCSVContent(csvContent);

// 3. Convert rows to typed transactions using a bank config
const config = getBank('td');  // TD Bank (Canada)
const transactions = convertToTransactions(rows, config, 'my-account-id');

console.log(transactions[0]);
// {
//   date: Date('2026-01-15'),
//   description: 'AMAZON.CA',
//   amount: -49.99,
//   currency: 'CAD',
//   accountId: 'my-account-id',
//   type: 'debit',
//   ...
// }`}</code>
        </pre>
      </section>

      {/* Quick Start: Auto-detect */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="auto-detect">
          Auto-Detect Format and Bank
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Don&apos;t know the format or bank? StatementKit can figure it out.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-4">
          <code>{`import {
  detectFromContent,
  detectBankWithConfidence,
  parseCSVContent,
  convertToTransactions,
  getBank,
} from 'statementkit';

const content = fs.readFileSync('unknown-file.csv', 'utf-8');

// Detect the file format
const { format, confidence } = detectFromContent(content);
console.log(format);      // "csv"
console.log(confidence);  // 0.95

// Parse and detect the bank from headers
const rows = parseCSVContent(content);
const { bank, confidence: bankConf } = detectBankWithConfidence(rows[0]);
console.log(bank);      // "td"
console.log(bankConf);  // 0.92

// Convert using detected bank config
const transactions = convertToTransactions(rows, getBank(bank), 'acct-1');`}</code>
        </pre>
      </section>

      {/* Quick Start: OFX */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="quick-start-ofx">
          Quick Start: Parse OFX/QFX
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          OFX files are self-describing — no bank config needed.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-4">
          <code>{`import { parseOFXFile } from 'statementkit';

const ofxContent = fs.readFileSync('download.ofx', 'utf-8');
const { transactions, balances, accountInfo } = parseOFXFile(ofxContent);

console.log(transactions.length);      // 47
console.log(balances.ledgerBalance);   // 1234.56
console.log(accountInfo.BANKID);       // "021000021"
console.log(accountInfo.ACCTTYPE);     // "CHECKING"`}</code>
        </pre>
      </section>

      {/* Quick Start: International */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="international">
          International Amount and Date Parsing
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          StatementKit understands locale-specific number and date formats out of
          the box.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-4">
          <code>{`import { parseAmount, parseDate } from 'statementkit';

// European: comma decimal, dot thousands
parseAmount('1.234,56', 'de-DE');      // 1234.56

// Indian: lakh/crore grouping
parseAmount('1,23,456.78', 'hi-IN');   // 123456.78

// French: space thousands, comma decimal
parseAmount('1 234,56', 'fr-FR');      // 1234.56

// German date with month name
parseDate('15. Januar 2026', 'de');    // Date(2026-01-15)

// Japanese date
parseDate('2026\\u5E741\\u670815\\u65E5', 'ja');  // Date(2026-01-15)

// Arabic date
parseDate('15 \\u064A\\u0646\\u0627\\u064A\\u0631 2026', 'ar');  // Date(2026-01-15)`}</code>
        </pre>
      </section>

      {/* Streaming */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="streaming">
          Streaming Large Files
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          For large CSV files, use the streaming parser to avoid loading
          everything into memory at once.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`import { parseCSVContentStream } from 'statementkit';

const csvContent = fs.readFileSync('huge-statement.csv', 'utf-8');

for await (const row of parseCSVContentStream(csvContent)) {
  // Process one row at a time
  console.log(row);
  // ["2026-01-15", "AMAZON", "-49.99", "CAD"]
}`}</code>
        </pre>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="transition-colors hover:border-emerald-500/30">
            <CardContent className="pt-6">
              <a href="/docs/api-reference" className="font-medium text-emerald-400 hover:underline">
                API Reference
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                Full reference for all exported functions and types.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-colors hover:border-emerald-500/30">
            <CardContent className="pt-6">
              <a href="/docs/bank-configs" className="font-medium text-emerald-400 hover:underline">
                Bank Configs
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                Browse 120+ built-in banks or register your own.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-colors hover:border-emerald-500/30">
            <CardContent className="pt-6">
              <a href="/docs/formats" className="font-medium text-emerald-400 hover:underline">
                Supported Formats
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                CSV, OFX, PDF/OCR, QIF, MT940, CAMT, and more.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-colors hover:border-emerald-500/30">
            <CardContent className="pt-6">
              <a href="/docs/cli" className="font-medium text-emerald-400 hover:underline">
                CLI Tool
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                Parse statements from the command line or CI pipelines.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
