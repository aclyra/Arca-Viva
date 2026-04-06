import React from 'react';

export const ListaRacas = ({ racas }) => {
  return (
    <div className="data-list">
      <div className="data-header">
        <strong>Nome</strong>
        <strong>Status</strong>
        <strong>Pontos</strong>
      </div>
      {racas.length === 0 ? <p style={{color: '#555', padding: '10px'}}>Nenhuma raça cadastrada.</p> : 
        racas.map((raca, index) => (
          <div key={index} className="data-row">
            <span>{raca.nome}</span>
            <span style={{ color: raca.riscoDeExtincao ? '#fc4024' : '#00784f' }}>
              {raca.riscoDeExtincao ? "EM RISCO" : "ESTÁVEL"}
            </span>
            <span>{raca.pontuacao} pts</span>
          </div>
        ))
      }
    </div>
  );
};