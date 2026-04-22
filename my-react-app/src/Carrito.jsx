import { useEffect, useState } from 'react';
import './Carrito.css';
import { deleteCarrito, getCarritoDetallesByCarrito, getCarritos, getCarritosByUsuario, getProductos } from './Services/Services';
import { useAuth } from './AuthContext';

function Carrito() {
  const { isLoggedIn, isAdmin, currentUser } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  const cargarCarritos = async () => {
    if (!isLoggedIn) {
      setOrdenes([]);
      setCargando(false);
      return;
    }

    try {
      setError('');
      const [productos, carritosBase] = await Promise.all([
        getProductos(),
        isAdmin ? getCarritos() : getCarritosByUsuario(currentUser?.id),
      ]);

      const mapaProductos = new Map(productos.map((p) => [Number(p.id), p.nombre]));

      const carritosConDetalle = await Promise.all(
        carritosBase.map(async (carrito) => {
          const detalles = await getCarritoDetallesByCarrito(carrito.id);
          return {
            ...carrito,
            detalles,
            total: carrito.total ?? 0,
          };
        })
      );

      const carritosNormalizados = carritosConDetalle.map((carrito) => ({
        ...carrito,
        detalles: carrito.detalles.map((d) => ({
          ...d,
          nombreProducto: mapaProductos.get(Number(d.id_producto)) || `Producto #${d.id_producto}`,
        })),
      }));

      setOrdenes(carritosNormalizados);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el carrito.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCarritos();
  }, [isLoggedIn, isAdmin, currentUser?.id]);

  const eliminarCarrito = async (idCarrito) => {
    try {
      await deleteCarrito(idCarrito);
      setOrdenes((prev) => prev.filter((o) => o.id !== idCarrito));
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el carrito.');
    }
  };

  if (!isLoggedIn) {
    return <div className="carrito-contenedor"><h2>Debes iniciar sesion para ver tu carrito.</h2></div>;
  }

  if (!isAdmin && !currentUser?.id) {
    return <div className="carrito-contenedor"><h2>No se encontro el id de usuario para cargar carrito.</h2></div>;
  }

  if (cargando) return <div className="carrito-contenedor"><h2>Cargando carrito...</h2></div>;

  return (
    <div className="carrito-contenedor">
      <h2>{isAdmin ? 'Todos los carritos' : 'Mi carrito'}</h2>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}

      <div className="cards">
        {ordenes.map((orden, index) => (
          <div className="card" key={orden.id}>
            <div className="numero">{index + 1}</div>
            <div className="fecha">{orden.createdAt || orden.fecha_creacion || '-'}</div>
            <div className="titulo">Productos</div>

            <ul>
              {orden.detalles.length > 0 ? (
                orden.detalles.map((prod) => (
                  <li key={prod.id}>
                    {prod.nombreProducto} - Cantidad {prod.cantidad} - ${prod.precio_unitario}
                  </li>
                ))
              ) : (
                <li>Sin productos en detalle</li>
              )}
            </ul>

            <div style={{ marginTop: '8px', fontWeight: 'bold' }}>Total: ${orden.total}</div>

            <button className="btn-eliminar" onClick={() => eliminarCarrito(orden.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carrito;
