import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  imgClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = 'w-full h-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFEAE0] text-[#14532D] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sprout className="w-8 h-8 mb-3 opacity-80" aria-hidden="true" />
        <p className="font-serif text-base font-medium text-[#1C1917]">
          {fallbackTitle || 'UMEED Visual Study'}
        </p>
        <p className="text-xs text-[#57534E] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#EFEAE0] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`transition-transform duration-500 ease-out ${imgClassName}`}
      />
    </div>
  );
};
