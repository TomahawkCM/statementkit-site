import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Bank Configs - StatementKit Docs",
  description:
    "120+ built-in bank configurations. Register custom banks, validate with Zod, load from JSON.",
};

const REGIONS = [
  {
    code: "NA",
    name: "North America",
    banks: [
      "BMO", "TD", "RBC", "Scotiabank", "CIBC", "Tangerine", "Simplii",
      "Desjardins", "Chase", "Bank of America", "Wells Fargo", "Citi",
      "Capital One",
    ],
  },
  {
    code: "EU",
    name: "Europe",
    banks: ["N26", "Revolut", "ING", "Deutsche Bank"],
  },
  {
    code: "UK",
    name: "United Kingdom",
    banks: ["Barclays", "HSBC", "Lloyds", "Natwest"],
  },
  {
    code: "AU",
    name: "Australia",
    banks: ["CommBank", "ANZ", "Westpac", "NAB"],
  },
  {
    code: "ASIA",
    name: "South & East Asia",
    banks: ["HDFC", "ICICI", "DBS", "OCBC", "UOB"],
  },
  {
    code: "SEA",
    name: "Southeast Asia",
    banks: [
      "Bangkok Bank", "Kasikorn", "SCB", "Maybank", "CIMB", "GCash", "BDO",
    ],
  },
  {
    code: "JP",
    name: "Japan",
    banks: ["Rakuten", "Mizuho", "MUFG", "SMBC"],
  },
  {
    code: "Global",
    name: "Global / Multi-Region",
    banks: ["Wise", "GrabPay", "Aspire", "YouTrip"],
  },
];

