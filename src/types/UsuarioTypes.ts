export interface Usuario {
  id: string;
  nome: string;
  email: string;
  genero?: 'Masculino' | 'Feminino' | 'Outro';
  setor?: string;
  cargo?: string;
  tempoCasa?: string;
  respondidos?: number;
  total?: number;
  select?: boolean;
}

export interface UsuarioTableProps {
  usuarios: Usuario[];
  onSelect?: (id: string) => void;
  onEdit?: (usuario: Usuario) => void;
  onRemove?: (id: string) => void;
}