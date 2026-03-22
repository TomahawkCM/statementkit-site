import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Formats - StatementKit Docs",
  description:
    "All 11 supported bank statement formats: CSV, OFX/QFX, PDF, QIF, MT940, MT942, CAMT.052, CAMT.053, CAMT.054, and more.",
};

const FORMAT_LIST = [
  {
    name: "CSV",
    badge: "Most Common",
    description:
      "Comma-separated values. The most widely exported format from banks worldwide. Requires a bank config to map columns.",
    parser: "parseCSVContent(content)",
    returnType: "string[][]",
    features: [
      "120+ pre-configured bank column mappings",
      "Auto-detection of bank from headers",
      "Streaming parser for large files",
      "Handles quoted fields, multi-line values",
      "Custom delimiters (tab, semicolon, pipe)",
    ],
  },
  {
    name: "OFX / QFX",
    badge: "Self-Describing",
    description:
      "Open Financial Exchange. Used by Quicken, many US/CA banks. Self-describing format that includes account info, balances, and transactions. QFX is Intuit's branded version of OFX.",
    parser: "parseOFXFile(content, accountId?)",
    returnType: "{ transactions, balances, accountInfo }",
    features: [
      "SGML 1.x and XML 2.x support",
      "Multi-account OFX files",
      "Balance extraction (ledger + available)",
      "Account identification (BANKID, ACCTID, ACCTTYPE)",
      "FITID-based deduplication",
    ],
  },
  {
    name: "PDF",
    badge: "OCR Supported",
    description:
      "Portable Document Format. StatementKit can extract text from digital PDFs or perform OCR on scanned documents. Requires pdfjs-dist and tesseract.js peer dependencies.",
    parser: "extractPdfText(buffer)",
    returnType: "Promise<string>",
    features: [
      "Text extraction from digital PDFs",
      "OCR for scanned/image-based PDFs",
      "68 OCR languages via Tesseract",
      "Page count and text detection helpers",
      "Works in Node.js and browser",
    ],
  },
  {
    name: "QIF",
    badge: "Legacy",
    description:
      "Quicken Interchange Format. An older format still used by Quicken, GnuCash, and some banks. Supports banking, investment, and memorized transactions.",
    parser: "parseQIFFile(content)",
    returnType: "QIFData",
    features: [
      "All QIF transaction types",
      "Split transactions",
      "Categories and subcategories",
      "Investment entries (buy, sell, dividend)",
      "Memorized transaction lists",
    ],
  },
  {
    name: "MT940",
    badge: "SWIFT",
    description:
      "SWIFT MT940 end-of-day bank statement. The global standard for corporate bank-to-client reporting. Used by nearly every major bank worldwide for institutional customers.",
    parser: "parseMT940File(content)",
    returnType: "MT940Data",
    features: [
      "Full statement parsing (tag 20-86)",
      "Opening and closing balances",
      "Transaction references and supplementary details",
      "Multi-statement files",
      "Account identification",
    ],
  },
  {
    name: "MT942",
    badge: "SWIFT",
    description:
      "SWIFT MT942 interim (intraday) transaction report. Similar to MT940 but for real-time or intraday transaction reporting.",
    parser: "parseMT942File(content)",
    returnType: "MT942Data",
    features: [
      "Intraday transaction data",
      "Floor limit and debit/credit indicators",
      "Transaction type identification codes",
      "Compatible with MT940 field structure",
    ],
  },
  {
    name: "CAMT.052",
    badge: "ISO 20022",
    description:
      "ISO 20022 Bank-to-Customer Account Report. The XML successor to MT942 for intraday reporting. Increasingly adopted by European and global banks.",
    parser: "parseCAMT052File(content)",
    returnType: "CAMTData",
    features: [
      "Full ISO 20022 XML parsing",
      "Intraday account reports",
      "Structured remittance information",
      "Multi-currency support",
    ],
  },
  {
    name: "CAMT.053",
    badge: "ISO 20022",
    description:
      "ISO 20022 Bank-to-Customer Statement. The XML successor to MT940 for end-of-day statements. The primary standard in SEPA and many non-European markets.",
    parser: "parseCAMT053File(content)",
    returnType: "CAMTData",
    features: [
      "Full end-of-day statements",
      "Opening and closing balances",
      "Batch entries and detail records",
      "Creditor/debtor information",
      "Structured and unstructured remittance data",
    ],
  },
  {
    name: "CAMT.054",
    badge: "ISO 20022",
    description:
      "ISO 20022 Bank-to-Customer Debit/Credit Notification. Individual transaction notifications, often used for real-time alerts on incoming/outgoing payments.",
    parser: "parseCAMT054File(content)",
    returnType: "CAMTData",
    features: [
      "Individual debit/credit notifications",
      "Real-time transaction alerts",
      "Full remittance details",
      "Same structure as CAMT.052/053 entries",
    ],
  },
];

