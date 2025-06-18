"use client";

import React, { useState, useEffect } from "react";
import styles from "./pokemonFormModal.module.scss";
import {
    PokemonRecordDto,
    PokemonResponseDto,
    PokemonType,
} from "@/app/types/pokemon";
import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import { useGenerations } from "@/app/hooks/useGenerations";
import Button from "@/app/components/Button";

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
    const { data: generations, isLoading: isLoadingGenerations } =
        useGenerations();

    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<number>(0);
    const [generation, setGeneration] = useState<number>(1);
    const [primaryType, setPrimaryType] = useState<PokemonType>("NORMAL");
    const [secondaryType, setSecondaryType] = useState<PokemonType | undefined>();
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setNumber(initialData.number);
            setGeneration(initialData.generation);
            setPrimaryType(initialData.primaryType);
            setSecondaryType(initialData.secondaryType ?? undefined);
            setImageUrl(initialData.imageUrl ?? "");
        } else {
            setName("");
            setNumber(0);
            setGeneration(1);
            setPrimaryType("NORMAL");
            setSecondaryType(undefined);
            setImageUrl("");
        }
    }, [initialData]);

    const handleClickSubmit = () => {
        const payload: PokemonRecordDto = {
            number,
            name,
            generation,
            primaryType,
            secondaryType,
            imageUrl: imageUrl.trim() !== "" ? imageUrl.trim() : undefined,
        };

        onSubmit(payload);
    };

    const isFormValid =
        number > 0 &&
        name.trim() !== "" &&
        generation > 0 &&
        primaryType.trim() !== "";

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{initialData ? "Editar Pokémon" : "Criar Pokémon"}</h2>
                <form className={styles.form}>
                    <label>
                        Pokedex *
                        <Input
                            placeholder="Número na Dex *"
                            value={number > 0 ? String(number) : ""}
                            onChange={(val) => {
                                const parsed = Number(val);
                                if (isNaN(parsed) || parsed <= 0) {
                                    setNumber(0);
                                } else {
                                    setNumber(parsed);
                                }
                            }}
                        />
                    </label>

                    <label>
                        Nome *
                        <Input
                            placeholder="Nome *"
                            value={name}
                            onChange={setName}
                        />
                    </label>

                    <label>
                        Geração *
                        <Select
                            placeholder={
                                isLoadingGenerations ? "Carregando..." : "Selecione a geração"
                            }
                            value={String(generation)}
                            onChange={(val) => setGeneration(Number(val))}
                            options={
                                generations?.map((gen) => ({
                                    label: `${gen.number} - ${gen.region}`,
                                    value: String(gen.number),
                                })) || []
                            }
                        />
                    </label>

                    <label>
                        Tipo Primário *
                        <Select
                            placeholder="Tipo Primário *"
                            value={primaryType}
                            onChange={(val) => setPrimaryType(val as PokemonType)}
                            options={POKEMON_TYPES
                                .filter((type) => type !== secondaryType)
                                .map((type) => ({
                                    label: type,
                                    value: type,
                                }))}
                        />
                    </label>

                    <label>
                        Tipo Secundário
                        <Select
                            placeholder="Tipo Secundário"
                            value={secondaryType ?? ""}
                            onChange={(val) =>
                                setSecondaryType(
                                    val === "" ? undefined : (val as PokemonType)
                                )
                            }
                            options={POKEMON_TYPES
                                .filter((type) => type !== primaryType)
                                .map((type) => ({
                                    label: type,
                                    value: type,
                                }))}
                        />
                    </label>

                    <label>
                        Imagem
                        <Input
                            placeholder="Url da Imagem"
                            value={imageUrl}
                            onChange={setImageUrl}
                        />
                    </label>

                    <div className={styles.buttons}>
                        <Button mensage="Cancelar" color="red" onClick={onClose} />
                        <Button
                            mensage={isLoading ? "Salvando..." : "Salvar"}
                            color="blue"
                            onClick={handleClickSubmit}
                            disabled={!isFormValid || isLoading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

const POKEMON_TYPES = [
    "NORMAL",
    "FIRE",
    "WATER",
    "ELECTRIC",
    "GRASS",
    "ICE",
    "FIGHTING",
    "POISON",
    "GROUND",
    "FLYING",
    "PSYCHIC",
    "BUG",
    "ROCK",
    "GHOST",
    "DRAGON",
    "DARK",
    "STEEL",
    "FAIRY",
] as const;
