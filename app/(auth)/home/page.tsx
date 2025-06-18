"use client";

import React, { useState } from "react";
import style from "./home.module.scss";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import ConfirmDialog from "@/app/components/ConfirmDialog/ConfirmDialog";
import Select from "@/app/components/Select";
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import GenerationsList from "@/app/(auth)/home/components/GenerationsList/generationsList";
import EditFloatingMenu from "@/app/(auth)/home/components/EditFloatingMenu/editFloatingMenu";
import PokemonFormModal from "@/app/(auth)/home/components/PokemonFormModal/pokemonFormModal";
import GenerationFormModal from "@/app/(auth)/home/components/GenerationFormModal/generationFormModal";

import { useGenerations } from "@/app/hooks/useGenerations";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useDeletePokemon } from "@/app/hooks/useDeletePokemon";
import { useCreatePokemon } from "@/app/hooks/useCreatePokemon";
import { useUpdatePokemon } from "@/app/hooks/useUpdatePokemon";
import { useCreateGeneration } from "@/app/hooks/useCreateGeneration";
import { useUpdateGeneration } from "@/app/hooks/useUpdateGeneration";
import { useDeleteGeneration } from "@/app/hooks/useDeleteGeneration";

import {
    PokemonRecordDto,
    PokemonResponseDto,
} from "@/app/types/pokemon";
import {
    GenerationRecordDto,
    GenerationResponseDto,
} from "@/app/types/generation";


export default function HomePage() {
    const [type, setType] = useState<"name" | "dex">("name");
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const { mutate: deletePokemon } = useDeletePokemon();
    const { mutate: createPokemon } = useCreatePokemon();
    const { mutate: updatePokemon } = useUpdatePokemon();

    const { mutate: createGeneration } = useCreateGeneration();
    const { mutate: updateGeneration } = useUpdateGeneration();
    const { mutate: deleteGeneration } = useDeleteGeneration();

    const { data: generations, isLoading, error } = useGenerations();
    const { data: user } = useCurrentUser();

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pokemonToDelete, setPokemonToDelete] = useState<number | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [pokemonToEdit, setPokemonToEdit] = useState<PokemonResponseDto | null>(null);

    const [isGenerationFormOpen, setIsGenerationFormOpen] = useState(false);
    const [generationToEdit, setGenerationToEdit] = useState<GenerationResponseDto | null>(null);

    const handleSearch = (term: string) => {
        setSearchTerm(term.trim().toLowerCase());
    };

    const handleRequestDelete = (id: number) => {
        setPokemonToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (pokemonToDelete !== null) {
            deletePokemon(pokemonToDelete);
        }
        setIsConfirmOpen(false);
        setPokemonToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
        setPokemonToDelete(null);
    };

    const handleEditPokemon = (id: number) => {
        const found = allPokemons.find((p) => p.idPokemon === id);
        if (found) {
            setPokemonToEdit(found);
            setIsFormOpen(true);
        }
    };

    const handleSubmitPokemon = (data: PokemonRecordDto) => {
        if (pokemonToEdit) {
            updatePokemon(
                { id: pokemonToEdit.idPokemon, data },
                {
                    onSuccess: () => {
                        setIsFormOpen(false);
                        setPokemonToEdit(null);
                    },
                }
            );
        } else {
            createPokemon(data, {
                onSuccess: () => {
                    setIsFormOpen(false);
                },
            });
        }
    };

    const handleRequestDeleteGeneration = (id: number) => {
        deleteGeneration(id);
    };

    const handleEditGeneration = (id: number) => {
        const found = generations?.find(gen => gen.idGeneration === id);

        if (found) {
            const generationToSet: GenerationResponseDto = {
                idGeneration: found.idGeneration,
                number: found.number,
                region: found.region,
                dateRegistered: '',
                userRegistered: '',
                dateChanged: '',
                userChanged: ''
            };

            setGenerationToEdit(generationToSet);
            setIsGenerationFormOpen(true);
        } else {
            console.error("Geração não encontrada para o ID:", id);
        }
    };



    const handleSubmitGeneration = (data: GenerationRecordDto) => {
        if (generationToEdit) {
            updateGeneration(
                { id: generationToEdit.idGeneration, data },
                {
                    onSuccess: () => {
                        setIsGenerationFormOpen(false);
                        setGenerationToEdit(null);
                    },
                }
            );
        } else {
            createGeneration(data, {
                onSuccess: () => {
                    setIsGenerationFormOpen(false);
                },
            });
        }
    };

    const allPokemons = generations?.flatMap((gen) => gen.pokemons) || [];

    const filteredPokemons = allPokemons.filter((pokemon) => {
        if (searchTerm === "") return true;
        if (type === "name") {
            return pokemon.name.toLowerCase().includes(searchTerm);
        } else {
            return pokemon.number.toString().includes(searchTerm);
        }
    });

    const isAdmin = user?.roles.some((role) => role.roleName === "ROLE_ADMIN");

    return (
        <div>
            <div className={style.searchSection}>
                <Select
                    value={type}
                    onChange={(val) => setType(val as "name" | "dex")}
                    options={[
                        { label: "Nome", value: "name" },
                        { label: "Dex", value: "dex" },
                    ]}
                    placeholder="Tipo de busca"
                />
                <SearchBar
                    placeholder={"Pesquisar pokémon..."}
                    onSearch={handleSearch}
                />
            </div>

            <div>
                {isLoading && <p>Carregando gerações...</p>}
                {error && <p>Erro ao carregar gerações</p>}

                {searchTerm ? (
                    <div className={style.generationSection}>
                        {filteredPokemons.length > 0 ? (
                            <div className={style.pokemonSection}>
                                {filteredPokemons.map((pokemon) => (
                                    <PokemonCard
                                        key={pokemon.idPokemon}
                                        pokemon={pokemon}
                                        isEditing={isEditing}
                                        onDelete={handleRequestDelete}
                                        onEdit={handleEditPokemon}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum Pokémon encontrado.</p>
                        )}
                    </div>
                ) : (
                    generations && (
                        <GenerationsList
                            generations={generations}
                            isEditing={isEditing}
                            onDeletePokemon={handleRequestDelete}
                            onEditPokemon={handleEditPokemon}
                            onDeleteGeneration={handleRequestDeleteGeneration}
                            onEditGeneration={handleEditGeneration}
                        />
                    )
                )}
            </div>

            {isAdmin && (
                <EditFloatingMenu
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onCreatePokemon={() => {
                        setPokemonToEdit(null);
                        setIsFormOpen(true);
                    }}
                    onCreateGeneration={() => {
                        setGenerationToEdit(null);
                        setIsGenerationFormOpen(true);
                    }}
                />
            )}

            {isConfirmOpen && (
                <ConfirmDialog
                    title="Confirmar Remoção"
                    message="Deseja realmente remover este Pokémon?"
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}

            {isFormOpen && (
                <PokemonFormModal
                    isOpen={isFormOpen}
                    onClose={() => {
                        setIsFormOpen(false);
                        setPokemonToEdit(null);
                    }}
                    onSubmit={handleSubmitPokemon}
                    initialData={pokemonToEdit ?? undefined}
                />
            )}

            {isGenerationFormOpen && (
                <GenerationFormModal
                    isOpen={isGenerationFormOpen}
                    onClose={() => {
                        setIsGenerationFormOpen(false);
                        setGenerationToEdit(null);
                    }}
                    onSubmit={handleSubmitGeneration}
                    initialData={generationToEdit ?? undefined}
                />
            )}
        </div>
    );
}
