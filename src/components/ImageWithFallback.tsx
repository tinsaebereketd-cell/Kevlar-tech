import { useState } from 'react';
import { MonitorCog } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackLabel = 'Precision Hardware Lab',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || !src.trim() || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-slate-500 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <MonitorCog className="w-10 h-10 mb-2 text-slate-400" strokeWidth={1.5} />
        <span className="text-xs font-medium text-slate-600">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
