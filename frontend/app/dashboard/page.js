'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Trash2, Edit3, Plus, CheckCircle, Circle, X, Save, LogOut, Award } from 'lucide-react';

// Carga dinámica segura de Rive (Despliegue Mobile-First del lado del cliente)
const Rive = dynamic(
  () => import('@rive-app/react-canvas').then((mod) => mod.default || mod),
  { ssr: false }
);

export default function DashboardPage() {
  // URLs base del API Gateway tomadas del entorno
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Estados de control de datos
  const [tareas, setTareas] = useState([]);
  const [progreso, setProgreso] = useState({ nivel: 1, xpActual: 0, progresoPorcentaje: 0 });
  const [robotEmotion, setRobotEmotion] = useState('happy');
  const [robotMensaje, setRobotMensaje] = useState('¡Conectado al API Gateway! Listo para trabajar.');

  // Estados de formularios locales
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  // 1. Cargar datos iniciales del API Gateway de forma sincronizada
  useEffect(() => {
    const token = localStorage.getItem('todu_token');
    const userJson = localStorage.getItem('todu_user');
    
    if (!token || !userJson) {
      window.location.href = '/login';
      return;
    }

    const usuario = JSON.parse(userJson);
    fetchMisTareas(token);
    fetchProgresoYRobot(usuario.id, token);
  }, []);

  // 2. GET /tareas/mis-tareas
  const fetchMisTareas = async (token) => {
    try {
      const res = await fetch(`${API_URL}/tareas/mis-tareas`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const datos = await res.json();
        setTareas(datos);
      }
    } catch (err) {
      console.error('Error al traer tareas:', err);
    }
  };

  // 3. GET /gamificacion/progreso/:userId  y  GET /robot/estado/:userId
  const fetchProgresoYRobot = async (userId, token) => {
    try {
      // Progreso de gamificación
      const resGam = await fetch(`${API_URL}/gamificacion/progreso/${userId}`);
      if (resGam.ok) {
        const datosGam = await resGam.json();
        setProgreso(datosGam);
      }

      // Estado emocional del robot
      const resRob = await fetch(`${API_URL}/robot/estado/${userId}`);
      if (resRob.ok) {
        const datosRob = await resRob.json();
        setRobotEmotion(datosRob.emotion);
        actualizarMensajeMascota(datosRob.emotion);
      }
    } catch (err) {
      console.error('Error al sincronizar servicios secundarios:', err);
    }
  };

  const actualizarMensajeMascota = (emocion) => {
    const mensajes = {
      happy: '¡Excelente ritmo de trabajo! Sigue así. 😊',
      evolved: '¡Wow! Subimos de nivel, ¡somos imparables! ✨',
      excited: '¡Menuda racha llevas hoy! 🎉',
      worried: 'Hay tareas acumulándose, ¡organicémonos mejor! 😟',
      sleepy: 'Un poco de inactividad por aquí... ¿Hacemos algo? 😴'
    };
    setRobotMensaje(mensajes[emocion] || 'Estoy listo para ayudarte.');
  };

  // 4. POST /tareas (Creación de pendientes)
  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    const token = localStorage.getItem('todu_token');
    try {
      const res = await fetch(`${API_URL}/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: nuevoTitulo,
          descripcion: nuevaDesc || 'Sin descripción',
          xpValor: 30
        })
      });

      if (res.ok) {
        setNuevoTitulo('');
        setNuevaDesc('');
        fetchMisTareas(token);
        // Disparar evento de alerta de forma local
        setRobotEmotion('worried');
        setRobotMensaje('Nueva tarea asignada. ¡A por ella!');
      }
    } catch (err) {
      console.error('Error creando tarea:', err);
    }
  };

  // 5. PUT /tareas/:id (Alternar estado de completada / pendiente)
  const alternarEstadoTarea = async (id, estadoActual) => {
    const token = localStorage.getItem('todu_token');
    const nuevoEstado = estadoActual === 'completed' ? 'pending' : 'completed';

    try {
      const res = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (res.ok) {
        fetchMisTareas(token);
        const user = JSON.parse(localStorage.getItem('todu_user'));
        fetchProgresoYRobot(user.id, token);
      }
    } catch (err) {
      console.error('Error actualizando estado:', err);
    }
  };

  // 6. DELETE /tareas/:id
  const eliminarTarea = async (id) => {
    const token = localStorage.getItem('todu_token');
    try {
      const res = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchMisTareas(token);
    } catch (err) {
      console.error('Error eliminando tarea:', err);
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Contador dinámico basado en especificación
  const pendientes = tareas.filter(t => t.estado !== 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar Superior */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#0046b0] tracking-tight">Todú</h1>
          <span className="text-xs bg-blue-50 text-[#0046b0] px-2 py-0.5 rounded-md font-bold border border-blue-200">
            Nivel {progreso.nivel}
          </span>
        </div>
        <button onClick={cerrarSesion} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition text-sm font-medium">
          <LogOut size={18} />
          Salir
        </button>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Banner de Estado con Gamificación Real */}
        <div className="bg-[#0046b0] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 text-center md:text-left flex-1 w-full">
            <h2 className="text-2xl font-extrabold tracking-tight">Mis pendientes ({pendientes})</h2>
            
            {/* Barra de Progreso de Experiencia (XP) */}
            <div className="w-full bg-blue-900 bg-opacity-40 rounded-full h-3 mt-2 overflow-hidden border border-blue-700">
              <div 
                className="bg-green-400 h-full transition-all duration-500 rounded-full" 
                style={{ width: `${progreso.progresoPorcentaje}%` }}
              ></div>
            </div>
            <p className="text-xs text-blue-200 font-medium">
              XP Actual: {progreso.xpActual} puntos • {progreso.progresoPorcentaje}% para nivel siguiente
            </p>

            {/* Globo de texto de Todú Bot */}
            <div className="mt-3 bg-white text-gray-800 text-xs font-medium px-4 py-3 rounded-2xl shadow-md inline-block max-w-xs relative text-left">
              <span className="font-bold text-[#0046b0] block mb-0.5">Mascota ({robotEmotion}):</span>
              "{robotMensaje}"
            </div>
          </div>

          {/* Renderizado Seguro del Robot Animado de Rive */}
          <div className="relative z-10 w-[150px] h-[150px] shrink-0">
            <Rive
              src="/animations/robot.riv"
              stateMachines={["RobotStateMachine"]}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Formulario para Añadir Tareas de Acuerdo al API Spec */}
        <form onSubmit={agregarTarea} className="flex flex-col gap-2 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex gap-2">
            <input
              type="text"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              placeholder="¿Qué vas a lograr hoy? (Título de la tarea)..."
              className="flex-1 px-3 py-2 text-sm bg-gray-50 rounded-xl outline-none text-gray-700 border border-gray-200 focus:border-[#0046b0]"
              required
            />
            <button type="submit" className="bg-[#0046b0] hover:bg-blue-700 text-white p-3 rounded-xl transition flex items-center justify-center shrink-0">
              <Plus size={20} />
            </button>
          </div>
          <input
            type="text"
            value={nuevaDesc}
            onChange={(e) => setNuevaDesc(e.target.value)}
            placeholder="Añade una descripción opcional (ej. Ir al súper)"
            className="px-3 py-1.5 text-xs bg-transparent outline-none text-gray-500 placeholder-gray-400"
          />
        </form>

        {/* Lista de Tareas Enlazada al Servicio de Tareas */}
        <div className="space-y-3">
          {tareas.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">No se encontraron registros de tareas pendientes en el servidor.</p>
          ) : (
            tareas.map((tarea) => (
              <div 
                key={tarea.id}
                className={`flex items-center justify-between p-4 rounded-2xl border bg-white transition duration-200 shadow-sm ${
                  tarea.estado === 'completed' ? 'border-gray-100 opacity-60' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Botón Checkbox de estado */}
                  <button 
                    onClick={() => alternarEstadoTarea(tarea.id, tarea.estado)}
                    className={`shrink-0 transition ${tarea.estado === 'completed' ? 'text-green-500' : 'text-gray-400 hover:text-[#0046b0]'}`}
                  >
                    {tarea.estado === 'completed' ? <CheckCircle size={22} className="fill-green-50" /> : <Circle size={22} />}
                  </button>

                  <div className="flex flex-col min-w-0">
                    <span className={`text-sm font-bold text-gray-800 truncate ${tarea.estado === 'completed' ? 'line-through text-gray-400' : ''}`}>
                      {tarea.titulo}
                    </span>
                    <span className="text-xs text-gray-400 truncate">
                      {tarea.descripcion} • <strong className="text-blue-600">+{tarea.xpValor} XP</strong>
                    </span>
                  </div>
                </div>

                {/* Acciones del CRUD */}
                <div className="flex items-center gap-1 ml-4 shrink-0">
                  <button onClick={() => eliminarTarea(tarea.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}