export default function FormatsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Supported Formats
      </h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
        StatementKit supports 11 bank statement formats. All formats are parsed
        into a common Transaction structure, making it easy to work with
        statements from any source.
      </p>

      {/* Auto-detection note */}
      <Card className="mb-10 border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="pt-6">
          <p className="text-sm">
            <strong className="text-emerald-400">Auto-detection:</strong>{" "}
            You don&apos;t need to know the format in advance. Use{" "}
            <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">
              detectFromContent(content)
            </code>{" "}
            to automatically identify the format with a confidence score, then
            call the appropriate parser.
          </p>
        </CardContent>
      </Card>

      <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-10">
        <code>{`import { detectFromContent } from 'statementkit';

const { format, confidence } = detectFromContent(fileContent);
// format: "csv" | "ofx" | "qif" | "mt940" | "mt942" | "camt" | "pdf"
// confidence: 0.0 - 1.0`}</code>
        </pre>

      {/* Format Details */}
      <div className="space-y-8">
        {FORMAT_LIST.map((fmt) => (
          <section key={fmt.name} id={fmt.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3">
                  {fmt.name}
                  <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px]">
                    {fmt.badge}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {fmt.description}
                </p>

                <div className="mb-4">
                  <pre className="bg-muted/50 rounded-lg p-3 text-sm font-mono border overflow-x-auto">
                    <code>
                      <span className="text-emerald-400">{fmt.parser}</span>
                      {" => "}
                      {fmt.returnType}
                    </code>
                  </pre>
                </div>

                <h4 className="text-sm font-medium mb-2">Features</h4>
                <ul className="space-y-1">
                  {fmt.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-emerald-400 mt-0.5 shrink-0">&#x2714;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        ))}
      </div>

      <Separator className="my-12" />

      {/* Format Checkers */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="format-checkers">
          Format Checker Functions
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Boolean helper functions to check if content matches a specific
          format:
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import {
  isCAMTContent,
  isMT940Content,
  isMT942Content,
  isQIFContent,
  isSWIFTContent,
} from 'statementkit';

if (isCAMTContent(content)) {
  const data = parseCAMTFile(content);
} else if (isMT940Content(content)) {
  const data = parseMT940File(content);
} else if (isQIFContent(content)) {
  const data = parseQIFFile(content);
}`}</code>
        </pre>
      </section>

      {/* Export Formats */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="export">
          Export Formats
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          StatementKit can export parsed transactions to four output formats.
          Parse any input format, export to any output format.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-1">CSV</div>
              <p className="text-sm text-muted-foreground">
                Standard comma-separated values with headers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-1">JSON</div>
              <p className="text-sm text-muted-foreground">
                Pretty-printed JSON array of transaction objects.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-1">QIF</div>
              <p className="text-sm text-muted-foreground">
                Quicken Interchange Format for import into Quicken/GnuCash.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="font-medium mb-1">OFX</div>
              <p className="text-sm text-muted-foreground">
                OFX 2.x XML format compatible with financial software.
              </p>
            </CardContent>
          </Card>
        </div>

        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mt-6">
          <code>{`import { exportTransactions, getSupportedExportFormats } from 'statementkit';

const formats = getSupportedExportFormats();
// ["csv", "json", "qif", "ofx"]

const csvOutput = exportTransactions(transactions, 'csv');
const jsonOutput = exportTransactions(transactions, 'json');
const qifOutput = exportTransactions(transactions, 'qif');
const ofxOutput = exportTransactions(transactions, 'ofx');`}</code>
        </pre>
      </section>

      {/* Generic CAMT parser */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" id="generic-camt">
          Generic CAMT Parser
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          If you don&apos;t know which CAMT variant you have, use{" "}
          <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">
            parseCAMTFile
          </code>{" "}
          which auto-detects the variant from the XML namespace:
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`import { parseCAMTFile } from 'statementkit';

// Works with any CAMT variant (052, 053, or 054)
const data = parseCAMTFile(xmlContent);
// Automatically detects the variant from the XML namespace`}</code>
        </pre>
      </section>
    </div>
  );
}
