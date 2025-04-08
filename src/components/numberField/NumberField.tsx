import { NumberField } from "@base-ui-components/react/number-field";
import styles from "./NumbreField.module.css";
import { ComponentProps, useId, useEffect, useState } from "react";

interface CustomFieldProps {
  label?: string; // Etiqueta opcional
  value?: number; // Valor inicial opcional
  name: string; // Nombre del campo
  onChange?: (value: number) => void; // Callback para manejar cambios
}

export default function NumberFieldCustom(props: CustomFieldProps) {
  const id = useId();
  const { label, value = 0, name, onChange } = props; // Fallback a 0 si no se pasa un valor inicial

  // Estado interno para controlar el valor si no se pasa como prop
  const [currentValue, setCurrentValue] = useState(value);

  // Sincronizar estado interno con el prop `value` si cambia externamente
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  // Manejar cambios en el input editable
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 0; // Convertir a número, default a 0
    setCurrentValue(newValue);
    onChange?.(newValue); // Notificar al padre si existe callback
  };

  // Incrementar el valor
  const handleIncrement = () => {
    const newValue = currentValue + 1;
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  // Disminuir el valor
  const handleDecrement = () => {
    const newValue = Math.max(currentValue - 1, 0); // No permitir valores negativos
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  return (
    <NumberField.Root
      id={id}
      value={currentValue} // Usamos el estado sincronizado
      name={name}
      className={styles.Field}
    >
      {/* Etiqueta */}
      <NumberField.ScrubArea className={styles.ScrubArea}>
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
        <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
          <CursorGrowIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      {/* Botones y campo */}
      <NumberField.Group className={styles.Group}>
        <NumberField.Decrement
          className={styles.Decrement}
          onClick={handleDecrement}
        >
          <MinusIcon />
        </NumberField.Decrement>
        <NumberField.Input
          className={styles.Input}
          value={currentValue} // Sincronizado con el estado
          onChange={handleInputChange} // Permite editar directamente
        />
        <NumberField.Increment
          className={styles.Increment}
          onClick={handleIncrement}
        >
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

function CursorGrowIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}