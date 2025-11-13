import { getApi} from '../config';
import {DashboardResponse} from '@/types/dashboard.types';


export const dashboardApi = getApi('search');

class PesquisaService {
  async dashGeral(): Promise<DashboardResponse[]> {

    const response = await dashboardApi.get('/dashboard/dashGeral');
    return response.data;
  }

   async getDashboardPesquisa(pesquisaId: number): Promise<DashboardResponse[]> {
        const response = await dashboardApi.get('/dashboard/dashPesquisa', {
            params: { pesquisaId: pesquisaId },
          });
        
        return response.data;
    }
}

export default new PesquisaService();