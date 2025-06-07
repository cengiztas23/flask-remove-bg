'use client'

interface Artist {
  name: string
  style: string
  image: string
}

interface Props {
  artist: Artist
  selected: boolean
  onSelect: () => void
}

export default function ArtistCard({ artist, selected, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer border-2 rounded-xl p-3 transition hover:scale-105 ${
        selected ? 'border-cyan-500' : 'border-white/20'

      }`}
    >
      <img
        src={artist.image}
        alt={artist.name}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <h2 className="text-xl font-semibold text-white text-center">{artist.name}</h2>
    </div>
  )
}
