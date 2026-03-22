# Reddit Post — r/reactjs

**Title:** I built an i18n starter kit with 113 locales and 206 pre-translated UI strings

**Body:**

I've been building multilingual apps for years, and the same problem kept coming up: every project needs the exact same i18n boilerplate. Create 100+ JSON locale files. Translate the same "Login", "Save", "Cancel" strings. Build currency and date formatters. Wire up framework adapters. Repeat.

So I extracted all of that into a reusable package. Here's what I learned and how it works.

## The architecture: 3-layer message composition

Most i18n libraries make you maintain one flat JSON file per locale. That's 113 files where 90% of the content is identical across regional variants (es-ES, es-MX, es-AR all share the same Spanish base).

Instead, I used a 3-layer composition model:

1. **English base** — the canonical source (~200 keys across 11 namespaces)
2. **Language layer** — Spanish translations shared by all es-* locales
3. **Regional overrides** — only the strings that differ between es-ES and es-MX

At runtime, these layers merge with a deep-merge function. The result: you maintain far fewer files, and adding a new regional variant is just a handful of overrides.

## Why native Intl API instead of dependencies

Early on I considered pulling in libraries for currency/date/number formatting. But the native `Intl.NumberFormat`, `Intl.DateTimeFormat`, and `Intl.RelativeTimeFormat` APIs are excellent now — they handle Indian number grouping (12,34,567), zero-decimal currencies (JPY, KRW), and RTL formatting natively.

Zero runtime dependencies means no supply chain risk and smaller bundles. The formatting utilities are thin wrappers around Intl that handle edge cases (fallback formatting, timezone detection, compact notation).

## The adapter pattern

The core is framework-agnostic. But most React apps use next-intl, react-intl, or i18next — and each has its own message format:

- **next-intl** — nested objects, merged via provider
- **react-intl** — flat dot-notation keys (`"common.save"`)
- **i18next** — resource bundles keyed by locale

So the package ships adapter functions that transform the message tree into whatever format your framework expects. One import, one function call:

```typescript
// next-intl
import { mergeWithNextIntl } from "polyglot-kit/adapters/next-intl";
const messages = mergeWithNextIntl(polyglotMessages, appMessages);

// react-intl
import { toReactIntlMessages } from "polyglot-kit/adapters/react-intl";
const flat = toReactIntlMessages(messages); // { "common.save": "Guardar" }

// i18next
import { toI18nextResources } from "polyglot-kit/adapters/i18next";
const resources = toI18nextResources(messages, "fr-FR");
```

## Tree-shakable subpath exports

The package uses subpath exports so you can import only what you need:

```typescript
import { SUPPORTED_LOCALES } from "polyglot-kit/locales";   // just config
import { formatCurrency } from "polyglot-kit/formatting";     // just formatters
import { getMessages } from "polyglot-kit/messages";           // just translations
```

Each subpath is independently tree-shakable with ESM + CJS dual output.

## What's included

- 113 locales with full metadata (label, text direction, currency, numbering system)
- ~200 pre-translated UI strings in 11 namespaces (auth, validation, navigation, actions, dialogs, time, pagination, accessibility, status, common, empty states)
- Currency, date, and number formatting utilities
- Framework adapters for next-intl, react-intl, i18next, and vanilla JS
- TypeScript strict with full type definitions
- RTL support for Arabic, Hebrew, Persian, Urdu

---

If you want the done-for-you version instead of building this yourself, I packaged it as [polyglot-kit](https://tomahawk-labs.lemonsqueezy.com/checkout/buy/06e85b26-6ef3-467a-8e90-7aeb97805215) — one-time $69, lifetime updates, commercial license. First 50 buyers get 20% off with code EARLYBIRD.

Happy to answer questions about the architecture or i18n patterns in general.
