import React, { useState, useEffect } from 'react';
import '../../styles/components/LazyImage.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div className={`lazy-image-error ${className}`}>
        <span>Image non disponible</span>
      </div>
    );
  }

  return (
    <div className={`lazy-image-container ${className}`}>
      {!isLoaded && <div className="lazy-image-skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
        loading="lazy"
      />
    </div>
  );
};

export default LazyImage;
