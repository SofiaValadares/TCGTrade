"use client";

import React, { useState } from "react";
import style from "./editFloatingMenu.module.scss";
import { IoPencil, IoClose, IoAdd, IoConstruct, IoTrash } from "react-icons/io5";

interface EditFloatingMenuProps {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    onCreatePokemon: () => void;
    onCreateGeneration: () => void;
}

export default function EditFloatingMenu({
                                             isEditing,
                                             setIsEditing,
                                             onCreatePokemon,
                                             onCreateGeneration,
                                         }: EditFloatingMenuProps) {
    const [openPokemon, setOpenPokemon] = useState(false);
    const [openGeneration, setOpenGeneration] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setOpenPokemon(false);
            setOpenGeneration(false);
        }
    };

    return (
        <div className={style.container}>

            <button
                className={`${style.secondaryButton} ${!isEditing ? style.hidden : ""}`}
                onClick={onCreatePokemon}
            >
                <IoAdd size={20} /> Criar Pokémon
            </button>

            <button
                className={`${style.secondaryButton} ${!isEditing ? style.hidden : ""}`}
                onClick={onCreateGeneration}
            >
                <IoAdd size={20} /> Criar Geração
            </button>

            <button className={style.mainButton} onClick={toggleEdit}>
                {isEditing ? <IoClose size={20} /> : <IoPencil size={20} />}
            </button>
        </div>
    );
}
