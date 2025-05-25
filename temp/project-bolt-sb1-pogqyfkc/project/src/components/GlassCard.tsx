import React, { forwardRef } from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'light' | 'dark';
  className?: string;
  hoverable?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, variant = 'default', className = '', hoverable = false, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white/20 backdrop-blur-md border border-white/30',
      light: 'bg-white/40 backdrop-blur-sm border border-white/50',
      dark: 'bg-black/20 backdrop-blur-md border border-white/10',
    };

    return (
      <div
        ref={ref}
        className={`rounded-xl shadow-lg ${variantClasses[variant]} ${
          hoverable
            ? 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/30'
            : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;