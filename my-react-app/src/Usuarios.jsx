import { useState, useEffect } from "react";
import "./Usuarios.css";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [formulario, setFormulario] = useState({
        username: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/users');
            const data = await response.json();
            setUsuarios(data);
            setCargando(false);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            setCargando(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoUsuario = {
            id: Math.max(...usuarios.map(u => u.id), 0) + 1,
            username: formulario.username,
            email: formulario.email,
            phone: formulario.phone
        };
        setUsuarios([...usuarios, nuevoUsuario]);
        setFormulario({ username: '', email: '', phone: '' });
        alert('Usuario registrado correctamente');
    };

    const handleEliminar = (id) => {
        setUsuarios(usuarios.filter(u => u.id !== id));
    };

    const handleEditar = (id) => {
        alert('Función editar para usuario ' + id);
    };

    if (cargando) {
        return <div className="usuariosDiv"><p className="cargando">Cargando usuarios...</p></div>;
    }

    return (
        <div className="usuariosDiv">
            <h1>Usuarios Registrados</h1>
            
            <form onSubmit={handleSubmit} className="formulario">
                <input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    value={formulario.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formulario.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formulario.phone}
                    onChange={handleChange}
                />
                <button type="submit">Registrar</button>
            </form>

            <div className="tabla-contenedor">
                <table className="tabla-usuarios">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Ciudad</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.username}</td>
                                <td>{usuario.name || '-'}</td>
                                <td>{usuario.address?.city || '-'}</td>
                                <td>{usuario.phone || '-'}</td>
                                <td>{usuario.email}</td>
                                <td className="acciones">
                                    <button 
                                        className="btn-editar"
                                        onClick={() => handleEditar(usuario.id)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn-eliminar"
                                        onClick={() => handleEliminar(usuario.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Usuarios;