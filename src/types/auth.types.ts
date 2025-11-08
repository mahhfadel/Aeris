export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
  empresa: number;
  mensagem: string;
}

export interface LoginColaboradorResponse {
  token: string;
  nome: string;
  email: string;
  idPesquisa: number;
  mensagem: string;
}

export interface User {
  nome: string;
  email: string;
  empresa: number;
  idPesquisa: number;
}

export interface JwtPayload {
  sub: string;
  nome: string;
  iat: number;
  exp: number;
}