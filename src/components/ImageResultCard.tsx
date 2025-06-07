'use client'

import { FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6'

interface Props {
  imageUrl: string
  title?: string
  description?: string
  showShareButtons?: boolean
}

export default function ImageResultCard({
  imageUrl,
  title = '',
  description = '',
  showShareButtons = true,
}: Props) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="relative bg-black/40 border border-cyan-800 rounded-xl shadow-lg p-4 max-w-4xl mx-auto">
      {/* Style başlık */}
      {title && (
        <div className="text-center text-cyan-300 text-sm font-semibold mb-3">
          Style: {title}
        </div>
      )}

      {/* Görsel */}
      <img
        src={imageUrl}
        alt={title || 'Generated image'}
        className="w-full max-h-[600px] object-contain rounded-md shadow-md mb-4"
      />

      {/* Butonlar */}
      <div className="flex justify-center flex-wrap gap-4 mb-3">
        {/* Download button - CORS-safe */}
        <a
          href={imageUrl}
          download="generated-image.png"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded text-sm transition"
        >
          📥 Download
        </a>

        {/* Share */}
        {showShareButtons && (
          <div className="flex items-center gap-3">
            <span className="text-white text-sm">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              title="Share on Twitter"
            >
              <FaXTwitter className="text-white hover:text-cyan-400 w-5 h-5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              title="Share on LinkedIn"
            >
              <FaLinkedin className="text-white hover:text-cyan-400 w-5 h-5" />
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
        )}
      </div>

      {/* Prompt açıklaması */}
      {description && (
        <div className="text-sm italic text-gray-300 text-center">
          “{description}”
        </div>
      )}
    </div>
  )
}
