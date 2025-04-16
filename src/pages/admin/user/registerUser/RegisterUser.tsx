import { useState } from "react";
import { useSignUp } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterUser.module.css";
import { TextField } from "../../../../components";

const RegisterUser = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const { signUp, loading, error } = useSignUp(); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("Datos de registro enviados:", { username, password }); // Log para depurar

    // Llamamos al método signUp con username y password
    const success = await signUp(username, password);
    if (success) {
      console.log("Registro exitoso, redirigiendo...");
      navigate("/login"); // Redirige al login si fue exitoso
    }
  };

  return (
    <div className={styles.formContent}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h2>Registro de usuarios</h2>
        {/* TextField para el nombre de usuario */}
        <TextField
          label="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su nombre de usuario"
        />
        {/* TextField para la contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
        {/* Mensajes de error */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Botones */}
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.createButton}`}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
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

export default RegisterUser;