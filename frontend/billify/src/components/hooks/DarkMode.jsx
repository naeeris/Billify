import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [DarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Verificar el modo al cargar
    const checkDarkMode = () => {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setDarkMode(darkModeMediaQuery.matches);
    };

    // Configurar listener para cambios
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => setDarkMode(e.matches));

    // Verificación inicial
    checkDarkMode();

    // Limpieza
    return () => {
      darkModeMediaQuery.removeEventListener('change', (e) => setDarkMode(e.matches));
    };
  }, []);

  return DarkMode;
};

export default useDarkMode;