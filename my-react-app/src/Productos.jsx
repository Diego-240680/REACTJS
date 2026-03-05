import { useState, useEffect } from "react"; 
import "./Productos.css";
import RegistrarProducto from "./registrarProducto";

function Productos () {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    // ESTADO CLAVE: Guarda el producto que seleccionamos para editar
    const [productoParaEditar, setProductoParaEditar] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                // Adaptamos los datos de la API a tus nombres de campo
                const adaptados = data.map(p => ({
                    id: p.id,
                    nombre: p.title,
                    precio: p.price,
                    categoria: p.category,
                    descripcion: p.description,
                    imagen: p.image
                }));
                setProductos(adaptados);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally {
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);

    // Funciones de acción
    const manejarAgregar = (id) => console.log("Agregado:", id);

    const manejarEliminar = (id) => {
        setProductos(productos.filter(p => p.id !== id));
    };

    const seleccionarParaEditar = (producto) => {
        setProductoParaEditar(producto);
        // Opcional: Desplazar hacia arriba para ver el formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const actualizarProducto = (productoActualizado) => {
        setProductos(productos.map(p => 
            p.id === productoActualizado.id ? productoActualizado : p
        ));
        setProductoParaEditar(null); // Limpiamos la selección
    };

    if (cargando) return <p>Cargando productos...</p>;
        
    return (
        <div className="productosDiv">
            <h1>Gestión de Inventario</h1>
            
            {/* Pasamos los estados y funciones al Formulario */}
            <RegistrarProducto 
                productoEditando={productoParaEditar} 
                alGuardar={actualizarProducto}
                alCancelar={() => setProductoParaEditar(null)}
            />
           
           <div className="productos-grid">
                {productos.map((producto) => (
                    <div key={producto.id} className="producto-card-simple">
                        <img src={producto.image || producto.imagen} alt={producto.nombre} />
                        <div className="info">
                            <p className="titulo">{producto.nombre}</p>
                            <p className="precio">${producto.precio}</p>
                            <p className="cat">{producto.categoria}</p>
                        </div>
                        
                        <div className="acciones-lista">
                            <button className="btn-add" onClick={() => manejarAgregar(producto.id)}>Agregar</button>
                            <button className="btn-del" onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
                            <button className="btn-edit" onClick={() => seleccionarParaEditar(producto)}>Editar</button>
                        </div>
                    </div>
                ))}
           </div>
        </div> 
    )
}

export default Productos;