'use client';

import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ placeholder = 'Pesquisar...', onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button type="submit">
                <IoSearch size={20} />
            </button>
        </form>
    );
}
