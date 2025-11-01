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
  id_pesquisa: number;
  mensagem: string;
}

export interface User {
  nome: string;
  email: string;
  empresa: number;
}

export interface JwtPayload {
  sub: string;
  nome: string;
  iat: number;
  exp: number;
}