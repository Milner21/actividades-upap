export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return 'Fecha inválida';
  return `${day}/${month}/${year}`;
};
