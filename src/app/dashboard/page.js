'use client';
// Importamos el componente visual y el hook lógico
import ToduAvatar from '../../components/ToduAvatar';
import useRobotState from '../hooks/useRobotState';

export default function DashboardPage() {
  // Extraemos las funciones y variables del cerebro del robot
  const { 
    emocionActual, 
    mensaje, 
    simularAprobacionTarea, 
    simularTareaUrgente, 
    simularTareaCompletada 
  } = useRobotState();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      <h1 className="text-3xl font-bold text-[#0046b0] mb-8">Panel de Control Todú</h1>

      {/* 1. Aquí renderizamos tu mascota y le pasamos la emoción actual */}
      <ToduAvatar emotion={emocionActual} size={350} />

      {/* 2. El globo de texto de la mascota */}
      <div className="mt-6 bg-white border-2 border-gray-200 p-4 rounded-2xl shadow-md max-w-md text-center">
        <p className="text-lg font-medium text-gray-700">{mensaje}</p>
      </div>

      {/* 3. Botones de prueba para forzar los cambios de estado */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <button 
          onClick={simularAprobacionTarea} 
          className="px-6 py-2 bg-purple-500 text-white font-bold rounded-lg shadow hover:bg-purple-600 transition-colors"
        >
          🎁 Simular Nivel Up (Sorpresa)
        </button>
        
        <button 
          onClick={simularTareaUrgente} 
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition-colors"
        >
          ⚠️ Tarea Urgente (Susto)
        </button>
        
        <button 
          onClick={simularTareaCompletada} 
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 transition-colors"
        >
          ✅ Completar Tarea (Feliz)
        </button>
      </div>
    </div>
  );
}