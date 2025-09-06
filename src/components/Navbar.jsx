import { Link } from 'react-router'
import { useState } from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="text-gradient">Mi Tienda</span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={toggleMenu}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={toggleMenu}>Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search-product" onClick={toggleMenu}>Buscar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-product" onClick={toggleMenu}>Agregar Producto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/session" onClick={toggleMenu}>Sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
