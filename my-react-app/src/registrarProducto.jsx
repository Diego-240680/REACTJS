import React, { useState } from "react";
import "./registrarProducto.css";

function RegistrarProducto() {
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        categoria: "", 
        descripcion: "",
        imagen: "" 
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        console.log("Producto registrado:", form);
        
        setForm({ nombre: "", precio: "", categoria: "", descripcion: "", imagen: "" });
    };

    return (
        <div className="rp-wrapper">
            <form className="rp-card" onSubmit={manejarSubmit}>
                <h1 className="rp-title">Registrar Producto</h1>

                <div className="rp-row">
                    <label htmlFor="nombre">Nombre del producto</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={form.nombre}
                        onChange={manejarCambio}
                        placeholder="Nombre del producto"
                        required
                    />
                </div>

                <div className="rp-row rp-row-split">
                    <div>
                        <label htmlFor="precio">Precio</label>
                        <input
                            id="precio"
                            name="precio"
                            type="number"
                            value={form.precio}
                            onChange={manejarCambio}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    {/* Apartado de Categoría añadido en la misma fila */}
                    <div>
                        <label htmlFor="categoria">Categoría</label>
                        <input
                            id="categoria"
                            name="categoria"
                            type="text"
                            value={form.categoria}
                            onChange={manejarCambio}
                            placeholder="Ej. Electrónica"
                            required
                        />
                    </div>
                </div>

                <div className="rp-row">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={manejarCambio}
                        placeholder="Descripción breve del producto"
                        rows="4"
                    />
                </div>

                {/* Apartado de Imagen añadido debajo de descripción */}
                <div className="rp-row">
                    <label htmlFor="imagen">URL de la imagen</label>
                    <input
                        id="imagen"
                        name="imagen"
                        type="url"
                        value={form.imagen}
                        onChange={manejarCambio}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        required
                    />
                </div>

                <div className="rp-actions">
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setForm({ nombre: "", precio: "", categoria: "", descripcion: "", imagen: "" })}
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarProducto;