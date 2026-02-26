import { useState, useEffect } from 'react';
import './Usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    correo: '',
    username: '',
    password: ''
  });
  const [editando, setEditando] = useState(null);

  
  useEffect(() => {
    const cargarInicial = async () => {
      const usuariosGuardados = localStorage.getItem('usuarios');
      if (usuariosGuardados) {
        setUsuarios(JSON.parse(usuariosGuardados));
        return;
      }

      
      try {
        const res = await fetch('https://fakestoreapi.com/users');
        if (!res.ok) throw new Error('Error al obtener usuarios');
        const data = await res.json();

        const mapeados = data.map((u) => ({
          id: u.id || Date.now() + Math.random(),
          nombre: u.name?.firstname || '',
          apellidos: u.name?.lastname || '',
          direccion: `${u.address?.street || ''} ${u.address?.number || ''} ${u.address?.city || ''} ${u.address?.zipcode || ''}`.trim(),
          telefono: u.phone || '',
          correo: u.email || '',
          username: u.username || '',
          password: u.password || ''
        }));

        guardarUsuarios(mapeados);
      } catch (err) {
        console.error('No se pudieron cargar usuarios desde la API:', err);
      }
    };

    cargarInicial();
  }, []);


  const guardarUsuarios = (listaUsuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    setUsuarios(listaUsuarios);
    console.log('Usuarios guardados:', listaUsuarios.length);
  };

  
  const importarUsuariosApi = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/users');
      if (!res.ok) throw new Error('Error al obtener usuarios de la API');
      const data = await res.json();

      const mapeados = data.map((u) => ({
        id: u.id || Date.now() + Math.random(),
        nombre: u.name?.firstname || '',
        apellidos: u.name?.lastname || '',
        direccion: `${u.address?.street || ''} ${u.address?.number || ''} ${u.address?.city || ''} ${u.address?.zipcode || ''}`.trim(),
        telefono: u.phone || '',
        correo: u.email || '',
        username: u.username || '',
        password: u.password || ''
      }));

      const existentes = usuarios || [];
      const existentesUsernames = new Set(existentes.map((u) => u.username));
      const nuevos = mapeados.filter((u) => u.username && !existentesUsernames.has(u.username));

      if (nuevos.length === 0) return;

      const combinados = [...existentes, ...nuevos];
      guardarUsuarios(combinados);
    } catch (err) {
      console.error('Error importando usuarios:', err);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    if (editando !== null) {
      const usuariosActualizados = usuarios.map((u, index) =>
        index === editando ? { ...formData, id: u.id } : u
      );
      guardarUsuarios(usuariosActualizados);
      setEditando(null);
    } else {
      const nuevoUsuario = {
        id: Date.now(),
        ...formData
      };
      guardarUsuarios([...usuarios, nuevoUsuario]);
    }

    setFormData({
      nombre: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      correo: '',
      username: '',
      password: ''
    });
    setFormularioVisible(false);
  };

  const manejarEditar = (index) => {
    setFormData(usuarios[index]);
    setEditando(index);
    setFormularioVisible(true);
  };

  const manejarEliminar = (index) => {
    const usuariosActualizados = usuarios.filter((_, i) => i !== index);
    guardarUsuarios(usuariosActualizados);
  };

  const manejarCancelar = () => {
    setFormularioVisible(false);
    setEditando(null);
    setFormData({
      nombre: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      correo: '',
      username: '',
      password: ''
    });
  };

  return (
    <div className="usuarios-contenedor">
      <h2>Usuarios Registrados ({usuarios.length})</h2>
      
      <div className="controles">
        <button 
          className="btn-agregar" 
          onClick={() => setFormularioVisible(!formularioVisible)}
        >
          {formularioVisible ? 'Cancelar' : '+ Nuevo Usuario'}
        </button>
        {usuarios.length === 0 && (
          <button
            className="btn-importar"
            onClick={importarUsuariosApi}
            title="Importar usuarios desde fakestoreapi.com"
          >
            Importar usuarios (si no aparecen)
          </button>
        )}
      </div>

      {formularioVisible && (
        <form className="formulario-usuario" onSubmit={manejarSubmit}>
          <div className="formulario-grid">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={manejarCambio}
              required
            />
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={manejarCambio}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={manejarCambio}
              required
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={manejarCambio}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={manejarCambio}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={manejarCambio}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="botones-formulario">
            <button type="submit" className="btn-guardar">
              {editando !== null ? 'Actualizar' : 'Guardar'}
            </button>
            <button type="button" className="btn-cancelar" onClick={manejarCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="tabla-responsiva">
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Username</th>
              <th>Password</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.username}</td>
                  <td className="password-celda">
                    {'•'.repeat(usuario.password.length)}
                  </td>
                  <td className="acciones">
                    <button 
                      className="btn-editar" 
                      onClick={() => manejarEditar(index)}
                      title="Editar"
                    >
                      ✎
                    </button>
                    <button 
                      className="btn-eliminar" 
                      onClick={() => manejarEliminar(index)}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="sin-datos">
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;