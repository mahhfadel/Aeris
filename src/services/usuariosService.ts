import { getApi} from '../config';
import { AxiosError } from 'axios';
import { AllUsuariosResponse,UsuarioResponse, UsuarioRequest, DadosPessoaisResponse, DadosPessoaisRequest } from '../types/usuario.types';
import authService from '../services/authService';

export const userApi = getApi('user');

class UsuarioService {
  
  async getAllUsers(idPesquisa?: number): Promise<AllUsuariosResponse[]> {
    const empresa = authService.getCurrentUser().empresa;

    const response = await userApi.get('/user/allUsuario', {
      params: { empresa: empresa, idPesquisa: idPesquisa },
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

  async respondeuOSenso(email: string): Promise<DadosPessoaisResponse> {
    try {
      const response = await userApi.get<DadosPessoaisResponse>('/senso/respondeu', {
        params: { email: email },
      });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao verificar se o usuário respondeu o senso', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  async responderOSenso(genero: string, contratado_em: string, data_nascimento: string, setor: string, cargo: string, sexualidade: string, termos_de_uso: boolean): Promise<DadosPessoaisResponse> {
    try {
      const emailUsuario = authService.getCurrentUser().email;

      const response = await userApi.post<DadosPessoaisResponse>('/senso/responder-senso', {
        genero,
        contratado_em,
        data_nascimento,
        setor,
        cargo,
        sexualidade,
        termos_de_uso,
        emailUsuario
      } as DadosPessoaisRequest);
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao responder o senso', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }
}

export default new UsuarioService();