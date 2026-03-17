import React from 'react';
import clsx from 'clsx';

/**
 * Avatar Component - Atom Level
 * User profile pictures with initials fallback
 */

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Display name (used for initials if no image) */
  name?: string;

  /** Avatar size */
  size?: AvatarSize;

  /** Image source */
  src?: string;

  /** Initials to display (overrides name-based initials) */
  initials?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

/**
 * Get initials from name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Get background color based on name hash
 */
function getAvatarColor(name: string): string {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      name = 'User',
      size = 'md',
      src,
      initials,
      className,
      alt,
      ...props
    },
    ref
  ) => {
    const displayInitials = initials || getInitials(name);
    const bgColor = getAvatarColor(name);

    // Image avatar
    if (src) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt || name}
          className={clsx(
            'rounded-full object-cover',
            sizeStyles[size],
            className
          )}
          {...props}
        />
      );
    }

    // Initials avatar
    return (
      <div
        className={clsx(
          'rounded-full flex items-center justify-center font-semibold text-white',
          sizeStyles[size],
          bgColor,
          className
        )}
        title={name}
      >
        {displayInitials}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
