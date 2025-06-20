'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IoPersonCircle } from "react-icons/io5";
import styles from './Header.module.scss';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
    handleLogout?: () => void;
}

export default function Header({ handleLogout = () => {} }: HeaderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt_token');
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const goToProfile = () => {
        alert('Indo para Perfil (placeholder)');
        setIsDropdownOpen(false);
    };

    const goToSettings = () => {
        alert('Indo para Configurações (placeholder)');
        setIsDropdownOpen(false);
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <h1 onClick={() => router.push('/home')}>TCGTrade</h1>

                <div className={styles.action}>
                    {token ? (
                        <div
                            className={styles.profile}
                            ref={dropdownRef}
                        >
                            <IoPersonCircle
                                size={40}
                                color="#FFF3E5"
                                onClick={handleToggleDropdown}
                                style={{ cursor: 'pointer' }}
                            />
                            {isDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <ul>
                                        <li onClick={goToProfile}>Perfil</li>
                                        <li onClick={goToSettings}>Configurações</li>
                                        <li
                                            onClick={() => {
                                                handleLogout();
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            Sair
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        pathname !== '/login' && (
                            <span
                                className={styles.login}
                                onClick={() => router.push('/login')}
                            >
                Fazer Login
              </span>
                        )
                    )}
                </div>
            </div>

            <div
                className={`${styles.gradientMenu} ${isMenuOpen ? styles.open : ''}`}
                ref={menuRef}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                {isMenuOpen && (
                    <div className={styles.menuContent}>
                        <div
                            className={styles.menuItem}
                            onClick={() => {
                                router.push('/home');
                                setIsMenuOpen(false);
                            }}
                        >
                            POKÉMONS
                        </div>
                        <div
                            className={styles.menuItem}
                            onClick={() => {
                                router.push('/collections');
                                setIsMenuOpen(false);
                            }}
                        >
                            COLEÇÕES
                        </div>
                        {token && (<div
                            className={styles.menuItem}
                            onClick={() => {
                                router.push('/showcase');
                                setIsMenuOpen(false);
                            }}
                        >
                            MINHA VITRINE
                        </div>)}
                    </div>
                )}
            </div>
        </div>
    );
}
