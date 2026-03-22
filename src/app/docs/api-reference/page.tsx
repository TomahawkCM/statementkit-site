import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "API Reference - StatementKit Docs",
  description:
    "Complete API reference for StatementKit. Every exported function, type, and error class.",
};

function FnSignature({
  name,
  params,
  returns,
  description,
}: {
  name: string;
  params: string;
  returns: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <pre className="bg-muted/50 rounded-lg p-3 text-sm font-mono border overflow-x-auto mb-2">
        <code>
          <span className="text-emerald-400">{name}</span>({params}): {returns}
        </code>
      </pre>
      <p className="text-sm text-muted-foreground pl-1">{description}</p>
    </div>
  );
}

export default function ApiReferencePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">API Reference</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        Complete reference for every function exported by StatementKit.
        All imports come from the <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">statementkit</code> package.
      </p>

      {/* Table of Contents */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-base">On This Page</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            <li><a href="#core-parsing" className="text-emerald-400 hover:underline">Core Parsing</a></li>
            <li><a href="#format-detection" className="text-emerald-400 hover:underline">Format Detection</a></li>
            <li><a href="#bank-config" className="text-emerald-400 hover:underline">Bank Config</a></li>
            <li><a href="#transaction-processing" className="text-emerald-400 hover:underline">Transaction Processing</a></li>
            <li><a href="#amount-date" className="text-emerald-400 hover:underline">Amount &amp; Date Parsing</a></li>
            <li><a href="#export" className="text-emerald-400 hover:underline">Export</a></li>
            <li><a href="#pdf-ocr" className="text-emerald-400 hover:underline">PDF / OCR</a></li>
            <li><a href="#ai" className="text-emerald-400 hover:underline">AI Provider</a></li>
            <li><a href="#storage" className="text-emerald-400 hover:underline">Storage Adapters</a></li>
            <li><a href="#errors" className="text-emerald-400 hover:underline">Errors</a></li>
          </ul>
        </CardContent>
      </Card>

      {/* Core Parsing */}
      <section className="mb-12" id="core-parsing">
        <h2 className="text-2xl font-semibold mb-6">Core Parsing</h2>

        <FnSignature
          name="parseCSVContent"
          params="content: string"
          returns="string[][]"
          description="Parse a CSV string into a 2D array of rows and columns. Handles quoted fields, multi-line values, and various delimiters."
        />

        <FnSignature
          name="parseCSVContentStream"
          params="content: string"
          returns="AsyncGenerator&lt;string[]&gt;"
          description="Streaming CSV parser. Yields one row at a time. Ideal for large files where you don't want to load all rows into memory."
        />

        <FnSignature
          name="parseOFXContent"
          params="content: string"
          returns="OFXData"
          description="Parse OFX/QFX file content (both SGML 1.x and XML 2.x formats). Returns the full parsed data structure."
        />

        <FnSignature
          name="parseOFXFile"
          params="content: string, accountId?: string"
          returns="{ transactions, balances, accountInfo }"
          description="Higher-level OFX parser that returns transactions, balances, and account info in a flat structure. Easier to use than parseOFXContent."
        />

        <FnSignature
          name="parseMultiAccountOFX"
          params="content: string"
          returns="MultiAccountOFXData"
          description="Parse an OFX file that contains multiple accounts (e.g., checking + savings). Returns an array of per-account data."
        />

        <FnSignature
          name="parseQIFFile"
          params="content: string"
          returns="QIFData"
          description="Parse Quicken Interchange Format (QIF) files. Handles transaction types, categories, splits, and investment entries."
        />

        <FnSignature
          name="parseMT940File"
          params="content: string"
          returns="MT940Data"
          description="Parse SWIFT MT940 end-of-day bank statement files. Extracts statement lines, balances, and account identification."
        />

        <FnSignature
          name="parseMT942File"
          params="content: string"
          returns="MT942Data"
          description="Parse SWIFT MT942 interim (intraday) transaction reports."
        />

        <FnSignature
          name="parseCAMTFile"
          params="content: string"
          returns="CAMTData"
          description="Parse any ISO 20022 CAMT XML file. Auto-detects whether it is a 052, 053, or 054 variant."
        />

        <FnSignature
          name="parseCAMT052File"
          params="content: string"
          returns="CAMTData"
          description="Parse a CAMT.052 (account report / intraday) XML file."
        />

        <FnSignature
          name="parseCAMT053File"
          params="content: string"
          returns="CAMTData"
          description="Parse a CAMT.053 (end-of-day statement) XML file."
        />

        <FnSignature
          name="parseCAMT054File"
          params="content: string"
          returns="CAMTData"
          description="Parse a CAMT.054 (debit/credit notification) XML file."
        />
      </section>

      <Separator className="mb-12" />

      {/* Format Detection */}
      <section className="mb-12" id="format-detection">
        <h2 className="text-2xl font-semibold mb-6">Format Detection</h2>

        <FnSignature
          name="detectFromContent"
          params="content: string"
          returns="{ format: string, confidence: number }"
          description="Analyze file content and return the detected format (csv, ofx, qif, mt940, mt942, camt, pdf) with a confidence score from 0 to 1."
        />

        <FnSignature
          name="detectFileFormat"
          params="filename: string, content?: string"
          returns="string"
          description="Detect file format from the filename extension. If content is also provided, it is used as a fallback when the extension is ambiguous."
        />

        <FnSignature
          name="detectBankWithConfidence"
          params="headers: string[]"
          returns="{ bank: string, confidence: number }"
          description="Given CSV column headers, match against all 120+ bank configs and return the best match with a confidence score."
        />

        <FnSignature
          name="detectBank"
          params="headers: string[]"
          returns="string | null"
          description="Simplified version of detectBankWithConfidence. Returns the bank key or null if no match."
        />

        <h3 className="text-lg font-medium mb-4 mt-8">Format Checkers</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Boolean functions to check if content matches a specific format:
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`isCAMTContent(content: string): boolean
isMT940Content(content: string): boolean
isMT942Content(content: string): boolean
isQIFContent(content: string): boolean
isSWIFTContent(content: string): boolean`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Bank Config */}
      <section className="mb-12" id="bank-config">
        <h2 className="text-2xl font-semibold mb-6">Bank Config</h2>

        <FnSignature
          name="getAllBanks"
          params=""
          returns="Record&lt;string, BankConfig&gt;"
          description="Get all registered bank configurations (built-in + custom) as a key-value map."
        />

        <FnSignature
          name="getAllBankKeys"
          params=""
          returns="string[]"
          description="Get an array of all registered bank keys."
        />

        <FnSignature
          name="getBank"
          params="key: string"
          returns="BankConfig"
          description="Get a bank configuration by its key. Throws if the key is not found."
        />

        <FnSignature
          name="getBankConfig"
          params="key: string"
          returns="BankConfig"
          description="Alias for getBank. Get a bank configuration by its key."
        />

        <FnSignature
          name="getBanksByRegion"
          params="region: string"
          returns="BankConfig[]"
          description="Get all bank configs for a specific region (e.g., 'NA', 'EU', 'UK', 'AU', 'ASIA', 'SEA', 'JP')."
        />

        <FnSignature
          name="registerBank"
          params="key: string, config: BankConfig"
          returns="void"
          description="Register a custom bank configuration at runtime. The config must pass validation."
        />

        <FnSignature
          name="unregisterBank"
          params="key: string"
          returns="void"
          description="Remove a custom bank configuration. Cannot remove built-in banks."
        />

        <FnSignature
          name="loadBankConfigJSON"
          params="json: string"
          returns="{ registered: string[], errors: string[] }"
          description="Parse a JSON string containing one or more bank configs and register them all. Returns lists of successes and errors."
        />

        <FnSignature
          name="validateBankConfig"
          params="config: unknown"
          returns="{ valid: boolean, errors: string[] }"
          description="Validate a bank config object against the expected schema. Returns validation errors."
        />

        <FnSignature
          name="validateBankConfigZod"
          params="config: unknown"
          returns="ZodResult"
          description="Validate a bank config using the Zod schema. Returns the full Zod parse result with typed output."
        />

        <FnSignature
          name="generateBankConfigTemplate"
          params="key: string"
          returns="BankConfig"
          description="Generate a starter template for a new bank config. Pre-fills common fields for you to customize."
        />

        <FnSignature
          name="suggestBankConfig"
          params="csvContent: string"
          returns="SuggestedConfig"
          description="Analyze a CSV file and suggest a bank configuration based on headers and content patterns."
        />

        <FnSignature
          name="exportBankConfig"
          params="key: string"
          returns="string"
          description="Export a bank config as a JSON string. Useful for sharing configs between projects."
        />

        <FnSignature
          name="getCustomBanks"
          params=""
          returns="string[]"
          description="Get an array of keys for all custom (user-registered) bank configs."
        />

        <FnSignature
          name="resetCustomBanks"
          params=""
          returns="void"
          description="Remove all custom bank configs, restoring only the 120+ built-in banks."
        />
      </section>

      <Separator className="mb-12" />

      {/* Transaction Processing */}
      <section className="mb-12" id="transaction-processing">
        <h2 className="text-2xl font-semibold mb-6">Transaction Processing</h2>

        <FnSignature
          name="convertToTransactions"
          params="rows: string[][], config: BankConfig, accountId: string"
          returns="Transaction[]"
          description="Convert parsed CSV rows into typed Transaction objects using a specific bank configuration."
        />

        <FnSignature
          name="convertToTransactionsUniversal"
          params="rows: string[][], headers: string[]"
          returns="Transaction[]"
          description="Convert CSV rows into transactions without a bank config. Uses heuristics to map columns automatically."
        />

        <FnSignature
          name="normalizeTransaction"
          params="transaction: Transaction"
          returns="Transaction"
          description="Normalize a single transaction: trim whitespace, standardize date, clean description."
        />

        <FnSignature
          name="normalizeTransactions"
          params="transactions: Transaction[]"
          returns="Transaction[]"
          description="Normalize an array of transactions."
        />

        <FnSignature
          name="detectDuplicates"
          params="transactions: Transaction[]"
          returns="DuplicateGroup[]"
          description="Find potential duplicate transactions based on date, amount, and description matching."
        />

        <FnSignature
          name="parseTransactionRows"
          params="rows: string[][], config: BankConfig"
          returns="Transaction[]"
          description="Lower-level function to parse raw rows into transactions using column mappings from a bank config."
        />
      </section>

      <Separator className="mb-12" />

      {/* Amount & Date Parsing */}
      <section className="mb-12" id="amount-date">
        <h2 className="text-2xl font-semibold mb-6">Amount &amp; Date Parsing</h2>

        <FnSignature
          name="parseAmount"
          params="str: string, locale?: string"
          returns="number"
          description="Parse a locale-aware amount string into a number. Handles comma/dot decimals, thousand separators, Indian grouping, and more."
        />

        <FnSignature
          name="parseAmountVerbose"
          params="str: string, locale?: string"
          returns="{ amount: number, currency?: string, locale?: string }"
          description="Like parseAmount but also extracts any currency symbol or code found in the string."
        />

        <FnSignature
          name="parseDate"
          params="str: string, locale?: string"
          returns="Date"
          description="Parse a locale-aware date string. Understands month names in 68 languages, ISO 8601, and common formats."
        />

        <FnSignature
          name="parseDateWithOrder"
          params="str: string, order: string"
          returns="Date"
          description="Parse a date string with an explicit component order: 'MDY', 'DMY', or 'YMD'."
        />

        <FnSignature
          name="disambiguateDateFormat"
          params="dates: string[]"
          returns="'MDY' | 'DMY' | 'YMD'"
          description="Given an array of date strings from a statement, determine the most likely date format by statistical analysis."
        />

        <FnSignature
          name="detectCurrencySymbol"
          params="str: string"
          returns="string | null"
          description="Extract the currency symbol or ISO code from a string (e.g., '$', 'EUR', 'kr')."
        />

        <FnSignature
          name="isZeroDecimalCurrency"
          params="code: string"
          returns="boolean"
          description="Check if a currency code uses zero decimal places (e.g., JPY, KRW, VND)."
        />

        <FnSignature
          name="validateCurrencyDecimals"
          params="amount: number, code: string"
          returns="boolean"
          description="Check whether an amount has the correct number of decimal places for a given currency."
        />
      </section>

      <Separator className="mb-12" />

      {/* Export */}
      <section className="mb-12" id="export">
        <h2 className="text-2xl font-semibold mb-6">Export</h2>

        <FnSignature
          name="exportTransactions"
          params="transactions: Transaction[], format: string"
          returns="string"
          description="Export transactions to the specified format. Supported formats: csv, json, qif, ofx."
        />

        <FnSignature
          name="exportCSV"
          params="transactions: Transaction[]"
          returns="string"
          description="Export transactions as a CSV string."
        />

        <FnSignature
          name="exportJSON"
          params="transactions: Transaction[]"
          returns="string"
          description="Export transactions as a pretty-printed JSON string."
        />

        <FnSignature
          name="exportQIF"
          params="transactions: Transaction[]"
          returns="string"
          description="Export transactions as a Quicken Interchange Format (QIF) string."
        />

        <FnSignature
          name="exportOFX"
          params="transactions: Transaction[]"
          returns="string"
          description="Export transactions as an OFX 2.x XML string."
        />

        <FnSignature
          name="getSupportedExportFormats"
          params=""
          returns="string[]"
          description="Returns an array of supported export format names: ['csv', 'json', 'qif', 'ofx']."
        />

        <FnSignature
          name="getFormatDisplayName"
          params="format: string"
          returns="string"
          description="Get the human-readable display name for a format key (e.g., 'ofx' returns 'OFX (Open Financial Exchange)')."
        />
      </section>

      <Separator className="mb-12" />

      {/* PDF / OCR */}
      <section className="mb-12" id="pdf-ocr">
        <h2 className="text-2xl font-semibold mb-6">PDF / OCR</h2>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              PDF and OCR functions require the peer dependencies{" "}
              <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">pdfjs-dist</code> and{" "}
              <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">tesseract.js</code>. They work in both
              Node.js and browser environments.
            </p>
          </CardContent>
        </Card>

        <FnSignature
          name="extractPdfText"
          params="buffer: ArrayBuffer"
          returns="Promise&lt;string&gt;"
          description="Extract text content from a PDF file. Works with text-based PDFs."
        />

        <FnSignature
          name="getPdfPageCount"
          params="buffer: ArrayBuffer"
          returns="Promise&lt;number&gt;"
          description="Get the number of pages in a PDF file."
        />

        <FnSignature
          name="pdfHasText"
          params="buffer: ArrayBuffer"
          returns="Promise&lt;boolean&gt;"
          description="Check whether a PDF contains extractable text (vs. scanned images)."
        />

        <FnSignature
          name="pdfNeedsOCR"
          params="buffer: ArrayBuffer"
          returns="Promise&lt;boolean&gt;"
          description="Check whether a PDF requires OCR to extract content (i.e., it's a scanned document)."
        />

        <FnSignature
          name="performPDFOCR"
          params="buffer: ArrayBuffer, lang?: string"
          returns="Promise&lt;string&gt;"
          description="Perform OCR on a scanned PDF. Renders each page, runs Tesseract, and returns the combined text. The lang parameter accepts Tesseract language codes (default: 'eng')."
        />

        <FnSignature
          name="setPdfWorkerSrc"
          params="src: string"
          returns="void"
          description="Set the PDF.js worker source URL. Required in browser environments to offload parsing to a web worker."
        />

        <FnSignature
          name="getSupportedOCRLanguages"
          params=""
          returns="string[]"
          description="Get the list of all supported Tesseract OCR language codes (68 languages)."
        />

        <FnSignature
          name="getOCRLanguage"
          params="locale: string"
          returns="string"
          description="Map a locale code (e.g., 'de-DE') to the corresponding Tesseract language code (e.g., 'deu')."
        />
      </section>

      <Separator className="mb-12" />

      {/* AI Provider */}
      <section className="mb-12" id="ai">
        <h2 className="text-2xl font-semibold mb-6">AI Provider</h2>

        <FnSignature
          name="setAIProvider"
          params="provider: AIProvider"
          returns="void"
          description="Register an AI provider for merchant matching and transaction categorization. See the AI Enrichment docs for the AIProvider interface."
        />

        <FnSignature
          name="getAIProvider"
          params=""
          returns="AIProvider | null"
          description="Get the currently registered AI provider, or null if none is set."
        />

        <FnSignature
          name="hasAIProvider"
          params=""
          returns="boolean"
          description="Check whether an AI provider has been registered."
        />

        <FnSignature
          name="chatCompletionJSON"
          params="prompt: string, schema: ZodSchema"
          returns="Promise&lt;T&gt;"
          description="Send a prompt to the registered AI provider and parse the response as validated JSON using the provided Zod schema. Throws if no provider is set."
        />
      </section>

      <Separator className="mb-12" />

      {/* Storage */}
      <section className="mb-12" id="storage">
        <h2 className="text-2xl font-semibold mb-6">Storage Adapters</h2>
        <p className="text-sm text-muted-foreground mb-6">
          In-memory implementations of storage interfaces for testing and
          lightweight usage.
        </p>

        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import {
  InMemoryStorageAdapter,
  InMemoryFITIDStore,
  InMemoryMerchantCorrectionStore,
  MockAIProvider,
} from 'statementkit';

