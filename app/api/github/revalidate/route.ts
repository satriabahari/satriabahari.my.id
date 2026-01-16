import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("x-hub-signature-256");
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json(
        { message: "Secret not configured" },
        { status: 500 },
      );
    }

    const hmac = crypto.createHmac("sha256", secret);
    const digest = "sha256=" + hmac.update(payload).digest("hex");

    if (signature !== digest) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    revalidateTag("github-data-tag");

    return NextResponse.json(
      {
        revalidated: true,
        now: Date.now(),
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
