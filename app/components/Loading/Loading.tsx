import React from 'react';
import Spinner from '../Spinner';
import styles from './Loading.module.scss';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Loading({ 
  message = 'Carregando...', 
  fullScreen = false, 
  size = 'medium' 
}: LoadingProps) {
  return (
    <div className={`${styles.loadingContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <Spinner size={size} text={message} fullScreen={fullScreen} />
    </div>
  );
} 