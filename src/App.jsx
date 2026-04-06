import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from "./pages/Home";
import { Sobre } from './pages/Sobre';
import { Analise } from './pages/Analise';
import { Contato } from './pages/Contato';
import { Faq } from './pages/Faq';

function App() {
  return (
    <Router>
      <Navbar />
      
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/faq" element={<Faq />} />
          
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;