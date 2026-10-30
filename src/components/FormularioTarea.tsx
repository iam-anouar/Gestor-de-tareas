import { useState } from "react";
import type { FormEvent } from "react";

interface Props {
  onGuardar: (datos: { titulo: string; descripcion: string; responsable: string }) => void;
  onCancelar: () => void;
}

function FormularioTarea({ onGuardar, onCancelar }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [responsable, setResponsable] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tituloLimpio = titulo.trim();
    const descripcionLimpia = descripcion.trim();
    const responsableLimpio = responsable.trim();

    if (tituloLimpio === "" || responsableLimpio === "") {
      setError("El título y el responsable son obligatorios");
      return;
    }

    onGuardar({
      titulo: tituloLimpio,
      descripcion: descripcionLimpia,
      responsable: responsableLimpio,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>

      <label>Título</label>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

      <label>Descripción (opcional)</label>
      <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

      <label>Responsable</label>
      <input value={responsable} onChange={(e) => setResponsable(e.target.value)} />

      {error !== "" && <p className="error">{error}</p>}

      <div className="botones">
        <button type="button" onClick={onCancelar}>Cancelar</button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}

export default FormularioTarea;