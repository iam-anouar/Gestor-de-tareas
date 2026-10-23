import { useState } from "react";

interface FormularioTareaProps {
  onAgregar: (nombre: string) => void;
}

function FormularioTarea({ onAgregar }: FormularioTareaProps) {
  const [nombre, setNombre] = useState("");

  const handleAgregar = () => {
    if (nombre.trim() === "") return;
    onAgregar(nombre);
    setNombre("");
  };

  return (
    <div>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de la tarea"
      />
      <button onClick={handleAgregar}>Añadir</button>
    </div>
  );
}

export default FormularioTarea;