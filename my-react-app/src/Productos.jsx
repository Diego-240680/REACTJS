import { useState, useEffect } from 'react';
import './Productos.css';
import RegistrarProducto from './registrarProducto';
import { createCarrito, createCarritoDetalle, createProducto, deleteProducto, getProductos, updateProducto } from './Services/Services';
import { useAuth } from './AuthContext';

function Productos() {
  const { isLoggedIn, isAdmin, currentUser } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [productoParaEditar, setProductoParaEditar] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const cargarProductos = async () => {
    try {
      setError('');
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error('Error al obtener los productos:', err);
      setError('No se pudieron cargar productos desde tu API.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarEliminar = async (id) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter((p) => p.id !== id));
      setMensaje('Producto eliminado.');
    } catch (err) {
      console.error(err);
      setMensaje('No se pudo eliminar el producto.');
    }
  };

  const seleccionarParaEditar = (producto) => {
    setProductoParaEditar(producto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const guardarProducto = async (producto) => {
    try {
      if (productoParaEditar) {
        await updateProducto(productoParaEditar.id, producto);
        setMensaje('Producto actualizado.');
      } else {
        await createProducto(producto);
        setMensaje('Producto registrado.');
      }
      setProductoParaEditar(null);
      await cargarProductos();
    } catch (err) {
      console.error(err);
      setMensaje('No se pudo guardar el producto. Verifica categoria (id numerico).');
    }
  };

  const manejarAgregarAlCarrito = async (producto) => {
    if (!isLoggedIn || !currentUser?.id) {
      setMensaje('Debes iniciar sesion para agregar al carrito.');
      return;
    }

    try {
      const precio = Number(producto.precio || 0);
      const carrito = await createCarrito({
        id_usuario: currentUser.id,
        estado: 'pendiente',
        total: precio,
      });

      const detalleCreado = await createCarritoDetalle({
        id_carrito: carrito.id,
        id_producto: producto.id,
        cantidad: 1,
        precio_unitario: precio,
      });

      if (detalleCreado) {
        setMensaje('Producto agregado al carrito.');
      } else {
        setMensaje('Producto agregado al carrito (sin detalle, revisa migraciones de carrito_detalle).');
      }
    } catch (err) {
      console.error(err);
      setMensaje('No se pudo agregar al carrito.');
    }
  };

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className="productosDiv">
      <h1>Gestion de Inventario</h1>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}
      {mensaje && <p style={{ color: '#2c3e50' }}>{mensaje}</p>}

      {isAdmin && (
        <RegistrarProducto
          productoEditando={productoParaEditar}
          alGuardar={guardarProducto}
          alCancelar={() => setProductoParaEditar(null)}
        />
      )}

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
              <button className="btn-add" onClick={() => manejarAgregarAlCarrito(producto)}>Agregar al carrito</button>
              {isAdmin && (
                <>
                  <button className="btn-del" onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
                  <button className="btn-edit" onClick={() => seleccionarParaEditar(producto)}>Editar</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
