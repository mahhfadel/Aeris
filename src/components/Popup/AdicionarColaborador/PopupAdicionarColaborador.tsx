import React, { useState } from 'react';
import Popup from "@/components/Popup/Popup";
import {Button, Table, Input, InputGroup,Checkbox} from "@chakra-ui/react"
import {MdOutlineSearch } from "react-icons/md";
import "./PopupAdicionarColaborador.scss";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupNovaPergunta: React.FC<PopupProps> = ({ isOpen, onClose}) => {
    if (!isOpen) return null;
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
        onClose();
    };

  return (
    <Popup
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="popup">
            <div className="popup-top">
                <h2>Adicionar colaborador</h2>
                
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
  );
};

export default PopupNovaPergunta;
