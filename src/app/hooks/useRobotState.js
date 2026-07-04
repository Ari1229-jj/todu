'use client';
import { useState } from 'react';

export default function useRobotState() {
  // Inicializamos con el estado "idle" que equivale a la animación de espera (1)[cite: 1]
  const [emocionActual, setEmocionActual] = useState('idle');
  const [mensaje, setMensaje] = useState('¡Hola! Estoy listo para ayudarte a organizar tu día.');

  const simularAprobacionTarea = () => {
    // Cambia al estado surprised (5)[cite: 1]
    setEmocionActual('surprised'); 
    setMensaje('Revisando tus pendientes... ¡No te desvíes del objetivo!');
  };

  const simularTareaUrgente = () => {
    // Cambia al estado scared (4)[cite: 1]
    setEmocionActual('scared'); 
    setMensaje('¡Se ha añadido una nueva tarea! Vamos a darle prioridad.');
  };

  const simularTareaCompletada = () => {
    // Cambia al estado happy (2)[cite: 1]
    setEmocionActual('happy'); 
    setMensaje('¡Excelente trabajo! Una tarea menos de la que preocuparse.');
    
    // Regresa a estado normal (idle) después de 3 segundos
    setTimeout(() => {
      setEmocionActual('idle'); 
      setMensaje('¿Cuál será nuestro próximo paso?');
    }, 3000);
  };

  return {
    emocionActual,
    mensaje,
    simularAprobacionTarea,
    simularTareaUrgente,
    simularTareaCompletada,
  };
}