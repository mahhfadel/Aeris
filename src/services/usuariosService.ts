import { getApi} from '../config';
import { AllUsuariosResponse } from '../types/usuario.types';

export const userApi = getApi('user');

class UsuarioService {
  
  async getAllUsers(empresaId: number): Promise<AllUsuariosResponse[]> {
    const response = await userApi.get('/user/allUsuario', {
      params: { empresa: empresaId },
    });
    return response.data;
  }
}

export default new UsuarioService();