'use client';

import { useState } from 'react';

import SideNav from '@/components/SideNav';
import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function ImageToVideoPage() {
  const [showBlock, setShowBlock] = useState(true)

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [music, setMusic] = useState<string>('chill.mp3');
  const [selectedMusicUrl, setSelectedMusicUrl] = useState<string | null>(null);
  const [customMusicFile, setCustomMusicFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [transitionType, setTransitionType] = useState('fade');



  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const filteredNew = newFiles.filter((file) => !images.some((img) => img.name === file.name));
    const combined = [...images, ...filteredNew]; // ✅ sınırı kaldır

    setImages(combined);
    setPreviews(combined.map((file) => URL.createObjectURL(file)));
  };

  const handleCreateVideo = async () => {
  if (images.length === 0) {
    alert('Please select at least one image.');
    return;
  }

  setLoading(true); // <-- Başta ekle

  const formData = new FormData();
  images.forEach((file) => formData.append('images', file));
  if (selectedMusicUrl) {
    formData.append('musicUrl', selectedMusicUrl);
  } else {
    formData.append('music', music);
  }
  formData.append('text', text);
  formData.append('transition', transitionType);



  setVideoUrl(null);

  try {
    const res = await fetch('/api/create-video', {
      method: 'POST',
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
  } catch (error) {
    alert('An error occurred while generating the video.');
    console.error(error);
  } finally {
    setLoading(false); // <-- Sonda ekle
  }
};



  const musicOptions = [
    'ambient.mp3',
    'beautiful-dream.mp3',
    'chill.mp3',
    'christmas.mp3',
    'energetic.mp3',
    'games.mp3',
    'gimme.mp3',
    'hollidays.mp3',
    'praise.mp3',
    'relaxing.mp3',
    'romantic.mp3',
    'tech-house.mp3',
    'wedding.mp3',
  ];

  return (
    <BackgroundWrapper>
    

      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <aside className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-cyan-800">
          <SideNav />
        </aside>

        <main className="flex-1 px-4 py-8 flex justify-center">
      
          <div className="w-full max-w-4xl bg-black/60 p-6 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">
              Image to Video Generator
            </h1>
            {/* How it works box */}
<div className="bg-cyan-950/80 border border-cyan-700 p-6 rounded-xl text-white mb-6 max-w-2xl">
  <h2 className="text-xl font-bold text-cyan-100 mb-4 flex items-center gap-2">
    How it works <span>🧠</span>
  </h2>
  <ul className="list-disc list-inside space-y-2 text-sm text-gray-100">
    <li>You can upload as many images as you like. (PNG format recommended)</li>
    <li>Each image will be shown for <strong>3 seconds</strong>.</li>
    <li>The <strong>video duration</strong> is based on the <strong>number of selected images</strong>.</li>
    <li>Uploaded images are <strong>played in order</strong>, no repetition.</li>
    <li>The selected music will <strong>fade out</strong> when the video ends.</li>
  </ul>
</div>



            {/* Image Uploader */}
            <div className="mb-6">
              <label className="block text-cyan-300 font-semibold mb-2">
               Please upload images (no limit):
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full text-white bg-gray-800 border border-cyan-600 rounded p-2"
              />
              <p className="text-sm text-gray-400 mt-1">
  You can select as many images as you like.
</p>

            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {previews.map((src, idx) => (
                  <div key={idx} className="bg-black/40 p-3 rounded-lg shadow-md text-center">
                    <img
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      className="rounded-lg mx-auto mb-2 max-h-40 object-contain"
                    />
                    <p className="text-sm text-cyan-200">Image {idx + 1}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Music Selector */}
            <div className="mt-10">
              <label className="block text-cyan-300 font-semibold mb-2">
                Select background music:
              </label>
              <select
                value={music}
                onChange={(e) => {
                  setMusic(e.target.value);
                  setSelectedMusicUrl(null);
                  setCustomMusicFile(null);
                }}
                className="w-full p-2 bg-gray-800 border border-cyan-600 rounded mb-2"
              >
                {musicOptions.map((fileName) => (
                  <option key={fileName} value={fileName}>
                    {fileName.replace('.mp3', '').replace(/-/g, ' ')}
                  </option>
                ))}
              </select>

              {/* Music Preview */}
              {selectedMusicUrl ? (
                <div className="mt-2">
                  <audio key={selectedMusicUrl} controls className="w-full">
                    <source src={selectedMusicUrl} type="audio/mpeg" />
                  </audio>
                  <p className="text-sm text-cyan-300 mt-1">Custom or external music selected</p>
                </div>
              ) : music ? (
                <div className="mt-2">
                  <audio key={music} controls className="w-full">
                    <source src={`/music/${music}`} type="audio/mpeg" />
                  </audio>
                  <p className="text-sm text-cyan-300 mt-1">
                    Preview: {music.replace('.mp3', '').replace(/-/g, ' ')}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Upload custom MP3 */}
            <div className="mt-6">
              <label className="block text-cyan-300 font-semibold mb-2">
                Or upload your own MP3 file:
              </label>
              <input
                type="file"
                accept="audio/mpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setSelectedMusicUrl(url);
                    setCustomMusicFile(file);
                    setMusic('');
                  }
                }}
                className="w-full text-white bg-gray-800 border border-cyan-600 rounded p-2"
              />
            </div>
            <div className="mt-6">
  <label className="block text-cyan-300 font-semibold mb-2">
  Add a title to your video (optional):
</label>

  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    className="w-full text-white bg-gray-800 border border-cyan-600 rounded p-2"
    placeholder="Your text here..."
  />
</div>
<div className="mt-6">
  <label className="block text-cyan-300 font-semibold mb-2">
    Transition between images:
  </label>
  <select
    value={transitionType}
    onChange={(e) => setTransitionType(e.target.value)}
    className="w-full p-2 bg-gray-800 border border-cyan-600 rounded"
  >
    <option value="fade">Fade (smooth)</option>
    <option value="cut">Cut (instant)</option>
  </select>
</div>


            {/* External links */}
            <div className="mt-8">
              <h3 className="text-cyan-300 font-semibold mb-2">Browse royalty-free music online:</h3>
              <div className="flex flex-wrap gap-2">
  <a
    href="https://pixabay.com/music/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white text-sm"
  >
    🎵 Pixabay Music
  </a>
  <a
    href="https://mixkit.co/free-stock-music/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white text-sm"
  >
    🎶 Mixkit
  </a>
  <a
    href="https://www.youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white text-sm"
  >
    📺 YouTube Audio Library
  </a>
</div>

            </div>

            {/* Create Video Button */}
            <div className="mt-8">
  <button
    onClick={handleCreateVideo}
    disabled={loading}
    className="w-full py-3 font-bold bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center justify-center gap-2"
  >
    {loading ? (
      <>
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Processing...
      </>
    ) : (
      'Create Video'
    )}
  </button>
</div>


            {/* Video Preview */}
            {videoUrl && (
              <div className="mt-6">
                <video src={videoUrl} controls className="w-full rounded-lg shadow-md" />
                <a
                  href={videoUrl}
                  download="your-video.mp4"
                  className="block mt-2 text-center text-cyan-400 hover:underline"
                >
                  Download Video
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </BackgroundWrapper>
  );
}
