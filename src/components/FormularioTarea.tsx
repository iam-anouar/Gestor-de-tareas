import { useState } from "react";
import type { FormEvent } from "react";
import type { DatosTarea } from "../types";
import { Formulario, Botones, TextoError } from "../estilos";

interface Props {
  encabezado?: string;                                  // texto del título del formulario
  tareaInicial?: DatosTarea;                            // datos para rellenar (al editar)
  onGuardar: (datos: DatosTarea) => Promise<boolean>;   // true si se guardó bien
  onCancelar: () => void;
}

function FormularioTarea({
  encabezado = "Nueva tarea",
  tareaInicial = { titulo: "", descripcion: "", responsable: "" },
  onGuardar,
  onCancelar,
}: Props) {
  // Los campos empiezan con los datos iniciales (vacíos si es una tarea nueva)
  const [titulo, setTitulo] = useState(tareaInicial.titulo);
  const [descripcion, setDescripcion] = useState(tareaInicial.descripcion);
  const [responsable, setResponsable] = useState(tareaInicial.responsable);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tituloLimpio = titulo.trim();
    const descripcionLimpia = descripcion.trim();
    const responsableLimpio = responsable.trim();

    if (tituloLimpio === "" || responsableLimpio === "") {
      setError("El título y el responsable son obligatorios");
      return;
    }

    const datos: DatosTarea = {
      titulo: tituloLimpio,
      descripcion: descripcionLimpia,
      responsable: responsableLimpio,
    };

    const seGuardo = await onGuardar(datos);

    if (seGuardo === false) {
      setError("No se pudo guardar la tarea. Inténtalo de nuevo.");
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <h2>{encabezado}</h2>

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