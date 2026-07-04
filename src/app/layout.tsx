import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Configuración de metadatos de la PWA (Viewport y tema)
export const metadata = {
  title: "Todú - Panel de Control",
  description: "Tu gestor de tareas gamificado",
  manifest: '/manifest.json', // Vincula el manifest
  themeColor: '#0046b0',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Meta tags para iOS/Apple PWA compatibility */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Todú" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
