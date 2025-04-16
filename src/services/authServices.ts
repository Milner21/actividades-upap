// services/authService.ts
import { supabase } from '../utils/supabaseClient';

export const authService = {
  /**
   * Registra un usuario en Supabase Auth y guarda el nombre de usuario en la tabla `usuarios`.
   * @param username - Nombre de usuario proporcionado por el usuario.
   * @param password - Contraseña proporcionada por el usuario.
   * @returns Un objeto indicando el éxito o fallo del registro.
   */
  registerUser: async (username: string, password: string) => {
    // Generar el "correo electrónico" para Supabase Auth
    const email = `${username}@sitec.com`;

    try {
      // Registrar al usuario en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Error al registrar el usuario.');
      }

      const user = data?.user;

      // Guardar el nombre de usuario en la tabla `usuarios`
      const { error: dbError } = await supabase
        .from('usuarios')
        .insert([{ id: user?.id, username }]);

      if (dbError) {
        throw new Error(
          dbError.message || 'Error al guardar el usuario en la base de datos.',
        );
      }

      return { success: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error en registerUser:', err.message);
        return { success: false, error: err.message };
      } else {
        console.error('Error inesperado en registerUser:', err);
        return { success: false, error: 'Error inesperado.' };
      }
    }
  },

  loginUser: async (username: string, password: string) => {
    const email = `${username}@sitec.com`; // Transformamos username en formato de correo

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Error al iniciar sesión.');
      }

      return { success: true, data };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error en loginUser:', err.message);
        return { success: false, error: err.message };
      } else {
        console.error('Error inesperado en loginUser:', err);
        return { success: false, error: 'Error inesperado.' };
      }
    }
  },

  logoutUser: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message || 'Error al cerrar sesión.');
      }
      return { success: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error en logoutUser:', err.message);
        return { success: false, error: err.message };
      } else {
        console.error('Error inesperado en logoutUser:', err);
        return { success: false, error: 'Error inesperado.' };
      }
    }
  }
  
};
