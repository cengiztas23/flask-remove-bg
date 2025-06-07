'use client';

import { useState } from 'react';

export default function TestGeneratePage() {
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');
    setImage('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'A cat playing chess on Mars',
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setImage(data.imageUrl);
    } else {
      setError(data.error || 'Bilinmeyen bir hata oluştu.');
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🧪 Test Görsel Üretme Sayfası</h1>
      <button onClick={handleGenerate} style={{ padding: '10px 20px' }}>
        Görsel Üret
      </button>

      {image && (
        <div style={{ marginTop: 20 }}>
          <img src={image} alt="Generated" style={{ maxWidth: 400 }} />
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: 20 }}>HATA: {error}</p>
      )}
    </div>
  );
}