export default function BankConfigsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Bank Configs</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        StatementKit ships with 120+ pre-configured bank definitions. You can
        also register custom banks at runtime, validate configs with Zod, and
        load them from JSON files.
      </p>

      {/* Built-in Banks */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6" id="built-in">
          Built-in Banks by Region
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {REGIONS.map((region) => (
            <Card key={region.code}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  {region.name}
                  <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px]">
                    {region.code}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {region.banks.join(", ")}
                  {region.banks.length < 10 ? "" : ", ..."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Using Bank Configs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="using">
          Using Bank Configs
        </h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import {
  getAllBanks,
  getAllBankKeys,
  getBank,
  getBanksByRegion,
} from 'statementkit';

// Get all bank keys
const keys = getAllBankKeys();
console.log(keys.length);  // 120+

// Get a specific bank config
const td = getBank('td');
console.log(td.name);      // "TD Bank (Canada)"
console.log(td.currency);  // "CAD"
console.log(td.region);    // "NA"

// Get all banks in a region
const euBanks = getBanksByRegion('EU');
console.log(euBanks.map(b => b.name));
// ["N26", "Revolut", "ING", "Deutsche Bank", ...]`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* BankConfig Schema */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="schema">
          BankConfig Schema
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          A bank config tells StatementKit how to map CSV columns to
          transaction fields. Here is the full shape:
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`interface BankConfig {
  name: string;              // Human-readable bank name
  region: string;            // Region code: NA, EU, UK, AU, ASIA, SEA, JP
  currency: string;          // Default ISO currency code (e.g., "CAD")

  // Column mappings (0-indexed)
  dateColumn: number;        // Column index for transaction date
  descriptionColumn: number; // Column index for description/memo
  amountColumn?: number;     // Single amount column (negative = debit)
  debitColumn?: number;      // Separate debit column (use instead of amountColumn)
  creditColumn?: number;     // Separate credit column
  balanceColumn?: number;    // Running balance column (optional)
  categoryColumn?: number;   // Category column (optional)
  referenceColumn?: number;  // Reference/check number column (optional)

  // Parsing options
  dateFormat?: string;       // Date format hint: "MM/DD/YYYY", "DD/MM/YYYY", etc.
  headerRow?: number;        // Row index of headers (default: 0)
  skipRows?: number;         // Number of rows to skip before data
  delimiter?: string;        // Column delimiter (default: ",")
  locale?: string;           // Locale for amount/date parsing

  // Detection
  headers?: string[];        // Expected header values (for auto-detection)
  headerPattern?: RegExp;    // Regex pattern for header matching
}`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Custom Bank */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="custom">
          Registering a Custom Bank
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          If your bank isn&apos;t in the 120+ built-in list, you can register a
          custom config at runtime.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { registerBank, getBank, parseCSVContent, convertToTransactions } from 'statementkit';

// Register a custom bank
registerBank('my-credit-union', {
  name: 'My Credit Union',
  region: 'NA',
  currency: 'USD',
  dateColumn: 0,
  descriptionColumn: 2,
  amountColumn: 3,
  dateFormat: 'MM/DD/YYYY',
  headerRow: 0,
  headers: ['Transaction Date', 'Post Date', 'Description', 'Amount', 'Balance'],
});

// Now use it like any built-in bank
const rows = parseCSVContent(csvContent);
const config = getBank('my-credit-union');
const transactions = convertToTransactions(rows, config, 'my-acct');`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Loading from JSON */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="json-loading">
          Loading Configs from JSON
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Load one or more bank configs from a JSON file. This is useful for
          storing custom configs in your project or distributing them.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { loadBankConfigJSON } from 'statementkit';

const json = fs.readFileSync('my-banks.json', 'utf-8');

const { registered, errors } = loadBankConfigJSON(json);

console.log(registered);  // ["my-bank-1", "my-bank-2"]
console.log(errors);      // [] (empty if all valid)`}</code>
        </pre>

        <p className="text-sm text-muted-foreground mb-4">
          The JSON file should be an object where keys are bank identifiers:
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`{
  "my-bank-1": {
    "name": "My Bank One",
    "region": "NA",
    "currency": "USD",
    "dateColumn": 0,
    "descriptionColumn": 1,
    "amountColumn": 2,
    "headers": ["Date", "Description", "Amount"]
  },
  "my-bank-2": {
    "name": "My Bank Two",
    "region": "EU",
    "currency": "EUR",
    "dateColumn": 0,
    "descriptionColumn": 1,
    "debitColumn": 2,
    "creditColumn": 3,
    "headers": ["Datum", "Beschreibung", "Soll", "Haben"]
  }
}`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Validation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="validation">
          Validation
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Validate bank configs before registering them. Two methods are
          available: a simple validator and a Zod-based validator.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { validateBankConfig, validateBankConfigZod } from 'statementkit';

// Simple validation
const result = validateBankConfig({
  name: 'Test',
  dateColumn: 0,
  // missing required fields...
});
console.log(result.valid);   // false
console.log(result.errors);  // ["Missing required field: descriptionColumn", ...]

// Zod validation (returns full Zod result with typed output)
const zodResult = validateBankConfigZod(configObject);
if (zodResult.success) {
  console.log(zodResult.data);  // Typed BankConfig
} else {
  console.log(zodResult.error.issues);
}`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Helper Functions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="helpers">
          Helper Functions
        </h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import {
  generateBankConfigTemplate,
  suggestBankConfig,
  exportBankConfig,
  getCustomBanks,
  resetCustomBanks,
  unregisterBank,
} from 'statementkit';

// Generate a starter template for a new bank config
const template = generateBankConfigTemplate('new-bank');
// Returns a BankConfig with sensible defaults to customize

// Analyze a CSV and get a suggested config
const suggested = suggestBankConfig(csvContent);
// Returns column mappings inferred from the CSV structure

// Export a bank config as a JSON string
const json = exportBankConfig('td');
// '{"name":"TD Bank (Canada)","region":"NA",...}'

// List all custom (user-registered) bank keys
const customKeys = getCustomBanks();

// Remove a specific custom bank
unregisterBank('my-credit-union');

// Remove ALL custom banks, restoring only built-ins
resetCustomBanks();`}</code>
        </pre>
      </section>

      {/* Auto-Detection */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" id="auto-detection">
          Auto-Detection
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          StatementKit can automatically detect which bank a CSV came from by
          comparing the header row against all registered bank configs.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { parseCSVContent, detectBankWithConfidence, detectBank } from 'statementkit';

const rows = parseCSVContent(csvContent);
const headers = rows[0];

// With confidence score
const { bank, confidence } = detectBankWithConfidence(headers);
console.log(bank);        // "td"
console.log(confidence);  // 0.92

// Simple version (returns key or null)
const bankKey = detectBank(headers);
console.log(bankKey);     // "td" or null`}</code>
        </pre>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Custom banks registered via{" "}
              <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">registerBank</code> are
              automatically included in auto-detection. If you provide a{" "}
              <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">headers</code> array in your
              config, the detection engine will match against it.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
