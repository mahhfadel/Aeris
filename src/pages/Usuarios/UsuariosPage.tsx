import React, { useState } from 'react';
import {Button, Table, Input, InputGroup,Checkbox} from "@chakra-ui/react"
import { MdOutlineAdd } from "react-icons/md";
import { MdOutlineSearch} from "react-icons/md"
import Pagecontainer from "@/components/props/PageContainerProps"
import Usuarios from "@/components/Usuarios/Usuarios"
import Popup from "@/components/Popup/Popup";
import "./UsuariosPage.scss";



const UsuariosPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const mockUsuarios = [
        { id: "1234", nome: "Ana Luiza", email: "15/10/2025", respondidos:'20', total:'35', select: false},
        { id: "5678", nome: "Carlos Eduardo", email: "03/03/2025", respondidos:'11', total:'15', select: false},
        { id: "9123", nome: "Carolina Santos", email: "24/06/2025", respondidos:'39', total:'45', select: false},
    ];

    const handleSubmit = () => {
        alert('Usuário adicionado com sucesso!');
        setIsPopupOpen(false)
    };

    return (
        <Pagecontainer>
            <div className="header">
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

                    <div className='table-popup'>
                    </div>

                    <Button type="submit" width="full" className="button" onSubmit={handleSubmit}>
                        Adicionar
                    </Button>
                </div>
            </Popup>

        </Pagecontainer>
    );
};

export default UsuariosPage;