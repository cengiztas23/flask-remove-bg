'use client';

import { useState } from 'react';

export default function FluxPage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  const generateImage = async () => {
    setStatus('⏳ Görsel üretiliyor...');
    setImage('');

    try {
      const res = await fetch('/api/flux', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setImage(data.image);
        setStatus('✅ Görsel başarıyla üretildi');
      } else {
        setStatus(`❌ Hata: ${data.error}`);
      }
    } catch (error) {
      setStatus('❌ Ağ hatası oluştu.');
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>🖼️ FLUX Görsel Üretimi</h1>
      <textarea
        rows={4}
        style={{ width: '100%', padding: 10 }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Örneğin: 'Fütüristik bir şehir manzarası'"
      />
      <button onClick={generateImage} style={{ marginTop: 12, padding: 10 }}>
        Üret
      </button>
      <p style={{ marginTop: 12 }}>{status}</p>
      {image && (
        <div style={{ marginTop: 24 }}>
          <img src={image} alt="Üretilen Görsel" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}
