import miLogo from './assets/milogo.png' ;
import facebook from './assets/facebook.png' ;
import instagram from './assets/instagram.png' ;
import linkedin from './assets/linkedin.png' ;
import whatsapp from './assets/whatsapp.png' ;
import tiktok from './assets/tik-tok.png' ;
import './encabezado.css';

function Encabezado({ menuItems = defaultMenuItems, onMenuClick, currentPage }) {
  return (
    <div className="encabezado">
        <Logo />
        <Menu items={menuItems} onMenuClick={onMenuClick} currentPage={currentPage} />
        <div className="right-section">
            <h2></h2>
            <Redes />
        </div>
    </div>
  );
}

const defaultMenuItems = [
  { label: 'Inicio', href: 'inicio' },
  { label: 'Acerca de', href: 'acerca' },
  { label: 'Productos', href: 'productos' },
  { label: 'Contacto', href: 'contacto' },
  { label: 'Sucursales', href: 'sucursales' },
  { label: 'Galerias', href: 'galerias' }
];
function Logo(){
    return (
        <div className="logoDiv">
            <img src={miLogo} alt="React logo" />
        </div>
    );
}

function Menu({ items, onMenuClick, currentPage }){
    return (
        <div className="menuDiv">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <button 
                            onClick={() => onMenuClick(item.href)}
                            className={currentPage === item.href ? 'active' : ''}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 'inherit',
                                color: currentPage === item.href ? '#007bff' : 'inherit',
                                fontWeight: currentPage === item.href ? 'bold' : 'normal'
                            }}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

function Redes(){
    return (
        <div className= "redesDiv">
            <ul>
                <li><img src={facebook} alt="Facebook" /></li>
                <li><img src={instagram} alt="Instagram" /></li>
                <li><img src={linkedin} alt="Linkedin" /></li>
                <li><img src={whatsapp} alt="Whatsapp" /></li>
                <li><img src={tiktok} alt="Tiktok" />  
                </li>
            </ul>
        </div>
    );
}
export default Encabezado; 