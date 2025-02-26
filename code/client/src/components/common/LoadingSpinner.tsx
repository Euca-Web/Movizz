import React from 'react';
import '../../styles/components/LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  className = ''
}) => {
  return (
    <div className={`loading-spinner-container ${size} ${className}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
