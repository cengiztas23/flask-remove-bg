'use client'

interface Props {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
}

export default function PromptInput({ value, onChange, onGenerate }: Props) {
  return (
    <div className="mb-6">
      <textarea
        className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
        rows={3}
        placeholder="Describe the portrait you want... (e.g. A wise philosopher with glowing eyes)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Buton ortalanmış şekilde */}
      <div className="flex justify-center mt-4">
        <button
          onClick={onGenerate}
          disabled={!value.trim()}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎨 Create Portrait
        </button>
      </div>
    </div>
  )
}
