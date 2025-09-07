import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const res = await fetch(
      `https://colormagic.app/api/palette/search?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || `Upstream error ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 500 });
  }
}
