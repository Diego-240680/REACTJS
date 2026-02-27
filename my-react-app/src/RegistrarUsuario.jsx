import React, { useState } from "react";
import "./RegistrarUsuario.css";        // copia/ajusta el CSS más abajo

function RegistrarUsuario({ onGuardar, onCancelar, usuarioInicial }) {
    const [form, setForm] = useState(
        usuarioInicial || {
            nombre: "",
            apellidos: "",
            direccion: "",
            telefono: "",
            correo: "",
            username: "",
            password: ""
        }
    );

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        if (onGuardar) onGuardar(form);
        setForm({
            nombre: "",
            apellidos: "",
            direccion: "",
            telefono: "",
            correo: "",
            username: "",
            password: ""
        });
    };

    return (
        <div className="rp-wrapper">
            <form className="rp-card" onSubmit={manejarSubmit}>
                <h1 className="rp-title">
                    {usuarioInicial ? "Editar usuario" : "Registrar Usuario"}
                </h1>

                <div className="rp-row">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={form.nombre}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="rp-row">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                        id="apellidos"
                        name="apellidos"
                        type="text"
                        value={form.apellidos}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="rp-row">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        value={form.direccion}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="rp-row">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={form.telefono}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="rp-row">
                    <label htmlFor="correo">Correo</label>
                    <input
                        id="correo"
                        name="correo"
                        type="email"
                        value={form.correo}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="rp-row">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="rp-row">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="rp-actions">
                    <button type="submit" className="btn btn-primary">
                        {usuarioInicial ? "Actualizar" : "Guardar"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setForm({
                                nombre: "",
                                apellidos: "",
                                direccion: "",
                                telefono: "",
                                correo: "",
                                username: "",
                                password: ""
                            });
                            if (onCancelar) onCancelar();
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarUsuario;