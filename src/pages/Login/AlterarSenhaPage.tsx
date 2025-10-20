import React, { useState } from 'react';
import { Field, Input, HStack, Button, Text, Link   } from "@chakra-ui/react"
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { PasswordInput } from "@/components/ui/password-input"
import logo from '@/assets/Logo.svg';
import "./LoginPage.scss";



const AlterarSenhaPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmaPasswordError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setPasswordError('');
        setConfirmaPasswordError('');

        if (password == '') {
            setPasswordError('Digite uma nova senha');
            return
        }

        if (password.length < 6) {
            setPasswordError('Senha deve ter pelo menos 6 caracteres');
            return
        }
        
        if (confirmPassword == '') {
            setConfirmaPasswordError('Você precisa confirmar a senha');
            return
        }

        if (password != confirmPassword) {
            setConfirmaPasswordError('As senhas não coincidem');
            return
        }

        alert('SUCESSO!');
    };

    return (
        <div className='container-body'>
            <div className="container-logo">
                <img src={logo} alt="Logo da Aeris Plataforma de Pesquisa" className="logo" />
            </div>
            <div className='container-form'>
                    <HStack as="form" width="full" className="login-form" onSubmit={handleSubmit}>
                        <h2 className="login-title">Alterar senha</h2>

                        <Field.Root invalid={!!passwordError}>
                            <Field.Label className='input-label'>
                                Senha
                            </Field.Label>
                            <PasswordInput visibilityIcon={{
                                    on: <LuEye color="#002930" />,
                                    off: <LuEyeOff color="#002930" />
                                }}
                                placeholder="********" width="full" className='input'onChange={(e) => setPassword(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{passwordError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!confirmPasswordError}>
                            <Field.Label className='input-label'>
                                Confirmar Senha
                            </Field.Label>
                            <PasswordInput visibilityIcon={{
                                    on: <LuEye color="#002930" />,
                                    off: <LuEyeOff color="#002930" />
                                }}
                                placeholder="********" width="full" className='input'onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{confirmPasswordError}</Field.ErrorText>
                        </Field.Root>

                        <Button type="submit" width="full" className="button" onSubmit={handleSubmit}>
                            Confirmar
                        </Button>

                        <Text className='navegation-text'>
                            <Link href="/login" color="#002930" textDecoration="underline">
                                Clique aqui
                            </Link>
                            {" "} para fazer login
                        </Text>
                    </HStack>
            </div>
        </div>
    );
};

export default AlterarSenhaPage;