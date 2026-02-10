import './pie.css';

function Pie() {
  return (
    <footer className="pie">
      <div className="pie-content">
        <p>&copy; 2024 Mi Aplicación React. Todos los derechos reservados</p>
        <div className="pie-links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Servicio</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

export default Pie;