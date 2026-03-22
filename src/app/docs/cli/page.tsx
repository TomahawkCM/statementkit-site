import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "CLI - StatementKit Docs",
  description:
    "StatementKit CLI reference. Parse, detect, export, and manage bank statements from the command line.",
};

export default function CliPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">CLI</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        StatementKit includes a command-line tool for parsing, detecting, and
        exporting bank statements. Use it in scripts, CI pipelines, or for
        quick one-off conversions.
      </p>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="installation">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          The CLI is included with the npm package. You can run it via{" "}
          <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">npx</code> or install globally:
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-4">
          <code>{`# Run directly with npx (no install needed)
npx statementkit parse statement.csv

# Or install globally
npm install -g statementkit
statementkit parse statement.csv`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* parse */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="parse">
          statementkit parse
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Parse a bank statement file and output structured transactions.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`statementkit parse <file> [options]`}</code>
        </pre>

        <h3 className="text-lg font-medium mb-3">Options</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 pr-4 font-medium">Flag</th>
                <th className="pb-2 pr-4 font-medium">Description</th>
                <th className="pb-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">--bank &lt;key&gt;</td>
                <td className="py-2 pr-4">Bank config key (e.g., &quot;td&quot;, &quot;chase&quot;)</td>
                <td className="py-2">Auto-detect</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">--format &lt;fmt&gt;</td>
                <td className="py-2 pr-4">Force input format (csv, ofx, qif, mt940, mt942, camt)</td>
                <td className="py-2">Auto-detect</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">--output &lt;mode&gt;</td>
                <td className="py-2 pr-4">Output mode: json, table, summary</td>
                <td className="py-2">json</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">Examples</h3>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`# Parse a TD Bank CSV
statementkit parse statement.csv --bank td

# Parse with auto-detection, table output
statementkit parse download.csv --output table

# Parse an OFX file
statementkit parse export.ofx

# Parse a CAMT.053 XML file
statementkit parse camt053.xml --format camt

# Parse and show summary only
statementkit parse statement.csv --bank chase --output summary`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* detect */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="detect">
          statementkit detect
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Detect the file format and bank of a statement file without parsing
          it.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`statementkit detect <file>`}</code>
        </pre>

        <h3 className="text-lg font-medium mb-3">Example Output</h3>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`$ statementkit detect statement.csv

Format:     csv (confidence: 0.95)
Bank:       td (TD Bank Canada) (confidence: 0.92)
Encoding:   UTF-8
Rows:       147
Headers:    Date, Description, Withdrawals, Deposits, Balance`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* banks */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="banks">
          statementkit banks
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          List all available bank configurations.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`statementkit banks [options]`}</code>
        </pre>

        <h3 className="text-lg font-medium mb-3">Options</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 pr-4 font-medium">Flag</th>
                <th className="pb-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">--region &lt;code&gt;</td>
                <td className="py-2">Filter by region: NA, EU, UK, AU, ASIA, SEA, JP</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">Example</h3>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`$ statementkit banks --region NA

Key           Name                     Region   Currency
td            TD Bank (Canada)         NA       CAD
rbc           Royal Bank of Canada     NA       CAD
bmo           BMO Financial Group      NA       CAD
scotiabank    Scotiabank               NA       CAD
cibc          CIBC                     NA       CAD
tangerine     Tangerine Bank           NA       CAD
simplii       Simplii Financial        NA       CAD
desjardins    Desjardins               NA       CAD
chase         Chase (US)               NA       USD
bofa          Bank of America          NA       USD
wells-fargo   Wells Fargo              NA       USD
citi          Citibank                 NA       USD
capital-one   Capital One              NA       USD
...`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* export */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="export">
          statementkit export
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Parse a statement and export the transactions to a different format.
          This is useful for converting between formats (e.g., CSV to OFX).
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`statementkit export <file> --format <output-format> [options]`}</code>
        </pre>

        <h3 className="text-lg font-medium mb-3">Options</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 pr-4 font-medium">Flag</th>
                <th className="pb-2 pr-4 font-medium">Description</th>
                <th className="pb-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">--format &lt;fmt&gt;</td>
                <td className="py-2 pr-4">Output format: csv, json, qif, ofx</td>
                <td className="py-2">(required)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">--out-file &lt;path&gt;</td>
                <td className="py-2 pr-4">Write output to a file instead of stdout</td>
                <td className="py-2">stdout</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">Examples</h3>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`# Convert a CSV to JSON
statementkit export statement.csv --format json

# Convert an OFX to CSV and write to a file
statementkit export download.ofx --format csv --out-file transactions.csv

# Convert MT940 to QIF
statementkit export swift-statement.sta --format qif --out-file output.qif

# Pipe to another tool
statementkit export statement.csv --format json | jq '.[] | .amount'`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* suggest */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="suggest">
          statementkit suggest
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Analyze a CSV file and suggest a bank configuration. Useful when you
          have a statement from an unsupported bank and want to create a custom
          config.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`statementkit suggest <file>`}</code>
        </pre>

        <h3 className="text-lg font-medium mb-3">Example Output</h3>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto">
          <code>{`$ statementkit suggest unknown-bank.csv

Suggested Bank Config:
{
  "name": "Unknown Bank",
  "region": "NA",
  "currency": "USD",
  "dateColumn": 0,
  "descriptionColumn": 1,
  "amountColumn": 2,
  "dateFormat": "MM/DD/YYYY",
  "headerRow": 0,
  "headers": ["Date", "Description", "Amount", "Balance"]
}

Save this config and register it:
  statementkit register --file my-bank.json`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" id="tips">
          Tips
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">CI/CD Pipelines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use the JSON output mode to pipe parsed transactions into
                downstream processing, databases, or APIs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Batch Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Combine with shell loops to process multiple files:{" "}
                <code className="bg-muted/50 px-1 py-0.5 rounded text-xs font-mono">
                  for f in *.csv; do statementkit parse &quot;$f&quot;; done
                </code>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Format Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The export command lets you convert any supported input format
                to any supported output format in a single step.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Debugging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use <code className="bg-muted/50 px-1 py-0.5 rounded text-xs font-mono">detect</code> first
                to verify that StatementKit correctly identifies your file
                before parsing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
