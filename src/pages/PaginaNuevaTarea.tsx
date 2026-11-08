import { useNavigate } from "react-router-dom";
import type { DatosTarea } from "../types";
import FormularioTarea from "../components/FormularioTarea";
import { CajaFormulario } from "../estilos";

const URL_API = "http://localhost:3000/tareas";

function PaginaNuevaTarea() {
  const navigate = useNavigate();

  // Crear la tarea (POST). Si sale bien, volvemos al listado
  const crearTarea = async (datos: DatosTarea): Promise<boolean> => {
    try {
      const res = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
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

  return (
    <CajaFormulario>
      <FormularioTarea
        encabezado="Nueva tarea"
        onGuardar={crearTarea}
        onCancelar={() => navigate("/tareas")}
      />
    </CajaFormulario>
  );
}

export default PaginaNuevaTarea;