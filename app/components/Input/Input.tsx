'use client';

import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'number' | 'password' | 'email';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    disabled?: boolean;
    error?: string;
}

export default function Input({
                                  value,
                                  onChange,
                                  placeholder = '',
                                  type = 'text',
                                  iconLeft,
                                  iconRight,
                                  disabled = false,
                                  error,
                              }: InputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.inputWrapper} ${
                    error ? styles.inputError : ''
                }`}
            >
                {iconLeft && <div className={styles.icon}>{iconLeft}</div>}

                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    disabled={disabled}
                />

                {iconRight && <div className={styles.icon}>{iconRight}</div>}
            </div>

            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
