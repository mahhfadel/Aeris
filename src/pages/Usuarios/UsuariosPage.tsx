import React, { useState } from 'react';
import {Button, Table, Input,NativeSelectRoot, NativeSelectField, Field} from "@chakra-ui/react"
import { MdOutlineAdd } from "react-icons/md";
import Pagecontainer from "@/components/props/PageContainerProps"
import Usuarios from "@/components/Usuarios/Usuarios"
import Popup from "@/components/Popup/Popup";
import "./UsuariosPage.scss";



const UsuariosPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const mockUsuarios = [
        { id: "1234", nome: "Ana Luiza", email: "15/10/2025", respondidos:'20', total:'35', select: false},
        { id: "5678", nome: "Carlos Eduardo", email: "03/03/2025", respondidos:'11', total:'15', select: false},
        { id: "9123", nome: "Carolina Santos", email: "24/06/2025", respondidos:'39', total:'45', select: false},
    ];

    const handleSubmit = () => {
        alert('Usuário adicionado com sucesso!');
        setIsPopupOpen(false)
    };

    const handleSubmitAddUsuario = () => {
        alert('Pergunta adicionada com sucesso!');
        setIsPopupOpen(false)
    };

    return (
        <Pagecontainer>
            <div className="header-usuarios">
                <h2 className="page-title">Usuários</h2>
                <Button className='btn-novo-colaborador' onClick={() => setIsPopupOpen(true)}>
                    <MdOutlineAdd />
                    Novo colaborador
                </Button>
            </div>
            <div className='usuarios-list'>
                {mockUsuarios.map((usuario) => (
                    <Usuarios id={usuario.id} nome={usuario.nome} email={usuario.email} respondidos={usuario.respondidos} total={usuario.total}/>
                ))}
            </div>

            <Popup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            >
                <div className="popup">
                    <div className="popup-top">
                        <h2>Novo colaborador</h2>
                    </div>

                    <div className="add-pergunta-form" onSubmit={handleSubmitAddUsuario}>
                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Nome
                            </Field.Label>
                            <Input placeholder="Insira o nome" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Sobrenome
                            </Field.Label>
                            <Input placeholder="Insira o sobrenome" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Email
                            </Field.Label>
                            <Input placeholder="email@email.com" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Confirme email
                            </Field.Label>
                            <Input placeholder="email@email.com" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <div className="input-container">
                            <label className="input-label">Tipo</label>
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
                                Confirme email
                            </Field.Label>
                            <Input placeholder="00/00/0000" type="date" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Button type="submit" width="full" className="button" onSubmit={handleSubmitAddUsuario}>
                            Adicionar
                        </Button>
                    </div>
                </div>
            </Popup>

        </Pagecontainer>
    );
};

export default UsuariosPage;