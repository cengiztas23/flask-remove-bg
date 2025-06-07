'use client'

import { useState, useRef, useEffect } from 'react'
import SideNav from '@/components/SideNav'
import BackgroundWrapper from '@/components/BackgroundWrapper'
import {
  applyPosterize,
  applySolarize,
  applyEdgeDetect,
  applyGrainSepia,
  applyCartoonify,
  applyComicPop
} from '@/lib/applyComicEffect'

export default function ComicEffectPage() {
  const [effect, setEffect] = useState('none')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [balloonText, setBalloonText] = useState('')

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
    ctx.drawImage(image, 0, 0)

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    switch (effect) {
      case 'posterize':
        imageData = applyPosterize(imageData)
        break
      case 'solarize':
        imageData = applySolarize(imageData)
        break
      case 'edgedetect':
        imageData = applyEdgeDetect(imageData)
        break
      case 'grainsepia':
        imageData = applyGrainSepia(imageData)
        break
      case 'cartoonify':
        imageData = applyCartoonify(imageData)
        break
      case 'comicpop':
        imageData = applyComicPop(imageData)
        break
      default:
        break
    }

    ctx.putImageData(imageData, 0, 0)
  }, [effect, image])

  const addSpeechBubble = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.font = '20px Comic Sans MS'

    ctx.fillRect(20, 20, 240, 50)
    ctx.strokeRect(20, 20, 240, 50)
    ctx.fillStyle = 'black'
    ctx.fillText(balloonText, 30, 50)
  }

  const handleDownload = () => {
    if (!canvasRef.current) return
    const a = document.createElement('a')
    a.href = canvasRef.current.toDataURL('image/png')
    a.download = 'comicified.png'
    a.click()
  }

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <aside className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-cyan-800">
          <SideNav />
        </aside>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Comic Effect Creator</h1>

          {/* Geliştirilmiş yükleme butonu */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Upload Image
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <canvas ref={canvasRef} className="border border-cyan-600 w-full max-w-2xl mx-auto" />

          {/* EFEKT BUTONLARI */}
<div className="mt-6 flex flex-wrap gap-2 justify-center">
  {[
    ['none', '🔁 Orijinal'],
    ['posterize', '🧃 Posterize'],
    ['solarize', '☀️ Solarize'],
    ['edgedetect', '📏 Edge Detect'],
    ['grainsepia', '🍂 Grain + Sepia'],
    ['cartoonify', '🖍️ Cartoonify'],
    ['comicpop', '💥 Comic Pop']
  ].map(([key, label]) => (
    <button
      key={key}
      onClick={() => setEffect(key)}
      className="bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm"
    >
      {label}
    </button>
  ))}
</div>

{/* DOWNLOAD BUTONU — hemen efektlerin altına alındı */}
<div className="mt-4 flex justify-center">
  <button
    onClick={handleDownload}
    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded font-semibold"
  >
    Download
  </button>
</div>

        </main>
      </div>
    </BackgroundWrapper>
  )
}
