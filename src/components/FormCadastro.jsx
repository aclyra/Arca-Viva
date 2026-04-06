import React, { useState } from 'react';
import { calcularRiscoExtincao } from '../utils/analiseLogic';

export const FormCadastro = ({ aoCadastrar }) => {
  const [dados, setDados] = useState({ nome: '', especie: '', pais: '', c1: 0, c2: 0, c3: 0, c4: 0 });

  const enviar = (e) => {
    e.preventDefault();
    const analise = calcularRiscoExtincao(dados.c1, dados.c2, dados.c3, dados.c4);
    aoCadastrar({ ...dados, ...analise });
    setDados({ nome: '', especie: '', pais: '', c1: 0, c2: 0, c3: 0, c4: 0 }); // Limpa o form
  };

  return (
    <form className="analysis-form" onSubmit={enviar}>
      <div className="form-group">
        <label>Nome da Raça</label>
        <input type="text" value={dados.nome} required onChange={e => setDados({...dados, nome: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Espécie</label>
        <input type="text" value={dados.especie} required onChange={e => setDados({...dados, especie: e.target.value})} />
      </div>
      <div className="form-group">
        <label>País de Origem</label>
        <input type="text" value={dados.pais} required onChange={e => setDados({...dados, pais: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Risco ≥ 50% em 10 anos?</label>
        <select value={dados.c4} onChange={e => setFormData({...formData, c4: e.target.value})}>
           <option value="0">Não</option>
           <option value="1">Sim</option>
        </select>
      </div>
      <button type="submit">Cadastrar e Analisar</button>
    </form>
  );
};