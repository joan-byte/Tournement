import axios from 'axios';

const caractApi = axios.create({ baseURL: 'http://localhost:8000/caracteristicas/api/v1/' });

export const getallCaracter = () => {return caractApi.get('/caracteristicas/');};
export const getCaracter = (id) => {return caractApi.get(`caracteristicas/${id}/`);};
export const createCaracter = (caracteristicas) => {return caractApi.post('caracteristicas/', caracteristicas);};
export const deleteCaracter = (id) => {return caractApi.delete(`caracteristicas/${id}/`);};
export const updateCaracter = (id, caracteristicas) => {return caractApi.put(`caracteristicas/${id}/`, caracteristicas);};
