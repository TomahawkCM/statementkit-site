"use client";

import { FormatSelector } from "@/components/format-selector";
import { LanguageSelector } from "@/components/language-selector";
import { useLandingTranslations } from "@/i18n/use-landing-translations";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FORMATS = [
  { name: "CSV", desc: "120+ bank configs", icon: "\uD83D\uDCCA" },
  { name: "OFX/QFX", desc: "1.x SGML + 2.x XML", icon: "\uD83C\uDFE6" },
  { name: "PDF", desc: "Text + OCR (68 langs)", icon: "\uD83D\uDCC4" },
  { name: "QIF", desc: "Quicken Interchange", icon: "\uD83D\uDCBE" },
  { name: "MT940/942", desc: "SWIFT statements", icon: "\uD83C\uDF0D" },
  { name: "CAMT", desc: "ISO 20022 (052/053/054)", icon: "\uD83C\uDDEA\uD83C\uDDFA" },
];

const FEATURES = [
  { title: "120+ Banks", desc: "Pre-configured for banks across NA, EU, UK, AU, Asia. Add your own at runtime.", icon: "\uD83C\uDFDB\uFE0F" },
  { title: "100% Offline", desc: "Zero network calls. No API keys. No cloud. Data never leaves the device.", icon: "\uD83D\uDD12" },
  { title: "68 Languages", desc: "Dates in German, French, Japanese, Arabic, Chinese & more. 70+ currency symbols.", icon: "\uD83C\uDF10" },
  { title: "Receipt OCR", desc: "Extract merchant, total, tax, tip, and line items from receipt photos.", icon: "\uD83E\uDDFE" },
  { title: "Format Export", desc: "Convert between CSV, OFX, QIF, JSON. Parse any format, export to any other.", icon: "\uD83D\uDD04" },
  { title: "CLI Tool", desc: "npx statementkit parse statement.csv \u2014 headless parsing for CI/scripts.", icon: "\u2328\uFE0F" },
];

