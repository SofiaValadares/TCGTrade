import style from './pokemonCard.module.scss';
import { theme } from '@/app/styles/theme';
import { MdCatchingPokemon } from "react-icons/md";

interface PokemonProps {
    name: string;
    number: number;
    image?: string;
}
export default function PokemonCard({ name, number, image }: PokemonProps) {
    return (
        <div className={style.card}>
            <div className={style.imageContainer}>
                {image ? (
                    <img
                        src={image}
                        alt={name}
                    />
                ) : (
                    <MdCatchingPokemon color={theme.text.primary} size={50} />
                )}
            </div>

            <h1>{name}</h1>

        </div>
    )

}