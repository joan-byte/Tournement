import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createIncripcion, deleteInscripcion, getInscripcion, updateIncripcion } from "../api/InscripcionApi";
import { useNavigate, useParams } from "react-router-dom";

export function InscripcionFormPages() {
    // Utilizar react-hook-form para gestionar el formulario
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // Navegar y obtener parámetros desde la URL
    const navigate = useNavigate();
    const params = useParams();

    // Estado local para determinar si las inscripciones están cerradas
    const [insCerrada, setInsCerrada] = useState(false);

    // Cargar el estado de insCerrada desde el almacenamiento local al montar el componente
    useEffect(() => {
        const storedInsCerrada = localStorage.getItem('insCerrada');
        if (storedInsCerrada !== null) {
            setInsCerrada(storedInsCerrada === 'true');
        }
    }, []);

    // Función para gestionar el envío del formulario
    const onSubmit = async (data) => {
        if (params.id) {
            await updateIncripcion(params.id, data);
        } else {
            try {
                await createIncripcion(data);
            } catch (error) {
                console.error("Error while creating inscripcion:", error);
            }
        }
        navigate('/inscripciones');
    };

    // Cargar datos de la inscripción si estamos editando
    useEffect(() => {
        async function loadInscripcion() {
            if (params.id) {
                const res = await getInscripcion(params.id);
                setValue("Jugador1", res.data.Jugador1);
                setValue("Jugador2", res.data.Jugador2);
                setValue("Club_pertenencia", res.data.Club_pertenencia);
            }
        }
        loadInscripcion();
    }, []);

    return (
        <div className="inscripcion-form-container">
            <h1 className="inscripcion-form-title">Inscripcion de Jugadores</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="inscripcion-form">

                <div className="inscripcion-form-row">
                    <label className="inscripcion-form-label">Primer Jugador:</label>
                    <input type="text" placeholder="Primer Jugador" className="inscripcion-form-input"
                    {...register("Jugador1", { required: true })} />

                    <label className="inscripcion-form-label">Segundo Jugador:</label>
                    <input type="text" placeholder="Segundo Jugador" className="inscripcion-form-input"
                    {...register("Jugador2", { required: true })} />

                    <label className="inscripcion-form-label">Club de Pertenencia:</label>
                    <input type="text" placeholder="Club de Pertenencia" className="inscripcion-form-input"
                    {...register("Club_pertenencia", { required: false })} />
                </div>

                <div className="inscripcion-form-buttons">
                    <button className="btn-primary inscripcion-form-button-left" disabled={insCerrada}>Guardar</button>

                    {params.id && <button onClick={async ()=> {
                        const accepted = window.confirm("¿Estas seguro que deseas borrar esta Pareja?")
                        if(accepted){
                            await deleteInscripcion(params.id);
                            navigate('/inscripciones');
                        }
                    }} className="btn-danger inscripcion-form-button-right" disabled={insCerrada}>Borrar</button>}
                </div>
            </form>
        </div>
    );
}
