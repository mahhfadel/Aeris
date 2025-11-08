import React, {useState } from 'react';
import {Table, Button } from "@chakra-ui/react"
import { MdArrowBackIos, MdOutlineCheck } from "react-icons/md";
import { useNavigate} from "react-router-dom";
import Pagecontainer from "@/components/props/PageContainerProps"
import Expandable from "@/components/Expandable/ExpandableSection"
import PopupNovaPergunta from "@/components/Popup/NovaPergunta/PopupNovaPergunta";
import PopupAdicionarColaborador from "@/components/Popup/AdicionarColaborador/PopupAdicionarColaborador"
import PopupEditarPergunta from "@/components/Popup/EditarPergunta/PopupEditarPergunta"
import Pergunta from "@/components/Pergunta/Pergunta"
import AvisoVazio from "@/components/AvisoVazio/AvisoVazio"
import "./NovaPesquisaPage.scss";
import pesquisaService from '../../services/pesquisaService';
import { ErrorResponse } from '../../types/error.types';
import { AxiosError } from 'axios';
import {PerguntaRequest} from '@/types/pesquisa.types';
import { AllUsuariosResponse } from '@/types/usuario.types';
import DialogPopup from "@/components/Popup/DialogPopup"



const UsuariosPage = () => {
    const [isPopupOpenAddUser, setisPopupOpenAddUser] = useState(false);
    const [isPopupOpenAddPerguntas, setisPopupOpenAddPerguntas] = useState(false);
    const [isPopupOpenEditarPerguntas, setisPopupOpenEditarPerguntas] = useState(false);
    const [perguntaSelecionada, setPerguntaSelecionada] = useState<PerguntaRequest | null>(null);
    const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<AllUsuariosResponse[] | []>([]);
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState('');

    const [localPerguntas, setlocalPerguntas] = useState<PerguntaRequest[]>([]);

    const handleAddPergunta = (novaPergunta: PerguntaRequest) => {
        novaPergunta.id = localPerguntas.length + 1;
        setlocalPerguntas(prevPerguntas => [...prevPerguntas, novaPergunta])
        setisPopupOpenAddPerguntas(false); 
    };

    const handleEditPergunta = (pergunta: PerguntaRequest) => {
        setPerguntaSelecionada(pergunta);
        setisPopupOpenEditarPerguntas(true);
    };

    const handleSaveEdit = (perguntaEditada: PerguntaRequest) => {
        setlocalPerguntas(prev => 
            prev.map(p => p.id === perguntaEditada.id ? perguntaEditada : p)
        );
    };

    const handleRemovePergunta = (id: number) => {
        setlocalPerguntas(prev => prev.filter(p => p.id !== id));
    };

    const handleAdicionarColaboradores = (novosColaboradores: AllUsuariosResponse[]) => {
        setColaboradoresSelecionados(prev => {
            const atualizados = [...(prev || []), ...novosColaboradores];
            const unicos = atualizados.filter(
            (colab, index, self) =>
                index === self.findIndex((c) => c.id === colab.id)
            );

            return unicos;
        });

        setisPopupOpenAddUser(false);
    };


    const [isLoading, setIsLoading] = useState(false);
    const handleSavePesquisa = async () => {
        if (isLoading) return;

        setIsLoading(true);

        if(localPerguntas.length < 3){
            setMensagemPopup("Você precisa adicionar ao menos três pergunta a pesquisa");
            setIsPopupOpen(true);
            setIsLoading(false);
            return;
        }

        if(colaboradoresSelecionados.length < 3){
            setMensagemPopup("Você precisa adicionar ao menos três colaboradores a pesquisa");
            setIsPopupOpen(true);
            setIsLoading(false);
            return;
        }

        try {
            const pesquisa = await pesquisaService.createPesquisa();
            try {
                const ids = colaboradoresSelecionados.map((colab: { id: number }) => colab.id);
                await pesquisaService.adiconarColaboradores(ids, pesquisa.idPesquisa);
            } catch (err) {
                const axiosError = err as AxiosError<ErrorResponse>;
                const errorMessage = 
                    axiosError.response?.data?.message || 
                    'Erro ao adicionar novo colaborador.';
                console.error('Erro:', errorMessage);
            }

            try {
                await Promise.all(
                localPerguntas.map(async (p) => {
                    p.pesquisaId = pesquisa.idPesquisa;
                    await pesquisaService.createPergunta(p);
                })
                );

            } catch (err) {
                const axiosError = err as AxiosError<ErrorResponse>;
                const errorMessage = 
                    axiosError.response?.data?.message || 
                    'Erro ao adicionar nova pergunta.';
                console.error('Erro:', errorMessage);
            }

            navigate('/home')
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao adicionar nova pesquisa.';
            console.error('Erro:', errorMessage);
        } finally {
            setIsLoading(false); 
        }

    };

    return (
        <Pagecontainer>
            <div className="header">
                <div className='content-header'>
                    <div className='title-header'>
                        <MdArrowBackIos className='arrowBack' onClick={() => navigate('/home')}/>
                        <h2 className="page-title">Nova pesquisa</h2>
                    </div>
                    <Button className='btn-finalizar' onClick={() => handleSavePesquisa()}>
                        <MdOutlineCheck/>
                        Adicionar
                    </Button>
                </div>
            </div>

            <div className='body'> 
                <Expandable title="Perguntas"  defaultExpanded={false} contentButton="Nova pergunta" onButtonAdd={() => setisPopupOpenAddPerguntas(true)} buttonVisible={true}>
                    {localPerguntas.map((pergunta)=>(
                        <Pergunta
                            key={pergunta.id} 
                            pergunta={pergunta as any} 
                            onEdit={(pergunta) => handleEditPergunta(pergunta)}
                            defaultExpanded={false}
                        />
                    ))} 
                    {localPerguntas.length == 0 && (
                        <AvisoVazio nenhum="nenhuma pergunta" adicionar={true} instrucao= "Adicione novas perguntas a pequisa" botao="Nova pergunta"/>
                    )}
                </Expandable>

                <Expandable title="Colaboradores"  contentButton="Novo colaborador" onButtonAdd={() => setisPopupOpenAddUser(true)} buttonVisible={true}>
                    {colaboradoresSelecionados.length != 0 && (
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
                                    {colaboradoresSelecionados.map((item) => (
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

                    {colaboradoresSelecionados.length == 0 && (
                        <AvisoVazio nenhum="nenhum colaborador" adicionar={true} instrucao= "Adicione novos colaboradores a pequisa" botao="Novo colaborador"/>
                    )}
                </Expandable>
            </div>

            <PopupNovaPergunta
                isOpen={isPopupOpenAddPerguntas}
                onClose={() => setisPopupOpenAddPerguntas(false)}
                onAdd={(pergunta) => handleAddPergunta(pergunta)}
            />

            <PopupAdicionarColaborador
                isOpen={isPopupOpenAddUser}
                onClose={() => setisPopupOpenAddUser(false)}
                onSubimt={(colaboradores) => handleAdicionarColaboradores(colaboradores)}
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

            <DialogPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                viewConfirmaButton={true}
                onConfirma={() => setIsPopupOpen(false)}
                viewCancelButton={false}
                mensagem={mensagemPopup}
            />

        </Pagecontainer>
    );
};

export default UsuariosPage;