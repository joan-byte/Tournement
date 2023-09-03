import {useEffect, useState} from 'react'
import {getAllMesas} from '../api/MesasApi'
import {MesasCard} from './MesasCard'

// El componente MesasList muestra una lista de parejas junto con sus mesas correspondientes.
export function MesasList() {
    const [mesas, setMesas] = useState([])
    const [parejas, setParejas] = useState([])
    
    useEffect(() => { 
        async function loadMesas() {
            const res = await getAllMesas();
            setMesas(res.data);

            // Se crea un arreglo que contiene cada pareja con su mesa correspondiente.
            let parejasTemp = [];
            res.data.forEach(mesa => {
                if (mesa.pareja_uno) parejasTemp.push({ pareja: mesa.pareja_uno, mesa: mesa.numero });
                if (mesa.pareja_dos) parejasTemp.push({ pareja: mesa.pareja_dos, mesa: mesa.numero });
            });
            // Se ordena el arreglo por el ID de la pareja.
            parejasTemp.sort((a, b) => parseInt(a.pareja) - parseInt(b.pareja));
            setParejas(parejasTemp);
        }
        loadMesas() 
    }, []) 

    return (
        <>
        
            <div className="partida-title">Partida: {mesas[0]?.partida || "N/A"}</div>

            {/* Se utiliza flexbox para mostrar las tarjetas en una matriz de 5 de ancho.*/}
            
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {parejas.map(p => (
             <MesasCard key={p.pareja} pareja={p.pareja} mesa={p.mesa} />
            ))}
            </div>
        </>
        
    )
}
