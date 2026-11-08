import { Routes, Route, Navigate } from "react-router-dom";
import PaginaListado from "./pages/PaginaListado";
import PaginaNuevaTarea from "./pages/PaginaNuevaTarea";
import PaginaEditarTarea from "./pages/PaginaEditarTarea";
function App() {
  return (
    <Routes>
<Route path="/" element={<Navigate to="/tareas" replace />} />
<Route path="/tareas" element={<PaginaListado />} />
<Route path="/tareas/nueva" element={<PaginaNuevaTarea />} />
<Route path="/tareas/:id/editar" element={<PaginaEditarTarea />} />
    </Routes>
  );
}

export default App;