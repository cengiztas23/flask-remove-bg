// src/app/api/download/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: 'Image URL is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Image fetch failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename="generated.png"',
      },
    });
  } catch (error) {
    console.error('Proxy download error:', error);
    return new Response(JSON.stringify({ error: 'Failed to download image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
