export type RespostaItemRequest = {
    perguntaId: number;
    tipoPergunta: string; 
    respostaDescritiva: string;
    respostaEscala: string;
    respostaOpcoes: string[]; 
};

export type RespostaRequest = {
    pesquisaId: number;
    tokenUser: string;
    respostas: RespostaItemRequest[];
};

export type RespostaResponse = {
    pesquisaId: number;
    usuarioId: number;
    totalRespostas: number;
    submissaoEm: Date;
    status: string;
};
