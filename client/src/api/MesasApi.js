import axios from 'axios';

const mesasApi = axios.create({ baseURL: 'http://localhost:8000/mesas/api/v1/mesas' });

// Función para ejecutar mesas_primera
export const ejecutarMesasPrimera = () => {
    return mesasApi.post('/ejecutar_primera/');
};

// Otras funciones relacionadas con mesas podrían ir aquí...

export const getAllMesas = () => {return mesasApi.get('/');};
export const getMesa = (id) => {return mesasApi.get(`/${id}/`);};
export const createMesa = (mesa) => {return mesasApi.post('/', mesa);};
export const deleteMesa = (id) => {return mesasApi.delete(`/${id}/`);};
export const updateMesa = (id, mesa) => {return mesasApi.put(`/${id}/`, mesa);};
