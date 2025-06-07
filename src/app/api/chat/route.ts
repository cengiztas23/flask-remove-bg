import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt boş olamaz.' }, { status: 400 })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
         {
  role: "system",
  content: `You are an AI visual prompt generator specialized in image creation tools like Midjourney or DALL·E. When the user describes an idea or concept in any language, you convert it into a rich, detailed, cinematic English prompt suitable for AI image generation. Always include atmosphere, style, mood, lighting, and key visual elements. Do not explain, just return the final prompt only.`
},

          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
      }),
    })

    const data = await response.json()

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ error: 'Yanıt alınamadı.' }, { status: 500 })
    }

    return NextResponse.json({ text: data.choices[0].message.content.trim() })
  } catch (err) {
    console.error('[GPT-ERROR]', err)
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 })
  }
}
