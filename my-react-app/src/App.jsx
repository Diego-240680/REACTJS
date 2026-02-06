import React from "react";
import Encabezado from "./encabezado";
import './App.css';
import Card from './Card';
import reactImg from './assets/react.svg';
import miLogo from './assets/milogo.png';

function App(){
  return (
    <div className="app-root">
      <Encabezado />
      <main className="main-content">
        <section className="cards-row">
          <Card image={miLogo} title="Java">
            lenguaje de programación de propósito general orientado a objetos y multiplataforma. Código compilado.
          </Card>
          <Card image={reactImg} title="Python">
            lenguaje de programación de alto nivel, interpretado y de código abierto, famoso por su sintaxis clara.
          </Card>
          <Card image={reactImg} title="JavaScript">
            JavaScript es un lenguaje de programación ligero, interpretado y orientado a objetos para páginas web.
          </Card>
          <Card image={miLogo} title="PHP">
            lenguaje de código abierto muy popular, utilizado principalmente para desarrollo web del lado del servidor.
          </Card>
        </section>

        <section className="promotions">
          <div className="promo-inner">
            <h2>Promociones</h2>
            <p>Aprovecha nuestras ofertas exclusivas y promociones especiales diseñadas para brindarte el mejor valor.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2024 Mi Aplicación React. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;

