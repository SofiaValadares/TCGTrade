import styles from './Button.module.scss';

interface ButtonProps {
    mensage: string;
    color?: 'red' | 'blue';
    onClick?: () => void;
}

export default function Button({ mensage, color, onClick }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${color ? styles[color] : ''}`}
            onClick={onClick}
        >
            {mensage}
        </button>
    );
}
