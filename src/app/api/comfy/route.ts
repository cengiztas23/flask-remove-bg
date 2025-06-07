import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile } from 'fs/promises';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const templatePath = path.join(process.cwd(), 'public', 'presets', 'template.json');
  const raw = await readFile(templatePath, 'utf-8');
  const json = JSON.parse(raw);

  const positivePrompt = prompt;
  const negativePrompt = "blurry, watermark, low quality";

  json.nodes.forEach((node: any) => {
    if (Array.isArray(node.widgets_values)) {
      node.widgets_values = node.widgets_values.map((val: any) => {
        if (typeof val === 'string') {
          return val
            .replace('{PROMPT}', positivePrompt)
            .replace('{NEGATIVE_PROMPT}', negativePrompt);
        }
        return val;
      });
    }
  });

  const comfy = await fetch('http://127.0.0.1:8188/prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: json }),
  });

  const result = await comfy.json();
  const imageName = result?.prompt_id ? `${result.prompt_id}_00001_.png` : null;
  const imageUrl = imageName ? `/output/${imageName}` : null;

  return NextResponse.json({ image: imageUrl });
}
