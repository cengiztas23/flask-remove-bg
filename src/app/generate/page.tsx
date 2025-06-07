'use client';

import { useState } from 'react';

import SideNav from '@/components/SideNav';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import StyleCard from '@/components/StyleCard';
import ImageResultCard from '@/components/ImageResultCard';
import { FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6'


const styles = [
  {
    name: 'Photorealistic',
    image: '/styles/photorealistic.png',
    prompt: 'high-resolution, realistic lighting, hyper-detailed textures, accurate anatomy',
  },
  {
    name: 'Anime / Manga',
    image: '/styles/anime.png',
    prompt: 'anime style, clean line art, vibrant colors, expressive characters, Japanese manga aesthetic',
  },
  {
    name: 'Cyberpunk',
    image: '/styles/cyberpunk.png',
    prompt: 'cyberpunk theme, neon lights, urban dystopia, futuristic technology, rainy atmosphere',
  },
  {
    name: 'Futuristic Architecture',
    image: '/styles/futuristic.png',
    prompt: 'futuristic buildings, clean minimal shapes, sleek design, glass and steel, concept architecture',
  },
  {
    name: 'Impressionist',
    image: '/styles/impressionist.png',
    prompt: 'impressionist painting, brush stroke texture, light and color focus, Monet-like scenery',
  },
  {
    name: 'Historique-Gothique',
    image: '/styles/historique-gothique.png',
    prompt: 'gothic style, medieval architecture, stained glass windows, sacred atmosphere, dramatic shadows',
  },
  {
    name: 'Sepia-Cinematic',
    image: '/styles/sepia-cinematic.png',
    prompt: 'sepia tones, vintage film grain, dramatic lighting, cinematic framing, timeless atmosphere',
  },
  {
    name: 'Mythopoetic',
    image: '/styles/mythopoetic.png',
    prompt: 'ancient mythology, glowing runes, divine figures, mystical temples, dreamlike symbolism',
  },
  {
    name: 'Stoic Epic',
    image: '/styles/stoic-epic.png',
    prompt: 'Stoic philosophy, epic landscapes, heroic solitude, marble statues, golden light',
  },
];

export default function GeneratePage() {
 

  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    const selected = styles.find((s) => s.name === selectedStyle);
    const finalPrompt = `${prompt}, ${selected?.prompt || ''}`;

    if (!selectedStyle) {
      setError('Please select a style before generating.');
      return;
    }

    setError(null);
    setLoading(true);
    setImageUrl(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await response.json();

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError('No image returned.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundWrapper>
     

      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <aside className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-cyan-800">
          <SideNav selectedStyle={selectedStyle || undefined} setSelectedStyle={setSelectedStyle} />
        </aside>

        <main className="flex-1 px-4 py-8 flex justify-center">
          <div className="w-full max-w-4xl bg-black/60 p-6 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">
              Generate an AI Image
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center mb-8">
              {styles.map((style) => (
                <StyleCard
                  key={style.name}
                  name={style.name}
                  imageUrl={style.image}
                  isSelected={selectedStyle === style.name}
                  onClick={() => setSelectedStyle(style.name)}
                />
              ))}
            </div>

            <div className="w-full max-w-[500px] mx-auto">
              <textarea
                className="w-full bg-gray-900 text-white border border-cyan-500 rounded-lg p-4 mb-4"
                rows={4}
                placeholder="Describe what you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              {error && (
                <p className="text-red-500 text-center font-semibold mb-4">{error}</p>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full py-3 font-semibold rounded transition ${
                  loading
                    ? 'bg-cyan-800 text-white opacity-70 cursor-not-allowed'
                    : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                }`}
              >
                {loading ? '⏳ Generating...' : 'Generate'}
              </button>
            </div>

            {loading && (
              <div className="flex justify-center mt-4">
                <div className="animate-spin h-8 w-8 border-t-2 border-cyan-400 border-opacity-75 rounded-full" />
              </div>
            )}

           {imageUrl && (
  <div className="mt-8 text-center">
    <div className="bg-black/40 p-4 rounded-lg inline-block border border-cyan-800 shadow-md">
      <img
        src={imageUrl}
        alt="Generated"
        className="rounded-lg shadow-md mx-auto mb-4 max-w-full max-h-[600px] object-contain"
      />

      <div className="flex justify-center gap-4 flex-wrap">
        {/* ✅ CORS-safe Download */}
        <a
          href={`/api/download?url=${encodeURIComponent(imageUrl)}`}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          ⬇️ Download
        </a>

        {/* Share Butonları */}
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

      {/* Prompt gösterimi */}
      {prompt && (
        <p className="mt-4 text-sm italic text-gray-300 max-w-xl mx-auto">“{prompt}”</p>
      )}
    </div>
  </div>
)}
</div>
        </main>
      </div>
    </BackgroundWrapper>
  );
}
