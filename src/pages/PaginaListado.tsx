import { useState, useEffect } from "react";
import type { Tarea, DatosTarea } from "../types";
import FormularioTarea from "../components/FormularioTarea";
import TarjetaTarea from "../components/TarjetaTarea";
import { useNavigate } from "react-router-dom";
import { Contenedor, Barra, CampoBusqueda, Grid, Fondo, Modal, TextoError, Opciones } from "../estilos";

const URL_API = "http://localhost:3000/tareas";

const ERROR_CARGA = "No se pudieron cargar las tareas. Comprueba que el servidor esté en marcha.";
const ERROR_ELIMINAR = "No se pudo eliminar la tarea. Inténtalo de nuevo.";

function PaginaListado() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierta, setModalAbierta] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [errorOperacion, setErrorOperacion] = useState("");

  // Al abrir la página: pedir las tareas al servidor (GET)
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const res = await fetch(URL_API);
        if (res.ok) {
          const datos: Tarea[] = await res.json();
          setTareas(datos);
        } else {
          setErrorCarga(ERROR_CARGA);
        }
      } catch {
        setErrorCarga(ERROR_CARGA);
      }
      setCargando(false);
    };

    cargarTareas();
  }, []);



const navigate = useNavigate();
const [mostrarOpciones, setMostrarOpciones] = useState(false);

const abrirModal = () => {
  setMostrarOpciones(false);
  setModalAbierta(true);
};

  // Tareas que se ven según la búsqueda
  const tareasVisibles = tareas.filter((t) =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Número de tareas en el título de la pestaña
  useEffect(() => {
    document.title = `Tareas: ${tareasVisibles.length} de ${tareas.length}`;
  }, [tareasVisibles.length, tareas.length]);

  // Crear una tarea (POST). Devuelve true si salió bien, false si falló
  const agregarTarea = async (datos: DatosTarea): Promise<boolean> => {
    try {
      const res = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (res.ok === false) {
        return false;
      }

      const nueva: Tarea = await res.json();
      setTareas([...tareas, nueva]);
      setModalAbierta(false);
      return true;
    } catch {
      return false;
    }
  };

  // Eliminar una tarea (DELETE)
  const eliminarTarea = async (id: string) => {
    setErrorOperacion("");
    try {
      const res = await fetch(`${URL_API}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTareas(tareas.filter((t) => t.id !== id));
      } else {
        setErrorOperacion(ERROR_ELIMINAR);
      }
    } catch {
      setErrorOperacion(ERROR_ELIMINAR);
    }
  };

  const mostrarLista = cargando === false && errorCarga === "";

  return (
    <Contenedor>
      <h1>Gestor de tareas</h1>

      <Barra>
        <CampoBusqueda
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
       <button onClick={() => setMostrarOpciones(!mostrarOpciones)}>Nueva tarea</button>
      </Barra>

{mostrarOpciones && (
  <Opciones>
    <button onClick={abrirModal}>Crear en ventana modal</button>
    <button onClick={() => navigate("/tareas/nueva")}>Crear en página nueva</button>
  </Opciones>
)}

      {cargando && <p>Cargando tareas...</p>}
      {errorCarga !== "" && <TextoError>{errorCarga}</TextoError>}
      {errorOperacion !== "" && <TextoError>{errorOperacion}</TextoError>}

      {mostrarLista && (
        <p>Mostrando {tareasVisibles.length} de {tareas.length} tareas</p>
      )}
      {mostrarLista && tareas.length === 0 && <p>No hay tareas todavía</p>}
      {mostrarLista && tareas.length > 0 && tareasVisibles.length === 0 && (
        <p>No se encontraron tareas con esa búsqueda</p>
      )}

      {mostrarLista && (
        <Grid>
          {tareasVisibles.map((t) => (
            <TarjetaTarea key={t.id} tarea={t} onEliminar={eliminarTarea} />
          ))}
        </Grid>
      )}

      {modalAbierta && (
        <Fondo>
          <Modal>
            <FormularioTarea
              onGuardar={agregarTarea}
              onCancelar={() => setModalAbierta(false)}
            />
          </Modal>
        </Fondo>
      )}
    </Contenedor>
  );
}

export default PaginaListado;