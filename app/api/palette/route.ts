import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    if (!query) return NextResponse.json({ error: 'Query is required' }, { status: 400 });

    const res = await fetch(`https://colormagic.app/api/palette/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`API responded with status ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
