import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type AllowedSize = '1024x1024' | '1024x1792' | '1792x1024';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const promptLower = prompt.toLowerCase();
    let selectedSize: AllowedSize = '1792x1024';

    if (promptLower.includes('square')) {
      selectedSize = '1024x1024';
    } else if (promptLower.includes('vertical') || promptLower.includes('portrait')) {
      selectedSize = '1024x1792';
    } else if (promptLower.includes('horizontal') || promptLower.includes('landscape')) {
      selectedSize = '1792x1024';
    }

    const cleanedPrompt = prompt.replace(/square|vertical|portrait|horizontal|landscape/gi, '').trim();

    const result = await openai.images.generate({
      prompt: cleanedPrompt,
      model: 'dall-e-3',
      n: 1,
      size: selectedSize,
    });

    const imageUrl = result.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image returned from OpenAI.' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl });

  } catch (error: any) {
    console.error('[DALL-E GENERATION ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong.' },
      { status: 500 }
    );
  }
}
