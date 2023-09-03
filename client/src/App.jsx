// Importamos los componentes y funciones necesarios de 'react-router-dom' para manejar la navegación y las rutas.
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// Importamos los componentes de las páginas para cada ruta.
import {CaracterPages} from './pages/CaracterPages/';
import {CaracterFormPages} from './pages/CaracterFormPages/';
import {InscripcionFormPages} from './pages/InscripcionFormPages';
import {InscripcionPages} from './pages/InscripcionPages';
import {MesasPages} from './pages/MesasPages';  // Importación de MesasPages
import {MesasFormPages} from './pages/MesasFormPages';  // Importación de MesasFormPages
import {MesasPorNumero} from './pages/MesasPorNumero'; // Importación de MesasPorNumero. 
import ResultadosPages from './pages/ResultadosPages';  // Importación de ResultadosPages
import {ResultadosFormPages} from './pages/ResultadosFormPages';  // Importación de ResultadosFormPages

// Importamos el componente de navegación.
import {Navigation} from './components/Navigation/';

// Importamos los estilos de Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css';

// Definimos el componente principal "App".
function App() {
  return (
    // Utilizamos el componente 'BrowserRouter' para envolver todas las rutas de nuestra aplicación.
    <BrowserRouter> 
      {/* Insertamos el componente de navegación.*/}
      <Navigation />
      
      {/* Definimos las rutas de la aplicación.*/}
      <Routes> 
        // Ruta por defecto que redirige a "/caracteristicas".
        <Route path="/" element={<Navigate to="/caracteristicas" />} />

        // Rutas relacionadas con características.
        <Route path="/caracteristicas" element={<CaracterPages />} />
        <Route path="/caracteristicas/:id" element={<CaracterFormPages />} />
        <Route path="/caracteristicas-create" element={<CaracterFormPages />} />

        // Rutas relacionadas con inscripciones.
        <Route path="/inscripciones" element={<InscripcionPages />} />
        <Route path="/inscripciones-create" element={<InscripcionFormPages />} />
        <Route path="/inscripciones/:id" element={<InscripcionFormPages />} />

        // Rutas relacionadas con mesas.
        <Route path="/mesas" element={<MesasPages />} />
        <Route path="/mesas/:id" element={<MesasFormPages />} />
        <Route path="/mesas-por-numero" element={<MesasPorNumero />} />

        // Rutas relacionadas con resultados.
        <Route path="/resultados" element={<ResultadosPages />} />
        <Route path="/resultados-create" element={<ResultadosFormPages />} />
        <Route path="/resultados/:id" element={<ResultadosFormPages />} />
        <Route path="/resultados/:mesa/:pareja" element={<ResultadosFormPages />} />
      </Routes>
    </BrowserRouter>
  )
}

// Exportamos el componente "App" para ser utilizado en otros lugares de la aplicación.
export default App;
