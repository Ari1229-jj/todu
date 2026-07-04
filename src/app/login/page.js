'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
// 1. Importamos nuestro ViewModel
import { useLogin } from '../hooks/useLogin'; 

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // 2. Extraemos la lógica de nuestro hook
  const { 
    correo, setCorreo, 
    password, setPassword, 
    loading, error, handleLogin 
  } = useLogin();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0046b0] mb-2">Todú</h1>
          <p className="text-gray-600 text-sm">Ingresa a tu cuenta para continuar</p>
        </div>

        {/* 3. Conectamos el formulario a la función handleLogin */}
        <form className="space-y-6" onSubmit={handleLogin}>
          
          {/* Mostrar mensaje de error si el backend lo rechaza */}
          {error && (
            <div className="p-3 bg-red-100 text-red-600 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              // 4. Enlazamos el input al estado
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent text-gray-800"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input 
              type={showPassword ? "text" : "password"} 
              // 5. Enlazamos la contraseña al estado
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent text-gray-800"
              placeholder="••••••••"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0046b0] focus:ring-[#0046b0]" />
              <span>Recordarme</span>
            </label>
            <a href="#" className="text-[#0046b0] hover:underline font-medium">¿Olvidaste tu contraseña?</a>
          </div>

          <button 
            type="submit"
            disabled={loading} // 6. Desactivamos el botón si está cargando
            className={`w-full text-white font-bold py-3 rounded-lg shadow-md transition-all mt-2 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0046b0] hover:bg-[#00368a]'}`}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link href="/registro" className="text-[#0046b0] font-medium hover:underline text-sm">
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}