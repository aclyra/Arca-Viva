import React from 'react';
import { Link } from 'react-router-dom';

// Importando a arte dos animais (verifique se o nome é inicio.jpg ou logo.jpg)
import bannerArte from '../assets/inicio.jpg'; 

export const Home = () => {
  return (
    <main>
      {/* Banner de Impacto (Collage de Animais) */}
      <img 
        src={bannerArte} 
        alt="Arca Viva - Especialista em Animais" 
        className="banner-topo" 
      />

      {/* Seção Principal de Boas-vindas */}
      <section className="about-section" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '2px' }}>
          Protegendo o Futuro da Biodiversidade
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          A Arca Viva une tecnologia e paixão pela natureza para monitorar espécies 
          em risco. De Pernambuco para os biomas mais remotos, nossa missão é 
          garantir que a vida prevaleça.
        </p>

        <div className="home-cta">
          <h2 style={{ color: '#23346C', marginBottom: '15px' }}>
            Ciência a favor da Vida
          </h2>
          <p>
            Nosso sistema utiliza os critérios técnicos que você ajudou a definir 
            para calcular o risco de extinção em tempo real.
          </p>
          
          <Link 
            to="/analise" 
            style={{
              display: 'inline-block',
              marginTop: '30px',
              padding: '18px 50px',
              backgroundColor: '#192651',
              color: '#fafaef',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '1.1rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              boxShadow: '0 10px 20px rgba(25, 38, 81, 0.3)',
              transition: 'all 0.3s ease',
              opacity: 1
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 15px 25px rgba(25, 38, 81, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 20px rgba(25, 38, 81, 0.3)';
            }}
          >
            Acessar Sistema de Análise
          </Link>
        </div>
      </section>
    </main>
  );
};