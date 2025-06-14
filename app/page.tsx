"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    
    if (token) {
      router.push('/home');
    } else {
      router.push('/home');
    }
  }, [router]);
  
  return null; // Não renderiza nada, apenas redireciona
}