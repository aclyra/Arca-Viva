import React, { useState } from 'react';

import bannerContato from '../assets/contato.jpg';

export const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    alert(`Obrigado, ${formData.name}! Sua mensagem foi enviada.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main>
      <img src={bannerContato} alt="Banner Contato" className="banner-topo" />
      
      <section className="contact-section">
        <h1>Fale Conosco</h1>
        <p>Estamos aqui para ajudar. Se você tem dúvidas, sugestões, ou deseja se voluntariar, preencha o formulário abaixo.</p>

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Envie uma Mensagem</h2>
            
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Seu E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                value={formData.message}
                onChange={handleChange} 
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-submit">Enviar Mensagem</button>
          </form>

          <div className="contact-info">
            <h2>Informações</h2>
            
            <div className="info-block">
              <i className="fa-solid fa-id-card"></i>
              <div>
                <strong>CNPJ</strong>
                <p>00.000.000/0001-00</p>
              </div>
            </div>

            <div className="info-block">
              <i className="fa-solid fa-handshake-angle"></i>
              <div>
                <strong>Seja Voluntário(a)</strong>
                <p>voluntariado@arcavivaong.org</p>
              </div>
            </div>
          </div>
        </div>

        <div className="map-container">
          <h2>Nossa Localização</h2>
          <iframe 
            src="https://www.google.com/maps?q=R.+Padre+Carapuceiro,+590+-+Boa+Viagem,+Recife+-+PE,+51020-280&output=embed"
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Localização"
          ></iframe>
        </div>
      </section>
    </main>
  );
};