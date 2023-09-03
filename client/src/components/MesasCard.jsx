// Definimos el componente "MesasCard", que recibe como props "pareja" y "mesa".
export function MesasCard({ pareja, mesa }) {
  // Retornamos el JSX del componente.
  return (
    // Definimos un div con la clase "mesas-card".
    <div className="mesas-card">
      {/* Dentro del div, mostramos el texto con el número de pareja y el número de mesa. */}
      <p className="mesas-card-text">Pareja {pareja}: Mesa {mesa}</p>
      {/* Añadimos un separador visual. */}
      <hr className="mesas-card-divider"/>
    </div>
  );
}
