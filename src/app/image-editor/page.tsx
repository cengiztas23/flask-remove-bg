'use client';

import { useState, useRef } from 'react';


import SideNav from '@/components/SideNav';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { removeBackground } from '@/lib/removeBg';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

export default function ImageEditorPage() {
  const [showBlock, setShowBlock] = useState(true)
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [effect, setEffect] = useState<'none' | 'grayscale' | 'sepia'>('none');
  const [blur, setBlur] = useState(0);
const [brightness, setBrightness] = useState(1);
const [contrast, setContrast] = useState(1);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const [backgroundMode, setBackgroundMode] = useState<'color' | 'image' | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('transparent');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoomCrop, setZoomCrop] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    const newUrl = URL.createObjectURL(file);
    setPreviewUrl(newUrl);
    setResultUrl(null);
    setScale(1);
    setFlipped(false);
    setEffect('none');
  };
  // 👇 dosyanın en altına EKLE
const createFinalImage = async (
  imageElement: HTMLImageElement,
  scale: number,
  flipped: boolean,
  effect: 'none' | 'grayscale' | 'sepia',
  backgroundMode: 'color' | 'image' | null,
  backgroundColor: string,
  backgroundImageUrl: string | null,
  blur: number,
  brightness: number,
  contrast: number
): Promise<string> => {

  const width = imageElement.naturalWidth;
  const height = imageElement.naturalHeight;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  if (backgroundMode === 'color') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  } else if (backgroundMode === 'image' && backgroundImageUrl) {
    const bg = new Image();
    bg.src = backgroundImageUrl;
    await new Promise((res) => (bg.onload = res));
    ctx.drawImage(bg, 0, 0, width, height);
  }

