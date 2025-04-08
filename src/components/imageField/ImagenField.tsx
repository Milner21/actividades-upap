import { useState, ChangeEvent, FC } from 'react';
import { Field } from '@base-ui-components/react/field';
import styles from './ImagenField.module.css';

interface ImageFieldProps {
  label: string; // Etiqueta del campo
  name: string; // Nombre del input
  onChange?: (file: File | null) => void; // Callback para manejar cambios de archivo
}

const ImageFieldCustom: FC<ImageFieldProps> = ({ label, name, onChange }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Manejar cambios en el archivo seleccionado
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Obtener el archivo seleccionado
    setSelectedImage(file); // Actualizar el estado interno
    onChange?.(file); // Notificar al padre sobre el cambio, si hay callback
  };

  return (
    <Field.Root className={styles.fieldRoot}>
      <div className={styles.inputContainer}>
        <Field.Label className={styles.fieldLabel}>{label}</Field.Label>
        <div className={styles.buttonContainer}>
          <input
            type="file"
            accept="image/*"
            name={name}
            className={styles.hiddenInput}
            onChange={handleFileChange}
            id={name}
          />
          <label htmlFor={name} className={styles.uploadButton}>
            Seleccionar archivo
          </label>
        </div>
        {/* Mostrar vista previa o mensaje de imagen no seleccionada */}
        {selectedImage ? (
          <div className={styles.imagePreview}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Vista previa"
              className={styles.previewImage}
            />
          </div>
        ) : (
          <p className={styles.noImageLabel}>
            Ninguna imagen ha sido seleccionada
          </p>
        )}
      </div>
    </Field.Root>
  );
};

export default ImageFieldCustom;
