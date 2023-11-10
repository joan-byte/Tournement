import { useEffect, useState } from "react";
import { getOrderedRankings } from "../api/RankingApi";  // Asumiendo que tienes un endpoint para obtener el ranking.
import RankingCard from "./RankingCard";

// Componente para renderizar una lista de rankings.
export function RankingList() {
    // Estado para almacenar la lista de rankings.
    const [rankings, setRankings] = useState([]);

    // Hook que carga los rankings cuando el componente se monta.
    useEffect(() => {
        async function loadRankings() {
            const res = await getOrderedRankings();
            setRankings(res.data);
        }
        loadRankings();
    }, []);

    // Renderizado del componente.
    return (
        <div>
            <button>Cerrar Partida</button>
            <button>Abrir Partida</button>
            <table>
        
                <thead>
                    <tr>
                        <th>Número Pareja</th>
                        <th>Serie</th>
                        <th>Partidas Ganadas</th>
                        <th>Puntos</th>
                        <th>Nombre Pareja</th>
                        <th>Partida</th>

                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking) => (
                        <RankingCard key={ranking.id} ranking={ranking} />
                    ))}
                </tbody>
            </table>
        </div>
        
    );
}

export default RankingList;
