import { getApi} from '../config';
import { AxiosError } from 'axios';
import {PerguntaRequest, PerguntaResponse, PesquisaResponse} from '../types/pesquisa.types';
import {AllUsuariosResponse} from '../types/usuario.types'
import authService from '../services/authService';

export const pesquisaApi = getApi('response');

class PesquisaService {

  // PESQUISA ===========================
  async getAllPesquisas(): Promise<PesquisaResponse[]> {
    const empresa = authService.getCurrentUser().empresa;

    const response = await pesquisaApi.get('/pesquisa/getAll', {
      params: { empresa: empresa },
    });
    return response.data;
  }

  async getPesquisa(idPesquisa: number): Promise<PesquisaResponse> {
    const response = await pesquisaApi.get('/pesquisa/retornar-pesquisa', {
      params: { idPesquisa: idPesquisa },
    });
    return response.data;
  }

  async createPesquisa(): Promise<PesquisaResponse> {
    try {
      const token = authService.getToken();

      const response = await pesquisaApi.post<PesquisaResponse>('/pesquisa/criar-pesquisa',
      {}, 
      { params: { token } } 
    );
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao criar pesquisa:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  async finalizarPesquisa(idPesquisa: number): Promise<PesquisaResponse> {
    try {
      const response = await pesquisaApi.patch('/pesquisa/finalizar-pesquisa', {}, {
          params: { idPesquisa: idPesquisa },
        });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao criar pesquisa:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  // COLABORADOR ===========================
  async adiconarColaboradores(colaboradores: number[], pesquisaId: number): Promise<AllUsuariosResponse> {
    try {
      const response = await pesquisaApi.post<AllUsuariosResponse>('/colaborador/adicionar', 
        colaboradores, {
          params: { pesquisaId: pesquisaId },
        });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao criar pesquisa:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }


  async getAllColaboraderesUsers(pesquisa: number): Promise<AllUsuariosResponse[]> {
    try {
      const empresa = authService.getCurrentUser().empresa;

      const response = await pesquisaApi.get('/colaborador/allUsuario', {
          params: { empresa: empresa, pesquisa: pesquisa },
        });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao adicionar colaborador:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  // PERGUNTA ===========================
  async createPergunta(request: PerguntaRequest): Promise<PerguntaResponse> {
    try {
      const response = await pesquisaApi.post<PerguntaResponse>(
        '/pergunta/adicionar-pergunta',
        request
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao criar pergunta:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  async atualizarPergunta(idPergunta: number, request: PerguntaRequest): Promise<PerguntaResponse> {
    try {
      const response = await pesquisaApi.patch('/pergunta/atualizar-perunta', 
        request, {
          params: { idPergunta: idPergunta },
        });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao criar pesquisa:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  async getAllPerguntas(pesquisa: number): Promise<PerguntaResponse[]> {
    try {
      const response = await pesquisaApi.get('/pergunta/getAll', {
          params: {pesquisa: pesquisa },
        });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao adicionar colaborador:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }

  async deletarPergunta(idPergunta: number): Promise<PerguntaResponse> {
    try {
      const response = await pesquisaApi.patch('/pergunta/deletar-perunta', {}, {
          params: { idPergunta: idPergunta },
        });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      console.error('Erro ao criar pesquisa:', axiosError.response?.data || axiosError.message);
      throw error;
    }
  }
}

export default new PesquisaService();