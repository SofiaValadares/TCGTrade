import React, { useEffect, useRef, useState } from 'react';
import { IoPersonCircle } from "react-icons/io5";
import styles from './Header.module.scss';
import {usePathname, useRouter} from 'next/navigation';

interface HeaderProps {
    handleLogout?: () => void;
}

export default function Header({ handleLogout = () => {} }: HeaderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
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
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const goToProfile = () => {
        alert('Indo para Perfil (placeholder)');
        setIsOpen(false);
    };

    const goToSettings = () => {
        alert('Indo para Configurações (placeholder)');
        setIsOpen(false);
    };

    const handleToggle = () => {
        setIsOpen(prev => !prev);
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
                            onMouseEnter={() => setIsOpen(true)}
                        >
                            <IoPersonCircle
                                size={40}
                                color="#FFF3E5"
                                onClick={handleToggle}
                                style={{ cursor: 'pointer' }}
                            />
                            {isOpen && (
                                <div className={styles.dropdown}>
                                    <ul>
                                        <li onClick={goToProfile}>Perfil</li>
                                        <li onClick={goToSettings}>Configurações</li>
                                        <li
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
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
        </div>
    );
}
