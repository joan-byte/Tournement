// Importamos las dependencias necesarias para el componente.
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMesa } from "../api/MesasApi";
import { useParams, useLocation } from "react-router-dom";

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
// State to store the results of both couples
    const [resultados, setResultados] = useState({
        resultadoParejaUno: '',
        resultadoParejaDos: ''
    });

    // Handler for input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setResultados(prevState => ({ ...prevState, [name]: value }));
    };

    // Usamos el hook useEffect para hacer una llamada a la API cuando se carga el componente.
    useEffect(() => {
        // Definimos una función asíncrona para obtener los detalles de la mesa.
        async function fetchMesaDetails() {
            const resMesa = await getMesa(id);
            console.log("Mesa data:", resMesa.data);
            setMesaData(resMesa.data);
        }
        // Llamamos a la función que definimos anteriormente.
        fetchMesaDetails();
    }, [id]);

// Handler for saving results (POST action)
    const handleSaveResults = () => {
        console.log("Saving results with POST action:", resultados);
        // Here goes the code to send the data to the backend with POST
    };

    // Handler for updating results (PUT action)
    const handleUpdateResults = () => {
        console.log("Updating results with PUT action:", resultados);
        // Here goes the code to send the data to the backend with PUT
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
                    <input className="resultados-form-input" name="resultadoParejaUno" value={resultados.resultadoParejaUno} onChange={handleInputChange} {...register("resultadoParejaUno")} />
                </div>
                
                {/* Sección de resultados para la segunda pareja. */}
                <div className="resultados-container">
                    Resultado Segunda Pareja:
                    <span className="numero-margin">{mesaData ? mesaData.pareja_dos : "N/A"}</span>
                    <span className="espacio-derecho">{mesaData ? mesaData.nombre_pareja_dos : "N/A"}</span>
                    <input className="resultados-form-input" name="resultadoParejaDos" value={resultados.resultadoParejaDos} onChange={handleInputChange} {...register("resultadoParejaDos")} />
                </div>
            </div>

            {/* Renderizamos los botones en función del valor de esGuardada.
             Si esGuardada es verdadero, mostramos los botones "Modificar Resultado Mesa" y "Eliminar Resultados". 
             En caso contrario, mostramos "Guardar Resultado Mesa". */}
             { 
            esGuardada 
            ? (
                <div className="button-container">
                    <button type="button" className="btn-primary inscripcion-form-button-left">Modificar Resultado Mesa</button>
                    <button className="btn-danger inscripcion-form-button-right">Eliminar Resultados</button>
                    <div style={{clear: 'both'}}></div> {/* Esto limpia los flotantes para que no afecten a otros elementos */}
                </div>
              )
            : <button type="button" className="btn-primary inscripcion-form-button-left">Guardar Resultado Mesa</button>
        }
        </div>
    );
}
