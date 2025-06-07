'use client'

import { useState } from 'react'
import BackgroundWrapper from '@/components/BackgroundWrapper'
import ArtistCard from '@/components/ArtistCard'
import PromptInput from '@/components/PromptInput'
import PortraitResult from '@/components/PortraitResult'

const artists = [
  {
    name: 'Van Gogh',
    style: 'thick brush strokes, vibrant colors, post-impressionist style',
    image: '/artists/van-gogh.jpg',
  },
  {
    name: 'Da Vinci',
    style: 'realistic shading, perfect facial proportions, renaissance style',
    image: '/artists/da-vinci.jpg',
  },
  {
    name: 'Picasso',
    style: 'cubist form, fragmented face, bold shapes',
    image: '/artists/picasso.jpg',
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

export default function ArtistPortraitClient() {
  const [selectedArtist, setSelectedArtist] = useState(artists[0])
  const [prompt, setPrompt] = useState('')
  const [portraits, setPortraits] = useState<string[]>([])

  const handleGenerate = async () => {
    const stylePrompt = `${selectedArtist.style}, portrait of ${prompt}`

    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: stylePrompt, n: 3 }),
    })

    const data = await response.json()
    setPortraits(data.urls)
  }

  return (
    <BackgroundWrapper>
      <div className="p-6 text-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6">🎨 Artist Portraits</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.name}
              artist={artist}
              selected={selectedArtist.name === artist.name}
              onSelect={() => setSelectedArtist(artist)}
            />
          ))}
        </div>

        <PromptInput value={prompt} onChange={setPrompt} onGenerate={handleGenerate} />

        <PortraitResult portraits={portraits} />
      </div>
    </BackgroundWrapper>
  )
}
