import styles from './Button.module.scss';

interface ButtonProps {
    mensage: string;
    color?: 'red' | 'blue';
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({ mensage, color, onClick, disabled = false }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${color ? styles[color] : ''} ${disabled ? styles.disabled : ''}`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            {mensage}
        </button>
    );
}
