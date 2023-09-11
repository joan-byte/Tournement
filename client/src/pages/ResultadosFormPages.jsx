//Importamos las dependencias necesarias para el componente.
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMesa } from "../api/MesasApi";
import { createResultado, updateResultado } from '../api/ResultadosApi';
import { useParams, useLocation, useNavigate } from "react-router-dom";

// Definimos el componente ResultadosFormPages. 
export function ResultadosFormPages() {
    // Usamos el hook useForm de react-hook-form para gestionar el formulario.
    const { register } = useForm();
    
    // Usamos el hook useParams para obtener el parámetro `id` de la URL.
    const { id } = useParams();

    // Usamos useLocation para acceder al estado de navegación y obtener el valor de esGuardada
    const location = useLocation();
    const esGuardada = location.state?.esGuardada || false;

    // Usamos el hook useState para gestionar el estado de los datos de la mesa.
    const [mesaData, setMesaData] = useState(null);
    const [resultados, setResultados] = useState({
        resultadoParejaUno: '',
        resultadoParejaDos: ''
    });

    const navigate = useNavigate();  // Hook de navegación

    // Handler para cambios en los inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setResultados(prevState => ({ ...prevState, [name]: value }));
    };

    // Función para marcar la mesa como guardada en localStorage
    const markMesaAsGuardada = (mesaNumero) => {
        const mesasGuardadas = JSON.parse(localStorage.getItem('mesasGuardadas')) || {};
        mesasGuardadas[mesaNumero] = true;
        localStorage.setItem('mesasGuardadas', JSON.stringify(mesasGuardadas));
    };

    // Usamos el hook useEffect para hacer una llamada a la API cuando se carga el componente.
    useEffect(() => {
        async function fetchMesaDetails() {
            const resMesa = await getMesa(id);
            console.log("Mesa data:", resMesa.data);
            setMesaData(resMesa.data);
        }
        fetchMesaDetails();
    }, [id]);

    // Handler para guardar los resultados (acción POST)
    const handleSaveResults = async () => {
        try {
            const dataToSend = {
                mesa: mesaData.numero,
                partida: mesaData.partida,
                n_pareja_uno: mesaData.pareja_uno,
                nombre_pareja_uno: mesaData.nombre_pareja_uno,
                res_par_uno: parseInt(resultados.resultadoParejaUno),
                n_pareja_dos: mesaData.pareja_dos,
                nombre_pareja_dos: mesaData.nombre_pareja_dos,
                res_par_dos: parseInt(resultados.resultadoParejaDos),
            };
    
            const response = await createResultado(dataToSend);
    
            if (response.status === 201) {
                markMesaAsGuardada(mesaData.numero);  // Marca esta mesa como guardada en localStorage
                navigate('/mesas-por-numero');  // Navega de vuelta a MesasPorNumero
            }
        } catch (error) {
            console.error("Error al guardar los resultados:", error);
        }
    };

    // Handler for updating results (PUT action)
    const handleUpdateResults = async () => {
        try {
            // Construimos los datos que se enviarán al backend
            const dataToSend = {
                mesa: mesaData.numero,
                partida: mesaData.partida,
                n_pareja_uno: mesaData.pareja_uno,
                nombre_pareja_uno: mesaData.nombre_pareja_uno,
                res_par_uno: parseInt(resultados.resultadoParejaUno),
                n_pareja_dos: mesaData.pareja_dos,
                nombre_pareja_dos: mesaData.nombre_pareja_dos,
                res_par_dos: parseInt(resultados.resultadoParejaDos),
            };
            console.log("Data to send:", dataToSend);
            // Aquí, usarías una función similar a createResultado pero para solicitudes PUT
            // Suponiendo que "id" es el identificador del recurso que se desea actualizar
            const response = await updateResultado(id, dataToSend); 
    
            if (response.success) {
                navigate('/mesas-por-numero');  // Navega de vuelta a MesasPorNumero
                // Manejar el éxito, tal vez navegando a otra página o mostrando un mensaje de éxito
            }
        } catch (error) {
            console.error("Error al actualizar los resultados:", error);
        }
    };
    
    // A continuación, renderizamos el componente.
    return (
        <div className="contenedor-principal">
            {/* Sección de título y detalles de la mesa. */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <div className="resultados-container titulo">
                    Número de partida: <span className="numero-margin">{mesaData ? mesaData.partida : "N/A"}</span>
                    Numero de Mesa: <span className="numero-margin">{mesaData ? mesaData.numero : "N/A"}</span>
                </div>
                
                {/* Sección de resultados para la primera pareja. */}
                <div className="resultados-container">
                    Resultado Primera Pareja:
                    <span className="numero-margin">{mesaData ? mesaData.pareja_uno : "N/A"}</span>
                    <span className="espacio-derecho">{mesaData ? mesaData.nombre_pareja_uno : "N/A"}</span>
                    
                    {/* Input para el resultado de la primera pareja. */}
                    <input 
                        className="resultados-form-input" 
                        name="resultadoParejaUno" 
                        value={resultados.resultadoParejaUno} 
                        onChange={handleInputChange} 
                    />
                </div>
                
                {/* Sección de resultados para la segunda pareja. */}
                <div className="resultados-container">
                    Resultado Segunda Pareja:
                    <span className="numero-margin">{mesaData ? mesaData.pareja_dos : "N/A"}</span>
                    <span className="espacio-derecho">{mesaData ? mesaData.nombre_pareja_dos : "N/A"}</span>
                    
                    {/* Input para el resultado de la segunda pareja. */}
                    <input 
                        className="resultados-form-input" 
                        name="resultadoParejaDos" 
                        value={resultados.resultadoParejaDos} 
                        onChange={handleInputChange} 
                    />
                </div>
            </div>
    
            {/* Renderizamos los botones en función del valor de esGuardada.
                 Si esGuardada es verdadero, mostramos los botones "Modificar Resultado Mesa" y "Eliminar Resultados". 
                 En caso contrario, mostramos "Guardar Resultado Mesa". */}
            { 
                esGuardada 
                ? (
                    <div className="button-container">
                        <button type="button" className="btn-primary inscripcion-form-button-left" onClick={handleUpdateResults}>Modificar Resultado Mesa</button>
                        <button className="btn-danger inscripcion-form-button-right">Eliminar Resultados</button>
                        <div style={{clear: 'both'}}></div> {/* Esto limpia los flotantes para que no afecten a otros elementos */}
                    </div>
                )
                : <button type="button" className="btn-primary inscripcion-form-button-left" onClick={handleSaveResults}>Guardar Resultado Mesa</button>
            }
        </div>
    );
}