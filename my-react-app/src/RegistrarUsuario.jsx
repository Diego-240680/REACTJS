import { useState } from "react";
import "./RegistrarUsuario.css";

function RegistrarUsuario({ onGuardar, onCancelar, usuarioInicial }) {
    
    const estadoLimpio = {
        username: "",
        correo: "",
        password: ""
    };

    const [form, setForm] = useState(usuarioInicial || estadoLimpio);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        if (onGuardar) onGuardar(form);
        setForm(estadoLimpio); 
    };

    return (
        <div className="rp-wrapper">
            <form className="rp-card" onSubmit={manejarSubmit}>
                <h1 className="rp-title">
                    {usuarioInicial ? "Editar usuario" : "Registrar Usuario"}
                </h1>

                {/* Campo: Username */}
                <div className="rp-row">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={manejarCambio}
                        placeholder="Tu nombre de usuario"
                        required
                    />
                </div>

                {/* Campo: Correo */}
                <div className="rp-row">
                    <label htmlFor="correo">Correo</label>
                    <input
                        id="correo"
                        name="correo"
                        type="email"
                        value={form.correo}
                        onChange={manejarCambio}
                        placeholder="ejemplo@correo.com"
                        required
                    />
                </div>

                {/* Campo: Password */}
                <div className="rp-row">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={manejarCambio}
                        placeholder="••••••••"
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
                            setForm(estadoLimpio);
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