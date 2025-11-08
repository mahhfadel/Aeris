import { getApi} from '../config';
import { AxiosError } from 'axios';
import {RespostaItemRequest, RespostaRequest, RespostaResponse} from '../types/response.types';
import authService from '../services/authService';

export const pesquisaApi = getApi('search');

class ResponseService {
    async submeterRespostas(respostas: RespostaItemRequest[]): Promise<RespostaResponse> {
        try {
          const pesquisaId = authService.getCurrentUser().idPesquisa;
          const tokenUser = authService.getToken();
    
          const response = await pesquisaApi.post<RespostaResponse>('/resposta/submter', {
                  pesquisaId,
                  tokenUser,
                  respostas,
                } as RespostaRequest)
          
          return response.data;
        } catch (error) {
          const axiosError = error as AxiosError<{ mensagem: string }>;
          console.error('Erro ao criar pesquisa:', axiosError.response?.data || axiosError.message);
          throw error;
        }
    }
}

export default new ResponseService();