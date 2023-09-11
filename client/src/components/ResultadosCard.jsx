import { useNavigate } from "react-router-dom";

// Componente para renderizar los detalles de un resultado específico en forma de tarjeta.
function ResultadosCard({ resultado, resCerrado }) {
    const navigate = useNavigate();  // Hook para navegar entre páginas.

    // Renderizado del componente.
    return (
        <tr style={{cursor: 'default'}}>
            <td className="centered">{resultado.id}</td>
            <td className="centered">{resultado.mesa}</td>
            <td className="centered">{resultado.partida}</td>
            <td className="centered">{resultado.n_pareja_uno}</td>
            <td className="centered">{resultado.nombre_pareja_uno}</td>
            <td className="centered">{resultado.res_par_uno}</td>
            <td className="centered">{resultado.puntos_pareja_uno}</td>
            <td className="centered">{resultado.n_pareja_dos}</td>
            <td className="centered">{resultado.nombre_pareja_dos}</td>
            <td className="centered">{resultado.res_par_dos}</td>
            <td className="centered">{resultado.puntos_pareja_dos}</td>
        </tr>
    );
}

export default ResultadosCard;
