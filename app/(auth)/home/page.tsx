"use client";

import React, {useEffect, useState} from 'react';
import style from './home.module.scss';
import SearchBar from "@/app/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import Select from "@/app/components/Select";
import { useQuery } from '@tanstack/react-query';
import { GenerationListResponseDto } from "@/app/types/generation";
import { getAllGeneration } from "@/app/services/generation";
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import GenerationsList from "@/app/(auth)/home/components/GenerationsList/generationsList";

export default function HomePage() {
    const [token, setToken] = useState<string | null>(null);
    const [type, setType] = useState<'name' | 'dex'>('name');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt_token');
        setToken(storedToken);
    }, []);

    const { data: generations, isLoading, error } = useQuery<GenerationListResponseDto[]>({
        queryKey: ['generation'],
        queryFn: getAllGeneration
    });

    const handleSearch = (term: string) => {
        setSearchTerm(term.trim().toLowerCase());
    };

    const allPokemons = generations?.flatMap(gen => gen.pokemons) || [];

    const filteredPokemons = allPokemons.filter(pokemon => {
        if (searchTerm === '') return true;

        if (type === 'name') {
            return pokemon.name.toLowerCase().includes(searchTerm);
        } else if (type === 'dex') {
            return pokemon.number.toString().includes(searchTerm);
        }

        return true;
    });

    return (
        <div>
            <div className={style.searchSection}>
                <Select
                    value={type}
                    onChange={(val) => setType(val as 'name' | 'dex')}
                    options={[
                        { label: 'Nome', value: 'name' },
                        { label: 'Dex', value: 'dex' },
                    ]}
                    placeholder="Tipo de busca"
                />
                <SearchBar
                    placeholder={"Pesquisar pokémon..."}
                    onSearch={handleSearch}
                />
                {token ?
                    <Button
                        mensage="ADICIONAR POKEMON"
                        color="blue"
                        onClick={() => console.log("POKEMON")}
                    />
                : null}
            </div>

            <div>
                {isLoading && <p>Carregando gerações...</p>}
                {error && <p>Erro ao carregar gerações</p>}

                {searchTerm ? (
                    <div className={style.generationSection}>
                        {filteredPokemons.length > 0 ? (
                            <div className={style.pokemonSection}>
                                {filteredPokemons.map(pokemon => (
                                    <PokemonCard
                                        key={pokemon.idPokemon}
                                        pokemon={pokemon}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum Pokémon encontrado.</p>
                        )}
                    </div>
                ) : (
                    generations && <GenerationsList generations={generations}/>
                )}
            </div>
        </div>
    );
}
