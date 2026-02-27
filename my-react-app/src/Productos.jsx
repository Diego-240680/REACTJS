import { useState, useEffect } from "react"; 
import "./Productos.css";
import RegistrarProducto from "./registrarProducto";

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

    // Funciones para los botones
    const manejarAgregar = (id) => {
        console.log("Producto agregado:", id);
    };

    const manejarEliminar = (id) => {
        setProductos(productos.filter(p => p.id !== id));
    };
    
    if (cargando) return <p>Cargando productos...</p>;
        
    return (
        <div className="productosDiv">
             <h1>Productos disponibles</h1>
            <RegistrarProducto />
           
            {productos.map((producto) => (
                <div key={producto.id}>
                    <p>{producto.title}</p>
                    <p>${producto.price}</p>
                    <img src={producto.image} alt={producto.title} />
                    
                    {/* Botones añadidos manteniendo el orden */}
                    <div>
                        <button onClick={() => manejarAgregar(producto.id)}>Agregar</button>
                        <button onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
                    </div>
                </div>
            ))}
        </div> 
    )
}

export default Productos;