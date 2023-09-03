import { ejecutarMesasPrimera } from '../api/MesasApi';
import { useEffect, useState } from "react";
import { getAllInscripcion } from "../api/InscripcionApi";
import InscripcionCard from './InscripcionCard';

export function InscripcionList() {
    // Estado para almacenar la lista de inscripciones
    const [inscripcion, setInscripcions] = useState([]);
    // Estado para controlar insCerrada
    const [insCerrada, setInsCerrada] = useState(false);

    // Función para manejar el clic en el botón de Sorteo
    function handleButtonClick() {
        ejecutarMesasPrimera()
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al ejecutar mesas_primera:', error);
            });
    }

    // Hook useEffect para cargar las inscripciones al montar el componente
    useEffect(() => {
        async function loadInscripciones() {
            const res = await getAllInscripcion();
            setInscripcions(res.data);

            // Establecer el estado inicial de insCerrada a partir del almacenamiento local
            const storedInsCerrada = localStorage.getItem('insCerrada');
            if (storedInsCerrada !== null) {
                setInsCerrada(storedInsCerrada === 'true');
            }
        }
        loadInscripciones();
    }, []);

    return (
        <>
        {/* Contenedor centrado para el botón de sorteo */}
        <div className="sorteo-button-container">
            {/* Botón para cambiar el estado de insCerrada */}
            {/* Guardamos el estado en el almacenamiento local después de cambiar el estado */}
            <button onClick={() => {
                setInsCerrada(prevState => {
                    localStorage.setItem('insCerrada', !prevState);
                    return !prevState;
                });
            }} className="btn-secondary" data-closed={insCerrada.toString()}>
                {insCerrada ? 'Inscripción Cerrada' : 'Inscripción Abierta'}
            </button>

            {/* Botón para iniciar el sorteo */}
            <button onClick={handleButtonClick} className="btn-primary" disabled={!insCerrada}>
                Sorteo
            </button>
        </div>

        {/* Tabla para mostrar la lista de inscripciones */}
        <table className="inscripcion-table">
            <thead>
                <tr>
                    {/* Cabeceras de la tabla */}
                    <th className="centered">N</th>
                    <th className="centered">Nombre Pareja</th>
                    <th className="centered">Club Pertenencia</th>
                </tr>
            </thead>
            <tbody>
                {/* Iterar sobre las inscripciones y renderizar una fila por cada inscripción */}
                {inscripcion.map(ins => (
                    <InscripcionCard key={ins.id} inscripcion={ins} insCerrada={insCerrada} />
                ))}
            </tbody>
        </table>
        </>
    );
}
