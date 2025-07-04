"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/services/auth";
import styles from "./login.module.scss";
import Header from "@/app/components/Header";
import { IoPersonOutline } from "react-icons/io5";
import Button from "@/app/components/Button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.jwt) {
        localStorage.setItem("jwt_token", data.jwt); 
        router.push("/home");
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
    <div className={styles.container}>
      <Header />
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.loginTitle}>
            <IoPersonOutline color="#FFF3E5" size={32} />
            <h1>login</h1>
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

          <div className={styles.loginButtonRow}>
            <Button mensage="LOGIN" color="blue" type="submit" />
            <Button mensage="CADASTRO" color="red" onClick={() => router.push("/register")} />
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