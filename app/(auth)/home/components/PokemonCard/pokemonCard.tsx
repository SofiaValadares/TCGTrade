import style from './pokemonCard.module.scss';
import {PokemonResponseDto} from "@/app/types/pokemon";

interface PokemonProps {
    name: string;
    number: number;
    image?: string;
}
export default function PokemonCard({ name, number, image }: PokemonProps) {
    return (
        <div className={style.card}>
            <div className={style.imageContainer}>
                <img src={image} alt="" />
            </div>

            <h1>{name}</h1>

        </div>
    )

}