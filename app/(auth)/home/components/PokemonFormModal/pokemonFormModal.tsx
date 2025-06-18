"use client";

import React, { useState, useEffect } from "react";
import styles from "./pokemonFormModal.module.scss";
import { PokemonRecordDto, PokemonResponseDto, PokemonType } from "@/app/types/pokemon";

interface PokemonFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PokemonRecordDto) => void;
    initialData?: PokemonResponseDto;
    isLoading?: boolean;
}

export default function PokemonFormModal({
                                             isOpen,
                                             onClose,
                                             onSubmit,
                                             initialData,
                                             isLoading = false,
                                         }: PokemonFormModalProps) {
    const [name, setName] = useState("");
    const [numPokemon, setNumPokemon] = useState<number>(0);
    const [generation, setGeneration] = useState<number>(1);
    const [primaryType, setPrimaryType] = useState<PokemonType>("NORMAL");
    const [secondaryType, setSecondaryType] = useState<PokemonType | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string | undefined>();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setNumPokemon(initialData.number);
            setGeneration(initialData.generation);
            setPrimaryType(initialData.primaryType);
            setSecondaryType(initialData.secondaryType ?? undefined);
            setImageUrl(initialData.imageUrl);
        } else {
            setName("");
            setNumPokemon(0);
            setGeneration(1);
            setPrimaryType("NORMAL");
            setSecondaryType(undefined);
            setImageUrl(undefined);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            number: numPokemon,
            name,
            generation,
            primaryType,
            secondaryType,
            imageUrl,
        });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{initialData ? "Editar Pokémon" : "Criar Pokémon"}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        Número da Dex:
                        <input
                            type="number"
                            value={numPokemon}
                            onChange={(e) => setNumPokemon(Number(e.target.value))}
                            required
                        />
                    </label>

                    <label>
                        Nome:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Geração:
                        <input
                            type="number"
                            value={generation}
                            onChange={(e) => setGeneration(Number(e.target.value))}
                            required
                        />
                    </label>

                    <label>
                        Tipo Primário:
                        <select
                            value={primaryType}
                            onChange={(e) => setPrimaryType(e.target.value as PokemonType)}
                            required
                        >
                            {POKEMON_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Tipo Secundário (opcional):
                        <select
                            value={secondaryType ?? ""}
                            onChange={(e) =>
                                setSecondaryType(e.target.value === "" ? undefined : (e.target.value as PokemonType))
                            }
                        >
                            <option value="">Nenhum</option>
                            {POKEMON_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        URL da imagem:
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </label>

                    <div className={styles.buttons}>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const POKEMON_TYPES = [
    "NORMAL", "FIRE", "WATER", "ELECTRIC", "GRASS", "ICE",
    "FIGHTING", "POISON", "GROUND", "FLYING", "PSYCHIC", "BUG",
    "ROCK", "GHOST", "DRAGON", "DARK", "STEEL", "FAIRY",
] as const;
