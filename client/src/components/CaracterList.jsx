import {useEffect, useState} from 'react'
import {getallCaracter} from '../api/CaracterApi'
import {CaracterCard} from './CaracterCard'

export function CaracterList() {
    const [caracter, setCaracter] = useState([])
    useEffect(() => { 
        async function loadCaracter() {
            const res = await getallCaracter();
            setCaracter(res.data);
        }
        loadCaracter() 
    }, []) 

    return (
        <div>
            {caracter.map((caracter) => (
                <CaracterCard key={caracter.id} caracter={caracter} />  
            ))}
        </div>
    ) // Aquí se cierra el return
} // Aquí se cierra la función CaracterList
