'use client';

import React, { useEffect, useState } from 'react';
import styles from './generationFormModal.module.scss';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import {
    GenerationRecordDto,
    GenerationResponseDto,
} from '@/app/types/generation';
import { useCheckGenerationNumber } from '@/app/hooks/useCheckGenerationNumber';

interface GenerationFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: GenerationRecordDto) => void;
    initialData?: GenerationResponseDto;
    isLoading?: boolean;
}

export default function GenerationFormModal({
                                                isOpen,
                                                onClose,
                                                onSubmit,
                                                initialData,
                                                isLoading = false,
                                            }: GenerationFormModalProps) {
    const [number, setNumber] = useState<number>(0);
    const [region, setRegion] = useState<string>('');

    const isEdit = !!initialData;
    const originalNumber = initialData?.number;

    const shouldCheckDex = !isEdit || (isEdit && number !== originalNumber);

    const { exists: existsNumber, isChecking } = useCheckGenerationNumber(
        number,
        shouldCheckDex
    );

    useEffect(() => {
        if (initialData) {
            setNumber(initialData.number);
            setRegion(initialData.region);
        } else {
            setNumber(0);
            setRegion('');
        }
    }, [initialData]);

    const handleClickSubmit = () => {
        const payload: GenerationRecordDto = {
            number,
            region,
        };

        onSubmit(payload);
    };

    const isFormValid =
        number > 0 &&
        region.trim() !== '' &&
        (!existsNumber || !shouldCheckDex); // valida duplicado

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{initialData ? 'Editar Geração' : 'Criar Geração'}</h2>

                <form className={styles.form}>
                    <label>
                        Número da Geração *
                        <Input
                            placeholder="Número *"
                            value={number > 0 ? String(number) : ''}
                            onChange={(val) => {
                                const parsed = Number(val);
                                setNumber(isNaN(parsed) ? 0 : parsed);
                            }}
                            error={
                                existsNumber && shouldCheckDex
                                    ? 'Já existe uma geração com esse número.'
                                    : undefined
                            }
                        />
                    </label>

                    <label>
                        Região *
                        <Input
                            placeholder="Região *"
                            value={region}
                            onChange={setRegion}
                        />
                    </label>

                    <div className={styles.buttons}>
                        <Button mensage="Cancelar" color="red" onClick={onClose} />
                        <Button
                            mensage={isLoading ? 'Salvando...' : 'Salvar'}
                            color="blue"
                            onClick={handleClickSubmit}
                            disabled={!isFormValid || isLoading || isChecking}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
