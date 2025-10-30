import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import PrivateRoute from '@/components/PrivateRoute';
import Senso from '../pages/Login/SensoPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarConta />} />
      <Route path="/alterar-senha" element={<AlterarSenha />} />
      <Route path="/login-colaborador" element={<LoginColaborador />} />
      <Route path="/verificar-pin" element={<VerificacaoPin />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
      <Route path="/pesquisas" element={<PrivateRoute><Pesquisas /></PrivateRoute>} />
      <Route path="/nova-pesquisa" element={<PrivateRoute><NovaPesquisa /></PrivateRoute>} />
      <Route path="/gerenciar-pesquisa" element={<PrivateRoute><GerenciarPesquisa /></PrivateRoute>} />
      <Route path="/responder-pesquisa" element={<PrivateRoute><ResponderPesquisa /></PrivateRoute>} />
      <Route path="/senso" element={<PrivateRoute><Senso /></PrivateRoute>} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
