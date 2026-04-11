'use client';

import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm text-[var(--color-taupe)] mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-beige)] text-[var(--color-charcoal)] placeholder:text-[var(--color-taupe-light)] focus:outline-none focus:border-[var(--color-rose-clay)] transition-colors duration-300',
            error && 'border-[var(--color-coral)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--color-coral)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';