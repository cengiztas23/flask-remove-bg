'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function StartPage() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg text-cyan-400">Yükleniyor...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-cyan-400">🔒 Access Restricted</h1>
      <p className="mb-8 text-lg text-gray-300 text-center max-w-xl">
        To access this content, please log in and subscribe to a plan below.
      </p>

      <div className="flex gap-4 mb-10">
        <Link
          href="/sign-in"
          className="bg-cyan-500 px-5 py-2 rounded-md hover:bg-cyan-600 text-white"
        >
          Log In
        </Link>
        <Link
          href="/sign-up"
          className="text-sm text-cyan-400 underline hover:text-cyan-300 self-center"
        >
          Forgot Password?
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl border border-cyan-600 p-6 rounded-lg">
        <div className="border border-cyan-500 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ FREE Access</h2>
          <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
            <li>Access high-resolution images in public gallery</li>
            <li>Download and share for free</li>
            <li>Remix this image</li>
            <li>No account required</li>
            <li>Enjoy the visual taste before subscribing</li>
          </ul>
        </div>

        <div className="border border-cyan-500 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">💎 PREMIUM – $12.90/month</h2>
          <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
            <li>Generate custom high-resolution AI images</li>
            <li>Use advanced prompt styling and guides</li>
            <li>Crop, filter, and edit your visuals with precision</li>
            <li>Convert images into short videos</li>
            <li>Get poetic visuals with AI-crafted verses</li>
            <li>Create portraits in styles of legendary artists</li>
            <li>Full access to AI Chat for real-time creative support</li>
            <li>Priority processing & faster generation</li>
            <li>Access all future feature updates at no extra cost</li>
            <li>Comicify your image</li>
          </ul>

          <a
            href="https://checkout.stripe.com/pay/test-link" // Stripe link buraya gelecek
            className="mt-6 inline-block bg-cyan-500 px-6 py-2 rounded-md text-white hover:bg-cyan-600"
          >
            Subscribe Now
          </a>
        </div>
      </section>
    </main>
  );
}
