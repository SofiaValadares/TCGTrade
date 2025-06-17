'use client';

import React from 'react';
import { IoSearch } from 'react-icons/io5';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ placeholder = 'Pesquisar...', onSearch }: SearchBarProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onSearch(value);
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            <IoSearch size={20} />
        </div>
    );
}
