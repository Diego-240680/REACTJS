import { useState, useEffect } from "react"; 
import "./Productos.css";


function Productos () {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally {
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);
    
    if (cargando) return <p>Cargando productos...</p>;
       
    return (
        <div className="productosDiv">
            <h1>Productos disponibles</h1>
            {productos.map((producto) => (
                <div key={producto.id}>
                    <p>{producto.title}</p>
                    <p>${producto.price}</p>
                    <img src={producto.image} alt={producto.title} />
                </div>
            ))}
        </div> 
    )
}

export default Productos;
