export const en = {
  hero: {
    badge: "Privacy-First Bank Statement Parsing",
    headline1: "Parse Any Bank Statement",
    headline2: "In Any Language",
    subheadline:
      "120+ banks. 11 formats. 68 languages. 70+ currencies. One SDK. Zero external services. 100% offline.",
    cta: "Get StatementKit — {price}",
    ctaSecondary: "View on GitHub",
    installComment: "# Install",
    callout: "One-time purchase — no subscriptions, no per-API-call fees",
  },
  comparison: {
    heading: "Why Not Plaid?",
    subtitle:
      "Aggregator APIs cost $30-200K/year, require cloud connectivity, and send your users' data to third-party servers. StatementKit runs entirely on your infrastructure.",
    plaidTitle: "Plaid / Yodlee",
    plaidItems: [
      "$30-200K/year",
      "Cloud-dependent",
      "User data sent to 3rd party",
      "Per-connection pricing",
      "API rate limits",
    ],
    ossTitle: "Open-Source Parsers",
    ossItems: [
      "Free",
      "1 format each",
      "English only",
      "1-5 banks",
      "No maintenance",
    ],
    skTitle: "StatementKit",
    skItems: [
      "$79 one-time",
      "11 formats, 120+ banks",
      "68 languages, 70+ currencies",
      "100% offline, zero API calls",
      "Actively maintained",
    ],
  },
  formats: {
    heading: "11 Formats. One API.",
    items: {
      csv: "120+ bank configs",
      ofx: "1.x SGML + 2.x XML",
      pdf: "Text + OCR (68 langs)",
      qif: "Quicken Interchange",
      mt940: "SWIFT statements",
      camt: "ISO 20022 (052/053/054)",
    },
  },
  features: {
    heading: "Everything You Need",
    items: [
      {
        title: "120+ Banks",
        desc: "Pre-configured for banks across NA, EU, UK, AU, Asia. Add your own at runtime.",
      },
      {
        title: "100% Offline",
        desc: "Zero network calls. No API keys. No cloud. Data never leaves the device.",
      },
      {
        title: "68 Languages",
        desc: "OCR + date parsing in German, French, Japanese, Arabic, Hindi, Thai & more. 70+ currencies.",
      },
      {
        title: "Receipt OCR",
        desc: "Extract merchant, total, tax, tip, and line items from receipt photos.",
      },
      {
        title: "Format Export",
        desc: "Convert between CSV, OFX, QIF, JSON. Parse any format, export to any other.",
      },
      {
        title: "CLI Tool",
        desc: "npx statementkit parse statement.csv — headless parsing for CI/scripts.",
      },
    ],
  },
  codeExamples: {
    heading: "Simple API",
  },
  pricing: {
    heading: "One Price. Lifetime Access.",
    subtitle: "No subscriptions. No per-API-call fees. No vendor lock-in.",
    price: "$79",
    priceLabel: "one-time payment",
    items: [
      "Full source code (TypeScript)",
      "120+ bank configs across 6 regions",
      "11 input formats + 4 export formats",
      "PDF OCR (68 languages)",
      "Receipt photo OCR",
      "CLI tool + batch import",
      "AI provider interface (BYOK)",
      "432 tests passing",
      "Lifetime updates via GitHub",
      "MIT license — use in any project",
    ],
    cta: "Buy StatementKit — {price}",
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "What do I get?",
        a: "Full TypeScript source code delivered via GitHub repo access. 120+ bank parsers, 11 format handlers, PDF OCR, CLI tool, and AI provider interface. MIT licensed — use in any project, commercial or personal.",
      },
      {
        q: "How does offline parsing work?",
        a: "All parsing runs locally — CSV, OFX, QIF, MT940, and CAMT parsing need zero network calls. PDF OCR uses Tesseract.js which runs in-browser or Node.js. No data ever leaves your infrastructure.",
      },
      {
        q: "Can I add my own bank?",
        a: "Yes. Use registerBank() at runtime, load from JSON config files, or use the CLI config suggest command to auto-detect columns from a sample CSV.",
      },
      {
        q: "What about AI features?",
        a: "AI is 100% optional. All parsing works without it. If you want smart duplicate detection or merchant enrichment, bring your own API key (OpenAI, Anthropic, or any LLM) via the AIProvider interface.",
      },
      {
        q: "Is there a free trial?",
        a: "The core parsers are available as an open-source npm package. The Pro version ($79) adds PDF OCR, CAMT/MT940 support, CLI tool, AI interface, and priority bank configs.",
      },
    ],
  },
  footer: {
    builtBy: "Built by",
  },
  languageSelector: {
    label: "Translations built with",
    polyglotLink: "Polyglot Kit",
  },
  demo: {
    input: "Input",
    parsed: "Parsed",
    languages: "68 languages",
  },
};

export type LandingStrings = typeof en;
