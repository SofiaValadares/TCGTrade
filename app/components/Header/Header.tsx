import React from 'react';
import styles from './Header.module.scss';

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <h1>TCGTrade</h1>
            </div>
        </div>
    )
}

