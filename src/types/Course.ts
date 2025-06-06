export interface Curso {
    id: number;
    nombre: string;
    cupos: number;
    fecha: string;
    hora: string;
    imagenUrl?: string;
    estado: boolean;
  }

  export interface Inscripciones {
    id: string;
    curso_id: string;
    nombre: string;
    telefono: string;
    correo: string;
    semestre: string;
    estado: boolean;
    medio_de_pago: string;
    asistencia: boolean;
    fecha_inscripcion: Date;
    fecha_modificacion?: Date;
  }