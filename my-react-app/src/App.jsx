import { useState } from 'react';
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import Pie from "./Pie";
import Promociones from "./Promociones";
import './App.css';

function App(){
  const [currentPage, setCurrentPage] = useState('inicio');

  const menuItems = [
    { label: 'Inicio', href: 'inicio' },
    { label: 'Acerca de', href: 'acerca' },
    { label: 'Productos', href: 'productos' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Sucursales', href: 'sucursales' },
    { label: 'Galerias', href: 'galerias' }
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'inicio':
        return (
          <>
            <ContenedorTarjeta />
            <Promociones />
          </>
        );
      case 'acerca':
        return <div className="page-content"><h2>Acerca de Nosotros</h2><p>Contenido sobre la empresa...</p></div>;
      case 'productos':
        return <div className="page-content"><h2>Productos</h2><p>Catálogo de productos...</p></div>;
      case 'contacto':
        return <div className="page-content"><h2>Contacto</h2><p>Información de contacto...</p></div>;
      case 'sucursales':
        return <div className="page-content"><h2>Sucursales</h2><p>Ubicación de nuestras sucursales...</p></div>;
      case 'galerias':
        return <div className="page-content"><h2>Galerías</h2><p>Galería de fotos...</p></div>;
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
   
  ) 
}

function UserComponent(){
  
  const nombre = 'Andrea';
  const apellidos = 'Rodriguez Morales';
  const nombrecompleto = <h2>El nombre es: {nombre} y sus apellidos {apellidos}</h2>;
  return <h1>User Component {nombrecompleto}</h1>;
}

function ProfileComponent(){
  const users = [
    {id: 1, name: 'Andrea', role: 'Web Developer'},
    {id: 2, name: 'Diego', role: 'Web Designer'},
    {id: 3, name: 'Paola', role: 'Team Leader'},]
  return (
    <>
    <p>Lista de usuarios del sistema</p>
    <ul>
      {
      users.map (function(user,index) {
        return (
          <li key={index}>{user.name} es un {user.role}</li>
        )
      })
    }
    </ul>
    </>

  );
}

function FeedComponent(){
  const users=[
    {id:1, name:'pala', role:'Materiales de construcción'},
    {id:2, name:'martillo', role:'Herramientas de construcción'},
    {id:3, name:'cemento', role:'Materiales de construcción'},
    {id:4, name:'ladrillo', role:'Materiales de construcción'},
    {id:5, name:'nivel', role:'Herramientas de construcción'},
  ]
   return (
    <>
    <p>Lista de materiales del sistema</p>
    <ul>
      {
      users.map (function(user,index) {
        return (
          <li key={index}>{user.name} es un {user.role}</li>
        )
      })
    }
    </ul>
    </>

  );
}

 
  


export default App