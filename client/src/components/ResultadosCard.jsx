import { useNavigate } from "react-router-dom";

// Componente para renderizar los detalles de un resultado específico en forma de tarjeta.
function ResultadosCard({ resultado, resCerrado }) {
    const navigate = useNavigate();  // Hook para navegar entre páginas.

    // Función que maneja el evento de clic en la tarjeta.
    const handleRowClick = () => {
        if (!resCerrado) {  // Si los resultados no están cerrados, permite la navegación.
            console.log(resultado.id);
            navigate(`/resultados/${resultado.id}`);
        }
    };

    // Renderizado del componente.
    return (
        <tr onClick={handleRowClick} style={{cursor: resCerrado ? 'not-allowed' : 'pointer'}}>
            <td className="centered">{resultado.mesa.numero}</td>
            <td className="centered">{resultado.partida}</td>
            <td className="centered">{resultado.puntos_pareja_uno}</td>
            <td className="centered">{resultado.puntos_pareja_dos}</td>
            <td className="centered">{resultado.res_par_uno}</td>
            <td className="centered">{resultado.res_par_dos}</td>
        </tr>
    );
}

export default ResultadosCard;
