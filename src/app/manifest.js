export default function manifest() {
  return {
    name: 'Todú - Gestión Gamificada',
    short_name: 'Todú',
    description: 'PWA de gestión de tiempo y mitigación de procrastinación',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0046b0', // El color azul de la marca
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Deberás agregar íconos .png más grandes (192x192, 512x512) en /public para producción
    ],
  }
}