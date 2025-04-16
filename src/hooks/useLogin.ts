// hooks/useLogin.ts
import { useState } from 'react';
import { authService } from '../services/authServices';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.loginUser(username, password);

      if (!response.success) {
        setError(response.error || 'Error inesperado.');
        console.error('Error en el inicio de sesión:', response.error);
        setLoading(false);
        return false;
      }

      setLoading(false);
      return true; // Login exitoso
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error inesperado en login:', err.message);
        setError(err.message);
      } else {
        console.error('Error no manejado:', err);
        setError('Error inesperado.');
      }
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    const response = await authService.logoutUser();
    setLoading(false);

    if (!response.success) {
      setError(response.error || 'Error inesperado.');
      return false;
    }

    return true;
  };

  return { login, logout, loading, error };
};
