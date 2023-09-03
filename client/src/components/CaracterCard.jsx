import {useNavigate} from 'react-router-dom';

// Componente CaracterCard para mostrar información sobre un campeonato
export function CaracterCard({caracter}) {
    // Inicializar useNavigate para la navegación entre componentes
    const navigate = useNavigate();
    
    // Retornar el componente de la tarjeta
    return (
        <div className="caracter-card" onClick={() => {
            navigate(`/caracteristicas/${caracter.id}`)
        }}>
            {/* Título del campeonato con clase "caracter-title" para estilos específicos */}
            <h2 className="caracter-title">Nombre del Campeonato: {caracter.nombre_campeonato}</h2>
            {/* Información adicional sobre el campeonato */}
            <p>Lugar del campeonato: {caracter.lugar}</p>
            <p>Fecha de Inicio: {caracter.fecha_inicio}</p>
            <p>Fecha de Finalización: {caracter.fecha_fin}</p>
            <p>Número de partidas: {caracter.num_partidas}</p>
            <p>Serie B: {caracter.serieB ? 'Sí' : 'No'}</p>
            <p>Puntos Totales: {caracter.puntos_totales ? 'Sí' : 'No'}</p>
            {/* Línea de separación para una mejor presentación visual */}
            <hr/>
        </div>
    )
}
