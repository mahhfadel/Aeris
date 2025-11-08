import React, {useEffect, useState } from 'react';
import {Button, Input, Field, HStack} from "@chakra-ui/react"
import usuarioService from '../../services/usuariosService';
import { AllUsuariosResponse } from '../../types/usuario.types';
import { ErrorResponse } from '../../types/error.types';
import { MdOutlineAdd } from "react-icons/md";
import Pagecontainer from "@/components/props/PageContainerProps"
import Usuarios from "@/components/Usuarios/Usuarios"
import Popup from "@/components/Popup/Popup";
import DialogPopup from "@/components/Popup/DialogPopup"
import "./UsuariosPage.scss";
import { AxiosError } from 'axios';
import AvisoVazio from "@/components/AvisoVazio/AvisoVazio"

interface State {
  usuarios: AllUsuariosResponse[];
}

const UsuariosPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMessagemPopupOpen, setIsMessagemPopupOpen] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState('');
    const [nome, setNome] = useState('');
    const [nomeError, setNomeError] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [sobrenomeError, setSobrenomeError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');

    const [state, setState] = useState<State>({
        usuarios: []
    });

    const buscarUsuarios = async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const data = await usuarioService.getAllUsers();
        setState({ usuarios: data});
    };

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const { usuarios} = state;

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmitAddUsuario = async (e: React.FormEvent) => {
        e.preventDefault();

        setNomeError('');
        setSobrenomeError('');
        setEmailError('');
        setConfirmEmailError('');
        setMensagemPopup('');

        if (!nome) {
            setNomeError('Insira um nome');
            return
        } else if(nome.length < 3){
            setNomeError('Nome precisa ter pelo menos 3 caracteres');
            return
        }

        if (!sobrenome) {
            setSobrenomeError('Insira um sobrenome');
            return
        } else if(sobrenome.length < 3){
            setSobrenomeError('Sobrenome precisa ter pelo menos 3 caracteres');
            return
        }

        if (!email) {
            setEmailError('Insira um email');
            return
        } else if (!validateEmail(email)) {
            setEmailError('Email inválido');
            return
        }

        if (!confirmEmail) {
            setConfirmEmailError('Confirme o email');
            return
        } else if (email != confirmEmail) {
            setConfirmEmailError('Os emails não conhecidem');
            return
        }

        try {
            const response = await usuarioService.adicionarColaborador(email,nome, sobrenome);
            setMensagemPopup(response.mensagem)
            buscarUsuarios()
            setIsPopupOpen(false)
            setIsMessagemPopupOpen(true)
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao adicionar novo colaborador.';
            setMensagemPopup(errorMessage);
            setIsMessagemPopupOpen(true)
            console.error('Erro:', err);
        }
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
                {usuarios.map((usuario) => (
                    <Usuarios key={usuario.id} nome={usuario.nome} email={usuario.email} respondidos={usuario.respondidos} total={usuario.total}/>
                ))}

                {usuarios.length == 0 && (
                    <AvisoVazio nenhum="nenhum usuário" adicionar={true} instrucao= "Adicione novos usuários a plataforma" botao="Novo colaborador"/>
                )}
            </div>

            <Popup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            >
                <div className="popup">
                    <div className="popup-top">
                        <h2>Novo colaborador</h2>
                    </div>

                    <HStack as="form" width="full" className="add-pergunta-form" onSubmit={handleSubmitAddUsuario}>
                        <Field.Root invalid={!!nomeError}>
                            <Field.Label className='input-label'>
                                Nome
                            </Field.Label>
                            <Input placeholder="Insira o nome" width="full" className='input' onChange={(e) => setNome(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{nomeError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!sobrenomeError}>
                            <Field.Label className='input-label'>
                                Sobrenome
                            </Field.Label>
                            <Input placeholder="Insira o sobrenome" width="full" className='input' onChange={(e) => setSobrenome(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{sobrenomeError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Email
                            </Field.Label>
                            <Input placeholder="email@email.com" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!confirmEmailError}>
                            <Field.Label className='input-label'>
                                Confirme email
                            </Field.Label>
                            <Input placeholder="email@email.com" width="full" className='input' onChange={(e) => setConfirmEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{confirmEmailError}</Field.ErrorText>
                        </Field.Root>

                        <Button type="submit" width="full" className="button" onSubmit={handleSubmitAddUsuario}>
                            Adicionar
                        </Button>
                    </HStack>
                </div>
            </Popup>

            <DialogPopup
                isOpen={isMessagemPopupOpen}
                onClose={() => setIsMessagemPopupOpen(false)}
                viewConfirmaButton={true}
                onConfirma={() => setIsMessagemPopupOpen(false)}
                viewCancelButton={false}
                mensagem={mensagemPopup}
            />

        </Pagecontainer>
    );
};

export default UsuariosPage;