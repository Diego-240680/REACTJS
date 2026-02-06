import React from 'react';
import './Card.css';

export default function Card({ image, title, children }) {
  return (
    <article className="card-item">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{children}</p>
      <a className="card-link" href="#">Ver más</a>
    </article>
  );
}
