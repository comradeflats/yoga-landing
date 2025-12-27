import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover ? 'transition-shadow hover:shadow-lg' : '';

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-calm-200 ${paddings[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};
