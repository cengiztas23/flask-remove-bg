'use client';

import { useState } from 'react';


import SideNav from '@/components/SideNav';
import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function PromptGuidePage() {
  

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
  ];

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <BackgroundWrapper>
      
      <div className="flex flex-col lg:flex-row min-h-screen text-white">
        <aside className="w-full lg:w-[240px] border-r border-cyan-800">
          <SideNav selectedStyle={undefined} />
        </aside>

        <main className="flex-1 p-6 max-w-4xl mx-auto">
          <div className="bg-black/50 p-6 md:p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">Prompt Guide</h1>
            <p className="text-center mb-8 text-gray-300">
              Discover how to write effective prompts to get the best image results from AI.
            </p>

            <div className="space-y-6">
              {promptExamples.map((example, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded-lg border border-cyan-600 relative">
                  <h2 className="text-lg font-semibold text-cyan-300 mb-1">{example.category}</h2>
                  <p className="text-sm text-gray-400 mb-2 italic">💡 {example.tip}</p>
                  <p className="text-gray-100 italic mb-2">"{example.prompt}"</p>
                  <button
                    onClick={() => copyToClipboard(example.prompt, idx)}
                    className="text-xs px-3 py-1 rounded bg-cyan-700 hover:bg-cyan-600 transition-colors text-white"
                  >
                    {copiedIndex === idx ? "Copied!" : "Copy Prompt"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </BackgroundWrapper>
  );
}
