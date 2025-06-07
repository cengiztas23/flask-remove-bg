'use client'

import { useState, useRef, useEffect } from 'react'
import BackgroundWrapper from '@/components/BackgroundWrapper'
import SideNav from '@/components/SideNav'
import ImageCard from '@/components/ImageCard'

const galleryImages = [
  'abstract-expressionism.png',
  'ai-avatar-portrait.png',
  'ai-goddess-sunrise.png',
  'ancient-city-sunlight.png',
  'ancient-scholar-light.png',
  'anime-battle-girl.png',
  'buddhist-temple-wisdom.png',
  'cyberpunk-samurai.png',
  'epic-mountain-landscape.png',
  'fantasy-elf-crouch.png',
  'fantasy-elf-standing.png',
  'fashion-avantgarde.png',
  'greek-philosopher-walks.png',
  'kids-fox-rabbit.png',
  'sci-fi-metropolis.png'
]

export default function FreeGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [effect, setEffect] = useState<'none' | 'grayscale' | 'sepia' | 'mirror'>('none')
  const [blur, setBlur] = useState(0)
  const [brightness, setBrightness] = useState(1)
  const [contrast, setContrast] = useState(1)
  
  const handleDownload = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (!canvasRef.current || !image) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    ctx.filter = [
      effect === 'grayscale' ? 'grayscale(1)' : '',
      effect === 'sepia' ? 'sepia(1)' : '',
      `blur(${blur}px)`,
      `brightness(${brightness})`,
      `contrast(${contrast})`
    ].join(' ').trim()

    if (effect === 'mirror') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }

    ctx.drawImage(image, 0, 0)
  }, [effect, image, blur, brightness, contrast])

  return (
    <BackgroundWrapper>
      <div className="flex flex-col lg:flex-row min-h-screen text-white">
        <aside className="w-full lg:w-[240px] border-r border-cyan-800">
          <SideNav />
        </aside>

        <main className="flex-1 p-6 max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2 text-center"> Free Gallery</h1>
          <p className="text-center text-sm text-gray-400 max-w-2xl mx-auto mb-4">
            All images in this gallery are <span className="text-cyan-300 font-medium">royalty-free</span> and can be used <span className="text-cyan-300 font-medium">freely</span> in your projects. 
            Experience the power of style and quality — and turn inspiration into creation with a Pro membership.
          </p>
          <p className="text-center text-cyan-400 font-semibold text-md mb-4">
            To remix, download and upload any image you like
          </p>

          <div className="flex flex-col items-center gap-4 mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block text-sm text-white file:bg-cyan-600 file:border-none file:px-4 file:py-2 file:rounded-lg file:text-white hover:file:bg-cyan-700"
            />
            <canvas ref={canvasRef} className="border border-cyan-600 w-full max-w-2xl mx-auto" />
            {image && (
  <button
    onClick={handleDownload}
    className="mt-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded"
  >
    ⬇️ Download Edited Image
  </button>
)}


            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {[
                ['none', '🎨 Normal'],
                ['grayscale', '🖤 Grayscale'],
                ['sepia', '🟤 Sepia'],
                ['mirror', '🔁 Mirror']
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setEffect(key as any)}
                  className="border border-cyan-400 text-sm rounded-md px-4 py-2 hover:bg-cyan-800"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 w-full max-w-md">
              <label className="text-cyan-300 text-sm">Adjustments:</label>
              <label className="block text-sm mt-2">Blur</label>
              <input type="range" min="0" max="10" step="0.1" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-cyan-400" />

              <label className="block text-sm mt-2">Brightness</label>
              <input type="range" min="0.5" max="2" step="0.1" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full accent-cyan-400" />

              <label className="block text-sm mt-2">Contrast</label>
              <input type="range" min="0.5" max="2" step="0.1" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full accent-cyan-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((filename) => (
              <ImageCard
                key={filename}
                imageUrl={`/gallery/${filename}`}
                title=""
                description=""
                showShareButtons={true}
                onClick={() => setSelectedImage(`/gallery/${filename}`)}
              />
            ))}
          </div>

          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="absolute top-0 left-0 w-full text-center bg-black/70 py-3 border-b border-cyan-700"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-cyan-300 font-semibold text-sm">
                  Want to create like this?{' '}
                  <a href="/subscribe" className="underline text-cyan-400 hover:text-cyan-300 ml-1">
                    Go Pro →
                  </a>
                </p>
              </div>

              <img
                src={selectedImage}
                alt="Preview"
                className="max-h-[90vh] max-w-[90vw] rounded shadow-lg border border-cyan-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </main>
      </div>
    </BackgroundWrapper>
  )
}
 