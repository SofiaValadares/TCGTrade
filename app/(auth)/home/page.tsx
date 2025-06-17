"use client";

import React, { useState } from 'react';
import style from './home.module.scss';
import SearchBar from "@/app/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import Select from "@/app/components/Select";
import { useQuery } from '@tanstack/react-query';
import { getAllPokemons } from '@/app/services/pokemon';
import { PokemonResponseDto } from '@/app/types/pokemon';
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import {GenerationResponseDto} from "@/app/types/generation";
import {getAllGeneration} from "@/app/services/generation";

export default function HomePage() {
    const [type, setType] = useState('name');

    const { data: generations, isLoading, error } = useQuery<GenerationResponseDto[]>({
            queryKey: ['generation'],
            queryFn: getAllGeneration
    });

    return (
        <div>
            <div className={style.searchSection}>
                <Select
                    value={type}
                    onChange={(val) => setType(val)}
                    options={[
                        { label: 'Nome', value: 'name' },
                        { label: 'Dex', value: 'dex' },
                    ]}
                    placeholder="Tipo de busca"
                />
                <SearchBar
                    placeholder={"Pesquisar pokémon..."}
                    onSearch={() => console.log("Search")}
                />
                <Button
                    mensage="ADICIONAR POKEMON"
                    color="blue"
                    onClick={() => console.log("POKEMON")}
                />
            </div>

            <div>
                {isLoading && <p>Carregando gerações...</p>}
                {error && <p>Erro ao carregar gerações</p>}
                {generations && generations.map((generation) => (
                    <div key={generation.idGeneration} className={style.searchSection}>
                        <h1>{generation.region.toUpperCase()}</h1>
                        <p>GERAÇÃO {generation.number}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
