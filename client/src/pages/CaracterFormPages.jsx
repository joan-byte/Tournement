import "react-datepicker/dist/react-datepicker.css";
import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect, useForm } from "react";
import DatePicker from "react-datepicker";
import { createCaracter,deleteCaracter,updateCaracter,getCaracter } from "../api/CaracterApi";

export function CaracterFormPages() {
  const params = useParams();
  console.log("useParams values:", params);
  const [nombreCampeonato, setNombreCampeonato] = useState("");
  const [lugarCampeonato, setLugarCampeonato] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [numeroPartidas, setNumeroPartidas] = useState(0);
  const [serieB, setSerieB] = useState(false);
  const [puntosTotales, setPuntosTotales] = useState(false);
  const [logo, setLogo] = useState(null);
  const [caracteres, setCaracteres] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Comprueba si params.id tiene un valor
    if (params.id) {
      
       // updateCaracter();
    } else {
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);
        const fechaInicioFormatted = `${fechaInicioDate.getFullYear()}-${fechaInicioDate.getMonth() + 1}-${fechaInicioDate.getDate()}`;
        const fechaFinFormatted = `${fechaFinDate.getFullYear()}-${fechaFinDate.getMonth() + 1}-${fechaFinDate.getDate()}`;

        if (!nombreCampeonato || !lugarCampeonato || !fechaInicio || !fechaFin || !numeroPartidas) {
            alert("Por favor, rellene todos los campos");
            return;
        }
        if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
            alert("La fecha de finalización debe ser posterior a la fecha de inicio");
            return;
        }

        const formData = new FormData();

        /* Log the values before appending them to FormData
        console.log('nombreCampeonato:', nombreCampeonato);
        console.log('logo:', logo);
        console.log('fechaInicio:', fechaInicioFormatted);
        console.log('fechaFin:', fechaFinFormatted);
        console.log('numeroPartidas:', numeroPartidas);
        console.log('serieB:', serieB);
        console.log('puntosTotales:', puntosTotales);
        console.log('lugarCampeonato:', lugarCampeonato);*/

        formData.append('params.id', params.id);
        formData.append('nombre_campeonato', nombreCampeonato);
        formData.append('logo', logo);
        formData.append('fecha_inicio', fechaInicioFormatted);
        formData.append('fecha_fin', fechaFinFormatted);
        formData.append('num_partidas', numeroPartidas);
        formData.append('serieB', serieB);
        formData.append('puntos_totales', puntosTotales);
        formData.append('lugar', lugarCampeonato);

        console.log('formData:', formData);
        
      

        try {
            const newCaracter = await createCaracter(formData);
            setCaracteres([...caracteres, newCaracter]);
            console.log(newCaracter);
        } catch (error) {
            console.error(error);
        }
    }
  };
  
  useEffect(() => {
    async function loadCaracteristicas() {
      if (params.id) {
        console.log("obteniendo datos");
        const res = await getCaracter(params.id);
        console.log(res);
        
        setNombreCampeonato(res.data.nombre_campeonato || "");
        setLugarCampeonato(res.data.lugar || "");
        setFechaInicio(res.data.fecha_inicio ? new Date(res.data.fecha_inicio) : null);
        setFechaFin(res.data.fecha_fin ? new Date(res.data.fecha_fin) : null);
        setNumeroPartidas(res.data.num_partidas || 0);
        setSerieB(res.data.serieB || false);
        setPuntosTotales(res.data.puntos_totales || false);
        if (res.data.logo) {
          setLogo(res.data.logo);
        }
      }
    }
    loadCaracteristicas();
  }, [params.id]);
  
    
  const navigate = useNavigate();
  return (
    <div>
      <h1>Formulario de Características</h1>
      <form onSubmit={handleSubmit}>
        <h2>Nombre del Campeonato</h2>
        <input
          type="text"
          value={nombreCampeonato}
          onChange={(event) => setNombreCampeonato(event.target.value)}
        />
        <h2>Lugar del Campeonato</h2>
        <input
          type="text"
          value={lugarCampeonato}
          onChange={(event) => setLugarCampeonato(event.target.value)}
        />
        <h2>Fecha de Inicio</h2>
        <DatePicker
          selected={fechaInicio}
          onChange={(date) => setFechaInicio(date)}
          dateFormat="dd/MM/yyyy"
        />
        <h2>Fecha de Fin</h2>
        <DatePicker
          selected={fechaFin}
          onChange={(date) => setFechaFin(date)}
          dateFormat="dd/MM/yyyy"
        />
        <h2>Número de Partidas</h2>
        <input
          type="number"
          value={numeroPartidas}
          onChange={(event) => setNumeroPartidas(event.target.value)}
        />
        <h2>Serie B</h2>
        <input
          type="checkbox"
          checked={serieB}
          onChange={(event) => setSerieB(event.target.checked)}
        />
        <h2>Puntos Totales</h2>
        <input
          type="checkbox"
          checked={puntosTotales}
          onChange={(event) => setPuntosTotales(event.target.checked)}
        />
        <h2>Logo</h2> {/* Agregamos el campo de imagen */}
        <input type="file" onChange={(event) => setLogo(event.target.files[0])} />
      
      </form>
      {
      
        <div className="button-container">
            <button type="submit" className="btn-primary inscripcion-form-button-left">Guardar</button>
            {
                params.id && 
                <button className="btn-danger inscripcion-form-button-right" onClick={async () => {
                    const confirmar = window.confirm("¿Está seguro que desea eliminar el campeonato?");
                    if(confirmar){
                        await deleteCaracter(params.id);
                        navigate("/caracteristicas");
                    }
                }}>Eliminar</button>
            }
        </div>

      }
      
    </div>
  );
}