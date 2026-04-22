import { useState } from 'react';
import './Login.css';
import { useAuth } from './AuthContext';
import { createUsuario, loginUsuario } from './Services/Services';

const LOGIN_STATE = { usuario: '', password: '' };
const REGISTER_STATE = {
  nombre: '',
  direccion: '',
  telefono: '',
  email: '',
  password: '',
  rol: 'cliente',
};

const Login = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState(LOGIN_STATE);
  const [registerData, setRegisterData] = useState(REGISTER_STATE);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCargando(true);

    try {
      const respuesta = await loginUsuario(formData);
      login(respuesta.token, respuesta.user);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('Usuario o contrasena incorrectos. Usa el email y la contrasena exactos del backend.');
      } else if (status === 422) {
        setError('Faltan datos para iniciar sesion.');
      } else if (status === 400) {
        setError('El backend rechazo el formato del login. Verifica endpoint y campos (email/password).');
      } else {
        setError('No se pudo conectar al servidor de autenticacion.');
      }
    } finally {
      setCargando(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!/^\S+@\S+\.\S+$/.test(registerData.email)) {
      setError('El correo no tiene un formato valido.');
      return;
    }

    if (!/^\d{10}$/.test(registerData.telefono)) {
      setError('El telefono debe tener 10 digitos.');
      return;
    }

    if (registerData.password.length < 4) {
      setError('La contrasena debe tener minimo 4 caracteres.');
      return;
    }

    setCargando(true);
    try {
      await createUsuario(registerData);
      setSuccess('Cuenta creada correctamente. Ahora inicia sesion.');
      setIsRegisterMode(false);
      setFormData({ usuario: registerData.email, password: registerData.password });
      setRegisterData(REGISTER_STATE);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400) {
        setError('No se pudo crear la cuenta. Revisa datos o email duplicado.');
      } else {
        setError('Error al crear cuenta en el servidor.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={isRegisterMode ? handleRegisterSubmit : handleLoginSubmit}>
        <h2>{isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesion'}</h2>

        {isRegisterMode ? (
          <>
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" value={registerData.nombre} onChange={handleRegisterChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="direccion">Direccion</label>
              <input id="direccion" name="direccion" type="text" value={registerData.direccion} onChange={handleRegisterChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="telefono">Telefono</label>
              <input id="telefono" name="telefono" type="text" value={registerData.telefono} onChange={handleRegisterChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={registerData.email} onChange={handleRegisterChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="passwordRegistro">Contrasena</label>
              <input id="passwordRegistro" name="password" type="password" value={registerData.password} onChange={handleRegisterChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="rol">Rol</label>
              <select id="rol" name="rol" value={registerData.rol} onChange={handleRegisterChange} required>
                <option value="cliente">cliente</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="input-group">
              <label htmlFor="usuario">Usuario (email)</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Introduce tu email"
                value={formData.usuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contrasena</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="btn-primary" disabled={cargando}>
          {cargando ? 'Procesando...' : isRegisterMode ? 'Crear cuenta' : 'Acceder'}
        </button>
        {error && <p style={{ color: '#c0392b', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: '#1e8449', marginTop: '10px' }}>{success}</p>}

        <div className="login-actions">
          <button type="button" className="btn-secondary" onClick={() => { setIsRegisterMode((prev) => !prev); setError(''); setSuccess(''); }}>
            {isRegisterMode ? 'Ya tengo cuenta' : 'Crear cuenta'}
          </button>
          {!isRegisterMode && <button type="button" className="btn-link">Olvidaste tu contrasena?</button>}
        </div>
      </form>
    </div>
  );
};

export default Login;
