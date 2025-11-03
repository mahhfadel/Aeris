export interface UsuarioRequest {
  email: string;
  nome: string;
  sobrenome: string;
  empresa: number;
}

export interface UsuarioResponse {
  email: string;
  nome: string;
  sobrenome: string;
  tipo: string;
  empresa: number
  dadosPessoais: DadosPessoais;
  mensagem: string;
}

export interface DadosPessoais{
  id: number;
  genero: string;
  contratado_em: Date;
  data_nascimento: Date;
  setor: string;
  cargo: string;
  sexualidade: string;
  termos_de_uso: boolean;
  usuario
}

export interface AllUsuariosResponse {
  id: number;
  nome: string;
  email: string;
  genero: string;
  setor: string;
  cargo: string;
  tempoDeCasa: string;
  respondidos: number;
  total: number;
}

export interface DadosPessoaisRequest{
  genero: string;
  contratado_em: string;
  data_nascimento: string;
  setor: string;
  cargo: string;
  sexualidade: string;
  termos_de_uso: boolean;
  emailUsuario: string;
}

export interface DadosPessoaisResponse{
  emailUsuario: string;
  dadosRespondidos: boolean;
  mensagem: string;
}