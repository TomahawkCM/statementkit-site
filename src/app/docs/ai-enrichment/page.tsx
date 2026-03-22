import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "AI Enrichment - StatementKit Docs",
  description:
    "Bring-your-own-key AI provider interface for merchant matching, transaction categorization, and structured extraction.",
};

export default function AiEnrichmentPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        AI Enrichment
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        StatementKit supports optional AI-powered enrichment for merchant
        matching and transaction categorization. Bring your own API key (BYOK)
        — no data is sent anywhere unless you explicitly configure a provider.
      </p>

      {/* Overview */}
      <Card className="mb-10 border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="pt-6">
          <p className="text-sm">
            <strong className="text-emerald-400">Privacy note:</strong>{" "}
            AI enrichment is entirely optional. StatementKit works 100%
            offline by default. When you set an AI provider, only the data
            you explicitly pass through the AI functions is sent to your
            configured endpoint. StatementKit itself never phones home.
          </p>
        </CardContent>
      </Card>

      {/* AIProvider Interface */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="interface">
          The AIProvider Interface
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Implement the <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">AIProvider</code> interface
          to connect StatementKit to any LLM or AI service.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`interface AIProvider {
  /**
   * Send a chat completion request and get a raw string response.
   */
  chatCompletion(prompt: string): Promise<string>;

  /**
   * Send a chat completion request and parse the response as JSON,
   * validated against the provided Zod schema.
   * StatementKit provides a default implementation via chatCompletionJSON()
   * that calls chatCompletion() and parses the result.
   */
  chatCompletionJSON?<T>(prompt: string, schema: ZodSchema<T>): Promise<T>;
}`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* OpenAI Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="openai">
          Example: OpenAI Provider
        </h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { setAIProvider } from 'statementkit';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

setAIProvider({
  async chatCompletion(prompt: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    });
    return response.choices[0].message.content ?? '';
  },
});`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Anthropic Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="anthropic">
          Example: Anthropic Provider
        </h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { setAIProvider } from 'statementkit';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

setAIProvider({
  async chatCompletion(prompt: string): Promise<string> {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });
    const block = response.content[0];
    return block.type === 'text' ? block.text : '';
  },
});`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Ollama / Local Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="local">
          Example: Local LLM (Ollama)
        </h2>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { setAIProvider } from 'statementkit';

setAIProvider({
  async chatCompletion(prompt: string): Promise<string> {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt,
        stream: false,
      }),
    });
    const data = await response.json();
    return data.response;
  },
});`}</code>
        </pre>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>True offline AI:</strong> Using a local model like Ollama
              means your transaction data never leaves your machine. This is
              ideal for privacy-sensitive applications.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="mb-12" />

      {/* Using the AI */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="usage">
          Using AI Enrichment
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once a provider is registered, you can use the AI functions for
          structured extraction and merchant matching.
        </p>

        <h3 className="text-lg font-medium mb-3 mt-6">
          Structured JSON Extraction
        </h3>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { chatCompletionJSON } from 'statementkit';
import { z } from 'zod';

// Define the expected output shape
const MerchantSchema = z.object({
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  isRecurring: z.boolean(),
});

// Extract structured data from a raw transaction description
const result = await chatCompletionJSON(
  'Identify the merchant from this transaction: "AMZN MKTP US*2K7X9F0J3"',
  MerchantSchema
);

console.log(result);
// {
//   name: "Amazon",
//   category: "Shopping",
//   subcategory: "Online Marketplace",
//   isRecurring: false
// }`}</code>
        </pre>

        <h3 className="text-lg font-medium mb-3 mt-6">
          Checking Provider Status
        </h3>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { hasAIProvider, getAIProvider } from 'statementkit';

if (hasAIProvider()) {
  const provider = getAIProvider();
  // Use AI-powered features
} else {
  // Fall back to rule-based matching
}`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* MockAIProvider */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="testing">
          Testing with MockAIProvider
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          StatementKit includes a <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">MockAIProvider</code> for
          testing AI-dependent code without making real API calls.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { setAIProvider, MockAIProvider } from 'statementkit';

// Use the mock provider in tests
const mockProvider = new MockAIProvider();
setAIProvider(mockProvider);

// MockAIProvider returns predictable responses
// that work with StatementKit's internal prompts`}</code>
        </pre>
      </section>

      <Separator className="mb-12" />

      {/* Merchant Correction Store */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" id="corrections">
          Merchant Correction Store
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Combine AI enrichment with the merchant correction store to learn
          from user corrections and reduce future AI calls.
        </p>
        <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono border overflow-x-auto mb-6">
          <code>{`import { InMemoryMerchantCorrectionStore } from 'statementkit';

const store = new InMemoryMerchantCorrectionStore();

// Store a user correction
// When "AMZN MKTP US*2K7X9F0J3" should map to "Amazon"
store.set('AMZN MKTP US*2K7X9F0J3', 'Amazon');

// Check for a known correction before calling AI
const known = store.get('AMZN MKTP US*2K7X9F0J3');
if (known) {
  // Use the cached correction — no AI call needed
  console.log(known);  // "Amazon"
} else {
  // Fall back to AI enrichment
}`}</code>
        </pre>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" id="best-practices">
          Best Practices
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Cache AI Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Store AI responses in the merchant correction store so
                identical descriptions don&apos;t trigger repeated API calls.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Use Cheap Models</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Merchant matching is a simple task. Use fast, inexpensive
                models like GPT-4o-mini or Claude Haiku for best
                cost/performance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Batch Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Send multiple transaction descriptions in a single prompt
                rather than one API call per transaction.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Graceful Fallback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Always check <code className="bg-muted/50 px-1 py-0.5 rounded text-xs font-mono">hasAIProvider()</code> and
                provide a non-AI fallback path for offline environments.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
