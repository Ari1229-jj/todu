'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4">
      {/* Contenedor con aspecto de dispositivo móvil */}
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 flex flex-col justify-between items-center h-[85vh] min-h-[580px]">
        
        {/* Sección Superior: Logo e Isotipo */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          {/* Isotipo del Robot Azul Estilizado */}
          <div className="w-20 h-20 bg-gradient-to-b from-blue-500 to-[#0046b0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 relative mb-2">
            {/* Antena */}
            <div className="absolute -top-2 w-1.5 h-3 bg-blue-500 rounded-full"></div>
            <div className="absolute -top-3 w-3 h-1.5 bg-blue-400 rounded-full"></div>
            {/* Ojos y boca del robot */}
            <div className="flex space-x-3">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="absolute bottom-4 w-6 h-1.5 bg-white rounded-full"></div>
          </div>

          {/* Logotipo y Eslogan */}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Todú</h1>
          <p className="text-gray-500 text-sm font-medium tracking-wide">
            Dale vida a tu productividad
          </p>
        </div>

        {/* Sección Central: Botones de Acción */}
        <div className="w-full space-y-3.5 mb-8">
          {/* Botón: Continuar con Google */}
          <button 
            onClick={() => alert('Autenticación con Google en desarrollo')}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm py-3.5 px-4 rounded-xl border border-gray-200 shadow-sm transition duration-200"
          >
            {/* Icono de Google simulado con SVG plano */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.95 11.95 0 0 0 12 .09c-4.427 0-8.29 2.382-10.427 5.927l3.693 3.748z"
              />
              <path
                fill="#4285F4"
                d="M23.755 12.23c0-.836-.073-1.64-.209-2.414H12v4.57h6.6c-.287 1.505-1.137 2.782-2.41 3.636v3.023h3.89c2.277-2.095 3.596-5.186 3.596-8.814z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 14.235A7.014 7.014 0 0 1 4.909 12c0-.79.132-1.55.357-2.265L1.573 5.986A11.957 11.957 0 0 0 0 12c0 2.155.573 4.177 1.573 5.936l3.693-3.701z"
              />
              <path
                fill="#34A853"
                d="M12 23.91c3.24 0 5.955-1.073 7.94-2.914l-3.89-3.023a7.09 7.09 0 0 1-4.05 1.136c-3.646 0-6.732-2.463-7.832-5.777L1.573 17.936A11.955 11.955 0 0 0 12 23.91z"
              />
            </svg>
            Continuar con Google
          </button>

          {/* Botón: Continuar con Correo */}
          <Link href="/registro" className="block w-full">
            <button className="w-full flex items-center justify-center gap-3 bg-[#0046b0] hover:bg-blue-700 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-md shadow-blue-100 transition duration-200">
              <Mail size={18} />
              Continuar con correo
            </button>
          </Link>
        </div>

        {/* Sección Inferior: Conmutador de Cuenta */}
        <div className="text-xs font-medium text-gray-500 tracking-wide pb-2">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-[#0046b0] font-bold hover:underline transition">
            Iniciar sesión
          </Link>
        </div>

      </div>
    </div>
  );
}