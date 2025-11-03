import React, { useEffect, useState } from 'react';
import Popup from "@/components/Popup/Popup";
import { Button, Table, Input, InputGroup, Checkbox } from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";
import "./PopupAdicionarColaborador.scss";
import { AllUsuariosResponse } from '@/types/usuario.types';
import usuarioService from '@/services/usuariosService';

interface State {
  usuarios: AllUsuariosResponse[];
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupNovaPergunta: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [state, setState] = useState<State>({ usuarios: [] });
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set()); 

  const buscarUsuarios = async () => {
    try {
      const data = await usuarioService.getAllUsers();
      setState({ usuarios: data });
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const { usuarios } = state;

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const filteredUsuarios = usuarios.filter(u =>
    u.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Pesquisa realizada:", search);
    }
  };

  const handleSubmitAddUsers = () => {
    const usuariosSelecionados = usuarios.filter(u => selectedIds.has(u.id));
    console.log('Usuários selecionados:', usuariosSelecionados);
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup">
        <div className="popup-top">
          <h2>Adicionar colaborador</h2>

          <InputGroup startElement={<MdOutlineSearch />} className='input'>
            <Input
              placeholder="Pesquisar colaborador"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown} // 🔍 busca com Enter
            />
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
              {filteredUsuarios.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell textAlign="left">
                    <Checkbox.Root
                      checked={selectedIds.has(item.id)}
                      onCheckedChange={() => handleCheckboxChange(item.id)}
                      variant="solid"
                      className='checkbox-popup'
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{item.nome}</Checkbox.Label>
                    </Checkbox.Root>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{item.genero}</Table.Cell>
                  <Table.Cell textAlign="center">{item.setor}</Table.Cell>
                  <Table.Cell textAlign="center">{item.cargo}</Table.Cell>
                  <Table.Cell textAlign="center">{item.tempoDeCasa}</Table.Cell>
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
