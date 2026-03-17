import React from 'react';
import clsx from 'clsx';

/**
 * ContactCard Molecule
 * Displays contact information in a card format
 *
 * @component
 * @example
 * <ContactCard
 *   name="John Silva"
 *   phone="(11) 98765-4321"
 *   email="john@email.com"
 *   stage="prospecting"
 *   onSelect={() => {}}
 * />
 */

type Stage = 'prospecting' | 'qualified' | 'proposal' | 'negotiation';

export interface ContactCardProps {
  /** Contact name */
  name: string;

  /** Contact phone */
  phone: string;

  /** Contact email */
  email: string;

  /** Sales stage */
  stage: Stage;

  /** Click handler */
  onSelect: () => void;

  /** Additional className */
  className?: string;

  /** Optional: Show chevron indicator */
  showChevron?: boolean;
}

const stageConfig: Record<
  Stage,
  { bg: string; text: string; label: string }
> = {
  prospecting: {
    bg: 'bg-blue-100 dark:bg-blue-900',
    text: 'text-blue-800 dark:text-blue-100',
    label: 'Prospecting',
  },
  qualified: {
    bg: 'bg-purple-100 dark:bg-purple-900',
    text: 'text-purple-800 dark:text-purple-100',
    label: 'Qualified',
  },
  proposal: {
    bg: 'bg-orange-100 dark:bg-orange-900',
    text: 'text-orange-800 dark:text-orange-100',
    label: 'Proposal',
  },
  negotiation: {
    bg: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-800 dark:text-green-100',
    label: 'Negotiation',
  },
};

export const ContactCard = React.forwardRef<
  HTMLButtonElement,
  ContactCardProps
>(
  (
    {
      name,
      phone,
      email,
      stage,
      onSelect,
      className,
      showChevron = true,
    },
    ref
  ) => {
    const stageStyle = stageConfig[stage];

    return (
      <button
        ref={ref}
        onClick={onSelect}
        type="button"
        className={clsx(
          'w-full p-4 text-left',
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
          'rounded-lg hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
          'transition-all duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          className
        )}
        aria-label={`Contact: ${name}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {name}
            </h3>

            {/* Phone */}
            <a
              href={`tel:${phone}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors truncate block"
              title={phone}
            >
              {phone}
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors truncate block"
              title={email}
            >
              {email}
            </a>

            {/* Stage Badge */}
            <div className="mt-3">
              <div
                className={clsx(
                  'inline-block px-3 py-1 rounded-md text-xs font-medium',
                  stageStyle.bg,
                  stageStyle.text
                )}
              >
                {stageStyle.label}
              </div>
            </div>
          </div>

          {/* Chevron */}
          {showChevron && (
            <div className="flex-shrink-0 text-gray-400 dark:text-gray-500 mt-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
        </div>
      </button>
    );
  }
);

ContactCard.displayName = 'ContactCard';

export default ContactCard;
