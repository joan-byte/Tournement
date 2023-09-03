import axios from 'axios';


const inscripcionApi = axios.create({ baseURL: 'http://localhost:8000/inscripcion/api/v1/inscripcion' });

export const getAllInscripcion = () => {return inscripcionApi.get('/');};
export const getInscripcion = (id) => {return inscripcionApi.get(`/${id}/`);};
export const createIncripcion = (inscripcion) => {return inscripcionApi.post('/', inscripcion);};
export const deleteInscripcion= (id) => {return inscripcionApi.delete(`/${id}/`);};
export const updateIncripcion = (id, inscripcion) => {return inscripcionApi.put(`/${id}/
`, inscripcion);};