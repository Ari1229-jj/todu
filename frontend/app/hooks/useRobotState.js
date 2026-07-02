'use client';

import { useState } from 'react';

export default function useRobotState() {
  const [emocionActual, setEmocionActual] = useState('Feliz 🤖');
  const [mensaje, setMensaje] = useState('¡Hola! Estoy listo para ayudarte a organizar tu día.');

  const simularAprobacionTarea = () => {
    setEmocionActual('Atento 🧐');
    setMensaje('Revisando tus pendientes... ¡No te desvíes del objetivo!');
  };

  const simularTareaUrgente = () => {
    setEmocionActual('Alerta ⚡');
    setMensaje('¡Se ha añadido una nueva tarea! Vamos a darle prioridad.');
  };

  const simularTareaCompletada = () => {
    setEmocionActual('Celebrando 🎉');
    setMensaje('¡Excelente trabajo! Una tarea menos de la que preocuparse.');
    
    // Regresa a estado normal después de 3 segundos
    setTimeout(() => {
      setEmocionActual('Feliz 🤖');
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