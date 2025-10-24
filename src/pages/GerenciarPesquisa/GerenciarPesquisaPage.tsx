import React, { useState } from 'react';
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

type PerguntaTipo = 'descritiva' | 'escala' | 'opcoes';

interface PerguntaData {
    id: number;
    titulo: string;
    tipo: PerguntaTipo;
    descricao?: string;
    escalaAdjetivo?: string;
    opcoes?: string[];
    multiplesEscolhas?: boolean;
}

const UsuariosPage = () => {
    const [isPopupOpenAddUser, setisPopupOpenAddUser] = useState(false);
    const [isPopupOpenAddPerguntas, setisPopupOpenAddPerguntas] = useState(false);
    const [isPopupOpenEditarPerguntas, setisPopupOpenEditarPerguntas] = useState(false);
    const navigate = useNavigate();

    const [mockPerguntas, setMockPerguntas] = useState([
    {
        id: 1,
        titulo: "Como você avalia o ambiente de trabalho da empresa?",
        tipo: "descritiva",
    },
    {   
        id: 2,
        titulo: "Qual seu nível de satisfação com a liderança?",
        tipo: "escala",
        escalaAdjetivo: "Satisfeito"
    },
    {
        id: 3,
        titulo: "Quais benefícios você mais valoriza?",
        tipo: "opcoes",
        opcoes: [
        "Vale alimentação",
        "Plano de saúde",
        "Home office",
        "Vale transporte",
        "Auxílio creche"
        ],
        multiplesEscolhas: true,
    },
    ]);

     const [mockUsuarios, setUsuarios] = useState([
            { id: "1234", nome: "Ana Luiza", email: "15/10/2025", respondidos:'20', total:'35', select: false},
            { id: "5678", nome: "Carlos Eduardo", email: "03/03/2025", respondidos:'11', total:'15', select: false},
            { id: "9123", nome: "Carolina Santos", email: "24/06/2025", respondidos:'39', total:'45', select: false},
        ]);


    return (
        <Pagecontainer>
            <div className="header">
                <div className='content-header'>
                    <div className='title-header'>
                        <MdArrowBackIos className='arrowBack' onClick={() => navigate('/home')}/>
                        <h2 className="page-title">Gerenciar pesquisa</h2>
                    </div>
                    <Button className='btn-finalizar' onClick={() => navigate(`/home`)}>
                        <MdOutlineCheck  />
                        Finalizar
                    </Button>
                </div>
                <p>Pesquisa #00X | xx/xx/xxxx - xx/xx/xxxx | Ativa</p>
            </div>

            <div className='body'> 
                <Expandable title="Perguntas"  contentButton="Nova pergunta" onButtonAdd={() => setisPopupOpenAddPerguntas(true)} buttonVisible={true}>
                    {mockPerguntas.map((pergunta, index)=>(
                        <Pergunta 
                            pergunta={pergunta as any} 
                            onEdit={(p) => setisPopupOpenEditarPerguntas(true)}
                            defaultExpanded={false}
                        />
                    ))}
                </Expandable>

                <Expandable title="Colaboradores"  contentButton="Novo colaborador" onButtonAdd={() => setisPopupOpenAddUser(true)} buttonVisible={true}>
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
                                {mockUsuarios.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell textAlign="left">{item.nome}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.email}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.total}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.email}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.total}</Table.Cell>
                                </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </div>
                </Expandable>

                <Expandable title="Dados Pesquisa" buttonVisible={false}>
                    <p>Conteúdo aqui</p> 
                </Expandable>
            </div>

            <PopupNovaPergunta
                isOpen={isPopupOpenAddPerguntas}
                onClose={() => setisPopupOpenAddPerguntas(false)}
            />

            <PopupAdicionarColaborador
                isOpen={isPopupOpenAddUser}
                onClose={() => setisPopupOpenAddUser(false)}
            />

            <PopupEditarPergunta
                isOpen={isPopupOpenEditarPerguntas}
                onClose={() => setisPopupOpenEditarPerguntas(false)}
            />

        </Pagecontainer>
    );
};

export default UsuariosPage;