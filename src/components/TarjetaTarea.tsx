import type { Tarea } from "../types";
import { Tarjeta } from "../estilos";

interface Props {
  tarea: Tarea;
  onEliminar: (id: string) => void;
}

function TarjetaTarea({ tarea, onEliminar }: Props) {
  return (
    <Tarjeta>
      <h3>{tarea.titulo}</h3>
      {tarea.descripcion !== "" && <p>{tarea.descripcion}</p>}
      <small>Responsable: {tarea.responsable}</small>
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
    </Tarjeta>
  );
}

export default TarjetaTarea;