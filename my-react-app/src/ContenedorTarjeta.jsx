import './ContenedorTarjeta.css';     
import tarjeta1 from './assets/milogo.png';
import tarjeta2 from './assets/milogo.png';
import tarjeta3 from './assets/milogo.png'; // Asegúrate de que esta imagen exista
import tarjeta4 from './assets/milogo.png'; // Asegúrate de que esta imagen exista

function Tarjeta({ img, alt, title, desc }) {
    return (
        <div className="Tarjeta">
            <img src={img} alt={alt} />
            <h3>{title}</h3>
            <p>{desc}</p>
            <a href="#">Leer más</a>
        </div>
    );
}

function ContenedorTarjeta() {
    return (
        <div className="ContenedorTarjeta">
            <Tarjeta img={tarjeta1} alt="Tarjeta 1" title="Documental" desc="La fotografía documental tiene la capacidad para detener lo efímero, para convertir lo cotidiano en historia y para recordarnos que la realidad, aunque cambie, puede seguir viva en una imagen." />
            <Tarjeta img={tarjeta2} alt="Tarjeta 2" title="Cultural" desc="La fotografía cultural o etnográfica refleja tradiciones, arquitectura y forma de vida." />
            <Tarjeta img={tarjeta3} alt="Tarjeta 3" title="Authenticity" desc="Buscamos mostrar lo real, lo humano." />
            <Tarjeta img={tarjeta4} alt="Tarjeta 4" title="El ritual cotidiano" desc="La rutina también cuenta historias." />
        </div>
    );
}

export default ContenedorTarjeta;