import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // .env dosyanda bu anahtar tanımlı olmalı
});

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt || !type) {
      return NextResponse.json({ error: 'Missing prompt or type' }, { status: 400 });
    }

    const instruction =
      type === 'poem'
        ? 'Write a short, creative and emotional poem inspired by the following visual description:'
        : 'Provide a deep and thoughtful philosophical description of the following visual scene:';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a poetic and philosophical assistant.' },
        { role: 'user', content: `${instruction}\n\n${prompt}` },
      ],
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ text: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}
