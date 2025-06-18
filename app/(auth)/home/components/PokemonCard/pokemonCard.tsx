import styles from './pokemonCard.module.scss';
import { PokemonResponseDto } from "@/app/types/pokemon";
import { MdCatchingPokemon } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { theme } from "@/app/styles/theme";

interface PokemonCardProps {
    pokemon: PokemonResponseDto;
    isEditing?: boolean;
    onDelete?: (id: number) => void;
}

export default function PokemonCard({ pokemon, isEditing = false, onDelete }: PokemonCardProps) {
    return (
        <div className={styles.card}>
            {isEditing && (
                <button
                    className={styles.closeButton}
                    onClick={() => onDelete && onDelete(pokemon.idPokemon)}
                >
                    <IoClose size={16} />
                </button>
            )}

            <div className={styles.imageContainer}>
                <span className={styles.dexNumber}>#{pokemon.number}</span>
                {pokemon.imageUrl ? (
                    <img
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                    />
                ) : (
                    <MdCatchingPokemon color={theme.text.primary} size={50} />
                )}
            </div>
            <h1>{pokemon.name}</h1>
        </div>
    );
}
