import React from 'react';
import clsx from 'clsx';
import { Avatar } from '@/components/atoms/Avatar';

/**
 * MessageBubble Molecule
 * Displays a chat message with sender info and timestamp
 *
 * @component
 * @example
 * <MessageBubble
 *   sender="John Silva"
 *   avatar="john.jpg"
 *   message="This is a message"
 *   timestamp={new Date()}
 *   isOwn={false}
 * />
 */

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sender name */
  sender: string;

  /** Sender avatar URL or initials */
  avatar?: string;

  /** Message content */
  message: string;

  /** Timestamp of message */
  timestamp: Date;

  /** Whether this is the current user's message */
  isOwn?: boolean;

  /** Optional message status indicator */
  status?: 'sending' | 'sent' | 'error';
}

export const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    {
      sender,
      avatar,
      message,
      timestamp,
      isOwn = false,
      status = 'sent',
      className,
      ...props
    },
    ref
  ) => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
      <div
        ref={ref}
        className={clsx('flex gap-3', isOwn && 'flex-row-reverse', className)}
        {...props}
      >
        {/* Avatar */}
        {!isOwn && (
          <Avatar name={sender} src={avatar} size="md" className="flex-shrink-0 mt-1" />
        )}

        {/* Message Content */}
        <div className={clsx('flex flex-col', isOwn && 'items-end', 'flex-1')}>
          {/* Sender name (only for other users) */}
          {!isOwn && <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{sender}</p>}

          {/* Message bubble */}
          <div
            className={clsx(
              'px-4 py-2 rounded-lg max-w-xs break-words',
              isOwn
                ? 'bg-primary-500 text-white rounded-br-none'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
            )}
          >
            <p className="text-sm leading-relaxed">{message}</p>
          </div>

          {/* Timestamp & Status */}
          <div className={clsx('flex items-center gap-1 mt-1', isOwn && 'flex-row-reverse')}>
            <time className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(timestamp)}
            </time>

            {isOwn && status === 'sending' && (
              <span className="text-xs text-gray-400" title="Enviando...">
                ⏳
              </span>
            )}

            {isOwn && status === 'sent' && (
              <span className="text-xs text-gray-400" title="Entregue">
                ✓
              </span>
            )}

            {isOwn && status === 'error' && (
              <span className="text-xs text-red-500" title="Erro ao enviar">
                ✕
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;
