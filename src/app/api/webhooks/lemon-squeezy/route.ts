import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Octokit } from "@octokit/rest";

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || "TomahawkCM";
const REPO_NAME = process.env.GITHUB_REPO_NAME || "polyglot-kit";

function verifySignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(signature)
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-signature") || "";

  if (!signature || !verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const eventName = payload.meta?.event_name;

  if (eventName !== "order_created") {
    return NextResponse.json({ received: true });
  }

  const customData = payload.meta?.custom_data || {};
  const githubUsername = customData.github_username;
  const email = payload.data?.attributes?.user_email;
  const orderNumber = payload.data?.attributes?.order_number;

  if (!githubUsername) {
    console.error(`Order ${orderNumber}: No GitHub username provided`);
    return NextResponse.json({ error: "No GitHub username" }, { status: 400 });
  }

  try {
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    await octokit.repos.addCollaborator({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      username: githubUsername,
      permission: "pull",
    });

    console.log(`Order ${orderNumber}: Invited ${githubUsername} (${email})`);
    return NextResponse.json({ success: true, invited: githubUsername });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Order ${orderNumber}: GitHub invite failed — ${message}`);
    return NextResponse.json({ error: "Invite failed" }, { status: 500 });
  }
}
