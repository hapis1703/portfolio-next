import { NextResponse } from "next/server";

const BASE = process.env.BUATQRIS_BASE_URL || "https://api.buatqris.site";

async function callQris(params) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      account_id: process.env.BUATQRIS_ACCOUNT_ID,
      secret_token: process.env.BUATQRIS_SECRET_TOKEN,
      ...params,
    }).toString(),
    cache: "no-store",
  });
  return res.json();
}

export async function POST(request) {
  if (!process.env.BUATQRIS_ACCOUNT_ID || !process.env.BUATQRIS_SECRET_TOKEN) {
    return NextResponse.json(
      { error: "Donation service is not configured." },
      { status: 500 }
    );
  }

  let amount;
  try {
    ({ amount } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  amount = Number(amount);
  if (!Number.isInteger(amount) || amount < 100 || amount > 10_000_000) {
    return NextResponse.json(
      { error: "Amount must be a whole number between 100 and 10,000,000." },
      { status: 400 }
    );
  }

  try {
    const result = await callQris({
      action: "api_create_qris",
      amount: String(amount),
      description: "Donation from portfolio",
      qris_method: "qris_two",
    });

    if (!result?.success || !result?.data?.qr_url) {
      return NextResponse.json(
        { error: result?.message || "Payment provider rejected the request." },
        { status: 502 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the payment provider." },
      { status: 502 }
    );
  }
}
