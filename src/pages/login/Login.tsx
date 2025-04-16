import { useState } from "react";
import { useLogin } from "../../hooks";
import { useNavigate } from "react-router-dom";
import styles from "./LoginUser.module.css";
import { TextField } from "../../components"; // Asegúrate de importar tu TextField correctamente

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Intentando iniciar sesión con:", { username, password });

    const success = await login(username, password);
    if (success) {
      console.log("Login exitoso, redirigiendo...");
      navigate("/sp/admin/"); // Redirige a una página privada
    }
  };

  return (
    <div className={styles.formContent}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h2>Iniciar Sesión</h2>
        {/* Campo para el Nombre de Usuario */}
        <TextField
          label="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su usuario"
        />
        {/* Campo para la Contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
        {/* Mensaje de error */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Botones */}
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.createButton}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
          <button
            className={`${styles.button} ${styles.backButton}`}
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;