import { NextResponse } from "next/server";

// GGS subscriptions apply to the entire platform, not the Academy alone.
// Until the platform-wide subscription source and its feature entitlements
// have been identified and securely integrated, playback must fail closed.
// Never trust a plan or entitlement value supplied by a browser.
export async function POST() {
  return NextResponse.json(
    { error: "GGS platform subscription verification is not configured yet." },
    { status: 503, headers: { "Cache-Control": "no-store" } }
  );
}
