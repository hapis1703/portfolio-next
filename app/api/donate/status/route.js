import { NextResponse } from "next/server";

const BASE = process.env.BUATQRIS_BASE_URL || "https://api.buatqris.site";

export async function POST(request) {
  if (!process.env.BUATQRIS_ACCOUNT_ID || !process.env.BUATQRIS_SECRET_TOKEN) {
    return NextResponse.json(
      { error: "Donation service is not configured." },
      { status: 500 }
    );
  }

  let transactionId;
  try {
    ({ transactionId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!transactionId || typeof transactionId !== "string") {
    return NextResponse.json({ error: "Missing transaction id." }, { status: 400 });
  }

  try {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        action: "api_check_status",
        account_id: process.env.BUATQRIS_ACCOUNT_ID,
        secret_token: process.env.BUATQRIS_SECRET_TOKEN,
        transaction_id: transactionId,
      }).toString(),
      cache: "no-store",
    });
    const result = await res.json();

    if (!result?.success) {
      return NextResponse.json(
        { error: result?.message || "Failed to check status." },
        { status: 502 }
      );
    }

    return NextResponse.json({ status: result.data?.status || "unknown" });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the payment provider." },
      { status: 502 }
    );
  }
}
