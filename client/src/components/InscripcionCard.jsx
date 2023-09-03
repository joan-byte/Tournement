import { useNavigate } from "react-router-dom";

function InscripcionCard({ inscripcion, insCerrada }) {
    const navigate = useNavigate();  // Mueve el hook al nivel superior del componente

    // Manejador para el evento de clic en la fila
    const handleRowClick = () => {
        if (!insCerrada) {  // Solo navega si insCerrada es false
            console.log(inscripcion.id);
            navigate(`/inscripciones/${inscripcion.id}`);
        }
    };

    // Renderiza una fila de la tabla con los datos de la inscripción proporcionada como prop
    return (
        <tr onClick={handleRowClick} style={{cursor: insCerrada ? 'not-allowed' : 'pointer'}}>
            <td className="centered">{inscripcion.id}</td>
            <td className="centered">{inscripcion.Nombre_pareja}</td>
            <td className="centered">{inscripcion.Club_pertenencia}</td>
        </tr>
    );
}

export default InscripcionCard;
