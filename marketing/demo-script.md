# polyglot-kit Demo Video Script (2 minutes)

No talking — screen recording with text annotations and lo-fi background music.

---

## 0:00–0:15 — Empty App

**Screen:** Fresh terminal + empty Next.js app in VS Code

**Text overlay:** "Let's add 113 languages to a Next.js app."

**Action:** Show the empty app running in browser — just the default Next.js page.

---

## 0:15–0:30 — Install

**Screen:** Terminal

**Text overlay:** "One install."

**Action:**
```bash
npm install git+https://github.com/TomahawkCM/polyglot-kit.git
```

Show the install completing (fast — zero dependencies).

---

## 0:30–0:45 — Configure

**Screen:** VS Code — `app/[locale]/layout.tsx`

**Text overlay:** "Five lines of setup."

**Action:** Type out (or paste with typing animation):
```typescript
import { getMessages } from "polyglot-kit/messages";
import { mergeWithNextIntl } from "polyglot-kit/adapters/next-intl";

const polyglot = await getMessages(locale);
const messages = mergeWithNextIntl(polyglot, appMessages);
```

Highlight that this is the ENTIRE i18n setup.

---

## 0:45–1:00 — English Working

**Screen:** Browser showing the app with English UI strings

**Text overlay:** "206 strings. Ready to use."

**Action:** Show the app rendering common UI elements — login form with labels, validation messages, navigation items — all using polyglot-kit's pre-translated strings.

---

## 1:00–1:15 — Language Toggle

**Screen:** Browser + VS Code side by side

**Text overlay:** "Every locale has full metadata."

**Action:**
1. Show quick code for a language toggle dropdown powered by `LOCALE_METADATA`
2. Show the dropdown with 113 locale options, each with its native label

---

## 1:15–1:30 — Live Language Switching

**Screen:** Browser — full screen

**Text overlay:** (changes with each toggle)

**Action:**
1. Toggle to **French** → all UI strings update: "Enregistrer", "Se connecter", "Mot de passe requis"
2. Toggle to **Japanese** → strings update: "保存", "ログイン"
3. Toggle to **Arabic** → entire layout flips RTL, strings in Arabic script

Pause briefly on each to let the viewer appreciate the instant switch.

---

## 1:30–1:45 — Formatting

**Screen:** VS Code showing formatting calls + browser showing results

**Text overlay:** "Locale-aware formatting. Zero dependencies."

**Action:** Show side by side:
```
formatCurrency(1234.56, "USD", "en-US")  →  $1,234.56
formatCurrency(1234.56, "EUR", "de-DE")  →  1.234,56 €
formatCurrency(1234, "JPY", "ja-JP")     →  ￥1,234

formatDate(now, "en-US")  →  3/20/2026
formatDate(now, "ko-KR")  →  2026. 3. 20.
```

---

## 1:45–2:00 — Recap & CTA

**Screen:** Dark background with centered text

**Text overlay sequence** (fade in one at a time):
1. "113 languages."
2. "206 pre-translated strings."
3. "Zero dependencies."
4. "One install."

**Final frame** (hold for 5 seconds):

```
polyglot-kit — $69, lifetime access

https://tomahawk-labs.lemonsqueezy.com/checkout/buy/06e85b26-6ef3-467a-8e90-7aeb97805215

Code EARLYBIRD for 20% off
```

---

## Production Notes

- **Resolution:** 1920x1080, 60fps
- **Font:** JetBrains Mono for code, Inter for overlays
- **Music:** Lo-fi instrumental (royalty-free)
- **Transitions:** Simple fade between sections
- **Tool:** OBS or Screen Studio for recording, DaVinci Resolve for editing
- **Length target:** 1:50–2:00 (don't exceed 2 minutes)
