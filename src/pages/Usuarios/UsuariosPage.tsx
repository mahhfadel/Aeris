import React, {useEffect, useState } from 'react';
import {Button, Input,NativeSelectRoot, NativeSelectField, Field} from "@chakra-ui/react"
import usuarioService from '../../services/usuariosService';
import authService from '../../services/authService';
import { AllUsuariosResponse } from '../../types/usuario.types';
import { ErrorResponse } from '../../types/error.types';
import { MdOutlineAdd } from "react-icons/md";
import Pagecontainer from "@/components/props/PageContainerProps"
import Usuarios from "@/components/Usuarios/Usuarios"
import Popup from "@/components/Popup/Popup";
import "./UsuariosPage.scss";

interface State {
  usuarios: AllUsuariosResponse[];
}

const UsuariosPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');


    const [state, setState] = useState<State>({
        usuarios: []
    });

    const buscarUsuarios = async (empresaId: number) => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const data = await usuarioService.getAllUsers(empresaId);
        setState({ usuarios: data});
    };

    useEffect(() => {
        buscarUsuarios(1);
    }, []);

    const { usuarios} = state;

    console.log(usuarios)

    const handleSubmitAddUsuario = () => {
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
                {usuarios.map((usuario) => (
                    <Usuarios key={usuario.id} id={usuario.id} nome={usuario.nome} email={usuario.email} respondidos={usuario.respondidos} total={usuario.total}/>
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