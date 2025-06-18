"use client";

import React, { useState } from 'react';
import style from './home.module.scss';
import SearchBar from "@/app/components/SearchBar/SearchBar";
import ConfirmDialog from "@/app/components/ConfirmDialog/ConfirmDialog";
import Select from "@/app/components/Select";
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import GenerationsList from "@/app/(auth)/home/components/GenerationsList/generationsList";
import { useGenerations } from "@/app/hooks/useGenerations";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import EditFloatingMenu from "@/app/(auth)/home/components/EditFloatingMenu/editFloatingMenu";
import { useDeletePokemon } from "@/app/hooks/useDeletePokemon";
import PokemonFormModal from "@/app/(auth)/home/components/PokemonFormModal/pokemonFormModal";
import { PokemonRecordDto } from "@/app/types/pokemon";

export default function HomePage() {
    const [type, setType] = useState<'name' | 'dex'>('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: deletePokemon, isPending } = useDeletePokemon();

    const { data: generations, isLoading, error } = useGenerations();
    const { data: user } = useCurrentUser();

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pokemonToDelete, setPokemonToDelete] = useState<number | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

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

    const handleSubmitPokemon = (data: PokemonRecordDto) => {
        console.log("Criar Pokémon:", data);
        setIsFormOpen(false);
        // Aqui você pode chamar o hook de criação (useCreatePokemon)
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

    const isAdmin = user?.roles.some(role => role.roleName === 'ROLE_ADMIN');

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
                                        isEditing={isEditing}
                                        onDelete={handleRequestDelete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum Pokémon encontrado.</p>
                        )}
                    </div>
                ) : (
                    generations && <GenerationsList
                        generations={generations}
                        isEditing={isEditing}
                        onDeletePokemon={handleRequestDelete}
                    />
                )}
            </div>

            {isAdmin && (
                <EditFloatingMenu
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onCreatePokemon={() => setIsFormOpen(true)}
                    onCreateGeneration={() => alert("Criar Geração")}
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
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitPokemon}
                />
            )}
        </div>
    );
}
