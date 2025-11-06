export type OpcoesRequest = {
    descricao: string;
};

export type OpcoesResponse = {
    id: number;
    descricao: string;
};

export type PerguntaRequest = {
    pergunta: string;
    adjetivo?: string;
    tipoPergunta: string;
    opcoes?: OpcoesRequest[] ;
    pesquisaId?: number;
    id?: number;
};

export type PerguntaResponse = {
    id: number;
    pergunta: string;
    adjetivo?: string;
    mensagem?: string;
    tipoPergunta: TipoPerguntaResponse;
};

export type PesquisaResponse = {
    nome: string;
    idPesquisa: number;
    criadoEm: string;
    finalizadoEm: string ;
    prazo: string;
    ativo: boolean;
    totalUsuarios: number;
    respondidos: number;
    mensagem: string;
};

export type TipoPerguntaResponse = {
    id?: number;
    descricao: string;
    opcoes?: OpcoesResponse[];
};