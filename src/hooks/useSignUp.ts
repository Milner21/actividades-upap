// hooks/useSignUp.ts
import { useState } from "react";
import { authService } from "../services/authServices";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Método para registrar un usuario
   * @param username - El nombre de usuario proporcionado por el usuario
   * @param password - La contraseña proporcionada por el usuario
   * @returns `true` si el registro fue exitoso, `false` en caso contrario
   */
  const signUp = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.registerUser(username, password);

      if (!response.success) {
        setError(response.error || "Error inesperado.");
        console.error("Error en el registro:", response.error); // Log para depurar
        setLoading(false);
        return false;
      }

      setLoading(false);
      return true; // Registro exitoso
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error inesperado en signUp:", err.message);
        setError(err.message);
      } else {
        console.error("Error no manejado:", err);
        setError("Error inesperado.");
      }
      setLoading(false);
      return false;
    }
  };

  return { signUp, loading, error };
};