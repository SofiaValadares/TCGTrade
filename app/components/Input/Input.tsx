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
}

export default function Input({
                                  value,
                                  onChange,
                                  placeholder = '',
                                  type = 'text',
                                  iconLeft,
                                  iconRight,
                                  disabled = false
                              }: InputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={styles.inputWrapper}>
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
    );
}