export default function Home() {
  const { locale, translations: t, changeLocale, loading, dir } = useLandingTranslations();

  return (
    <div dir={dir}>
    <LanguageSelector
      locale={locale}
      onChangeLocale={changeLocale}
      loading={loading}
      label={t.languageSelector.label}
      polyglotLinkText={t.languageSelector.polyglotLink}
    />
    <FormatSelector />
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-16 pb-20 text-center">
        <Badge className="mb-6 border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
          {t.hero.badge}
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
          Parse Any Bank Statement
          <br />
          <span className="text-gradient">{t.hero.headline2}</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
          120+ banks. 11 formats. 68 languages. 70+ currencies.
          One SDK. Zero external services. 100% offline.
        </p>

        <div className="mt-6 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-6 py-2.5 text-sm font-medium text-emerald-400">
          One-time purchase &mdash; no subscriptions, no per-API-call fees
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#pricing"
            className="glow inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            {t.hero.cta.replace("{price}", "$79 USD")}
          </a>
          <a
            href="https://github.com/TomahawkCM/statementkit"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            View on GitHub
          </a>
        </div>

        <div className="mt-8 font-mono text-sm text-muted-foreground bg-muted/50 rounded-lg px-6 py-3 border">
          npm install statementkit
        </div>
      </section>

      <Separator />

      {/* Why Not Plaid */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Not Plaid?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t.comparison.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Plaid / Yodlee</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> $30-200K/year</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> Cloud-dependent</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> User data sent to 3rd party</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> Per-connection pricing</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> API rate limits</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Open-Source Parsers</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="flex items-start gap-2"><span className="text-yellow-400">&#x26A0;</span> Free</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> 1 format each</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> English only</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> 1-5 banks</p>
              <p className="flex items-start gap-2"><span className="text-red-400">&#x2716;</span> No maintenance</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardHeader><CardTitle className="text-lg text-emerald-400">StatementKit</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> $79 one-time</p>
              <p className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> 11 formats, 120+ banks</p>
              <p className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> 68 languages, 70+ currencies</p>
              <p className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> 100% offline, zero API calls</p>
              <p className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> Actively maintained</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Formats */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          11 Formats. One API.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FORMATS.map((f) => (
            <Card key={f.name} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl mb-2">{f.icon}</div>
                <div className="font-semibold">{f.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{f.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardContent className="pt-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <div className="font-semibold mb-2">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Code Examples */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Simple API
        </h2>
        <Tabs defaultValue="csv" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="csv">CSV</TabsTrigger>
            <TabsTrigger value="ofx">OFX</TabsTrigger>
            <TabsTrigger value="detect">Auto-Detect</TabsTrigger>
            <TabsTrigger value="intl">Intl Parsing</TabsTrigger>
            <TabsTrigger value="ai">AI (BYOK)</TabsTrigger>
          </TabsList>

          <TabsContent value="csv">
            <pre className="bg-muted/50 rounded-lg p-6 text-sm overflow-x-auto border">
              <code>{`import { parseCSVContent, convertToTransactions, BANK_CONFIGS }
  from 'statementkit';

const rows = parseCSVContent(csvContent);
const transactions = convertToTransactions(
  rows, BANK_CONFIGS['td'], accountId
);
// [{ date: 2026-01-15, description: "AMAZON", amount: -49.99 }]`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="ofx">
            <pre className="bg-muted/50 rounded-lg p-6 text-sm overflow-x-auto border">
              <code>{`import { parseOFXContent } from 'statementkit';

const data = parseOFXContent(ofxFileContent);

console.log(data.transactions);  // OFXTransaction[]
console.log(data.balances);      // { ledgerBalance, availableBalance }
console.log(data.accountInfo);   // { BANKID, ACCTID, ACCTTYPE }`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="detect">
            <pre className="bg-muted/50 rounded-lg p-6 text-sm overflow-x-auto border">
              <code>{`import { detectFromContent, detectBankWithConfidence }
  from 'statementkit';

const format = detectFromContent(content);
// { format: "csv", confidence: 0.95 }

const bank = detectBankWithConfidence(headers);
// { bank: "td", confidence: 0.92 }`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="intl">
            <pre className="bg-muted/50 rounded-lg p-6 text-sm overflow-x-auto border">
              <code>{`import { parseAmount, parseDate } from 'statementkit';

parseAmount('1.234,56', 'de-DE');    // 1234.56
parseAmount('1,23,456.78', 'hi-IN'); // 123456.78
parseDate('15. Januar 2026', 'de');  // Date(2026-01-15)
parseDate('2026\u5E741\u670815\u65E5', 'zh');     // Date(2026-01-15)`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="ai">
            <pre className="bg-muted/50 rounded-lg p-6 text-sm overflow-x-auto border">
              <code>{`import { setAIProvider, type AIProvider } from 'statementkit';
import OpenAI from 'openai';

// Bring Your Own Key — works with any LLM provider
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const myProvider: AIProvider = {
  async chatCompletion(prompt, options) {
    const res = await openai.chat.completions.create({
      model: options?.model ?? 'gpt-4o-mini',
      messages: [
        { role: 'system', content: options?.systemPrompt ?? 'You are a financial data assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: options?.temperature ?? 0.1,
    });
    return { success: true, data: res.choices[0].message.content ?? '' };
  }
};

// Enable AI-powered features (smart dedup, merchant enrichment)
setAIProvider(myProvider);

// All parsing still works 100% offline without an AI provider`}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* Pricing */}
      <section id="pricing" className="px-4 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          One Price. Lifetime Access.
        </h2>
        <p className="text-muted-foreground mb-12">
          No subscriptions. No per-API-call fees. No vendor lock-in.
        </p>

        <Card className="border-emerald-500/30 bg-emerald-500/5 max-w-md mx-auto">
          <CardContent className="pt-8 pb-8">
            <div className="text-5xl font-bold mb-2">{t.pricing.price}</div>
            <div className="text-muted-foreground mb-6">{t.pricing.priceLabel}</div>

            <ul className="text-left text-sm space-y-3 mb-8 px-4">
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> Full source code (TypeScript)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> 120+ bank configs across 6 regions</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> 11 input formats + 4 export formats</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> PDF OCR (68 languages)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> Receipt photo OCR</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> CLI tool + batch import</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> AI provider interface (BYOK)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> Webhook notifications</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> 432 tests passing</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> Lifetime updates via GitHub</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">&#x2714;</span> MIT license &mdash; use in any project</li>
            </ul>

            <a
              href="https://tomahawk-labs.lemonsqueezy.com/checkout/buy/87232575-7fe4-4e40-9414-241eab48fbb7"
              className="glow inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 w-full"
            >
              {t.pricing.cta.replace("{price}", "$79 USD")}
            </a>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* FAQ */}
      <section className="px-4 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <Accordion>
          <AccordionItem value="what-do-i-get">
            <AccordionTrigger className="text-base">What do I get?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Full TypeScript source code delivered via GitHub repo access. 120+ bank parsers, 11 format handlers, PDF OCR, CLI tool, and AI provider interface. MIT licensed &mdash; use in any project, commercial or personal.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-install">
            <AccordionTrigger className="text-base">How do I install it?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                After purchase, you&apos;ll get GitHub collaborator access. Then just run{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-emerald-400">npm install statementkit</code>.
                For PDF OCR support, also install{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-emerald-400">pdfjs-dist</code> and{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-emerald-400">tesseract.js</code> as optional dependencies.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="banks-supported">
            <AccordionTrigger className="text-base">Which banks are supported?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                120+ banks across 8 regions: Canada (BMO, TD, RBC, Scotiabank, CIBC, Tangerine...), US (Chase, Bank of America, Wells Fargo, Citi, Capital One...), UK (Barclays, HSBC, Lloyds), EU (N26, Revolut, ING), Australia (CommBank, ANZ, Westpac), Asia (HDFC, DBS, OCBC), SE Asia (Bangkok Bank, GCash, GrabPay), and Japan (Rakuten, Mizuho). You can also add custom banks at runtime.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="offline">
            <AccordionTrigger className="text-base">Does it work offline?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes &mdash; 100% offline. No API keys, no cloud services, no network calls for parsing. Your users&apos; financial data never leaves their device. The optional AI enrichment feature supports BYOK (bring your own key) if you want smart merchant matching.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="updates">
            <AccordionTrigger className="text-base">Do I get updates?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes &mdash; lifetime updates via GitHub. New bank configs, format improvements, and bug fixes are pushed regularly.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="commercial">
            <AccordionTrigger className="text-base">Can I use it in a commercial product?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Absolutely. MIT license. Use it in SaaS apps, fintech products, internal tools &mdash; no restrictions.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="px-4 py-12 text-center text-sm text-muted-foreground">
        <p>
          {t.footer.builtBy}{" "}
          <a href="https://github.com/TomahawkCM" className="underline hover:text-foreground">
            TomahawkCM
          </a>
          {" "}&middot;{" "}
          <a href="https://github.com/TomahawkCM/statementkit" className="underline hover:text-foreground">
            GitHub
          </a>
          {" "}&middot;{" "}
          <a href="https://www.npmjs.com/package/statementkit" className="underline hover:text-foreground">
            npm
          </a>
        </p>
      </footer>
    </main>
    </div>
  );
}
