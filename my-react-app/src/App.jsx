import { useState } from "react";
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./encabezado";
import Pie from "./Pie";
import Promociones from "./Promociones";
import Productos from "./Productos";
import Usuarios from "./Usuarios"; 
import Carrito from "./Carrito";
import Login from "./Login"; 
// 1. IMPORTAR EL NUEVO COMPONENTE
import Categorias from "./Categorias"; 
import './App.css';

function App(){
  const [currentPage, setCurrentPage] = useState('login');

  const menuItems = [
    { label: 'Inicio', href: 'inicio' },
    // 2. AÑADIR A LA LISTA DEL MENÚ
    { label: 'Categorías', href: 'categorias' }, 
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Galerias', href: 'galerias' },
    { label: 'Usuarios', href: 'usuarios' },
    { label: 'Carrito', href: 'carrito' },
    { label: 'Login', href: 'login' },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login />;
      case 'inicio':
        return (
          <>
            <ContenedorTarjeta />
            <Promociones />
          </>
        );
      // 3. AGREGAR EL CASO 'categorias' PARA EL RENDERIZADO
      case 'categorias':
        return <Categorias />;
      case 'acerca':
        return <div className="page-content"><h2>Acerca de Nosotros</h2><p>Contenido sobre la empresa...</p></div>;
      case 'productos':
        return <Productos />;
      case 'contacto':
        return <div className="page-content"><h2>Contacto</h2><p>Información de contacto...</p></div>;
      case 'sucursales':
        return <div className="page-content"><h2>Sucursales</h2><p>Ubicación de nuestras sucursales...</p></div>;
      case 'galerias':
        return <div className="page-content"><h2>Galerías</h2><p>Galería de fotos...</p></div>;
      case 'usuarios':
        return <Usuarios />;
      case 'carrito':
        return <Carrito />;
      default:
        return <ContenedorTarjeta />;
    }
  };

  return ( 
    <div className="app-container"> 
      <div className="app-content">
        <Encabezado menuItems={menuItems} onMenuClick={setCurrentPage} currentPage={currentPage} />
        {renderPage()}
      </div>
      <Pie />
    </div>
  );
}

export default App;