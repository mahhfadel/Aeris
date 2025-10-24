export type PerguntaTipo = 'descritiva' | 'escala' | 'opcoes';

export type PerguntaDescritiva = {
  id: number;
  titulo: string;
  tipo: 'descritiva';
  descricao?: string;
};

export type PerguntaEscala = {
  id: number;
  titulo: string;
  tipo: 'escala';
  escalaMin: number;
  escalaMax: number;
  escalaAdjetivo?: string;
  escalaLabels?: { [key: number]: string };
};

export type PerguntaOpcoes = {
  id: number;
  titulo: string;
  tipo: 'opcoes';
  opcoes: string[];
  multiplesEscolhas: boolean;
};

export interface PerguntaData {
    id: number;
    titulo: string;
    tipo: PerguntaTipo;
    descricao?: string;
    escalaAdjetivo?: string;
    opcoes?: string[];
    multiplesEscolhas?: boolean;
}


export type PerguntaDataTypes = PerguntaDescritiva | PerguntaEscala | PerguntaOpcoes;


export interface PerguntaProps {
  pergunta: PerguntaData;
  onEdit?: (pergunta: PerguntaData) => void;
  onRemove?: (id: number) => void;
  defaultExpanded?: boolean;
}
