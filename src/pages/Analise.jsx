import React, { useState } from 'react';
import { calcularRiscoExtincao } from '../utils/analiseLogic';

// Importando a imagem da pasta assets (conforme sua estrutura)
import bannerAnalise from '../assets/analise.jpg';

export const Analise = () => {
  const [racas, setRacas] = useState([]);
  const [formData, setFormData] = useState({
    nome: '', especie: '', pais: '',
    c1: 0, c2: 0, c3: 0, c4: 0
  });

  const [filtroAtivo, setFiltroAtivo] = useState("");

  const lidarComEnvio = (e) => {
    e.preventDefault();
    // Executa a lógica que veio do raca.c
    const analise = calcularRiscoExtincao(formData.c1, formData.c2, formData.c3, formData.c4);
    
    const novaRaca = {
      id: racas.length + 1,
      ...formData,
      ...analise
    };

    setRacas([...racas, novaRaca]);
    // Reseta o formulário
    setFormData({ nome: '', especie: '', pais: '', c1: 0, c2: 0, c3: 0, c4: 0 });
    alert("Análise concluída e raça cadastrada!");
  };

  return (
    <main>
      {/* Usando a imagem importada */}
      <img src={bannerAnalise} alt="Banner Análise" className="banner-topo" />

      <section className="analysis-section">
        <h1>Sistema de Análise de Raças</h1>
        <p>Esta página demonstra as funcionalidades do nosso sistema de análise de risco de extinção, convertido do nosso código-fonte em C.</p>

        <h2>1. Critérios de Análise de Risco</h2>
        <ul className="analysis-criteria">
          <li><strong>Critério 1 (1 pt):</strong> População em declínio acentuado?</li>
          <li><strong>Critério 2 (1 pt):</strong> Distribuição geográfica severamente fragmentada?</li>
          <li><strong>Critério 3 (2 pts):</strong> População total estimada em menos de 250 indivíduos maduros?</li>
          <li><strong>Critério 4 (2 pts):</strong> Probabilidade de extinção na natureza de pelo menos 50% em 10 anos?</li>
        </ul>

        <h2>2. Cadastro de Nova Raça</h2>
        <form className="analysis-form" onSubmit={lidarComEnvio}>
          <div className="form-group">
            <label>Nome da Raça</label>
            <input type="text" value={formData.nome} required onChange={e => setFormData({...formData, nome: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Espécie</label>
            <input type="text" value={formData.especie} required onChange={e => setFormData({...formData, especie: e.target.value})} />
          </div>
          <div className="form-group">
            <label>País</label>
            <input type="text" value={formData.pais} required onChange={e => setFormData({...formData, pais: e.target.value})} />
          </div>
          
          {/* Seletores de Critérios (Lógica do C) */}
          <div className="form-group">
            <label>C1 (Declínio)</label>
            <select value={formData.c1} onChange={e => setFormData({...formData, c1: e.target.value})}>
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
          </div>

          <div className="form-group">
            <label>C2 (Fragmentação)</label>
            <select value={formData.c2} onChange={e => setFormData({...formData, c2: e.target.value})}>
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
          </div>

          <div className="form-group">
            <label>C3 (População &lt; 250)</label>
            <select value={formData.c3} onChange={e => setFormData({...formData, c3: e.target.value})}>
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
          </div>

          <div className="form-group">
            <label>C4 (Risco 10 anos)</label>
            <select value={formData.c4} onChange={e => setFormData({...formData, c4: e.target.value})}>
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
          </div>
          
          <button type="submit">Analisar</button>
        </form>

        <section className="dashboard-section">
          <h2>3. Dashboard de Risco</h2>
          <div className={`bubble-chart-area ${filtroAtivo ? `filter-${filtroAtivo}` : ''}`}>
            <div className="bubble bubble-cr">
              <strong>{racas.filter(r => r.riscoDeExtincao).length}</strong>
              <span>Em Risco</span>
            </div>
            <div className="bubble bubble-lc">
              <strong>{racas.filter(r => !r.riscoDeExtincao).length}</strong>
              <span>Seguros</span>
            </div>
          </div>
        </section>

        <section className="list-section">
          <h2>4. Lista Completa</h2>
          <div className="data-list">
            <div className="data-header">
              <strong>Nome</strong>
              <strong>Status</strong>
              <strong>Pontos</strong>
            </div>
            {racas.length === 0 ? (
              <p style={{padding: '20px', color: '#555'}}>Nenhuma raça cadastrada ainda.</p>
            ) : (
              racas.map(raca => (
                <div key={raca.id} className="data-row">
                  <span>{raca.nome}</span>
                  <span style={{ fontWeight: 'bold', color: raca.riscoDeExtincao ? '#ef4782' : '#00784f' }}>
                    {raca.riscoDeExtincao ? "CRÍTICO" : "ESTÁVEL"}
                  </span>
                  <span>{raca.pontuacao} pts</span>
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
};