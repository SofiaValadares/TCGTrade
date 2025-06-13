import React from 'react';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ title, message, icon, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      {icon ? (
        <div className={styles.iconWrapper}>{icon}</div>
      ) : (
        <div className={styles.defaultIcon}>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className={styles.svgIcon}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20 14V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V14M12 15C8 15 4 14.5523 4 11.5V6.5C4 3.5 8 3 12 3C16 3 20 3.5 20 6.5V11.5C20 14.5523 16 15 12 15Z" 
            />
          </svg>
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
      {action && (
        <button onClick={action.onClick} className={styles.actionButton}>
          {action.label}
        </button>
      )}
    </div>
  );
} 