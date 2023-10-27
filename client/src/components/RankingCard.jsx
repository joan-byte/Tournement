import { useNavigate } from "react-router-dom";

// Componente para renderizar los detalles de un ranking específico en forma de tarjeta.
function RankingCard({ ranking }) {
    const navigate = useNavigate();  // Hook para navegar entre páginas.

    // Renderizado del componente.
    return (
        <tr className="ranking-table" style={{cursor: 'default'}}>
            <td className="centered">{ranking.Numero_pareja.id}</td>
            <td className="centered">{ranking.Nombre_pareja}</td>
            <td className="centered">{ranking.partida}</td>
            <td className="centered">{ranking.rank}</td>
            <td className="centered">{ranking.serieB ? "Sí" : "No"}</td>
            <td className="centered">{ranking.partidas_ganadas}</td>
            <td className="centered">{ranking.puntos}</td>
        </tr>
    );
}

export default RankingCard;
