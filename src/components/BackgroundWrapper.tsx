'use client';

import React from 'react';

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/studio-ai-bg.png')" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
