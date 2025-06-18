import styles from './pokemonCard.module.scss';
import { PokemonResponseDto } from "@/app/types/pokemon";
import { MdCatchingPokemon, MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { theme } from "@/app/styles/theme";

interface PokemonCardProps {
    pokemon: PokemonResponseDto;
    isEditing?: boolean;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
}

const getTypeIcon = (type: string) => {
    return `https://raw.githubusercontent.com/SofiaValadares/PokemonImgs/main/types/${type.toLowerCase()}.svg`;
};

export default function PokemonCard({
                                        pokemon,
                                        isEditing = false,
                                        onDelete,
                                        onEdit
                                    }: PokemonCardProps) {
    return (
        <div className={styles.card}>
            {isEditing && (
                <>
                    <button
                        className={styles.closeButton}
                        onClick={() => onDelete && onDelete(pokemon.idPokemon)}
                    >
                        <IoClose size={16} />
                    </button>

                    <button
                        className={styles.editButton}
                        onClick={() => onEdit && onEdit(pokemon.idPokemon)}
                    >
                        <MdEdit size={16} />
                    </button>
                </>
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

                <div className={styles.types}>
                    <img
                        className={styles.typeIcon}
                        src={getTypeIcon(pokemon.primaryType)}
                        alt={pokemon.primaryType}
                        title={pokemon.primaryType}
                    />
                    {pokemon.secondaryType && (
                        <img
                            className={styles.typeIcon}
                            src={getTypeIcon(pokemon.secondaryType)}
                            alt={pokemon.secondaryType}
                            title={pokemon.secondaryType}
                        />
                    )}
                </div>
            </div>

            <h1>{pokemon.name}</h1>
        </div>
    );
}
