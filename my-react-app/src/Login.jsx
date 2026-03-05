import { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", formData);
    // Aquí iría tu lógica de autenticación
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        
        <div className="input-group">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Introduce tu usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Acceder</button>

        <div className="login-actions">
          <button type="button" className="btn-secondary">Crear cuenta</button>
          <button type="button" className="btn-link">¿Olvidaste tu contraseña?</button>
        </div>
      </form>
    </div>
  );
};

export default Login;