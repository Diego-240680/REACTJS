import miLogo from './assets/milogo.png';
import instagram from './assets/instagram.png';
import facebook from './assets/facebook.png';
import x  from './assets/x.png';
import youtube from './assets/youtube.png';
function Encabezado() {
    return (
        <div>
            <Logo />
            <Menu />
            <Redes/>
        <h2>Bienvenido a mi sitio</h2>
    </div>
    );
}

function Logo(){
    return (
     <div>
        <img src={miLogo} alt="React Logo" />
    </div>
    )
}

function Menu(){
    return (
        <nav>
            <ul>
                <li>Inicio</li>
                <li>Acerca de</li>
                <li>Productos</li>
                <li>Contacto</li>
                <li>Sucursales</li>
            </ul>
        </nav>
    )
}

function Redes(){
    return (
        
     <div>
        <img src={instagram} alt="React instagram" />
        <img src={facebook} alt="React facebook" />
        <img src={x} alt="React x" />
        <img src={youtube} alt="React youtube" />
        
    </div>
    )
}

export default Encabezado;