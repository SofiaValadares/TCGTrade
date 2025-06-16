"use client";

import React, {useState} from 'react';
import style from './home.module.scss'
import SearchBar from "@/app/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import Select from "@/app/components/Select";

export default function HomePage() {
    const [type, setType] = useState('name');

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
            <SearchBar placeholder={"Pesquisar pokémon..."} onSearch={() => console.log("Search")} />
            <Button mensage="ADICIONAR POKEMON" color="blue" onClick={() => console.log("POKEMON")}/>
        </div>

    </div>
  );

} 