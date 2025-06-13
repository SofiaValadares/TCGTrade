import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  icon?: boolean;
}

export default function ErrorMessage({ message, onRetry, icon = true }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer}>
      {icon && (
        <div className={styles.iconWrapper}>
          <svg 
            className={styles.icon} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
      )}
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={styles.retryButton}>
          Tentar novamente
        </button>
      )}
    </div>
  );
} 