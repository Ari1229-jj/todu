'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';

export default function NombreUsuarioPage() {
  // Estado para el input de usuario y la casilla de verificación única
  const [formData, setFormData] = useState({
    username: '',
    aceptaTerminosYPrivacidad: false,
  });

  // Control de estados de los modales emergentes
  const [modalTerminos, setModalTerminos] = useState(false);
  const [modalPrivacidad, setModalPrivacidad] = useState(false);

  // Manejador general de cambios
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.aceptaTerminosYPrivacidad && formData.username.trim().length > 0) {
      console.log('Formulario enviado con éxito:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      
      {/* Contenedor tipo Tarjeta Móvil */}
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-xl p-8 flex flex-col min-h-[600px] relative">
        
        {/* Botón de regreso */}
        <button type="button" className="absolute top-8 left-8 text-gray-800 hover:text-blue-600 transition">
          <ArrowLeft size={24} />
        </button>

        {/* Ilustración geométrica central superior */}
        <div className="flex justify-center mt-12 mb-8 relative">
          <div className="w-32 h-32 bg-blue-50/70 rounded-2xl relative flex items-center justify-center">
            <div className="absolute -top-1 -right-3 w-4 h-4 bg-yellow-400 rounded-xs rotate-12 shadow-xs"></div>
            <div className="absolute bottom-6 -left-6 w-3 h-3 bg-green-400 rounded-full shadow-xs"></div>
          </div>
        </div>

        {/* Textos de cabecera */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-[26px] font-bold text-gray-900 leading-tight px-2">
            ¿Cómo deberíamos llamarte?
          </h1>
          <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">
            Este es un nombre único que puedes cambiar más tarde en cualquier momento.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            {/* Input de Usuario */}
            <div className="relative">
              <div className={`flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 transition-all duration-200
                ${formData.username ? 'ring-2 ring-blue-500 bg-white shadow-xs' : ''}`}>
                <span className="text-gray-400 mr-2 font-medium text-base">@</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="usuario"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-base font-medium outline-none"
                  required
                />
                {formData.username.trim().length > 2 && (
                  <span className="text-emerald-500 flex items-center ml-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* ================= CASILLA ÚNICA DE VALIDACIÓN ================= */}
            <label className="flex items-start gap-3 text-[13px] text-gray-500 leading-snug font-medium cursor-pointer px-1 select-none">
              <input 
                type="checkbox" 
                name="aceptaTerminosYPrivacidad"
                checked={formData.aceptaTerminosYPrivacidad}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-[#0066ff] focus:ring-[#0066ff] cursor-pointer shrink-0 mt-0.5" 
              />
              <span>
                Confirmas que tienes al menos 18 años y que has leído y aceptas nuestros{' '}
                <span 
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setModalTerminos(true);
                  }} 
                  className="text-[#0066ff] font-bold hover:underline"
                >
                  Términos de Servicio
                </span>{' '}
                y{' '}
                <span 
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setModalPrivacidad(true);
                  }} 
                  className="text-[#0066ff] font-bold hover:underline"
                >
                  Aviso de Privacidad
                </span>.
              </span>
            </label>
          </div>

          {/* BOTÓN DINÁMICO INTERACTIVO */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={!formData.aceptaTerminosYPrivacidad}
              className={`w-full font-bold py-4 rounded-2xl shadow-xs transition-all duration-200 text-base
                ${formData.aceptaTerminosYPrivacidad
                  ? 'bg-[#0066ff] hover:bg-[#0052cc] text-white cursor-pointer active:scale-[0.99] shadow-blue-100' 
                  : 'bg-[#e9ecef] text-[#94a3b8] cursor-not-allowed shadow-none'
                }`}
            >
              Comenzar
            </button>
          </div>
        </form>
      </div>

      {/* ================= RECUADRO EMERGENTE: TÉRMINOS Y CONDICIONES ================= */}
      {modalTerminos && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[75vh] overflow-hidden border border-gray-100">
            <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0 border-b border-gray-50">
              <h2 className="text-xl font-bold text-[#0066ff]">Términos y Condiciones de Uso</h2>
              <button onClick={() => setModalTerminos(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X size={22} />
              </button>
            </div>
            {/* Contenedor deslizable (overflow-y-auto) */}
            <div className="px-6 py-4 overflow-y-auto flex-grow text-[14px] text-gray-600 space-y-5 pr-4 leading-relaxed text-justify">
              <div className="space-y-1">
                <p className="font-bold text-gray-900">1. Aceptación de los Términos</p>
                <p>Al crear una cuenta y utilizar la aplicación "Todú" (en adelante, "El Servicio"), usted acepta estar sujeto a los presentes Términos y Condiciones. Si no está de acuerdo con alguna parte de los mismos, no deberá utilizar la aplicación.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">2. Restricción de Edad</p>
                <p>El Servicio está estrictamente dirigido a personas mayores de 18 años. Al crear una cuenta, aceptar estos Términos y Condiciones y utilizar la aplicación, usted declara y garantiza que tiene al menos 18 años de edad y que posee la capacidad legal para celebrar este contrato. Si determinamos que una cuenta pertenece a un menor de edad, nos reservamos el derecho de suspender o eliminar dicha cuenta y todo su historial de datos de forma inmediata y sin previo aviso.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">3. Naturaleza del Servicio</p>
                <p>Todú es una herramienta digital de gestión de tiempo y gamificación diseñada para ayudar a mitigar la procrastinación. El Servicio se proporciona con fines de productividad personal y de ninguna manera sustituye el tratamiento, diagnóstico o asesoramiento médico o psicológico profesional para trastornos de atención, ansiedad u otras condiciones de salud mental.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">4. Propiedad Intelectual</p>
                <p>Todo el contenido, diseño visual, animaciones del avatar interactivo, código fuente, logotipos y mecánicas de evolución (incluyendo la lógica de experiencia e inventario) son propiedad exclusiva de los desarrolladores de Todú. Se otorga al usuario una licencia personal, limitada, no transferible y revocable para utilizar la aplicación estrictamente para fines personales y no comerciales.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">5. Reglas de Uso y Conducta (Fair Use)</p>
                <p>El usuario se compromete a utilizar la aplicación de manera legítima. Queda estrictamente prohibido:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Realizar ingeniería inversa, descompilar o modificar el código del cliente o servidor.</li>
                  <li>Manipular las peticiones de red (API) o explotar vulnerabilidades técnicas con el fin de alterar artificialmente las estadísticas de experiencia (XP), eludir la pérdida del sistema de rachas o desbloquear accesorios del inventario sin cumplir los requisitos de la aplicación.</li>
                </ul>
                <p className="pt-2 font-medium text-red-600">Cualquier violación a esta cláusula resultará en la suspensión o eliminación inmediata y permanente de la cuenta del usuario sin previo aviso.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">6. Limitación de Responsabilidad</p>
                <p>El Servicio se proporciona "tal cual" y "según disponibilidad". El equipo de desarrollo no garantiza que la aplicación esté libre de interrupciones o errores. No nos hacemos responsables por la pérdida temporal o permanente de datos (historial de tareas o rachas) ocasionada por fallas en la infraestructura de la nube, mantenimientos del servidor o problemas de conectividad en el dispositivo del usuario.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button 
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, aceptaTerminosYPrivacidad: true }));
                  setModalTerminos(false);
                }} 
                className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RECUADRO EMERGENTE: AVISO DE PRIVACIDAD ================= */}
      {modalPrivacidad && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[75vh] overflow-hidden border border-gray-100">
            <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0 border-b border-gray-50">
              <h2 className="text-xl font-bold text-[#0066ff]">Aviso de Privacidad de Todú</h2>
              <button onClick={() => setModalPrivacidad(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X size={22} />
              </button>
            </div>
            {/* Contenedor deslizable (overflow-y-auto) */}
            <div className="px-6 py-4 overflow-y-auto flex-grow text-[14px] text-gray-600 space-y-5 pr-4 leading-relaxed text-justify">
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Identidad del Responsable</p>
                <p>El equipo de desarrollo de "Todú" (en adelante, "El Responsable"), con sede en Chiapas, México, en el marco de sus actividades académicas y de desarrollo de software, es responsable del uso y protección de sus datos personales, en estricto apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Datos Personales que Recabamos</p>
                <p>Para llevar a cabo las finalidades descritas en el presente aviso, recabaremos los siguientes datos personales:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-gray-800">Datos de identificación y contacto:</strong> Nombre de usuario y correo electrónico.</li>
                  <li><strong className="text-gray-800">Datos de uso y comportamiento:</strong> Historial de creación, cumplimiento y vencimiento de tareas, así como el progreso de experiencia (XP) y rachas dentro de la aplicación.</li>
                  <li><strong className="text-gray-800">Datos de ubicación (Geolocalización):</strong> Coordenadas de latitud y longitud, las cuales se obtienen única y exclusivamente con su consentimiento expreso y explícito en el momento de uso.</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Tratamiento de Datos de Menores de Edad</p>
                <p>Todú no está diseñado para, ni dirigido a, menores de 18 años. Por lo tanto, no recabamos, procesamos ni almacenamos intencionalmente datos personales ni de geolocalización de menores de edad. Si usted es padre, madre o tutor legal y tiene conocimiento de que un menor a su cargo nos ha proporcionado información personal, le solicitamos que nos contacte para proceder con la eliminación definitiva de dichos datos de nuestros servidores.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Finalidades del Tratamiento de Datos</p>
                <p>Los datos personales que recabamos tienen como finalidad principal:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Crear y gestionar su perfil de usuario dentro del sistema.</li>
                  <li>Alimentar el algoritmo de la máquina de estados que controla las animaciones, nivel de evolución y estado emocional del avatar virtual.</li>
                  <li>Sugerir puntos de interés y zonas de descanso al finalizar la jornada, mediante el uso de interfaces de programación (APIs) de terceros.</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Cláusula Especial sobre Geolocalización</p>
                <p>La información de geolocalización es procesada de manera efímera. Esto significa que las coordenadas se utilizan momentáneamente para realizar la consulta de lugares recomendados y no se almacenan en nuestras bases de datos, garantizando su privacidad y seguridad espacial.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Derechos ARCO y Revocación de Consentimiento</p>
                <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al tratamiento de sus datos personales. Podrá ejercer estos derechos, así como eliminar permanentemente su cuenta y el historial de tareas, directamente desde la sección "Ajustes de Perfil" dentro de la aplicación.</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button 
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, aceptaTerminosYPrivacidad: true }));
                  setModalPrivacidad(false);
                }} 
                className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}