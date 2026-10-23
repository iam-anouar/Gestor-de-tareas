import { useState } from "react";
import FormularioTarea from "./components/FormularioTarea";
import ListaTareas from "./components/ListaTareas";
import type { TareaType } from "./components/Tarea";

function App() {
  const [tareas, setTareas] = useState<TareaType[]>([]);

  const agregarTarea = (nombre: string) => {
    setTareas([...tareas, { id: Date.now(), nombre }]);
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1>Mis tareas</h1>
      <FormularioTarea onAgregar={agregarTarea} />
      <ListaTareas tareas={tareas} onEliminar={eliminarTarea} />
    </div>
  );
}

export default App;