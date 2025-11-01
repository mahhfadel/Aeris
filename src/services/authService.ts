import { AxiosError } from 'axios';
import { getApi} from '../config';
import { LoginRequest, LoginResponse, LoginColaboradorResponse, User, JwtPayload } from '../types/auth.types';

export const authApi = getApi('auth');


class AuthService {
  async login(email: string, senha: string): Promise<LoginResponse> {
    try {
      const response = await authApi.post<LoginResponse>('/auth/login', {
        email,
        senha
      } as LoginRequest);
      
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          nome: response.data.nome,
          email: response.data.email,
          empresa: response.data.empresa
        } as User));
      }
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro no login:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  async loginColaborador(email: string, senha: string): Promise<LoginColaboradorResponse> {
    try {
      const response = await authApi.post<LoginColaboradorResponse>('/auth/login-colaborador', {
        email,
        senha
      } as LoginRequest);
      
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          nome: response.data.nome,
          email: response.data.email
        } as User));
      }
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro no login:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }


  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch (e) {
        console.error('Erro ao fazer parse do usuário:', e);
        return null;
      }
    }
    return null;
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {

      const payload = this.decodeToken(token);
      if (!payload) return false;
      
      const expiration = payload.exp * 1000; 
      return Date.now() < expiration;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as JwtPayload;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }


  getTokenPayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decodeToken(token);
  }


  async validateToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await authApi.get<{ valid: boolean }>('/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.valid;
    } catch (error) {
      console.error('Erro ao validar token no backend:', error);
      return false;
    }
  }
}

export default new AuthService();