'use client';

import { useEffect, useState } from 'react';

const infoLines = [
  '✦ Write your prompt.',
  '✦ Choose a style.',
  '✦ And in seconds, your vision becomes reality.',
  '✦ No sign-up required.',
  '✦ Start creating instantly.',
  '✦ You can generate up to 3 images today.',
  '✓ Unlimited generations with subscription',
  '✓ High-resolution outputs',
  '✓ Exclusive styles unlocked',
  '✓ Save your favorite prompts and styles',
  '🎨 Ideal for creators who want high-quality visuals using carefully crafted AI styles.',
  '🖼 Generate stunning images from text.',
  '🛠 Refine and enhance uploaded artworks.',
  '📚 Explore poetic visuals with Visions & Verses.',
  '🧑‍🎨 Create portraits in the style of master artists.',
  '🖌 Edit, crop, and stylize your own images.',
  '🎞 Transform images into AI-generated videos.',
  '🧠 Get smarter prompts with our Prompt Guide.',
  '💬 Chat with AI — anytime, on any topic.',
];

export default function InfoPanel() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsPanelVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= infoLines.length || !isPanelVisible) return;

    const line = infoLines[currentLineIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < line.length) {
        setCurrentText((prev) => prev + line[charIndex]);
        charIndex++;
      } else {
        clearInterval(interval);
        setTypedLines((prev) => [...prev, line]);
        setCurrentText('');
        setCurrentLineIndex((prev) => prev + 1);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentLineIndex, isPanelVisible]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
        isPanelVisible
          ? 'opacity-100 pointer-events-auto bg-black/70 backdrop-blur-sm'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-full max-w-xl bg-black/80 text-cyan-200 rounded-xl p-6 shadow-xl border border-cyan-500">
        <button
          onClick={() => setIsPanelVisible(false)}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 transition"
        >
          ✖
        </button>

        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-cyan-400">
          Welcome to Studio AI Vision
        </h1>
        <p className="mb-4 italic text-gray-300 text-sm">
          Where artificial intelligence meets your imagination.
        </p>

        <div className="space-y-2 text-sm font-mono leading-relaxed min-h-[250px]">
          {typedLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          {currentText && (
            <p>
              {currentText}
              <span className="animate-pulse text-cyan-400">_</span>
            </p>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsPanelVisible(false)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl font-bold text-sm transition"
          >
            🎨 Enter the Studio →
          </button>
        </div>
      </div>
    </div>
  );
}