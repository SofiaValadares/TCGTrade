"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/services/auth";
import styles from "./login.module.scss"; 

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.jwt) {
        localStorage.setItem("jwt_token", data.jwt); 
        router.push("/dashboard"); 
      } else {
        alert("Login falhou: Token não recebido.");
      }
    },
    onError: (error) => {
      alert(`Login falhou: ${error.message}`);
    },
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1>Login</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={mutation.isPending} className={styles.loginButton}>
          {mutation.isPending ? "Entrando..." : "Entrar"}
        </button>
        {mutation.isError && (
          <p className={styles.errorMessage}>
            Erro: {mutation.error?.message || "Ocorreu um erro."}
          </p>
        )}
      </form>
    </div>
  );
}