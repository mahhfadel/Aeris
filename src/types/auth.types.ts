export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
  mensagem: string;
}

export interface User {
  nome: string;
  email: string;
}

export interface JwtPayload {
  sub: string;
  nome: string;
  iat: number;
  exp: number;
}