export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  responsable: string;
}

// Los datos del formulario (todavía sin id: lo pone el servidor)
export interface DatosTarea {
  titulo: string;
  descripcion: string;
  responsable: string;
}