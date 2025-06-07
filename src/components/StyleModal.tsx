'use client';
import React, { useState } from 'react';
import { FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6';

interface StyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleName: string;
  description: string;
  imageUrl: string;
  defaultPrompt: string;
  onGenerate?: (prompt: string, imageUrl: string) => void;
  generatedImage?: string | null;
}

export default function StyleModal({
  isOpen,
  onClose,
  styleName,
  description,
  imageUrl,
  defaultPrompt,
}: StyleModalProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [textType, setTextType] = useState<'poem' | 'philosophical'>('poem');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerateClick = async () => {
    setLoading(true);
    setGeneratedText('');
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

    if (data.imageUrl) {
  setGeneratedImage(data.imageUrl);
} else {
  console.error('No image returned');
}



      const gptRes = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: textType }),
      });

      const gptData = await gptRes.json();
      setGeneratedText(gptData.text);
    } catch (err) {
      console.error('Generate error:', err);
      setGeneratedText('⚠️ Error while generating content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600">
        <button
          className="absolute top-3 right-4 text-cyan-400 hover:text-cyan-200 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-cyan-400 mb-2">{styleName}</h2>
        <p className="mb-4 text-gray-300">{description}</p>

        <img
          src={imageUrl}
          alt={styleName}
          className="rounded mb-4 w-full object-cover max-h-[240px]"
        />

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-3 mb-4 rounded-lg bg-black/60 border border-cyan-600 text-white"
        />

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setTextType('poem')}
            className={`flex-1 py-2 rounded font-semibold border transition ${
              textType === 'poem'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
            }`}
          >
            Poem
          </button>
          <button
            onClick={() => setTextType('philosophical')}
            className={`flex-1 py-2 rounded font-semibold border transition ${
              textType === 'philosophical'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
            }`}
          >
            Philosophical Description
          </button>
        </div>

        <button
          onClick={handleGenerateClick}
          disabled={loading}
          className="w-full py-2 rounded font-semibold flex items-center justify-center bg-cyan-600 hover:bg-cyan-700"
        >
          {loading && (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
          )}
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {generatedImage && (
          <div className="text-center mt-6">
            <img
              src={generatedImage}
              alt="Generated"
              className="rounded-lg shadow-md mx-auto mb-2 max-w-full max-h-[256px]"
            />
            <p className="text-sm text-gray-400 italic mb-2">
              Generated Image & {textType === 'poem' ? 'Poem' : 'Philosophical Description'}
            </p>

            {generatedText && (
              <div className="mt-2 bg-gray-800 p-4 rounded text-sm whitespace-pre-wrap text-white border border-cyan-700">
                {generatedText}
              </div>
            )}

            <div className="mt-4 text-center">
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href={`/api/download?url=${encodeURIComponent(generatedImage)}`}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded transition"
                  download
                >
                  ⬇️ Download
                </a>

                <div className="flex items-center gap-3">
                  <span className="text-white text-sm">Share:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Twitter"
                  >
                    <FaXTwitter className="text-white hover:text-cyan-300 w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-white hover:text-cyan-300 w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    title="Instagram"
                  >
                    <FaInstagram className="text-pink-500 hover:text-pink-600 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
