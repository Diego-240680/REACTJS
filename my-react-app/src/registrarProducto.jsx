import React, { useState } from "react";
import "./registrarProducto.css";

function RegistrarProducto() {
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: ""
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        // Aquí enviarías `form` al backend o lo manejarías como necesites
        console.log("Producto registrado:", form);
        setForm({ nombre: "", precio: "", descripcion: "" });
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

                <div className="rp-actions">
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setForm({ nombre: "", precio: "", descripcion: "" })}
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarProducto;