"use client";

import React from "react";
import style from "./ConfirmDialog.module.scss";

interface ConfirmDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
                                          title,
                                          message,
                                          onConfirm,
                                          onCancel,
                                      }: ConfirmDialogProps) {
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className={style.buttons}>
                    <button onClick={onCancel} className={style.cancel}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className={style.confirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
