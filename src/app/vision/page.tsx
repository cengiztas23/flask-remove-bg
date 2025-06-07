'use client';

import { useState } from 'react';

import VisionsInfoPanel from '@/components/VisionsInfoPanel';
import SideNav from '@/components/SideNav';
import StyleModal from '@/components/StyleModal';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import StyleCard from '@/components/StyleCard';


const styles = [
  {
    name: 'Photorealistic',
    image: '/styles/photorealistic.png',
    modalImage: '/styles/modals/photorealistic.png',
    description: 'Highly realistic visuals with detailed textures and lighting.',
    defaultPrompt: 'A hyper-realistic portrait of an old man, dramatic light',
  },
  {
    name: 'Anime / Manga',
    image: '/styles/anime.png',
    modalImage: '/styles/modals/anime.png',
    description: 'Colorful, expressive visuals with stylized characters.',
    defaultPrompt: 'A futuristic anime girl with glowing sword, dynamic pose',
  },
  {
    name: 'Cyberpunk',
    image: '/styles/cyberpunk.png',
    modalImage: '/styles/modals/cyberpunk.png',
    description: 'Futuristic neon-lit dystopian worlds, rain and tech everywhere.',
    defaultPrompt: 'A cyberpunk city at night with neon signs and rain',
  },
  {
    name: 'Futuristic Architecture',
    image: '/styles/futuristic.png',
    modalImage: '/styles/modals/futuristic.png',
    description: 'Clean, modern buildings with sci-fi elements and lighting.',
    defaultPrompt: 'A sleek white tower in a digital futuristic city',
  },
  {
    name: 'Impressionist',
    image: '/styles/impressionist.png',
    modalImage: '/styles/modals/impressionist.png',
    description: 'Soft brush strokes and warm, nostalgic colors.',
    defaultPrompt: 'A garden painted like Monet, soft light and colors',
  },
  {
    name: 'Historique-Gothique',
    image: '/styles/Historique-Gothique.png',
    modalImage: '/styles/modals/historique-gothique.png',
    description: 'Dark medieval cathedrals, stained glass and stormy skies.',
    defaultPrompt: 'A gothic cathedral with storm clouds and stained glass',
  },
  {
    name: 'Sepia-Cinematic',
    image: '/styles/Sepia-Cinematic.png',
    modalImage: '/styles/modals/sepia-cinematic.png',
    description: 'Moody sepia tones with cinematic framing and atmosphere.',
    defaultPrompt: '1940s detective walking in a foggy alley, sepia tone',
  },
  {
    name: 'Mythopoetic',
    image: '/styles/Mythopoetic.png',
    modalImage: '/styles/modals/mythopoetic.png',
    description: 'Mythological, poetic and symbolic imagery in soft tones.',
    defaultPrompt: 'An ethereal goddess emerging from golden mist',
  },
  {
    name: 'Stoic Epic',
    image: '/styles/Stoic-Epic.png',
    modalImage: '/styles/modals/stoic-epic.png',
    description: 'Philosophical and grand scenes with ancient ruins and deep light.',
    defaultPrompt: 'A stoic philosopher before ruins at sunset, epic tone',
  },
];

export default function StyleGalleryPage() {
  const [showBlock, setShowBlock] = useState(true)

  const [selectedStyle, setSelectedStyle] = useState<any | null>(null);
  const [modalGeneratedImage, setModalGeneratedImage] = useState<string | null>(null);

  const handleGenerate = (prompt: string) => {
    const fakeImage = 'https://via.placeholder.com/512x512?text=Modal+Generated';
    console.log('Generated with prompt:', prompt);
    setModalGeneratedImage(fakeImage);
  };

  return (
    <BackgroundWrapper>
     

      <div className="min-h-screen flex flex-col lg:flex-row text-white">
        <aside className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-cyan-800">
          <SideNav />
        </aside>

        <main className="flex-1 px-4 py-8 flex justify-center">
            <VisionsInfoPanel />
          <div className="w-full max-w-4xl bg-black/60 p-6 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
               Visions & Verses
            </h1>
<p className="text-gray-200 text-base sm:text-lg leading-relaxed mt-2 mb-8 px-6 sm:px-0 mx-auto max-w-2xl text-center">
  Click on a style card below to generate your image — enhanced with poetic verses or philosophical reflections.
</p>


            {/* Stil Kartları */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center mb-12">
              {styles.map((style) => (
                <StyleCard
                  key={style.name}
                  name={style.name}
                  imageUrl={style.image}
                  onClick={() => setSelectedStyle(style)}
                />
              ))}
            </div>

            {/* Açıklama */}
            <div className="text-center text-gray-400 text-lg max-w-[500px] mx-auto mb-12">
              Browse and explore visual styles before creating your own AI-powered masterpiece.
            </div>

            {/* Kendi stilini yarat kutusu */}
            <div
              onClick={() =>
                setSelectedStyle({
                  name: 'Custom Style',
                  description: 'Create your own unique style with a custom prompt and visual direction.',
                  modalImage: '/styles/modals/custom-style.png',
                  defaultPrompt: '',
                })
              }
            >
              <div className="bg-cyan-700 hover:bg-cyan-800 text-white p-6 rounded-xl text-center shadow-md transition max-w-[500px] mx-auto cursor-pointer">
                <h2 className="text-xl font-bold mb-1">✨ Create Your Own Style</h2>
                <p className="text-sm text-cyan-100">
                  Design a custom style and make it yours.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Modal */}
        {selectedStyle && (
          <StyleModal
            isOpen={true}
            onClose={() => setSelectedStyle(null)}
            styleName={selectedStyle.name}
            description={selectedStyle.description}
            imageUrl={selectedStyle.modalImage}
            defaultPrompt={selectedStyle.defaultPrompt}
            onGenerate={handleGenerate}
            generatedImage={modalGeneratedImage}
          />
        )}
      </div>
    </BackgroundWrapper>
  );
}
