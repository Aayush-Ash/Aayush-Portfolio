import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const BrandLogo: React.FC<Props> = ({ className = '', size = 32 }) => {
  return (
    <div 
      className={`brand-logo-container ${className}`} 
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img
        src="/brand-logo-hires.png"
        alt="Aayush Kumar — Agentic AI Developer &amp; Full-Stack Systems Architect Logo"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        className="brand-logo-img"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 6px rgba(125, 211, 252, 0.85)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.55))'
        }}
      />
    </div>
  );
};
