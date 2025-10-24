import React, { useState, useEffect } from 'react';
import Popup from "@/components/Popup/Popup";
import {Button, Input, NativeSelectRoot, NativeSelectField, Field, Group } from "@chakra-ui/react"
import { MdClose  } from "react-icons/md";
import "./PopupEditarPergunta.scss";
import {PerguntaData} from '@/types';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  pergunta: PerguntaData;
  onEdit: (pergunta: PerguntaData) => void;
  onRemove: (id: number) => void;
}

const PopupEditarPergunta: React.FC<PopupProps> = ({ 
  isOpen, 
  onClose, 
  pergunta,
  onEdit,
  onRemove 
}) => {
  const [tipoPergunta, setTipoPergunta] = useState<'descritiva' | 'escala' | 'opcoes'>('descritiva');
  const [titulo, setTitulo] = useState('');
  const [escalaAdjetivo, setEscalaAdjetivo] = useState('');
  const [opcoes, setOpcoes] = useState<string[]>([]);
  const [novaOpcao, setNovaOpcao] = useState('');
  const [multiplesEscolhas, setMultiplesEscolhas] = useState(false);
  const [tituloError, setTituloError] = useState('');
  const [opcoesError, setOpcoesError] = useState('');
  const [escalaError, setEscalaError] = useState('');

  useEffect(() => {
    if (isOpen && pergunta) {
      setTipoPergunta(pergunta.tipo);
      setTitulo(pergunta.titulo);
      
      if (pergunta.tipo === 'escala' && pergunta.escalaAdjetivo) {
        setEscalaAdjetivo(pergunta.escalaAdjetivo);
      }
      
      if (pergunta.tipo === 'opcoes') {
        setOpcoes(pergunta.opcoes || []);
        setMultiplesEscolhas(pergunta.multiplesEscolhas || false);
      }
    }
  }, [isOpen, pergunta]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleAddOpcao = () => {
    if (!novaOpcao.trim()) {
      setOpcoesError('Digite uma opção válida');
      return;
    }
    
    if (opcoes.includes(novaOpcao.trim())) {
      setOpcoesError('Essa opção já existe');
      return;
    }

    setOpcoes([...opcoes, novaOpcao.trim()]);
    setNovaOpcao('');
    setOpcoesError('');
  };

  const handleRemoveOpcao = (index: number) => {
    setOpcoes(opcoes.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOpcao();
    }
  };

  const handleSubmitEditPergunta = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setTituloError('O título da pergunta é obrigatório');
      return;
    }

    if (tipoPergunta === 'escala' && !escalaAdjetivo.trim()) {
      setEscalaError('Adicione um adjetivo para a escala Likert');
      return;
    }
    
    if (tipoPergunta === 'opcoes' && opcoes.length < 3) {
      setOpcoesError('Adicione pelo menos três opções');
      return;
    }

    let perguntaEditada: PerguntaData;

    switch (tipoPergunta) {
      case 'descritiva':
        perguntaEditada = {
          id: pergunta.id, 
          titulo,
          tipo: 'descritiva'
        };
        break;

      case 'escala':
        perguntaEditada = {
          id: pergunta.id,
          titulo,
          tipo: 'escala',
          escalaAdjetivo,
        };
        break;

      case 'opcoes':
        perguntaEditada = {
          id: pergunta.id,
          titulo,
          tipo: 'opcoes',
          opcoes,
          multiplesEscolhas
        };
        break;
    }

    onEdit?.(perguntaEditada);
    onClose();
  };

  const handleRemovePergunta = () => {
    if (window.confirm('Tem certeza que deseja remover esta pergunta?')) {
      onRemove?.(pergunta.id);
      onClose();
    }
  };

  const resetForm = () => {
    setTitulo('');
    setEscalaAdjetivo('');
    setNovaOpcao('');
    setMultiplesEscolhas(false);
    setTituloError('');
    setOpcoesError('');
    setEscalaError('');
    setOpcoes([]);
  };

  if (!isOpen) return null;

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup">
        <div className="popup-top">
          <h2>Editar Pergunta</h2>
        </div>

        <form className="add-pergunta-form" onSubmit={handleSubmitEditPergunta}>
          <div className="input-container">
            <label className="input-label">Tipo de pergunta</label>
            <NativeSelectRoot>
              <NativeSelectField 
                className="input" 
                value={tipoPergunta}
                onChange={(e) => setTipoPergunta(e.target.value as any)}
              >
                <option value="descritiva">Descritiva</option>
                <option value="escala">Escala</option>
                <option value="opcoes">Opções</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </div>

          <Field.Root invalid={!!tituloError}>
            <Field.Label className='input-label'>
              Pergunta
            </Field.Label>
            <Input 
              placeholder="Digite a pergunta" 
              width="full" 
              className='input' 
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value);
                setTituloError('');
              }}
            />
            <Field.ErrorText fontSize="0.9rem">{tituloError}</Field.ErrorText>
          </Field.Root>

          {tipoPergunta === 'escala' && (
            <Field.Root invalid={!!escalaError}>
              <Field.Label className='input-label'>
                Escala
              </Field.Label>
              <Input 
                placeholder="Digite o adjetivo da escala de Likert" 
                width="full" 
                className='input' 
                value={escalaAdjetivo} 
                onChange={(e) => {
                  setEscalaAdjetivo(e.target.value);
                  setEscalaError('');
                }}
              />
              <Field.ErrorText fontSize="0.9rem">{escalaError}</Field.ErrorText>
            </Field.Root>
          )}

          {tipoPergunta === 'opcoes' && (
            <>
              <Field.Root invalid={!!opcoesError}>
                <Field.Label className='input-label'>
                  Adicionar opção
                </Field.Label>
                <Group attached width="full">
                  <Input
                    width="full"
                    placeholder="Digite uma opção" 
                    className='input'
                    value={novaOpcao}
                    onChange={(e) => {
                      setNovaOpcao(e.target.value);
                      setOpcoesError('');
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  <Button variant="outline" onClick={handleAddOpcao} className='inputButton'>
                    Adicionar
                  </Button>
                </Group>
                <Field.ErrorText fontSize="0.9rem">{opcoesError}</Field.ErrorText>
              </Field.Root>

              {opcoes.length > 0 && (
                <div className="pergunta-content">
                  <div className="opcoes-list">
                    {opcoes.map((opcao, index) => (
                      <div key={index} className="opcao-tag">
                        {opcao} 
                        <button
                          type="button"
                          onClick={() => handleRemoveOpcao(index)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className='buttons'>
            <Button 
              type="button"
              className="buttonRemove"
              onClick={handleRemovePergunta}
              mt={4}
            >
              Remover Pergunta
            </Button>
            <Button 
              type="submit" 
              className="buttonAdd"
              mt={4}
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default PopupEditarPergunta;