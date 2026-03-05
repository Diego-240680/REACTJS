import { useState, useEffect } from "react";
import "./registrarProducto.css";

// eslint-disable-next-line react/prop-types
function RegistrarProducto({ productoEditando, alGuardar, alCancelar }) {
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        categoria: "", 
        descripcion: "",
        imagen: "" 
    });

    // Rellena el formulario cuando llega un producto para editar
    useEffect(() => {
        if (productoEditando) {
            setForm(productoEditando);
        } else {
            resetForm();
        }
    }, [productoEditando]);

    const resetForm = () => {
        setForm({ nombre: "", precio: "", categoria: "", descripcion: "", imagen: "" });
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        if (productoEditando) {
            alGuardar(form);
        } else {
            console.log("Nuevo producto:", form);
            // Aquí agregarías la lógica para añadirlo al array general
        }
        resetForm();
    };

    return (
        <div className="rp-wrapper">
            <form className="rp-card" onSubmit={manejarSubmit}>
                <h1 className="rp-title">
                    {productoEditando ? "🛠️ Editando Producto" : "📝 Registrar Producto"}
                </h1>

                <div className="rp-row">
                    <label>Nombre del producto</label>
                    <input name="nombre" type="text" value={form.nombre} onChange={manejarCambio} required />
                </div>

                <div className="rp-row rp-row-split" style={{display: 'flex', gap: '10px'}}>
                    <div style={{flex: 1}}>
                        <label>Precio</label>
                        <input name="precio" type="number" value={form.precio} onChange={manejarCambio} step="0.01" required />
                    </div>
                    <div style={{flex: 1}}>
                        <label>Categoría</label>
                        <input name="categoria" type="text" value={form.categoria} onChange={manejarCambio} required />
                    </div>
                </div>

                <div className="rp-row">
                    <label>Descripción</label>
                    <textarea name="descripcion" value={form.descripcion} onChange={manejarCambio} rows="3" />
                </div>

                <div className="rp-row">
                    <label>URL de la imagen</label>
                    <input name="imagen" type="url" value={form.imagen} onChange={manejarCambio} required />
                </div>

                <div className="rp-actions">
                    <button type="submit" className="btn-submit">
                        {productoEditando ? "Guardar Cambios" : "Registrar Producto"}
                    </button>
                    {productoEditando && (
                        <button type="button" className="btn-cancel" onClick={alCancelar}>
                            Cancelar Edición
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default RegistrarProducto;