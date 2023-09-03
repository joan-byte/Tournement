import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMesas } from '../api/MesasApi';

export function MesasPorNumero() {
    const [mesasData, setMesasData] = useState([]); // Estado para almacenar los datos de las mesas
    const navigate = useNavigate();

    // Recupera el estado inicial de los checkboxes de localStorage
    const initialCheckboxState = JSON.parse(localStorage.getItem('mesasGuardadas')) || {};
    const [mesasGuardadas, setMesasGuardadas] = useState(initialCheckboxState);

    // Maneja el cambio en los checkboxes y actualiza el estado y localStorage
    const handleCheckboxChange = (numero, event) => {
        event.stopPropagation();
        const updatedState = {
            ...mesasGuardadas,
            [numero]: event.target.checked
        };
        setMesasGuardadas(updatedState);
        localStorage.setItem('mesasGuardadas', JSON.stringify(updatedState));
    };

    // Maneja el clic en una fila, recupera el estado del checkbox y navega a ResultadosFormPages
    const handleRowClick = (mesaNumero) => {
        const esGuardada = !!mesasGuardadas[mesaNumero];
        navigate(`/resultados/${mesaNumero}/`, { state: { esGuardada } });
    };

    // Al montar el componente, recupera los datos de las mesas
    useEffect(() => {
        getAllMesas().then(response => {
            setMesasData(response.data);
        }).catch(error => {
            console.error("Error fetching mesas data:", error);
        });
    }, []);

    return (
        <div className="container mesas-container">
            {mesasData.length > 0 && mesasData[0].numero && <h2 className="mesas-title">Partida {mesasData[0].partida}</h2>}
            {mesasData.map((mesa) => (
                <div key={mesa.numero} className="mesas-item-container">
                    <div className="checkbox-item mesas-flex-center">
                        <input 
                            type="checkbox" 
                            className="mesas-checkbox"
                            checked={mesasGuardadas[mesa.numero] || false}
                            onChange={(event) => handleCheckboxChange(mesa.numero, event)}
                        />
                    </div>
                    <table className="mesas-table">
                        <tbody>
                            <tr onClick={() => handleRowClick(mesa.numero)} className="mesas-row">
                                <td>{mesa.numero}</td>
                                <td>{mesa.pareja_uno}</td>
                                <td>{mesa.nombre_pareja_uno}</td>
                                <td>{mesa.pareja_dos || 'N/A'}</td>
                                <td>{mesa.nombre_pareja_dos || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};
