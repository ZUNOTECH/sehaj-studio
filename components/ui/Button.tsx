'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  href,
  style,
  ...props 
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#3D3632',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#3D3632',
      border: '1px solid #E8E2DA',
    },
    text: {
      backgroundColor: 'transparent',
      color: '#3D3632',
      padding: '8px 0',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#7A706A',
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 16px', fontSize: '12px' },
    md: { padding: '12px 24px', fontSize: '14px' },
    lg: { padding: '16px 32px', fontSize: '16px' },
  };

  const combinedStyle: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  const hoverStyles: React.CSSProperties = variant === 'primary' ? { backgroundColor: '#7A706A' } :
    variant === 'secondary' ? { borderColor: '#3D3632' } :
    variant === 'text' ? { color: '#C4A59A' } :
    variant === 'ghost' ? { backgroundColor: '#F5EDE4' } : {};

  if (href) {
    return (
      <Link 
        href={href} 
        style={combinedStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyles)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, variantStyles[variant])}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      style={combinedStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyles)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, variantStyles[variant])}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}