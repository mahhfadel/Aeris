import React, { useState } from 'react';
import { Field, Input, HStack, Button, Text, Link   } from "@chakra-ui/react"
import logo from '@/assets/Logo.svg';
import "./LoginPage.scss";



const RecuperarContaPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setEmailError('');

        if (!email) {
            setEmailError('Insira um email');
            return
        } 
        
        if (!validateEmail(email)) {
            setEmailError('Email inválido');
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
                        <h2 className="login-title">Recuperar conta</h2>
                        <Field.Root invalid={!!emailError}>
                            <Field.Label className='input-label'>
                                Email
                            </Field.Label>
                            <Input placeholder="email@email.com" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                            <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
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

export default RecuperarContaPage;