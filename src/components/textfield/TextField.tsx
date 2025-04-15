import { ChangeEvent, FC } from "react";
import { Field } from "@base-ui-components/react/field";
import styles from "./TextField.module.css";

interface CustomFieldProps {
  label?: string; // Etiqueta descriptiva del campo
  placeholder?: string; // Texto indicativo del input
  type?: string; // Tipo de input ("text", "number", etc.)
  required?: boolean; // Indica si el campo es obligatorio
  value?: string | number; // Valor controlado del input
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Evento para manejar cambios
  errorMessage?: string; // Mensaje de error personalizado
  description?: string; // Texto explicativo del campo
  disabled?: boolean; // Deshabilitar el input
  className?: string; // Clase CSS adicional para personalización
  name?: string;
}

const TextField: FC<CustomFieldProps> = ({
  label,
  placeholder = "Introduce valor", // Placeholder por defecto
  type = "text", // Tipo por defecto
  required = true,
  value,
  onChange,
  errorMessage,
  description,
  disabled = false,
  className,
  name,
}) => {
  return (
    <Field.Root className={`${styles.fieldRoot} ${className}`}>
      {/* Etiqueta del campo */}
      {label && <Field.Label className={styles.fieldLabel}>{label}</Field.Label>}

      {/* Campo de entrada */}
      <Field.Control
        className={styles.fieldControl}
        placeholder={placeholder}
        required={required}
        value={value}
        type={type}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />

      {/* Mensaje de error */}
      {errorMessage && (
        <Field.Error className={styles.fieldError} match="valueMissing">
          {errorMessage}
        </Field.Error>
      )}

      {/* Descripción del campo */}
      {description && (
        <Field.Description className={styles.fieldDescription}>
          {description}
        </Field.Description>
      )}
    </Field.Root>
  );
};

export default TextField;