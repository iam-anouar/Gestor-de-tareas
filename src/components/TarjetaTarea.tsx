import { useNavigate } from "react-router-dom";
import type { Tarea } from "../types";
import { Tarjeta } from "../estilos";

interface Props {
  tarea: Tarea;
  onEliminar: (id: string) => void;
}

function TarjetaTarea({ tarea, onEliminar }: Props) {
  const navigate = useNavigate();

  return (
    <Tarjeta>
      <h3>{tarea.titulo}</h3>
      {tarea.descripcion !== "" && <p>{tarea.descripcion}</p>}
      <small>Responsable: {tarea.responsable}</small>
      <button onClick={() => navigate(`/tareas/${tarea.id}/editar`)}>Editar</button>
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
    </Tarjeta>
  );
}

export default TarjetaTarea;