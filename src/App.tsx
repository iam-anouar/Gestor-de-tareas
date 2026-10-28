import { useState } from "react";
import "./App.css";
import type { Tarea } from "./types";
import FormularioTarea from "./components/FormularioTarea";
import TarjetaTarea from "./components/TarjetaTarea";

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierta, setModalAbierta] = useState(false);

  const agregarTarea = (datos: Omit<Tarea, "id">) => {
    setTareas([...tareas, { id: Date.now(), ...datos }]);
    setModalAbierta(false);
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // Se calcula en cada render, sin useState
  const tareasVisibles = tareas.filter((t) =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Gestor de tareas</h1>

      <div className="barra">
        <input
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={() => setModalAbierta(true)}>Nueva tarea</button>
      </div>

      <p>Mostrando {tareasVisibles.length} de {tareas.length} tareas</p>

      {tareas.length === 0 && <p>No hay tareas todavía</p>}
      {tareas.length > 0 && tareasVisibles.length === 0 && (
        <p>No se encontraron tareas con esa búsqueda</p>
      )}

      <div className="grid">
        {tareasVisibles.map((t) => (
          <TarjetaTarea key={t.id} tarea={t} onEliminar={eliminarTarea} />
        ))}
      </div>

      {modalAbierta && (
        <div className="fondo">
          <div className="modal">
            <FormularioTarea
              onGuardar={agregarTarea}
              onCancelar={() => setModalAbierta(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;