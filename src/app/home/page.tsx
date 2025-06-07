'use client';



import InfoPanel from '@/components/InfoPanel';

export default function HomePage() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen px-4 text-white text-center bg-black"
      style={{
        backgroundImage: 'url("/studio-ai-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Açılış Paneli */}
      <InfoPanel />

      {/* Arka plan koyuluğu */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* İçerik */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-400">
          Welcome to <span className="text-cyan-400">Studio AI Vision</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Create expressive visuals powered by AI.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
           <a href="/free-gallery" className="bg-black/60 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
  <h2 className="text-lg font-semibold text-white mb-2">🎁 Free Gallery</h2>
  <p className="text-sm text-gray-300">Upload and enhance your image with AI tags.</p>
</a>



          <a href="/generate" className="bg-black/60 hover:bg-black/70 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
            <h2 className="text-lg font-semibold text-white mb-2">Generate Image</h2>
            <p className="text-sm text-gray-300">Choose a style and create a unique image.</p>
          </a>

         
          <a href="/comic" className="bg-black/60 hover:bg-black/70 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
            <h2 className="text-lg font-semibold text-white mb-2">Comic Effect</h2>
            <p className="text-sm text-gray-300">Apply bold and stylized comic filters to your images in seconds.</p>
          </a>

          <a href="/chat" className="bg-black/60 hover:bg-black/70 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
            <h2 className="text-lg font-semibold text-white mb-2">Prompt ChatGPT</h2>
            <p className="text-sm text-gray-300 ">Ask the AI anything, anytime.</p>
          </a>

          <a href="/vision" className="bg-black/60 hover:bg-black/70 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
            <h2 className="text-lg font-semibold text-white mb-2">Visions & Verses</h2>
            <p className="text-sm text-gray-300">Generate poetic visuals with AI-crafted verses.</p>
          </a>

          <a href="/artist-portraits" className="bg-black/60 hover:bg-black/70 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
            <h2 className="text-lg font-semibold text-white mb-2">Artist Portraits</h2>
            <p className="text-sm text-gray-300">Create portraits in the style of famous painters.</p>
          </a>

          <a href="/image-editor" className="bg-black/60 hover:bg-black/70 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
            <h2 className="text-lg font-semibold text-white mb-2">Edit Your Image</h2>
            <p className="text-sm text-gray-300">Crop, filter and transform your uploaded image.</p>
          </a>

          <a href="/image-to-video" className="bg-black/60 hover:bg-black/70 border border-green-400 p-5 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-black/70">
            <h2 className="text-lg font-semibold text-white mb-2">Image to Video</h2>
            <p className="text-sm text-gray-300">Turn your images into dynamic AI videos.</p>
          </a>
        </div>
       

      </div>
    </main>
  );
}
