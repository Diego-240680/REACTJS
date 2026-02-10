import './ContenedorTarjeta.css';     
import 
function ContenedorTarjeta(){
    return(
        <div className="ContenedorTarjeta">
            
            <Tarjeta img={tarjeta1} alt="Tarjeta 1" title="Documental" desc="La fotografia documental tiene la capacidad para detener lo efímero, para convertir lo cotidiano en historia y para recordarnos que la realidad, aunque cambie, puede seguir viva en una imagen." />
            <Tarjeta img={tarjeta2} alt="Tarjeta 2" title="Cultural" desc="La fotografia cultural o etnografica refleja tradiciones, arquitectura y forma de vida." />
            <Tarjeta img={tarjeta3} alt="Tarjeta 3" title="Authenticity" desc="Buscamos mostrar lo real, lo humano. " />
            <Tarjeta img={tarjeta4} alt="Tarjeta 4" title="El ritual cotidiano" desc="La rutina tambien cuenta historias." />
            </div>
    )        
}

function Tarjeta({img, alt, title, desc}){
    return(
        <div className="Tarjeta">
           <img src={img} alt={alt}/>
           <h3>{title}</h3>
           <p>{desc}</p>
           <a href="#">Leer más</a>
        </div>
    )
}
export default ContenedorTarjeta;