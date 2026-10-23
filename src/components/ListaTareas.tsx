import Tarea from "./Tarea";
import type { TareaType } from "./Tarea";

interface ListaTareasProps {
  tareas: TareaType[];
  onEliminar: (id: number) => void;
}

function ListaTareas({ tareas, onEliminar }: ListaTareasProps) {
  if (tareas.length === 0) {
    return <p>No hay tareas pendientes</p>;
  }

  return (
    <ul>
      {tareas.map((t) => (
        <Tarea key={t.id} tarea={t} onEliminar={onEliminar} />
      ))}
    </ul>
  );
}

export default ListaTareas;