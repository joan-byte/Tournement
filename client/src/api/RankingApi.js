import axios from 'axios';

// Configuración inicial de axios para el endpoint de ranking.
const rankingApi = axios.create({ baseURL: 'http://localhost:8000/ranking/api/v1' });

// Funciones relacionadas con ranking.

// Obtener todos los rankings.
export const getAllRankings = () => {
    return rankingApi.get('/');
};
// Obtener todos los rankings ordenados.
export const getOrderedRankings = () => {
    return rankingApi.get('/ranking_ordered/');
};

// Obtener un ranking específico por ID.
export const getRanking = (id) => {
    return rankingApi.get(`/${id}/`);
};

// Crear un nuevo ranking.
export const createRanking = (ranking) => {
    return rankingApi.post('/', ranking);
};

// Eliminar un ranking específico por ID.
export const deleteRanking = (ranking_id) => {
    return rankingApi.delete(`/${ranking_id}/`);
};

// Actualizar un ranking específico por ID.
export const updateRanking = (ranking_id, ranking) => {
    return rankingApi.put(`/${ranking_id}/`, ranking);
};

// Aquí podrías agregar cualquier otra función relacionada con ranking si es necesario.
