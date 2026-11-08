import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Tarea, DatosTarea } from "../types";
import FormularioTarea from "../components/FormularioTarea";
import { CajaFormulario, TextoError } from "../estilos";

const URL_API = "http://localhost:3000/tareas";
const ERROR_CARGA = "No se pudo cargar la tarea. Comprueba que el servidor esté en marcha.";

function PaginaEditarTarea() {
  const { id } = useParams();        // el :id de la URL
  const navigate = useNavigate();

  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [cargando, setCargando] = useState(true);
  const [noExiste, setNoExiste] = useState(false);
  const [errorCarga, setErrorCarga] = useState("");

  // Al abrir la página: pedir al servidor la tarea con ese id (GET)
  useEffect(() => {
    const cargarTarea = async () => {
      try {
        const res = await fetch(`${URL_API}/${id}`);
        if (res.status === 404) {
          setNoExiste(true);
        } else if (res.ok) {
          const datos: Tarea = await res.json();
          setTarea(datos);
        } else {
          setErrorCarga(ERROR_CARGA);
        }
      } catch {
        setErrorCarga(ERROR_CARGA);
      }
      setCargando(false);
    };

    cargarTarea();
  }, [id]);

  // Guardar los cambios (PUT). Si sale bien, volvemos al listado
  const guardarCambios = async (datos: DatosTarea): Promise<boolean> => {
    try {
      const res = await fetch(`${URL_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, id }),
      });

      if (res.ok === false) {
        return false;
      }

      navigate("/tareas");
      return true;
    } catch {
      return false;
    }
  };

  if (cargando) {
    return (
      <CajaFormulario>
        <p>Cargando tarea...</p>
      </CajaFormulario>
    );
  }

  if (noExiste) {
    return (
      <CajaFormulario>
        <p>La tarea que intentas editar no existe.</p>
        <button onClick={() => navigate("/tareas")}>Volver al listado</button>
      </CajaFormulario>
    );
  }

  if (tarea === null) {
    return (
      <CajaFormulario>
        <TextoError>{errorCarga}</TextoError>
        <button onClick={() => navigate("/tareas")}>Volver al listado</button>
      </CajaFormulario>
    );
  }

  return (
    <CajaFormulario>
      <FormularioTarea
        encabezado="Editar tarea"
        tareaInicial={tarea}
        onGuardar={guardarCambios}
        onCancelar={() => navigate("/tareas")}
      />
    </CajaFormulario>
  );
}

export default PaginaEditarTarea;