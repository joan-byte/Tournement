import { useEffect, useState } from "react";
import { getAllResultados } from "../api/ResultadosApi";
import ResultadosCard from "./ResultadosCard";

// Componente para renderizar una lista de resultados.
export function ResultadosList() {
    // Estado para almacenar la lista de resultados.
    const [resultado, setResultados] = useState([]);
    // Estado para verificar si los resultados están cerrados.
    const [resCerrado, setResCerrado] = useState(false);

    // Hook que carga los resultados cuando el componente se monta.
    useEffect(() => {
        async function loadResultados() {
            const res = await getAllResultados();
            setResultados(res.data);
        }
        loadResultados();
    }, []);

    // Renderizado del componente.
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Mesa</th>
                    <th>Partida</th>
                    <th>Número Pareja Uno</th>
                    <th>Nombre Pareja Uno</th>
                    <th>Puntos Pareja Uno</th>
                    <th>Número Pareja Dos</th>
                    <th>Nombre Pareja Dos</th>
                    <th>Puntos Pareja Dos</th>
                    <th>Resultado Pareja Uno</th>
                    <th>Resultado Pareja Dos</th>
                </tr>
            </thead>
            <tbody>
                {resultado.map(res => (
                    <ResultadosCard key={res.id} resultado={res} resCerrado={resCerrado} />
                ))}
            </tbody>
        </table>
    );
}

export default ResultadosList;
