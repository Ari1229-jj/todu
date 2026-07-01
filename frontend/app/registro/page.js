'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, RotateCcw, X } from 'lucide-react';

export default function RegistroPage() {
  // Estados para modales
  const [mostrarTerminos, setMostrarTerminos] = useState(false);
  const [mostrarPrivacidad, setMostrarPrivacidad] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4 relative">
      
      {/* Contenedor móvil principal */}
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 flex flex-col h-[85vh] min-h-[600px] relative overflow-hidden">
        
        {/* Isotipo del Robot Calendario Azul */}
        <div className="w-full flex flex-col items-center text-center mt-2 space-y-3">
          <div className="w-20 h-20 bg-gradient-to-b from-blue-500 to-[#0046b0] rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-blue-200 relative mb-2">
            <div className="absolute -top-1.5 flex space-x-6">
              <div className="w-2.5 h-3 bg-blue-600 rounded-full"></div>
              <div className="w-2.5 h-3 bg-blue-600 rounded-full"></div>
            </div>
            <div className="flex space-x-3 mt-4">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-6 h-1 bg-white bg-opacity-80 rounded-full mt-3"></div>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0046b0] tracking-tight">Todú</h1>
          <p className="text-gray-500 text-xs font-medium px-4 leading-relaxed">
            Únete a Todú para gestionar tus tareas con calma.
          </p>
        </div>

        {/* Formulario */}
        <form className="w-full flex-1 flex flex-col justify-center mt-6 space-y-4">
          
          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm font-medium rounded-xl border border-gray-100 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm font-medium rounded-xl border border-gray-100 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="relative flex items-center">
            <RotateCcw className="absolute left-4 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm font-medium rounded-xl border border-gray-100 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Legales (Modales) */}
          <div className="px-1">
            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              Al hacer clic en "Crear mi cuenta", aceptas nuestros <br />
              <button type="button" onClick={() => setMostrarTerminos(true)} className="text-blue-600 font-bold hover:underline">Términos de Servicio</button> y <button type="button" onClick={() => setMostrarPrivacidad(true)} className="text-blue-600 font-bold hover:underline">Aviso de Privacidad</button>.
            </p>
          </div>

          {/* BOTÓN RE-DISEÑADO (IDÉNTICO A TU IMAGEN) */}
          <div className="pt-4">
            <Link href="/registro/completar" className="block w-full">
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
              >
                Crear mi cuenta
              </button>
            </Link>
          </div>

        </form>

        <div className="text-center pt-4 pb-2">
          <Link href="/login" className="text-[#0046b0] font-bold text-xs hover:underline">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>

      {/* MODAL: TÉRMINOS (Igual al anterior) */}
      {mostrarTerminos && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl flex flex-col max-h-[60vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Términos de Servicio</h2>
              <button onClick={() => setMostrarTerminos(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="overflow-y-auto text-xs text-gray-500 space-y-3 mb-4">
              <p>Bienvenido a Todú. Al registrarte aceptas el uso de la plataforma para fines de productividad personal.</p>
              <p>La gamificación y recompensas visuales son parte de la experiencia de usuario diseñada para reducir la procrastinación.</p>
            </div>
            <button onClick={() => setMostrarTerminos(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm">Aceptar</button>
          </div>
        </div>
      )}

      {/* MODAL: PRIVACIDAD */}
      {mostrarPrivacidad && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl flex flex-col max-h-[60vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Aviso de Privacidad</h2>
              <button onClick={() => setMostrarPrivacidad(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="overflow-y-auto text-xs text-gray-500 mb-4">
              <p>Tus datos son utilizados únicamente para la gestión de tus tareas y el progreso de nivel en el sistema Todú.</p>
            </div>
            <button onClick={() => setMostrarPrivacidad(false)} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl text-sm">Entendido</button>
          </div>
        </div>
      )}

    </div>
  );
}