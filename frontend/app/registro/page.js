'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, X } from 'lucide-react';

export default function RegistroPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Estados del Formulario
  const [nombres, setNombres] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para Checkbox Legales
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);

  // Estados de Alerta y Feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [cargando, setCargando] = useState(false);

  // Estados independientes para cada recuadro (Modal)
  const [modalTerminos, setModalTerminos] = useState(false);
  const [modalPrivacidad, setModalPrivacidad] = useState(false);

  // Función para procesar el envío del registro al API Gateway
  const manejarRegistro = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validación de casillas obligatorias antes de disparar peticiones
    if (!aceptaTerminos || !aceptaPrivacidad) {
      setErrorMsg('Debes aceptar los Términos y el Aviso de Privacidad para continuar.');
      return;
    }

    setCargando(true);

    // Unificamos el formato para cumplir con la propiedad "nombre" esperada por user-service
    const nombreCompleto = `${nombres.trim()} ${apellidoP.trim()} ${apellidoM.trim()}`.trim();

    try {
      const res = await fetch(`${API_URL}/auth/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreCompleto,
          email: email,
          password: password,
          fechaNacimiento: fechaNacimiento // Se envía opcional por si el microservicio lo almacena
        }),
      });

      const datos = await res.json();

      if (!res.ok) {
        // Mapea los mensajes de error documentados (409 Email registrado, 400 datos faltantes)
        throw new Error(datos.mensaje || 'Ocurrió un error al procesar el registro.');
      }

      setSuccessMsg('¡Usuario registrado con éxito! Redirigiendo al login...');
      
      // Limpiamos el formulario
      setNombres('');
      setApellidoP('');
      setApellidoM('');
      setFechaNacimiento('');
      setEmail('');
      setPassword('');

      // Redirigir al login tras 2 segundos para que lea el mensaje de éxito
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans relative">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8 my-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0046b0] mb-2">Todú</h1>
          <p className="text-gray-600 text-sm">Crea tu cuenta para comenzar.</p>
        </div>

        {/* Alertas de Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 text-xs bg-green-50 text-green-600 border border-green-200 rounded-xl font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={manejarRegistro} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre(s)</label>
            <input 
              type="text" 
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent text-gray-800 text-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido Paterno</label>
            <input 
              type="text" 
              value={apellidoP}
              onChange={(e) => setApellidoP(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent text-gray-800 text-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido Materno</label>
            <input 
              type="text" 
              value={apellidoM}
              onChange={(e) => setApellidoM(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent text-gray-800 text-sm" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Nacimiento</label>
            <input 
              type="date" 
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors text-gray-600 bg-transparent text-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent text-gray-800 text-sm" 
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-200 focus:border-[#0046b0] outline-none py-2 transition-colors bg-transparent text-gray-800 text-sm" 
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#0046b0] focus:ring-[#0046b0]" 
              />
              <span>
                Acepto los{' '}
                <span 
                  onClick={(e) => {
                    e.preventDefault(); 
                    setModalTerminos(true);
                  }} 
                  className="underline text-[#0046b0] font-medium hover:text-[#00368a]"
                >
                  Términos y Condiciones
                </span>
              </span>
            </label>
            
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={aceptaPrivacidad}
                onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#0046b0] focus:ring-[#0046b0]" 
              />
              <span>
                He leído el{' '}
                <span 
                  onClick={(e) => {
                    e.preventDefault(); 
                    setModalPrivacidad(true);
                  }} 
                  className="underline text-[#0046b0] font-medium hover:text-[#00368a]"
                >
                  Aviso de Privacidad
                </span>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-[#0046b0] hover:bg-[#00368a] text-white font-bold py-3 rounded-lg shadow-md transition-all mt-4 disabled:opacity-50"
          >
            {cargando ? 'Registrando cuenta...' : 'Crear mi cuenta'}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link href="/login" className="text-[#0046b0] font-medium hover:underline text-sm">
            Ya tengo cuenta. Iniciar sesión
          </Link>
        </div>
      </div>

      {/* ================= RECUADRO EMERGENTE: TÉRMINOS Y CONDICIONES ================= */}
      {modalTerminos && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[75vh] overflow-hidden border border-gray-100">
            <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-xl font-bold text-[#0046b0]">Términos y Condiciones</h2>
              <button onClick={() => setModalTerminos(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="px-6 pb-6 overflow-y-auto flex-grow text-[14px] text-gray-600 space-y-5 pr-4 leading-relaxed text-justify">
              <h3 className="font-bold text-gray-800 text-base">Términos y Condiciones de Uso</h3>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">1. Aceptación de los Términos</p>
                <p>Al crear una cuenta y utilizar la aplicación "Todú" (en adelante, "El Servicio"), usted acepta estar sujeto a los presentes Términos y Condiciones. Si no está de acuerdo con alguna parte de los mismos, no deberá utilizar la aplicación.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">2. Restricción de Edad</p>
                <p>El Servicio está estrictamente dirigido a personas mayores de 18 años. Al crear una cuenta, aceptar estos Términos y Condiciones y utilizar la aplicación, usted declara y garantiza que tiene al menos 18 años de edad y que posee la capacidad legal para celebrar este contrato.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">3. Naturaleza del Servicio</p>
                <p>Todú es una herramienta digital de gestión de tiempo y gamificación diseñada para ayudar a mitigar la procrastinación. El Servicio se proporciona con fines de productividad personal.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">4. Propiedad Intelectual</p>
                <p>Todo el contenido, diseño visual, animaciones del avatar interactivo, código fuente y logotipos son propiedad exclusiva de los desarrolladores de Todú.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">5. Reglas de Uso y Conducta (Fair Use)</p>
                <p>Queda estrictamente prohibido realizar ingeniería inversa o manipular las peticiones de red (API) con el fin de alterar artificialmente las estadísticas de experiencia (XP) o el sistema de rachas.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button onClick={() => { setAceptaTerminos(true); setModalTerminos(false); }} className="bg-[#0046b0] hover:bg-[#00368a] text-white font-semibold py-2 px-5 rounded-xl text-sm transition-all shadow-xs">
                Aceptar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RECUADRO EMERGENTE: AVISO DE PRIVACIDAD ================= */}
      {modalPrivacidad && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[75vh] overflow-hidden border border-gray-100">
            <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-xl font-bold text-[#0046b0]">Aviso de Privacidad</h2>
              <button onClick={() => setModalPrivacidad(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="px-6 pb-6 overflow-y-auto flex-grow text-[14px] text-gray-600 space-y-5 pr-4 leading-relaxed text-justify">
              <h3 className="font-bold text-gray-800 text-base">Aviso de Privacidad Simplificado</h3>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Identidad del Responsable</p>
                <p>El equipo de desarrollo de "Todú", con sede en Chiapas, México, es responsable del uso y protección de sus datos personales, en estricto apego a la LFPDPPP.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Datos Personales que Recabamos</p>
                <p>Recabaremos datos de identificación (nombre y correo), datos de comportamiento de tareas (XP y rachas), y datos de geolocalización efímera bajo su explícito consentimiento.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Finalidades del Tratamiento</p>
                <p>Gestionar su perfil de usuario, alimentar las animaciones emocionales del avatar virtual y sugerir puntos de interés cercanos.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button onClick={() => { setAceptaPrivacidad(true); setModalPrivacidad(false); }} className="bg-[#0046b0] hover:bg-[#00368a] text-white font-semibold py-2 px-5 rounded-xl text-sm transition-all shadow-xs">
                Entendido y Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}