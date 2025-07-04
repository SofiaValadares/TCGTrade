"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { saveUser } from "@/app/services/user";
import styles from "./register.module.scss";
import Header from "@/app/components/Header";
import { IoPersonOutline } from "react-icons/io5";
import Button from "@/app/components/Button";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: saveUser,
        onSuccess: () => {
            alert("Cadastro realizado com sucesso!");
            router.push("/login");
        },
        onError: (error) => {
            alert(`Cadastro falhou: ${error.message}`);
        },
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        mutation.mutate({ name, username, password });
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.registerContainer}>
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <div className={styles.registerTitle}>
                        <IoPersonOutline color="#FFF3E5" size={32}/>
                        <h1>register</h1>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            id="name"
                            type="text"
                            placeholder="nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            id="username"
                            type="text"
                            placeholder="nome de usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            id="password"
                            type="password"
                            placeholder="senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.registerButtonRow}>
                        <Button mensage="REGISTER" color="blue" type="submit" />
                        <Button mensage="LOGIN" color="red" onClick={() => router.push("/login")} />
                    </div>

                    {mutation.isError && (
                        <p className={styles.errorMessage}>
                            Erro: {mutation.error?.message || "Ocorreu um erro."}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
