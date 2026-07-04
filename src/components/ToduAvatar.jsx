'use client';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

// Mapa de emoción hacia el número del input Expressions[cite: 1]
const EMOTION_MAP = {
  idle:      1,
  happy:     2,
  sad:       3,
  scared:    4,
  surprised: 5,
};

// Mapa de mes hacia el número del input Seasonal[cite: 1]
function getSeasonalValue() {
  const month = new Date().getMonth() + 1;
  if (month === 4) return 2; // Easter[cite: 1]
  if (month === 10) return 3; // Halloween[cite: 1]
  if (month === 12) return 4; // Christmas[cite: 1]
  return 1; // Normal[cite: 1]
}

export default function ToduAvatar({ emotion = 'idle', size = 300 }) {
  const { RiveComponent, rive } = useRive({
    src: '/animations/robot.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  });

  // Conexión con el input numérico "Expressions" de tu diseño en Rive[cite: 1]
  const expressionInput = useStateMachineInput(
    rive, 
    'State Machine 1', 
    'Expressions'
  );
  
  // Conexión con el input numérico "Seasonal" de tu diseño en Rive[cite: 1]
  const seasonalInput = useStateMachineInput(
    rive, 
    'State Machine 1', 
    'Seasonal'
  );

  // Efecto para cambiar la expresión del robot cuando la propiedad emotion cambia
  useEffect(() => {
    if (expressionInput) {
      expressionInput.value = EMOTION_MAP[emotion];
    }
  }, [emotion, expressionInput]);

  // Efecto para asignar el accesorio según el mes actual (Ej. Calabaza en octubre)
  useEffect(() => {
    if (seasonalInput) {
      seasonalInput.value = getSeasonalValue();
    }
  }, [seasonalInput]);

  return (
    <div style={{ width: size, height: size }} className="mx-auto flex justify-center items-center">
      <RiveComponent />
    </div>
  );
}