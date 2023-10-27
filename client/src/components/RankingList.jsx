import { useEffect, useState } from "react";
import { getAllRankings } from "../api/RankingApi";  // Asumiendo que tienes un endpoint para obtener el ranking.
import RankingCard from "./RankingCard";

// Componente para renderizar una lista de rankings.
export function RankingList() {
    // Estado para almacenar la lista de rankings.
    const [rankings, setRankings] = useState([]);

    // Hook que carga los rankings cuando el componente se monta.
    useEffect(() => {
        async function loadRankings() {
            const res = await getAllRankings();
            setRankings(res.data);
        }
        loadRankings();
    }, []);

    // Renderizado del componente.
    return (
        <table>
            <thead>
                <tr>
                    <th>ID Pareja</th>
                    <th>Nombre Pareja</th>
                    <th>Partida</th>
                    <th>Rank</th>
                    <th>Serie B</th>
                    <th>Partidas Ganadas</th>
                    <th>Puntos</th>
                </tr>
            </thead>
            <tbody>
                {rankings.map((ranking) => (
                    <RankingCard key={ranking.id} ranking={ranking} />
                ))}
            </tbody>
        </table>
    );
}

export default RankingList;
