import { NextResponse } from "next/server";

// Deliberately deny playback until verified authentication, paid entitlement,
// approved video metadata and short-lived private Storage signing are integrated.
// Never accept a storage path from a client or expose a service-role key.
export async function GET() {
  return NextResponse.json({ error: "Video playback is not yet enabled. Subscription verification and approved assets are required." }, { status: 403, headers: { "Cache-Control": "no-store" } });
}
