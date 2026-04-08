import React, { useState, useEffect } from 'react';
import { calcularRiscoExtincao } from '../utils/analiseLogic';
import { supabase } from '../lib/supabase';

import bannerAnalise from '../assets/analise.jpg';

export const Analise = () => {
  const [racas, setRacas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState('');

  const [formData, setFormData] = useState({
    nome: '', especie: '', pais: '',
    c1: 0, c2: 0, c3: 0, c4: 0
  });

  useEffect(() => {
    const buscarRacas = async () => {
      setCarregando(true);
      const { data, error } = await supabase
        .from('racas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setErro('Erro ao carregar dados do banco.');
        console.error(error);
      } else {
        setRacas(data);
      }
      setCarregando(false);
    };

    buscarRacas();
  }, []);

  const lidarComEnvio = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro(null);

    const analise = calcularRiscoExtincao(formData.c1, formData.c2, formData.c3, formData.c4);

    const { data, error } = await supabase
      .from('racas')
      .insert([{
        nome: formData.nome,
        especie: formData.especie,
        pais_origem: formData.pais,
        c1: Number(formData.c1),
        c2: Number(formData.c2),
        c3: Number(formData.c3),
        c4: Number(formData.c4),
        pontuacao: analise.pontuacao,
        risco_extincao: analise.riscoDeExtincao,
        em_alerta: analise.emAlerta
      }])
      .select();

    if (error) {
      setErro('Erro ao salvar. Tente novamente.');
      console.error(error);
    } else {
      setRacas(prev => [data[0], ...prev]);
      setFormData({ nome: '', especie: '', pais: '', c1: 0, c2: 0, c3: 0, c4: 0 });
    }

    setSalvando(false);
  };

  const racasFiltradas = racas.filter(r =>
    r.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <main>
      <img src={bannerAnalise} alt="Banner Análise" className="banner-topo" />

      <section className="analysis-section">
        <h1>Sistema de Análise de Raças</h1>
        <p>Esta página demonstra as funcionalidades do nosso sistema de análise de risco de extinção, baseado na lógica de pontuação e cadastro do nosso código-fonte.</p>

        <h2>1. Critérios de Análise de Risco</h2>
        <p>Para cada raça cadastrada, aplicamos 4 critérios baseados em perguntas (Sim/Não). Perguntas 1 e 2 adicionam 1 ponto; 3 e 4 adicionam 2 pontos.</p>
        <ul className="analysis-criteria">
          <li><strong>Critério 1 (1 pt):</strong> População em declínio acentuado?</li>
          <li><strong>Critério 2 (1 pt):</strong> Distribuição geográfica severamente fragmentada?</li>
          <li><strong>Critério 3 (2 pts):</strong> População total estimada em menos de 250 indivíduos maduros?</li>
          <li><strong>Critério 4 (2 pts):</strong> Probabilidade de extinção na natureza de pelo menos 50% em 10 anos?</li>
        </ul>
        <div className="resultado-info">
          🔔 <span><strong>Resultado:</strong> Se a pontuação total for <strong>maior ou igual a 5</strong>, a espécie é marcada como "Em Risco de Extinção".</span>
        </div>

        <h2>2. Cadastro de Nova Raça</h2>
        <p>Use o formulário abaixo para cadastrar os dados necessários (Nome, Espécie, País de Origem, e Critérios de Risco).</p>

        {erro && <p className="msg-erro">{erro}</p>}

        <form className="analysis-form" onSubmit={lidarComEnvio}>
          <div className="form-group">
            <label>Nome da Raça</label>
            <input
              type="text"
              value={formData.nome}
              required
              placeholder="Ex: Lobo-guará"
              onChange={e => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Espécie</label>
            <input
              type="text"
              value={formData.especie}
              required
              placeholder="Ex: Chrysocyon brachyurus"
              onChange={e => setFormData({ ...formData, especie: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>País de Origem</label>
            <input
              type="text"
              value={formData.pais}
              required
              placeholder="Ex: Brasil"
              onChange={e => setFormData({ ...formData, pais: e.target.value })}
            />
          </div>

          <div className="form-selects-row">
            <div className="form-group">
              <label>População em declínio?</label>
              <select value={formData.c1} onChange={e => setFormData({ ...formData, c1: e.target.value })}>
                <option value="0">Não</option>
                <option value="1">Sim</option>
              </select>
            </div>
            <div className="form-group">
              <label>Distribuição fragmentada?</label>
              <select value={formData.c2} onChange={e => setFormData({ ...formData, c2: e.target.value })}>
                <option value="0">Não</option>
                <option value="1">Sim</option>
              </select>
            </div>
            <div className="form-group">
              <label>Menos de 250 maduros?</label>
              <select value={formData.c3} onChange={e => setFormData({ ...formData, c3: e.target.value })}>
                <option value="0">Não</option>
                <option value="1">Sim</option>
              </select>
            </div>
            <div className="form-group">
              <label>Risco ≥ 50% em 10 anos?</label>
              <select value={formData.c4} onChange={e => setFormData({ ...formData, c4: e.target.value })}>
                <option value="0">Não</option>
                <option value="1">Sim</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={salvando} style={{ gridColumn: '1 / -1', justifySelf: 'end' }}>
            {salvando ? 'Salvando...' : 'Analisar'}
          </button>
        </form>

        <section>
          <h2>3. Dashboard de Risco de Extinção</h2>
          <p>Distribuição de todas as espécies cadastradas por categoria de risco.</p>
          <div className="bubble-chart-area">
            <div className="bubble bubble-cr">
              <strong>{racas.filter(r => r.risco_extincao).length}</strong>
              <span>Em Risco</span>
            </div>
            <div className="bubble bubble-lc">
              <strong>{racas.filter(r => !r.risco_extincao && !r.em_alerta).length}</strong>
              <span>Seguros</span>
            </div>
            <div className="bubble bubble-nt">
              <strong>{racas.filter(r => r.em_alerta).length}</strong>
              <span>Em Alerta</span>
            </div>
          </div>
        </section>

        <section className="list-section">
          <h2>4. Lista Completa de Espécies</h2>
          <p>Todas as espécies cadastradas com Nome, Espécie, País, Categoria e Pontuação de Risco.</p>

          <div className="list-filter-row">
            <input
              type="text"
              placeholder="Digite o nome da raça..."
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
            />
            {filtro && <button onClick={() => setFiltro('')}>Limpar</button>}
          </div>

          <div className="data-list">
            <div className="data-header">
              <strong>Nome</strong>
              <strong>Espécie</strong>
              <strong>Status</strong>
              <strong>Pontos</strong>
            </div>

            {carregando ? (
              <p style={{ padding: '20px', color: '#555' }}>Carregando dados...</p>
            ) : racasFiltradas.length === 0 ? (
              <p style={{ padding: '20px', color: '#555' }}>
                {filtro ? 'Nenhuma raça encontrada.' : 'Nenhuma raça cadastrada ainda.'}
              </p>
            ) : (
              racasFiltradas.map(raca => (
                <div key={raca.id_raca} className="data-row">
                  <span>{raca.nome}</span>
                  <span>{raca.especie}</span>
                  <span style={{
                    fontWeight: 600,
                    color: raca.risco_extincao ? '#ef4782' : raca.em_alerta ? '#f59e0b' : '#00784f'
                  }}>
                    {raca.risco_extincao ? 'CRÍTICO' : raca.em_alerta ? 'ALERTA' : 'ESTÁVEL'}
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