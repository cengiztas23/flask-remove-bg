'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

import SideNav from '@/components/SideNav'
import BackgroundWrapper from '@/components/BackgroundWrapper'

type Message = {
  role: 'user' | 'ai'
  text: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="text-white p-4">Loading...</div>
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()

      if (data?.text) {
        const aiMessage: Message = {
          role: 'ai',
          text: data.text,
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        setMessages((prev) => [...prev, { role: 'ai', text: '🛑 Yanıt alınamadı.' }])
      }
    } catch (err) {
      console.error(err)
      setMessages((prev) => [...prev, { role: 'ai', text: '🚨 Sunucu hatası.' }])
    }
  }

  const promptExamples = [
    {
      category: "Photorealistic",
      prompt: "A high-resolution portrait of an old man with deep wrinkles, dramatic lighting, hyper-realistic texture",
      tip: "Use detailed texture descriptions and realistic lighting terms.",
    },
    {
      category: "Anime / Manga",
      prompt: "A futuristic warrior girl with neon hair and glowing sword, in anime style, dynamic pose, cinematic background",
      tip: "Add keywords like 'dynamic pose' or 'glowing elements' for better anime visuals.",
    },
    {
      category: "Cyberpunk",
      prompt: "A rainy city street at night with neon signs, reflections, cyborg pedestrians, cyberpunk style, Blade Runner vibe",
      tip: "Mention neon, reflections, and tech elements for a true cyberpunk feel.",
    },
    {
      category: "Futuristic Architecture",
      prompt: "A sleek white spaceship flying over a digital city, futuristic design, glowing blue accents, clean sci-fi aesthetic",
      tip: "Focus on structure, material, and futuristic tone (e.g., 'sleek', 'digital').",
    },
    {
      category: "Impressionist",
      prompt: "A colorful garden painted in the style of Monet, with visible brush strokes and warm tones",
      tip: "Use classic artist names and mood words like 'warm', 'dreamy'.",
    },
    {
      category: "Historique-Gothique",
      prompt: "A medieval cathedral under a stormy sky, gothic architecture, intricate stained glass, dramatic lighting",
      tip: "Mention gothic features like arches, stained glass, and moodiness.",
    },
    {
      category: "Sepia-Cinematic",
      prompt: "A 1940s detective walking down a foggy alley, moody atmosphere, sepia tone, cinematic composition",
      tip: "Use film noir terms like 'fog', 'moody', 'cinematic'.",
    },
    {
      category: "Mythopoetic",
      prompt: "An ethereal goddess rising from a golden mist, flowing robes, symbolic imagery, mythological aura",
      tip: "Highlight symbolism, mythology, and poetic visuals.",
    },
    {
      category: "Stoic Epic",
      prompt: "A stoic philosopher standing before ancient ruins, dramatic sunset lighting, chiseled marble features, epic tone",
      tip: "Blend philosophical themes with historical grandeur.",
    },
  ]

  const copyToClipboard = (text: string, idx: number) => {
    setInput(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <aside className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-cyan-800">
          <SideNav />
        </aside>

        <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-cyan-400 mb-1 mt-4">
            Generate Prompts with ChatGPT
          </h1>
          <p className="text-center mb-4 text-gray-300 text-sm sm:text-base bg-black/30 px-4 py-1 rounded-md max-w-fit mx-auto">
            🌍 Chat with ChatGPT in English, French, German, Spanish and many other languages!
          </p>

          <div className="space-y-4 mb-6 bg-black/40 p-4 rounded-xl shadow-inner">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg text-white ${
                  msg.role === 'user' ? 'bg-gray-800' : 'bg-cyan-800/80'
                }`}
              >
                <p className="font-semibold mb-1">
                  {msg.role === 'user' ? '🧍 You:' : '🧠 AI:'}
                </p>
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-black/40 p-4 rounded-xl mb-8">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-gray-900 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Ask something..."
            />
            <button
              onClick={handleSend}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Send
            </button>
          </div>

          <div className="bg-black/50 p-6 md:p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">Prompt Examples</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptExamples.map((example, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900 p-4 rounded-xl border border-cyan-600 relative hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-cyan-300 mb-1">{example.category}</h3>
                  <p className="text-sm text-gray-400 mb-2 italic">💡 {example.tip}</p>
                  <p className="text-gray-100 italic mb-3">"{example.prompt}"</p>
                  <button
                    onClick={() => copyToClipboard(example.prompt, idx)}
                    className="text-xs px-3 py-1 rounded bg-cyan-700 hover:bg-cyan-600 transition-colors text-white"
                  >
                    {copiedIndex === idx ? "Copied!" : "Use Prompt"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </BackgroundWrapper>
  )
}
