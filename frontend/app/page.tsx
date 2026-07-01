'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Cuando alguien entra a http://localhost:3000/, lo manda directo al login
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
      Cargando Todú...
    </div>
  );
}
