import styles from './pokemonCard.module.scss';
import {PokemonResponseDto} from "@/app/types/pokemon";
import {MdCatchingPokemon} from "react-icons/md";
import { theme } from "@/app/styles/theme"

interface PokemonCardProps {
    pokemon: PokemonResponseDto;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className={styles.card}>
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
