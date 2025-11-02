import React, { useState } from 'react';
import { Field, Input, HStack, Button, Text, Link   } from "@chakra-ui/react"
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { PasswordInput } from "@/components/ui/password-input"
import authService from '../../services/authService';
import usuariosService from '../../services/usuariosService';
import { useNavigate} from "react-router-dom";
import { AxiosError } from 'axios';
import logo from '@/assets/Logo.svg';
import "./LoginPage.scss";
import { ErrorResponse } from '../../types/error.types';
import DialogPopup from "@/components/Popup/DialogPopup"

const LoginColaboradorPage = () => {
    const navigate = useNavigate();
    const [isMessagemPopupOpen, setIsMessagemPopupOpen] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState('');
    const [email, setEmail] = useState('');
    const [chave, setChave] = useState('');
    const [emailError, setEmailError] = useState('');
    const [chaveError, setChaveError] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setEmailError('');
        setChaveError('');
        setMensagemPopup('');

        if (!email) {
            setEmailError('Insira um email');
            return
        } else if (!validateEmail(email)) {
            setEmailError('Email inválido');
            return
        }


        if (!chave) {
            setChaveError('Insira a chave da pesquisa');
            return
        } else if (chave.length < 5) {
            setChaveError('A chave deve conter pelo menos 8 caracteres');
            return
        }

        try {
            const response = await authService.loginColaborador(email, chave);

            try{
                const respondeuSenso = await usuariosService.respondeuOSenso(response.email);

                if(respondeuSenso.dadosRespondidos){
                     navigate(`/responder-pesquisa?id=${response.id_pesquisa}`);
                } else{
                    navigate('/senso')
                }
            } catch (err) {
                const axiosError = err as AxiosError<ErrorResponse>;
                const errorMessage = 
                    axiosError.response?.data?.message || 
                    'Erro ao verificar se o usuário respondeu o senso';
                setMensagemPopup(errorMessage);
                setIsMessagemPopupOpen(true)
                console.error('Erro:', err);

            }
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao fazer login. Verifique as informações fornecidas';
            setMensagemPopup(errorMessage);
            setIsMessagemPopupOpen(true)
            console.error('Erro:', err);
        }
    };

    return (
        <div className='container-body'>
            <div className="container-logo">
                <img src={logo} alt="Logo da Aeris Plataforma de Pesquisa" className="logo" />
            </div>
            <div className='container-form'>
                    <HStack as="form" width="full" className="login-form" onSubmit={handleSubmit}>
                        <h2 className="login-title">Bem vindo!</h2>
                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Email
                            </Field.Label>
                            <Input placeholder="email@email.com" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!chaveError}>
                            <Field.Label className='input-label'>
                                Chave
                            </Field.Label>
                            <PasswordInput visibilityIcon={{
                                    on: <LuEye color="#002930" />,
                                    off: <LuEyeOff color="#002930" />
                                }}
                                placeholder="********" width="full" className='input'onChange={(e) => setChave(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{chaveError}</Field.ErrorText>
                        </Field.Root>

                        <Button type="submit" width="full" className="button" onSubmit={handleSubmit}>
                            Entrar
                        </Button>
                    </HStack>
            </div>

            <DialogPopup
                isOpen={isMessagemPopupOpen}
                onClose={() => setIsMessagemPopupOpen(false)}
                viewConfirmaButton={true}
                onConfirma={() => setIsMessagemPopupOpen(false)}
                viewCancelButton={false}
                mensagem={mensagemPopup}
            />

        </div>
    );
};

export default LoginColaboradorPage;