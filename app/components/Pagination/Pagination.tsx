import styles from './Pagination.module.scss';
import { IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       setPage,
                                   }: PaginationProps) {
    const goPrev = () => {
        if (currentPage > 0) {
            setPage(currentPage - 1);
        }
    };

    const goNext = () => {
        if (currentPage + 1 < totalPages) {
            setPage(currentPage + 1);
        }
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.arrow}
                onClick={goPrev}
                disabled={currentPage === 0}
            >
                <IoIosArrowForward style={{ transform: "rotate(180deg)" }} />
            </button>

            <div className={styles.tracks}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.track} ${index === currentPage ? styles.active : ''}`}
                        onClick={() => setPage(index)}
                    />
                ))}
            </div>

            <button
                className={styles.arrow}
                onClick={goNext}
                disabled={currentPage + 1 >= totalPages}
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
}
