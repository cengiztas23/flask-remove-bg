'use client';
import React from 'react';

interface StyleCardProps {
  name: string;
  imageUrl: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function StyleCard({
  name,
  imageUrl,
  isSelected = false,
  onClick,
}: StyleCardProps) {
  return (
    <div
      className={`cursor-pointer w-full max-w-[160px] p-1 rounded-lg transform transition-all duration-300
        ${isSelected
          ? 'scale-105 ring-4 ring-cyan-400 shadow-lg shadow-cyan-400/30'
          : 'border border-cyan-500 hover:scale-105 hover:shadow-md hover:shadow-cyan-500/20'}
      `}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[160px] object-cover rounded-md transition-transform duration-300"
      />
      <p className="text-sm text-center mt-2 text-white">{name}</p>
    </div>
  );
}
