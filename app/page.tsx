"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem('jwt_token');
    
    if (token) {
      // Se estiver autenticado, redirecionar para o dashboard
      router.push('/dashboard');
    } else {
      // Se não estiver autenticado, redirecionar para o login
      router.push('/home');
    }
  }, [router]);
  
  return null; // Não renderiza nada, apenas redireciona
}