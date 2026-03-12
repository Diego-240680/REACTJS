import React, { useState, useEffect } from 'react';
import './Categorias.css';

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Cargando delicias...</div>;

  return (
    <div className="categories-container">
      <h2 className="title">Explora por Categoría</h2>
      <div className="grid">
        {categories.map((cat) => (
          <div key={cat.idCategory} className="category-card">
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
            <h3>{cat.strCategory}</h3>
            <p>{cat.strCategoryDescription.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;