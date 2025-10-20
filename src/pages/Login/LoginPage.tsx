import React, { useState } from 'react';
import { Field, Input, HStack, Button, Text, Link} from "@chakra-ui/react"
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { PasswordInput } from "@/components/ui/password-input"
import logo from '@/assets/Logo.svg';
import "./LoginPage.scss";



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Insira um email');
            return
        } else if (!validateEmail(email)) {
            setEmailError('Email inválido');
            return
        }


        if (!password) {
            setPasswordError('Insira uma senha');
            return
        } else if (password.length < 6) {
            setPasswordError('Senha deve ter pelo menos 6 caracteres');
            return
        }

        alert('Login bem-sucedido!');
    };

    return (
        <div className='container-body'>
            <div className="container-logo">
                <img src={logo} alt="Logo da Aeris Plataforma de Pesquisa" className="logo" />
            </div>
            <div className='container-form'>
                    <HStack as="form" width="full" className="login-form" onSubmit={handleSubmit}>
                        <h2 className="login-title">Login</h2>
                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Email
                            </Field.Label>
                            <Input placeholder="email@email.com" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                        </Field.Root>

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

                        <Button type="submit" width="full" className="button" onSubmit={handleSubmit}>
                            Entrar
                        </Button>

                        <Text className='navegation-text'>
                            Esqueceu sua senha?{" "}
                            <Link href="/recuperar-senha" color="#002930" textDecoration="underline">
                                Clique aqui
                            </Link>
                        </Text>
                    </HStack>
            </div>
        </div>
    );
};

export default LoginPage;