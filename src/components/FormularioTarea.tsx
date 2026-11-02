import { useState } from "react";
import type { FormEvent } from "react";
import type { DatosTarea } from "../types";
import { Formulario, Botones, TextoError } from "../estilos";

interface Props {
  // Devuelve true si se creó bien, o false si falló
  onGuardar: (datos: DatosTarea) => Promise<boolean>;
  onCancelar: () => void;
}

function FormularioTarea({ onGuardar, onCancelar }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [responsable, setResponsable] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Quitamos los espacios de los lados
    const tituloLimpio = titulo.trim();
    const descripcionLimpia = descripcion.trim();
    const responsableLimpio = responsable.trim();

    // Título y responsable son obligatorios
    if (tituloLimpio === "" || responsableLimpio === "") {
      setError("El título y el responsable son obligatorios");
      return;
    }

    const datos: DatosTarea = {
      titulo: tituloLimpio,
      descripcion: descripcionLimpia,
      responsable: responsableLimpio,
    };

    // Esperamos a que el padre nos diga si se pudo crear
    const seCreo = await onGuardar(datos);

    if (seCreo === false) {
      setError("No se pudo crear la tarea. Inténtalo de nuevo.");
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>

      <label>Título</label>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

      <label>Descripción (opcional)</label>
      <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

      <label>Responsable</label>
      <input value={responsable} onChange={(e) => setResponsable(e.target.value)} />

      {error !== "" && <TextoError>{error}</TextoError>}

      <Botones>
        <button type="button" onClick={onCancelar}>Cancelar</button>
        <button type="submit">Guardar</button>
      </Botones>
    </Formulario>
  );
}

export default FormularioTarea;