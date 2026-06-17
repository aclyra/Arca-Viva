import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Login({ session }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Estudante'); // Padrão é estudante

  // Se já estiver logado, manda pra Análise
  useEffect(() => {
    if (session) {
      navigate('/analise');
    }
  }, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isLogin) {
      // LOGAR
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage('Erro ao entrar: ' + error.message);
    } else {
      // CADASTRAR (Enviando os dados extras para o Supabase)
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            nome_completo: nome,
            categoria: categoria
          }
        }
      });

      if (error) {
        setMessage('Erro ao cadastrar: ' + error.message);
      } else {
        setMessage('Cadastro realizado com sucesso! Você já pode fazer login.');
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', minHeight: '60vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#00784f' }}>
        {isLogin ? 'Acesso ao Sistema' : 'Cadastro na Arca Viva'}
      </h2>
      
      {message && (
        <div style={{ padding: '10px', background: '#e0f7fa', color: '#006064', marginBottom: '15px', borderRadius: '5px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Campos extras aparecem apenas no Cadastro */}
        {!isLogin && (
          <>
            <div>
              <label>Nome Completo</label>
              <input 
                type="text" 
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label>Perfil de Usuário</label>
              <select 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="Estudante">Estudante / Observador</option>
                <option value="Pesquisador">Pesquisador / Biólogo</option>
              </select>
              <small style={{ color: '#666', fontSize: '12px' }}>
                *Apenas pesquisadores podem cadastrar novas espécies no sistema.
              </small>
            </div>
          </>
        )}

        <div>
          <label>Email</label>
          <input 
            type="email" 
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Senha {isLogin ? '' : '(mín. 6 caracteres)'}</label>
          <input 
            type="password" 
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px', background: '#00784f', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <button 
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: '#00784f', textDecoration: 'underline', cursor: 'pointer' }}
          type="button"
        >
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça Login'}
        </button>
      </div>
    </div>
  );
}