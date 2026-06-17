import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';

import './App.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from "./pages/Home";
import { Sobre } from './pages/Sobre';
import { Analise } from './pages/Analise';
import { Contato } from './pages/Contato';
import { Faq } from './pages/Faq';
import { Login } from './pages/Login';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar session={session} />
      
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/analise" element={<Analise session={session} />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login session={session} />} />
          
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;