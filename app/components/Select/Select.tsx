'use client';

import React from 'react';
import styles from './Select.module.scss';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Select({
                                   options,
                                   value,
                                   onChange,
                                   placeholder = 'Selecione...',
                               }: SelectProps) {
    return (
        <select
            className={styles.select}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {placeholder && (
                <option value="" disabled hidden>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
