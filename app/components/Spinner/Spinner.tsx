import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
}

export default function Spinner({ 
  size = 'medium', 
  color = 'primary', 
  text, 
  fullScreen = false 
}: SpinnerProps) {
  return (
    <div className={`${styles.spinnerWrapper} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
} 