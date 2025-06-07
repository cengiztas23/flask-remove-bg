'use client'

import { useState } from 'react'

import SideNav from '@/components/SideNav'
import BackgroundWrapper from '@/components/BackgroundWrapper'
import ArtistCard from '@/components/ArtistCard'
import { FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6'

const artists = [
  {
    name: 'Van Gogh',
    style: 'thick brush strokes, vibrant colors, post-impressionist style',
    image: '/artists/van-gogh.png',
  },
  {
    name: 'Da Vinci',
    style: 'realistic shading, perfect facial proportions, renaissance style',
    image: '/artists/da-vinci.png',
  },
  {
    name: 'Picasso',
    style: 'cubist form, fragmented face, bold shapes',
    image: '/artists/picasso.png',
  },
  {
  name: 'Salvador Dalí',
  style: 'dreamlike surrealism, melting forms, bizarre perspective',
  image: '/artists/dali.png',
},
{
  name: 'Frida Kahlo',
  style: 'vibrant folk art, emotional expression, strong symbolism',
  image: '/artists/frida.png',
},
{
  name: 'Michelangelo',
  style: 'expressionist distortion, dark emotional tones, dramatic lighting',
  image: '/artists/michelangelo.png',
},

]

export default function ArtistPortraitPage() {
  

  const [selectedArtist, setSelectedArtist] = useState(artists[0])
  const [prompt, setPrompt] = useState('')
  const [portrait, setPortrait] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    const stylePrompt = `${selectedArtist.style}, ${prompt}, landscape, 1792x1024`
    setLoading(true)
    setPortrait(null)

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: stylePrompt }),
    })

    const data = await response.json()
    setPortrait(data.imageUrl) // backend artık imageUrl döndürüyor olmalı
    setLoading(false)
  }

  return (
    <BackgroundWrapper>
       
      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <aside className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-cyan-800">
          <SideNav />
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 flex justify-center">
          <div className="w-full max-w-4xl bg-black/60 p-4 sm:p-6 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">
              Artist Portraits
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center mb-8">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.name}
                  artist={artist}
                  selected={selectedArtist.name === artist.name}
                  onSelect={() => setSelectedArtist(artist)}
                />
              ))}
            </div>

            <div className="mb-6">
              <textarea
                className="w-full p-4 rounded-lg bg-[#0a192f] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={4}
                placeholder="Describe what you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🎨 Create Portrait
                </button>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center mt-4">
                <div className="animate-spin h-8 w-8 border-t-2 border-cyan-400 border-opacity-75 rounded-full" />
              </div>
            )}

            {portrait && (
              <div className="mt-8 text-center">
                <div className="bg-white/10 p-4 rounded-lg inline-block">
                  <img
                    src={portrait}
                    alt="Generated portrait"
                    className="w-full max-w-[768px] aspect-[16/9] object-cover rounded-lg mb-4"
                  />
                 <div className="flex justify-center gap-4 flex-wrap">
                         {/* ✅ CORS-safe Download */}
                         <a
  href={`/api/download?url=${encodeURIComponent(portrait)}`}
  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded block text-center"
  download
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

                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </BackgroundWrapper>
  )
}