// In-memory storage for transactions
const storage = new InMemoryStorageAdapter();

// In-memory FITID (Financial Institution Transaction ID) store
// for OFX duplicate detection
const fitidStore = new InMemoryFITIDStore();

// In-memory store for merchant name corrections
const merchantStore = new InMemoryMerchantCorrectionStore();

// Mock AI provider for testing
const mockAI = new MockAIProvider();`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Errors */}
      <section className="mb-12" id="errors">
        <h2 className="text-2xl font-semibold mb-6">Errors</h2>
        <p className="text-sm text-muted-foreground mb-6">
          All errors extend{" "}
          <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">StatementKitError</code>, which extends the
          native <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">Error</code> class. You can catch them
          individually or catch the base class.
        </p>

        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import {
  StatementKitError,  // Base class for all errors
  ParseError,         // CSV/OFX/QIF parsing failures
  OCRError,           // PDF OCR failures
  FormatDetectionError,  // Unable to detect format
  ValidationError,    // Bank config or data validation failures
} from 'statementkit';

try {
  const data = parseOFXContent(badContent);
} catch (err) {
  if (err instanceof ParseError) {
    console.error('Parse failed:', err.message);
  } else if (err instanceof StatementKitError) {
    console.error('StatementKit error:', err.message);
  }
}`}</code>
        </pre>
      </section>
    </div>
  );
}
