import React from 'react';
import logoImg from '../assets/logo navbar.jpg';

export const Footer = () => {
  return (
    <>
      <section className="info-bar">
        <div className="social-container info-column">
          <a href="/Arca-Viva/" className="logo-link-footer" aria-label="Página Inicial">
            <img src={logoImg} alt="Ícone Arca Viva" />
          </a>
          <div className="social-links">
            <a href="#" aria-label="Twitter/X"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="info-column">
          <div className="info-title">
            <i className="fa-solid fa-phone-volume"></i>
            <h4>Fale Conosco</h4>
          </div>
          <p>Telefone/WhatsApp: (81) 3333-4444</p>
          <p>E-mail: contato@arcavivaong.org</p>
        </div>

        <div className="info-column">
          <div className="info-title">
            <i className="fa-solid fa-location-dot"></i>
            <h4>Endereço</h4>
          </div>
          <p>R. Padre Carapuceiro, 590 - Boa Viagem</p>
          <p>Recife/Pe - CEP 51020-280</p>
        </div>

        <div className="info-column">
          <div className="info-title">
            <i className="fa-solid fa-clock"></i>
            <h4>Horário de Atendimento</h4>
          </div>
          <p>Segunda a sexta, das 9h às 17h</p>
        </div>
      </section>

      <div className="footer-bottom">
        <p>Copyright &copy; 2026 Arca Viva. Todos os direitos reservados.</p>
      </div>
    </>
  );
};