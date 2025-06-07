'use client'

import { useState, useEffect } from 'react'
import { FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6'

interface Props {
  imageUrl: string
  title?: string
  description?: string
  showShareButtons?: boolean
  onClick?: () => void
}

export default function ImageCard({
  imageUrl,
  title = '',
  description = '',
  showShareButtons = true,
  onClick,
}: Props) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // ✅ burada tanımlandı

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(max-width: 768px)')
      setIsMobile(mediaQuery.matches)

      // Ekran yeniden boyutlanırsa da takip et
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
      mediaQuery.addEventListener('change', handler)

      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const downloadImage = async (url: string, filename = 'downloaded-image.png') => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md bg-black/40 border border-cyan-800"
      onMouseEnter={() => !isMobile && setShowOverlay(true)}
      onMouseLeave={() => !isMobile && setShowOverlay(false)}
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      <img
        src={imageUrl}
        alt={title || 'AI generated image'}
        className="w-full object-cover transition duration-300"
      />

      {/* 🔥 Garanti gösterme kontrolü */}
      {(showOverlay || isMobile) && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation()
              downloadImage(imageUrl)
            }}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 text-sm"
          >
            Download
          </button>

          {showShareButtons && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowShare(!showShare)
              }}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 text-sm"
            >
              Share
            </button>
          )}
        </div>
      )}

      {showShare && (
        <div className="absolute top-3 right-3 bg-white p-3 rounded shadow-md flex gap-3 z-20">
          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer">
            <FaXTwitter className="text-black hover:text-gray-700 w-5 h-5" />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer">
            <FaLinkedin className="text-blue-600 hover:text-blue-800 w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <FaInstagram className="text-pink-600 hover:text-pink-700 w-5 h-5" />
          </a>
        </div>
      )}

      {(title || description) && (
        <div className="p-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {description && <p className="text-sm text-gray-400">{description}</p>}
        </div>
      )}
    </div>
  )
}
