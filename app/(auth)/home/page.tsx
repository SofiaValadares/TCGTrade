"use client";

import React, { useEffect, useState } from "react";
import style from "./home.module.scss";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import ConfirmDialog from "@/app/components/ConfirmDialog/ConfirmDialog";
import Select from "@/app/components/Select";
import EditFloatingMenu from "@/app/(auth)/home/components/EditFloatingMenu/editFloatingMenu";
import PokemonFormModal from "@/app/(auth)/home/components/PokemonFormModal/pokemonFormModal";
import GenerationFormModal from "@/app/(auth)/home/components/GenerationFormModal/generationFormModal";
import GenerationsList from "@/app/(auth)/home/components/GenerationsList/generationsList";
import PokemonSearchResult from "@/app/(auth)/home/components/PokemonSearchResult/pokemonSearchResult";

import { useGenerations } from "@/app/hooks/useGenerations";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useDeletePokemon } from "@/app/hooks/useDeletePokemon";
import { useCreatePokemon } from "@/app/hooks/useCreatePokemon";
import { useUpdatePokemon } from "@/app/hooks/useUpdatePokemon";
import { useCreateGeneration } from "@/app/hooks/useCreateGeneration";
import { useUpdateGeneration } from "@/app/hooks/useUpdateGeneration";
import { useDeleteGeneration } from "@/app/hooks/useDeleteGeneration";
import { usePokemonPage } from "@/app/hooks/usePokemonPage";
import { usePokemonById } from "@/app/hooks/usePokemonById";

import { PokemonPageRecordDto, PokemonRecordDto } from "@/app/types/pokemon";
import { GenerationRecordDto, GenerationResponseDto } from "@/app/types/generation";

export default function HomePage() {
    const [type, setType] = useState<"name" | "dex">("name");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [isEditing, setIsEditing] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pokemonToDelete, setPokemonToDelete] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [pokemonIdToEdit, setPokemonIdToEdit] = useState<number | null>(null);
    const [isGenerationFormOpen, setIsGenerationFormOpen] = useState(false);
    const [generationToEdit, setGenerationToEdit] = useState<GenerationResponseDto | null>(null);

    const [params, setParams] = useState<PokemonPageRecordDto>({
        page: 0,
        size: 10,
        sort: "number",
        order: "asc",
    });

    const { mutate: deletePokemon } = useDeletePokemon();
    const { mutate: createPokemon } = useCreatePokemon();
    const { mutate: updatePokemon } = useUpdatePokemon();
    const { mutate: createGeneration } = useCreateGeneration();
    const { mutate: updateGeneration } = useUpdateGeneration();
    const { mutate: deleteGeneration } = useDeleteGeneration();

    const { data: generations } = useGenerations();
    const { data: user } = useCurrentUser();
    const { data, isLoading } = usePokemonPage(params);
    const { data: pokemonToEdit } = usePokemonById(pokemonIdToEdit);

    const items = data?.content ?? [];
    const currentPage = data?.number ?? 0;
    const totalPages = data?.totalPages ?? 1;

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const updateParams = (newParams: Partial<PokemonPageRecordDto>) => {
        setParams((prev) => ({
            ...prev,
            ...newParams,
            page: 0,
        }));
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term.trim().toLowerCase());
    };

    useEffect(() => {
        if (searchTerm === "") {
            updateParams({
                name: undefined,
                number: undefined,
                size: 10,
            });
            return;
        }

        if (type === "name") {
            updateParams({
                name: searchTerm,
                number: undefined,
                size: 40,
            });
        } else {
            updateParams({
                name: undefined,
                number: Number(searchTerm),
                size: 40,
            });
        }
    }, [searchTerm, type]);

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
        setPokemonIdToEdit(id);
        setIsFormOpen(true);
    };

    const handleSubmitPokemon = (data: PokemonRecordDto) => {
        if (pokemonIdToEdit) {
            updatePokemon({ id: pokemonIdToEdit, data });
        } else {
            createPokemon(data);
        }
        setIsFormOpen(false);
        setPokemonIdToEdit(null);
    };

    const handleRequestDeleteGeneration = (id: number) => {
        deleteGeneration(id);
    };

    const handleEditGeneration = (id: number) => {
        const found = generations?.find((gen) => gen.idGeneration === id);
        if (found) {
            const generationToSet: GenerationResponseDto = {
                idGeneration: found.idGeneration,
                number: found.number,
                region: found.region,
                dateRegistered: "",
                userRegistered: "",
                dateChanged: "",
                userChanged: "",
            };
            setGenerationToEdit(generationToSet);
            setIsGenerationFormOpen(true);
        }
    };

    const handleSubmitGeneration = (data: GenerationRecordDto) => {
        if (generationToEdit) {
            updateGeneration({ id: generationToEdit.idGeneration, data });
        } else {
            createGeneration(data);
        }
        setIsGenerationFormOpen(false);
        setGenerationToEdit(null);
    };

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
                {searchTerm ? (
                    <PokemonSearchResult
                        pokemons={items}
                        isLoading={isLoading}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setPage={setPage}
                        isEditing={isEditing}
                        onDelete={handleRequestDelete}
                        onEdit={handleEditPokemon}
                    />
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
                        setPokemonIdToEdit(null);
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
                        setPokemonIdToEdit(null);
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
