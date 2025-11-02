import { getApi} from '../config';
import { AxiosError } from 'axios';
import { AllUsuariosResponse,UsuarioResponse, UsuarioRequest } from '../types/usuario.types';
import authService from '../services/authService';

export const userApi = getApi('user');
export const empresa = authService.getCurrentUser().empresa;

class UsuarioService {
  
  async getAllUsers(): Promise<AllUsuariosResponse[]> {
    const response = await userApi.get('/user/allUsuario', {
      params: { empresa: empresa },
    });
    return response.data;
  }

  async adicionarColaborador(email: string, nome: string, sobrenome: string): Promise<UsuarioResponse> {
    try {
      const empresa = authService.getCurrentUser().empresa;
      const response = await userApi.post<UsuarioResponse>('/user/criar-usuario', {
        email,
        nome,
        sobrenome,
        empresa
      } as UsuarioRequest);
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao adicionar colaborador:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }
}

export default new UsuarioService();