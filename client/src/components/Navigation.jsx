// Importamos los componentes y funciones necesarios de las bibliotecas.
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Definimos el componente de navegación.
export function Navigation() {
    return (
        // Componente Navbar de react-bootstrap que representa la barra de navegación.
        <Navbar bg="light" expand="lg">
            
            {/*  Componente que representa el título o marca de la barra de navegación.*/}
            <Navbar.Brand href="#home">Campeonato</Navbar.Brand>
            
            {/* Componente que representa el botón para expandir o colapsar el menú en dispositivos móviles. */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            {/* Componente que envuelve los elementos de navegación. */}
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    
                {/* Menú desplegable para la sección "Caracteristicas". */}                
                        <NavDropdown title="Caracteristicas" id="caracteristicas-dropdown">
                        {/* Opción para crear características. */}
                        <NavDropdown.Item as={Link} to="/caracteristicas-create">Campeonato</NavDropdown.Item>
                        {/* Opción para listar características. */}
                        <NavDropdown.Item as={Link} to="/caracteristicas">Lista Campeonatos</NavDropdown.Item>
                    </NavDropdown>
                    
                    {/* Menú desplegable para la sección "Inscripciones". */}
                    <NavDropdown title="Inscripciones" id="inscripciones-dropdown">
                        {/* Opción para crear inscripciones. */}
                        <NavDropdown.Item as={Link} to="/inscripciones-create">Inscripcion Parejas</NavDropdown.Item>
                        {/* Opción para listar inscripciones. */}
                        <NavDropdown.Item as={Link} to="/inscripciones">Lista Parejas</NavDropdown.Item>
                    </NavDropdown>
                    
                    {/* Menú desplegable para la sección "Mesas". */}
                    <NavDropdown title="Mesas" id="mesas-dropdown">
                        {/* Opción para listar mesas. */}
                        <NavDropdown.Item as={Link} to="/mesas">Lista de Mesas</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/mesas-por-numero">Mesas por Numero</NavDropdown.Item>
                    </NavDropdown>
                    {/* Menú desplegable para la sección "Resultados". */}
                    <NavDropdown title="Resultados" id="resultados-dropdown">
                        <NavDropdown.Item as={Link} to="/resultados">Lista de Resultados</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ranking">Ranking</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
