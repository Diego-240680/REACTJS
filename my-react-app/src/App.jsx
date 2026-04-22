import { useEffect, useState } from 'react';
import ContenedorTarjeta from './ContenedorTarjeta';
import Encabezado from './encabezado';
import Pie from './Pie';
import Promociones from './Promociones';
import Productos from './Productos';
import Usuarios from './Usuarios';
import Carrito from './Carrito';
import Login from './Login';
import Categorias from './Categorias';
import { useAuth } from './AuthContext';
import './App.css';

function App() {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState('inicio');

  const publicMenuItems = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Login', href: 'login' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Contacto', href: 'contacto' },
  ];

  const privateMenuItems = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Categorias', href: 'categorias' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Galeria', href: 'galerias' },
    { label: 'Usuarios', href: 'usuarios' },
    { label: 'Carrito', href: 'carrito' },
    { label: 'Cerrar sesion', href: 'logout' }
  ];

  const menuItems = isLoggedIn ? privateMenuItems : publicMenuItems;

  useEffect(() => {
    if (!isLoggedIn && ['categorias', 'usuarios', 'carrito', 'logout'].includes(currentPage)) {
      setCurrentPage('inicio');
    }
  }, [isLoggedIn, currentPage]);

  const handleMenuClick = (page) => {
    if (page === 'logout') {
      logout();
      setCurrentPage('inicio');
      return;
    }

    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLoginSuccess={() => setCurrentPage('inicio')} />;
      case 'inicio':
        return (
          <>
            <ContenedorTarjeta />
            <Promociones />
          </>
        );
      case 'categorias':
        return isAdmin ? <Categorias /> : <div className="page-content"><h2>Sin permiso</h2><p>Solo admin puede entrar a Categorias.</p></div>;
      case 'acerca':
        return <div className="page-content"><h2>Acerca de Nosotros</h2><p>Contenido sobre la empresa...</p></div>;
      case 'productos':
        return <Productos />;
      case 'contacto':
        return <div className="page-content"><h2>Contacto</h2><p>Informacion de contacto...</p></div>;
      case 'sucursales':
        return <div className="page-content"><h2>Sucursales</h2><p>Ubicacion de nuestras sucursales...</p></div>;
      case 'galerias':
        return <div className="page-content"><h2>Galerias</h2><p>Galeria de fotos...</p></div>;
      case 'usuarios':
        return isAdmin ? <Usuarios /> : <div className="page-content"><h2>Sin permiso</h2><p>Solo admin puede entrar a Usuarios.</p></div>;
      case 'carrito':
        return <Carrito />;
      default:
        return <ContenedorTarjeta />;
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <Encabezado menuItems={menuItems} onMenuClick={handleMenuClick} currentPage={currentPage} />
        {renderPage()}
      </div>
      <Pie />
    </div>
  );
}

export default App;