// Bu kısmı bul:
ctx.filter = [
  effect === 'grayscale' ? 'grayscale(1)' : '',
  effect === 'sepia' ? 'sepia(1)' : '',
  `blur(${blur}px)`,
  `brightness(${brightness})`,
  `contrast(${contrast})`
].join(' ').trim();




        if (flipped) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }

  const zoomWidth = width / scale;
  const zoomHeight = height / scale;
  const offsetX = (width - zoomWidth) / 2;
  const offsetY = (height - zoomHeight) / 2;

  ctx.drawImage(imageElement, offsetX, offsetY, zoomWidth, zoomHeight);

  return canvas.toDataURL('image/png');
};



  const handleRemoveBackground = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      const processedUrl = await removeBackground(selectedImage);
      setResultUrl(processedUrl);
    } catch (error) {
      console.error('Background removal failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
  if (!imageRef.current) return;

  const finalDataUrl = await createFinalImage(
    imageRef.current,
    scale,
    flipped,
    effect,
    backgroundMode,
    backgroundColor,
    backgroundImageUrl,
    blur,
  brightness,
  contrast
);

  const a = document.createElement('a');
  a.href = finalDataUrl;
  a.download = 'edited-image.png';
  a.click();
};


  return (
    <BackgroundWrapper>
     

      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <aside className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-cyan-800">
          <SideNav />
        </aside>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">AI Background Remover</h1>

          <div className="bg-black/40 rounded-xl p-6 shadow-inner">
            <label className="block mb-4 text-sm text-gray-300">Upload an image (PNG, JPG)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-200 file:bg-cyan-600 file:border-none file:px-4 file:py-2 file:rounded-lg file:text-white hover:file:bg-cyan-700"
            />
          </div>

          {showCropper && previewUrl && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center">
              <div className="relative w-[80vw] h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
                <Cropper
                  image={previewUrl}
                  crop={crop}
                  zoom={zoomCrop}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoomCrop}
                  onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
                />
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={async () => {
                    if (!croppedAreaPixels || !previewUrl) return;
                    const cropped = await getCroppedImg(previewUrl, croppedAreaPixels);
                    setPreviewUrl(cropped);
                    setResultUrl(null);
                    setShowCropper(false);
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  ✅ Apply Crop
                </button>
                <button
                  onClick={() => setShowCropper(false)}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}

          {previewUrl && (
            <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start">
              <div
                className="max-w-[600px] max-h-[600px] overflow-auto mx-auto rounded-lg border border-cyan-800 flex items-center justify-center"
                style={{
                  backgroundColor: backgroundMode === 'color' ? backgroundColor : undefined,
                  backgroundImage:
                    backgroundMode === 'image' && backgroundImageUrl
                      ? `url(${backgroundImageUrl})`
                      : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img
                  ref={imageRef}
                  src={resultUrl || previewUrl}
                  alt="Result"
                  style={{
  transform: `scale(${scale}) ${flipped ? 'scaleX(-1)' : ''}`,
  filter: `
    ${effect === 'grayscale' ? 'grayscale(1)' : ''}
    ${effect === 'sepia' ? 'sepia(1)' : ''}
    blur(${blur}px)
    brightness(${brightness})
    contrast(${contrast})`,
  transition: 'transform 0.3s ease, filter 0.3s ease',
}}

                  className="block max-h-[600px] max-w-full"
                />
              </div>

              <div className="flex flex-col gap-4 min-w-[150px]">
                <button onClick={() => setEffect('none')} className="border border-cyan-400 text-sm rounded-md px-4 py-2 hover:bg-cyan-800">🎨 Normal</button>
                <button onClick={() => setEffect('grayscale')} className="border border-cyan-400 text-sm rounded-md px-4 py-2 hover:bg-cyan-800">🖤 Grayscale</button>
                <button onClick={() => setEffect('sepia')} className="border border-cyan-400 text-sm rounded-md px-4 py-2 hover:bg-cyan-800">🟤 Sepia</button>
                <button onClick={() => setFlipped(!flipped)} className="border border-cyan-400 text-sm rounded-md px-4 py-2 hover:bg-cyan-800">🔁 Mirror</button>
                <div className="flex flex-col gap-4 min-w-[150px]">
  {/* ... önceki butonlar ... */}
  <button onClick={() => setFlipped(!flipped)}></button>

  {/* 🔽 BURAYA EKLE */}
  <div className="mt-6">
    <p className="text-cyan-400 font-semibold text-sm mb-2">Adjustments:</p>

    <label className="text-sm text-gray-300">Blur</label>
    <input
      type="range"
      min="0"
      max="10"
      step="0.1"
      value={blur}
      onChange={(e) => setBlur(Number(e.target.value))}
      className="w-full mb-2 accent-cyan-400"
    />

    <label className="text-sm text-gray-300">Brightness</label>
    <input
      type="range"
      min="0.5"
      max="2"
      step="0.1"
      value={brightness}
      onChange={(e) => setBrightness(Number(e.target.value))}
      className="w-full mb-2 accent-cyan-400"
    />

    <label className="text-sm text-gray-300">Contrast</label>
    <input
      type="range"
      min="0.5"
      max="2"
      step="0.1"
      value={contrast}
      onChange={(e) => setContrast(Number(e.target.value))}
      className="w-full mb-2 accent-cyan-400"
    />
  </div>
</div>

              </div>
            </div>
          )}

          {/* Background Options */}
          <div className="flex flex-col gap-4 mt-8">
            <p className="text-cyan-400 font-semibold text-sm">Background Options:</p>
            <div className="flex gap-2">
             <button
  onClick={() => {
    setBackgroundMode(null);
    setBackgroundColor('transparent');
  }}
  className="px-3 py-1 text-sm text-white border border-white rounded hover:bg-cyan-700"
>
  🌐
</button>
 {['#ffffff', '#000000', '#4ade80', '#3b82f6', '#facc15'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setBackgroundMode('color');
                    setBackgroundColor(color);
                  }}
                  className="w-6 h-6 rounded-full border border-white"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setBackgroundMode('image');
                setBackgroundImageUrl(url);
              }}
              className="text-sm text-gray-300 mt-2"
            />
          </div>

          {/* Drag & Drop */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (!file) return;
              setSelectedImage(file);
              setPreviewUrl(URL.createObjectURL(file));
              setResultUrl(null);
              setScale(1);
              setFlipped(false);
              setEffect('none');
            }}
            onDragOver={(e) => e.preventDefault()}
            className="mt-4 border-2 border-dashed border-cyan-400 rounded-lg p-6 text-center text-sm text-gray-300 hover:bg-cyan-900 transition-colors cursor-pointer"
          >
            or drag & drop an image here
          </div>

          {/* Bottom controls */}
          <button
  onClick={() => setShowCropper(true)}
  className="border border-green-500 text-sm rounded-md px-6 py-2 hover:bg-green-600 text-white mt-4"
>
  ✂️ Crop
</button>


          {previewUrl && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setScale((s) => Math.max(0.1, s - 0.1))}
                className="border border-cyan-400 text-sm rounded-md px-6 py-2 hover:bg-cyan-800"
              >
                ➖ Zoom Out
              </button>
              <button
                onClick={() => setScale((s) => Math.min(3, s + 0.1))}
                className="border border-cyan-400 text-sm rounded-md px-6 py-2 hover:bg-cyan-800"
              >
                ➕ Zoom In
              </button>
              <button
                onClick={handleRemoveBackground}
                disabled={loading}
                className="border border-green-500 text-sm rounded-md px-6 py-2 hover:bg-green-700 text-white"
              >
                {loading ? 'Processing...' : '🪄 Remove Background'}
              </button>
              <button
  onClick={handleDownload}
  className="border border-green-500 text-sm rounded-md px-6 py-2 hover:bg-green-600 text-white"
>
   Download
</button>

            </div>
          )}
        </main>
      </div>
    </BackgroundWrapper>
  );
}
