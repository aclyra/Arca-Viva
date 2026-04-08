import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo navbar.jpg';

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <header className="header-principal">
      <nav className="nav-container">
        <Link className="logo" to="/Arca-Viva/">
          <img src={logoImg} alt="Ícone Arca Viva" />
          <span className="logo-text">ARCA VIVA</span>
        </Link>
        
        <div className={`mobile-menu ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        <ul className={`nav-list ${isActive ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/analise">Análise</Link></li>
          <li><Link to="/contato">Contato</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </nav>
    </header>
  );
};