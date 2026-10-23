export interface TareaType {
  id: number;
  nombre: string;
}

interface TareaProps {
  tarea: TareaType;
  onEliminar: (id: number) => void;
}

function Tarea({ tarea, onEliminar }: TareaProps) {
  return (
    <li>
      {tarea.nombre}
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
    </li>
  );
}

export default Tarea;