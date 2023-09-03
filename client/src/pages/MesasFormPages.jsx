import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteMesa, getMesa } from "../api/MesasApi";

export function MesasFormPages() {
  // Obtener los parámetros de la URL, en este caso, el ID de la mesa si existe
  const params = useParams();
  
  // Estados para los valores del formulario
  const [numero, setNumero] = useState("");
  const [parejaUno, setParejaUno] = useState("");
  const [parejaDos, setParejaDos] = useState("");
  
  // Navegador para cambiar de ruta después de realizar acciones
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  async function handleSubmit(event) {
    event.preventDefault();
    
    // Datos del formulario
    const data = { numero, parejaUno, parejaDos };
    if (params.id) {
        // Si existe un ID, se actualiza la mesa existente
        await updateMesa(params.id, data);
    } else {
        // Si no hay ID, se guarda una nueva mesa
        await saveMesa(data);
    }
    
    // Navegar de vuelta a la lista de mesas
    navigate("/mesas");
  }

  return (
    // Contenedor principal del formulario
    <div className="mesas-form-container">
      <h1 className="mesas-form-title">Formulario de Mesas</h1>
      
      {/* Formulario para agregar o actualizar mesas */}
      <form onSubmit={handleSubmit} className="mesas-form">
        <label className="mesas-form-label">Número de Mesa</label>
        <input
          type="number"
          value={numero}
          onChange={(event) => setNumero(event.target.value)}
          className="mesas-form-input"
        />
        <label className="mesas-form-label">Pareja Uno</label>
        <input
          type="text"
          value={parejaUno}
          onChange={(event) => setParejaUno(event.target.value)}
          className="mesas-form-input"
        />
        <label className="mesas-form-label">Pareja Dos</label>
        <input
          type="text"
          value={parejaDos}
          onChange={(event) => setParejaDos(event.target.value)}
          className="mesas-form-input"
        />
        <button type="submit" className="btn-primary mesas-form-button">Guardar</button>
      </form>
      
      {/* Botón para eliminar mesa (solo visible si hay un ID) */}
      {params.id && (
        <button
          onClick={async () => {
            const confirmar = window.confirm("¿Está seguro que desea eliminar la mesa?");
            if (confirmar) {
              await deleteMesa(params.id);
              navigate("/mesas");
            }
          }}
          className="btn-primary mesas-form-button-delete"
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
