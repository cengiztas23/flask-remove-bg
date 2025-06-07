'use client'

interface Props {
  portraits: string[]
}

export default function PortraitResult({ portraits }: Props) {
  if (!portraits || portraits.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {portraits.map((url, index) => (
        <div key={index} className="bg-white/10 p-2 rounded-lg">
          <img
            src={url}
            alt={`Generated portrait ${index + 1}`}
            className="w-full aspect-[16/9] object-cover rounded-lg"
          />

          {/* İNDİRME */}
          <a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded mb-3 block text-center"
  role="button"
>
   Download
</a>


         
        </div>
      ))}
    </div>
  )
}
