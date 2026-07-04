import { useState } from 'react';

export const useLogin = () => {
  // Estados para guardar la información
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función que se dispara al darle al botón "Ingresar"
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setLoading(true);
    setError(null);

    try {
// Aquí conectamos con el microservicio de Manuel a través del túnel ngrok
      const response = await fetch('https://shiftingly-shadowed-vanesa.ngrok-free.dev/auth/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' // Evita la pantalla de advertencia de ngrok
        },
        body: JSON.stringify({ correo, password }), // Enviamos los datos
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Si todo sale bien, guardamos el token (Manuel debió configurar esto)
      console.log("¡Login exitoso!", data);
      // Aquí más adelante haremos la redirección al Dashboard
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Exponemos las variables y funciones que la Vista necesita
  return {
    correo,
    setCorreo,
    password,
    setPassword,
    loading,
    error,
    handleLogin
  };
};