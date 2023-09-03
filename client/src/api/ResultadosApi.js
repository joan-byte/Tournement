import axios from 'axios';

// Configuración inicial de axios para el endpoint de resultados.
const resultadosApi = axios.create({ baseURL: 'http://localhost:8000/resultados/api/v1/resultados' });

// Funciones relacionadas con resultados.

// Obtener todos los resultados.
export const getAllResultados = () => {return resultadosApi.get('/');};

// Obtener un resultado específico por ID.
export const getResultado = (id) => {return resultadosApi.get(`/${id}/`);};

// Crear un nuevo resultado.
export const createResultado = (resultado) => {return resultadosApi.post('/', resultado);};

// Eliminar un resultado específico por ID.
export const deleteResultado = (id) => {return resultadosApi.delete(`/${id}/`);};

// Actualizar un resultado específico por ID.
export const updateResultado = (id, resultado) => {return resultadosApi.put(`/${id}/`, resultado);};

// Aquí podrías agregar cualquier otra función relacionada con resultados si es necesario.
