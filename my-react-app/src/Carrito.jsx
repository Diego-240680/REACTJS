import { useEffect, useState } from "react";
import "./Carrito.css";

function Carrito() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    importarCartsApi();
  }, []);

  const importarCartsApi = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/carts");
      const data = await res.json();

      setOrdenes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="carrito-contenedor">
      <h2>Carrito de compras</h2>

      <div className="cards">
        {ordenes.map((orden, index) => (
          <div className="card" key={orden.id}>
            
            <div className="numero">{index + 1}</div>

            <div className="fecha">
              {orden.date}
            </div>

            <div className="titulo">Productos</div>

            <ul>
              {orden.products.map((prod, i) => (
                <li key={i}>
                  Producto #{prod.productId} — Cantidad {prod.quantity}
                </li>
              ))}
            </ul>

            <button className="btn-comprar">
              Comprar
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Carrito;