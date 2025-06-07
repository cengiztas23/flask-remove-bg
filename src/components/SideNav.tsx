'use client';
import Link from 'next/link';
import { Dispatch, SetStateAction } from "react";

type SideNavProps = {
  selectedStyle?: string;
  setSelectedStyle?: Dispatch<SetStateAction<string | null>>;
};

// ✅ Mevcut + Yeni Sayfa Linkleri
const navItems = [
  { name: '🎁 Free Gallery', href: '/free-gallery' },
  { name: 'Generate', href: '/generate' },
   { name: 'Artist Portraits', href: '/artist-portraits' },
  
  { name: 'Visions & Verses', href: '/vision' },
 
  { name: 'Edit Your Image', href: '/image-editor' },
  { name: 'Image to Video', href: '/image-to-video' },
  { name: 'Comic Effect', href: '/comic' },
  { name: 'Prompt ChatGPT', href: '/chat' },
];


export default function SideNav({ selectedStyle, setSelectedStyle }: SideNavProps) {
  return (
    <div className="w-[240px] flex flex-col items-center justify-center gap-6 bg-black/50 py-8 px-2">

      {/* LOGO - home page'e gider */}
      <Link href="/home" className="block mb-6">
        <img
          src="/logo.png"
          alt="Studio AI Vision"
          className="w-40 cursor-pointer hover:opacity-80 transition"
        />
      </Link>

      {/* GEÇİŞ BUTONLARI */}
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="w-[180px] text-lg text-center py-4 rounded-xl font-semibold backdrop-blur-md bg-white/10 border border-cyan-500 text-cyan-200 shadow-md hover:bg-cyan-600 hover:text-white transition"
        >
          {item.name}
        </Link>
      ))}

      {/* SEÇİLEN STİL GÖSTERİMİ */}
      {selectedStyle && (
        <div className="mt-8 text-center text-sm text-gray-300 px-3">
          <p className="text-cyan-200 font-semibold">Selected Style</p>
          <p className="italic">{selectedStyle}</p>
        </div>
      )}
    </div>
  );
}
