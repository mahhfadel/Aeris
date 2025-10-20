import React, { useState } from 'react';
import {Button, Table, Input, InputGroup,Checkbox, NativeSelectRoot, NativeSelectField, Field } from "@chakra-ui/react"
import { MdArrowBackIos,MdOutlineSearch } from "react-icons/md";
import { useNavigate} from "react-router-dom";
import Pagecontainer from "@/components/props/PageContainerProps"
import Expandable from "@/components/Expandable/ExpandableSection"
import Popup from "@/components/Popup/Popup";
import "./NovaPesquisaPage.scss";



const UsuariosPage = () => {
    const [email, setEmail] = useState('');
     const [emailError, setEmailError] = useState('');
    const [isPopupOpenAddUser, setisPopupOpenAddUser] = useState(false);
    const [isPopupOpenAddPerguntas, setisPopupOpenAddPerguntas] = useState(false);
    const navigate = useNavigate();

    const [mockUsuarios, setUsuarios] = useState([
        { id: "1234", nome: "Ana Luiza", email: "15/10/2025", respondidos:'20', total:'35', select: false},
        { id: "5678", nome: "Carlos Eduardo", email: "03/03/2025", respondidos:'11', total:'15', select: false},
        { id: "9123", nome: "Carolina Santos", email: "24/06/2025", respondidos:'39', total:'45', select: false},
    ]);

    const handleCheckboxChange = (id) => {
        setUsuarios(prevUsuarios => 
            prevUsuarios.map(usuario => 
                usuario.id === id 
                    ? { ...usuario, select: !usuario.select }
                    : usuario
            )
        );
    };

    const handleSubmitAddUsers = () => {
        const usuariosSelecionados = mockUsuarios.filter(u => u.select);
        console.log('Usuários selecionados:', usuariosSelecionados);
        alert('Usuário adicionado com sucesso!');
        setisPopupOpenAddUser(false)
    };

    const handleSubmitAddPergunta = () => {
        alert('Pergunta adicionada com sucesso!');
        setisPopupOpenAddPerguntas(false)
    };

    return (
        <Pagecontainer>
            <div className="header">
                <div className='title-header'>
                    <MdArrowBackIos className='arrowBack' onClick={() => navigate('/home')}/>
                    <h2 className="page-title">Nova pesquisa</h2>
                </div>
            </div>

            <div className='body'> 
                <Expandable title="Perguntas"  defaultExpanded={true} contentButton="Nova pergunta" onButtonAdd={() => setisPopupOpenAddPerguntas(true)} buttonVisible={true}>
                    <p>Conteúdo aqui</p> 
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
            </div>
            {/* Adiconar nova pergunta */}
            <Popup
                isOpen={isPopupOpenAddPerguntas}
                onClose={() => setisPopupOpenAddPerguntas(false)}
            >
                <div className="popup">
                    <div className="popup-top">
                        <h2>Adicionar Pergunta</h2>
                    </div>

                    <div className="add-pergunta-form" onSubmit={handleSubmitAddPergunta}>
                        <div className="input-container">
                            <label className="input-label">Tipo de pergunta</label>
                            <NativeSelectRoot>
                                <NativeSelectField className="input" placeholder="Selecione o tipo">
                                <option value="opcao1">Opção 1</option>
                                <option value="opcao2">Opção 2</option>
                                <option value="opcao3">Opção 3</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </div>

                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Pergunta
                            </Field.Label>
                            <Input placeholder="Digite a pergunta" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Escala inicial
                            </Field.Label>
                            <Input placeholder="Digite a escala inicial" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Escala final
                            </Field.Label>
                            <Input placeholder="Digite a escala final" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        
                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Adicione uma opção
                            </Field.Label>
                            <Input placeholder="Adicione uma opção" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Button type="submit" width="full" className="button" onSubmit={handleSubmitAddPergunta}>
                            Entrar
                        </Button>
                    </div>
                </div>
            </Popup>

            {/* Adiconar novo colaborador */}
            <Popup
                isOpen={isPopupOpenAddUser}
                onClose={() => setisPopupOpenAddUser(false)}
            >
                <div className="popup">
                    <div className="popup-top">
                        <h2>Novo colaborador</h2>
                        
                        <InputGroup startElement={<MdOutlineSearch />} className='input'>
                            <Input placeholder="Pesquisar colaborador" />
                        </InputGroup>
                    </div>

                    <div className='table-user'>
                        <Table.Root className="table-user-element">
                            <Table.Header className="table-header-popup">
                                <Table.Row>
                                <Table.ColumnHeader textAlign="left">Nome Completo</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Gênero</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Setor</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Cargo</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Tempo de casa</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body className="table-body-popup">
                                {mockUsuarios.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell textAlign="left">
                                        <Checkbox.Root checked={item.select}
                                                onCheckedChange={() => handleCheckboxChange(item.id)} 
                                                variant="solid" 
                                                className='checkbox-popup'>
                                            <Checkbox.HiddenInput />
                                            <Checkbox.Control />
                                            <Checkbox.Label>{item.nome}</Checkbox.Label>
                                        </Checkbox.Root>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">{item.email}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.total}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.email}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.total}</Table.Cell>
                                </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </div>

                    <Button type="submit" width="full" className="button" onClick={handleSubmitAddUsers}>
                        Adicionar
                    </Button>
                </div>
            </Popup>

        </Pagecontainer>
    );
};

export default UsuariosPage;