'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function IntroPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Video oynatmayı zorla (mobilde autoplay bloklanabilir)
      video
        .play()
        .catch((err) => console.warn('Autoplay blocked:', err));

      // Video bitince yönlendir
      const onEnded = () => router.push('/home');
      video.addEventListener('ended', onEnded);

      return () => video.removeEventListener('ended', onEnded);
    }
  }, [router]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-50">
      <video
  ref={videoRef}
  src="/intro.mp4"
  className="absolute inset-0 w-full h-full bg-black 
             object-contain 
             sm:object-cover sm:object-center"
  muted
  autoPlay
  playsInline
/>


    </div>
  );
}
