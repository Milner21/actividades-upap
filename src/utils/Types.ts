export interface Curso {
  id: number;
  nombre: string;
  cupos_disponibles: number;
  fecha_realizacion: string;
}

export interface Inscrito {
  id: number;
  nombre: string;
  correo: string;
  semestre: string;
}
