"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/services/auth";
import styles from "./main-layout.module.scss";
import Header from "@/app/components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      router.replace("/home");
    }
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();

      localStorage.removeItem("jwt_token");
      queryClient.clear();
      router.replace("/login");
    } catch (error) {
      alert("Não foi possível fazer logout. Tente novamente.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.mainLayout}>
      <Header handleLogout={handleLogout} />

      <main className={styles.content}>{children}</main>
    </div>
  );
}