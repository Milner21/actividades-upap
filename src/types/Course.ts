export interface Curso {
    id: number;
    nombre: string;
    cupos: number;
    fecha: string;
    hora: string;
    imagenUrl?: string;
  }

  export interface Inscripciones {
    id: number;
    curso_id: string;
    nombre: string;
    telefono: string;
    correo: string;
    semestre: string;
  }
  