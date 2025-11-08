import React, {useEffect, useState } from 'react';
import {Button, Table} from "@chakra-ui/react"
import { MdArrowBackIos, MdOutlineCheck  } from "react-icons/md";
import { useNavigate} from "react-router-dom";
import Pagecontainer from "@/components/props/PageContainerProps"
import Expandable from "@/components/Expandable/ExpandableSection"
import PopupNovaPergunta from "@/components/Popup/NovaPergunta/PopupNovaPergunta";
import PopupAdicionarColaborador from "@/components/Popup/AdicionarColaborador/PopupAdicionarColaborador"
import PopupEditarPergunta from "@/components/Popup/EditarPergunta/PopupEditarPergunta"
import Pergunta from "@/components/Pergunta/Pergunta"
import "./GerenciarPesquisaPage.scss";
import {PerguntaRequest, PesquisaResponse, PerguntaResponse} from '@/types/pesquisa.types';
import AvisoVazio from "@/components/AvisoVazio/AvisoVazio"
import { AllUsuariosResponse } from '@/types/usuario.types';
import pesquisaService from '../../services/pesquisaService';
import { useSearchParams } from "react-router-dom";
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/error.types';

const GerenciarPesquisaPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [pesquisa, setPesquisa] = useState<PesquisaResponse | null>(null);
    const [isPopupOpenAddUser, setisPopupOpenAddUser] = useState(false);
    const [isPopupOpenAddPerguntas, setisPopupOpenAddPerguntas] = useState(false);
    const [isPopupOpenEditarPerguntas, setisPopupOpenEditarPerguntas] = useState(false);
    const [perguntaSelecionada, setPerguntaselecionada] = useState<PerguntaRequest | null>(null);

    const [colaboradores, setColaboradores] = useState<AllUsuariosResponse[]>([]);
    const [perguntas, setPerguntas] = useState<PerguntaResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const fetchPesquisa = async () => {
            const id = Number(searchParams.get("id"));
            reload(id);
        };

        fetchPesquisa();
    }, [searchParams]);

    const reload = async (pesquisaId: number) => {
        if (!pesquisaId || isNaN(pesquisaId)) {
            console.error("ID inválido");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await pesquisaService.getPesquisa(pesquisaId);
            setPesquisa(response);
            await Promise.all([
                getColaboradores(pesquisaId),
                getPerguntas(pesquisaId)
            ]);
        } catch (error) {
            console.error("Erro ao buscar pesquisa:", error);
        } finally {
            setLoading(false);
        }
    }

    const getPerguntas = async (pesquisaId: number) => {
        try {
            const response = await pesquisaService.getAllPerguntas(pesquisaId);
            setPerguntas(response);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao buscar perguntas.';
            console.error('Erro:', errorMessage);
        }
    }

    const getColaboradores = async (pesquisaId: number) => {
        try {
            const response = await pesquisaService.getAllColaboraderesUsers(pesquisaId);
            setColaboradores(response);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao buscar colaboradores.';
            console.error('Erro:', errorMessage);
        }
    }

    const handleAddPergunta = async (novaPergunta: PerguntaRequest) => {
         try {
            novaPergunta.pesquisaId = pesquisa.idPesquisa;
            await pesquisaService.createPergunta(novaPergunta);
            setisPopupOpenAddPerguntas(false);
            reload(pesquisa.idPesquisa)
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao adicionar nova pergunta.';
            console.error('Erro:', err);
        }
    };

    const handleEditPergunta = (pergunta: PerguntaRequest) => {
        setPerguntaselecionada(pergunta);
        setisPopupOpenEditarPerguntas(true);
    };

    const handleSaveEdit = async (perguntaEditada: PerguntaRequest) => {
        try {
            await pesquisaService.atualizarPergunta(perguntaEditada.id, perguntaEditada);
            setisPopupOpenEditarPerguntas(false);
            reload(pesquisa.idPesquisa)
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao adicionar nova pergunta.';
            console.error('Erro:', err);
        }
    };

    const handleFinalizarPesquisa = async () => {
        if (!pesquisa) return;
        
        try {
            await pesquisaService.finalizarPesquisa(pesquisa.idPesquisa);
            reload(pesquisa.idPesquisa);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao finalizar pesquisa.';
            console.error('Erro:', errorMessage);
        }
    }

    const handleAdicionarColaboradores = async (novosColaboradores: AllUsuariosResponse[]) => {
        try {
            const ids = novosColaboradores.map((colab: { id: number }) => colab.id);
            await pesquisaService.adiconarColaboradores(ids, pesquisa.idPesquisa);
            setisPopupOpenAddUser(false);
            reload(pesquisa.idPesquisa)
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao adicionar novo colaborador.';
            console.error('Erro:', err);
        }
    };

    const handleRemovePergunta = async (id: number) => {
        try {
            await pesquisaService.deletarPergunta(id);
            setisPopupOpenEditarPerguntas(false);
            reload(pesquisa.idPesquisa)
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao adicionar nova pergunta.';
            console.error('Erro:', err);
        }
    };

    if (loading) {
        return (
            <Pagecontainer>
                <div>Carregando...</div>
            </Pagecontainer>
        );
    }

    if (!pesquisa) {
        return (
            <Pagecontainer>
                <div>Pesquisa não encontrada</div>
            </Pagecontainer>
        );
    }

    return (
        <Pagecontainer>
            <div className="header">
                <div className='content-header'>
                    <div className='title-header'>
                        <MdArrowBackIos className='arrowBack' onClick={() => navigate('/home')}/>
                        <h2 className="page-title">Gerenciar pesquisa</h2>
                    </div>
                    <Button 
                        className='btn-finalizar' 
                        disabled={!pesquisa.ativo} 
                        onClick={handleFinalizarPesquisa}
                    >
                        <MdOutlineCheck />
                        Finalizar
                    </Button>
                </div>
                <p>
                    {pesquisa.nome} | {pesquisa.criadoEm} - {pesquisa.prazo} | {pesquisa.ativo ? "Ativo" : "Finalizado"}
                </p>
            </div>

            <div className='body'> 
                <Expandable 
                    title="Perguntas" 
                    contentButton="Nova pergunta" 
                    onButtonAdd={() => setisPopupOpenAddPerguntas(true)} 
                    buttonVisible={true}
                >
                    {perguntas.map((pergunta) => (
                        <Pergunta 
                            key={pergunta.id}
                            pergunta={pergunta} 
                            onEdit={(pergunta) => handleEditPergunta(pergunta)}
                            defaultExpanded={false}
                        />
                    ))}
                    {perguntas.length === 0 && (
                        <AvisoVazio 
                            nenhum="nenhuma pergunta" 
                            adicionar={true} 
                            instrucao="Adicione novas perguntas à pesquisa" 
                            botao="Nova pergunta"
                        />
                    )}
                </Expandable>

                <Expandable 
                    title="Colaboradores" 
                    contentButton="Novo colaborador" 
                    onButtonAdd={() => setisPopupOpenAddUser(true)} 
                    buttonVisible={true}
                >
                    {colaboradores.length !== 0 && (
                        <div className='table-user'>
                            <Table.Root className="table-user-element">
                                <Table.Header className="table-header">
                                    <Table.Row>
                                        <Table.ColumnHeader textAlign="left">Nome Completo</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center">Gênero</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center">Setor</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center">Cargo</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center">Tempo de casa</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body className="table-body">
                                    {colaboradores.map((item) => (
                                        <Table.Row key={item.id}>
                                            <Table.Cell textAlign="left">{item.nome}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.genero}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.setor}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.cargo}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.tempoDeCasa}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </div>
                    )}

                    {colaboradores.length === 0 && (
                        <AvisoVazio 
                            nenhum="nenhum colaborador" 
                            adicionar={true} 
                            instrucao="Adicione novos colaboradores à pesquisa" 
                            botao="Novo colaborador"
                        />
                    )}
                </Expandable>

                {/* <Expandable title="Dados Pesquisa" buttonVisible={false}>
                    <AvisoVazio 
                        nenhum="nada por" 
                        adicionar={false} 
                        instrucao="Adicione novos colaboradores à pesquisa" 
                        botao="Novo colaborador"
                    />
                </Expandable> */}
            </div>

            <PopupNovaPergunta
                isOpen={isPopupOpenAddPerguntas}
                onClose={() => setisPopupOpenAddPerguntas(false)}
                onAdd={handleAddPergunta}
            />

            <PopupAdicionarColaborador
                isOpen={isPopupOpenAddUser}
                onClose={() => setisPopupOpenAddUser(false)}
                onSubimt={handleAdicionarColaboradores}
                idPesquisa={pesquisa.idPesquisa}
            />

            {perguntaSelecionada && (
                <PopupEditarPergunta
                    isOpen={isPopupOpenEditarPerguntas}
                    onClose={() => setisPopupOpenEditarPerguntas(false)}
                    pergunta={perguntaSelecionada}
                    onEdit={handleSaveEdit}
                    onRemove={handleRemovePergunta} 
                />
            )}

        </Pagecontainer>
    );
};

export default GerenciarPesquisaPage;