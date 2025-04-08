export const formatDate = (dateString: string): string => {
  // Asegúrate de que el string tiene el formato adecuado, de lo contrario, lo ajustamos
  const date = new Date(dateString);

  // Opciones de formato
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  // Verificamos si la fecha es válida
  if (isNaN(date.getTime())) {
    return 'Fecha inválida'; // Si la fecha no es válida
  }

  // Formateamos la fecha y la devolvemos
  return date.toLocaleString('es-ES', options);
};
