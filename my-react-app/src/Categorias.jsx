import { useEffect, useState } from 'react';
import './Categorias.css';
import { getCategorias } from './Services/Services';

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        setError('');
        const data = await getCategorias();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('No se pudieron cargar las categorias desde tu API.');
      } finally {
        setLoading(false);
      }
    };

    cargarCategorias();
  }, []);

  if (loading) return <div className="loader">Cargando categorias...</div>;

  return (
    <div className="categories-container">
      <h2 className="title">Categorias registradas</h2>
      {error && <p style={{ color: '#c0392b', textAlign: 'center' }}>{error}</p>}

      <div className="grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <h3>{cat.nombre}</h3>
            <p>ID: {cat.id}</p>
            <p>Creada: {cat.createdAt ? new Date(cat.createdAt).toLocaleString() : '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
