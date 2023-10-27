import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRanking, createRanking, updateRanking, deleteRanking } from '../api/RankingApi';  // Asume que tienes estos endpoints en tu API.
import { useParams, useLocation, useNavigate } from "react-router-dom";

export function RankingFormPages() {
    // Usamos el hook useForm de react-hook-form para gestionar el formulario.
    const { register, handleSubmit, setValue } = useForm();

    // Usamos el hook useParams para obtener el parámetro `id` de la URL (en caso de edición).
    const { id } = useParams();

    // Usamos useLocation para acceder al estado de navegación y obtener el valor de esGuardada (si lo necesitas).
    const location = useLocation();
    const esGuardada = location.state?.esGuardada || false;

    const navigate = useNavigate();

    // Cargar datos en caso de edición.
    useEffect(() => {
        if (id) {
            async function loadRanking() {
                const rankingData = await getRanking(id);
                // Usar `setValue` para asignar los valores al formulario.
                // Por ejemplo: setValue("Nombre_pareja", rankingData.Nombre_pareja);
            }
            loadRanking();
        }
    }, [id]);

    const onSubmit = async (data) => {
        if (id) {
            await updateRanking(id, data);
        } else {
            await createRanking(data);
        }
        navigate("/ruta-donde-quieras-redirigir");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Ejemplo de un campo del formulario. Repite para los demás campos. */}
            <label>
                Nombre Pareja:
                <input {...register("Nombre_pareja")} />
            </label>
            {/* Repite para todos los demás campos del modelo Ranking. */}
            <button type="submit">Guardar</button>
        </form>
    );
}

export default RankingFormPages;
