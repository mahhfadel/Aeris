import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login/LoginPage';
import RecuperarConta from '../pages/Login/RecuperarContaPage';
import AlterarSenha from '../pages/Login/AlterarSenhaPage';
import LoginColaborador from '../pages/Login/LoginColaboradorPage';
import VerificacaoPin from '../pages/Login/VerficacaoPinPage';
import Home from '../pages/Home/HomePage';
import Usuarios from '../pages/Usuarios/UsuariosPage';
import Pesquisas from '../pages/Pesquisas/PesquisasPage'
import NovaPesquisa from '../pages/NovaPesquisa/NovaPesquisaPage';
import GerenciarPesquisa from '../pages/GerenciarPesquisa/GerenciarPesquisaPage'
import ResponderPesquisa from '../pages/ResponderPesquisa/ResponderPesquisaPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarConta />} />
      <Route path="/alterar-senha" element={<AlterarSenha />} />
      <Route path="/login-colaborador" element={<LoginColaborador />} />
      <Route path="/verificar-pin" element={<VerificacaoPin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/pesquisas" element={<Pesquisas />} />
      <Route path="/nova-pesquisa" element={<NovaPesquisa />} />
      <Route path="/gerenciar-pesquisa" element={<GerenciarPesquisa />} />
      <Route path="/responder-pesquisa" element={<ResponderPesquisa />} />
    </Routes>
  );
}
