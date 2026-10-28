import type { Tarea } from "../types";

interface Props {
  tarea: Tarea;
  onEliminar: (id: number) => void;
}

function TarjetaTarea({ tarea, onEliminar }: Props) {
  return (
    <div className="tarjeta">
      <h3>{tarea.titulo}</h3>
      {tarea.descripcion !== "" && <p>{tarea.descripcion}</p>}
      <small>Responsable: {tarea.responsable}</small>
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
    </div>
  );
}

export default TarjetaTarea;