import React, { useState } from 'react';
import Popup from "@/components/Popup/Popup";
import {Button, Input, NativeSelectRoot, NativeSelectField, Field, Group } from "@chakra-ui/react"
import { MdClose  } from "react-icons/md";
import "./PopupNovaPergunta.scss";
import {PerguntaRequest,OpcoesRequest} from '@/types/pesquisa.types';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (pergunta: PerguntaRequest) => void;
}

const PopupNovaPergunta: React.FC<PopupProps> = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

    const [tipoPergunta, setTipoPergunta] = useState<'descritiva' | 'escala' | 'opcoes'>('descritiva');
    const [pergunta, setPergunta] = useState('');
    const [escalaAdjetivo, setEscalaAdjetivo] = useState('');
    const [opcoes, setOpcoes] = useState<OpcoesRequest[]>([]);
    const [novaOpcao, setNovaOpcao] = useState('');
    const [perguntaError, setPerguntaError] = useState('');
    const [opcoesError, setOpcoesError] = useState('');
    const [escalaError, setEscalaError] = useState('');

    const handleAddOpcao = () => {
        if (!novaOpcao.trim()) {
            setOpcoesError('Digite uma opção válida');
            return;
        }

        if (opcoes.some(opcao => opcao.descricao === novaOpcao)) {
            setOpcoesError('Essa opção já existe');
            return;
        }

        setOpcoes([...opcoes, { descricao: novaOpcao }]);
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

    const handleSubmitAddPergunta = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!pergunta.trim()) {
            setPerguntaError('O título da pergunta é obrigatório');
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

        if (tipoPergunta === 'opcoes' && opcoes.length > 12) {
            setOpcoesError('Você só pode inserir 12 opções');
            return;
        }

        let novaPergunta = {} as PerguntaRequest;

        novaPergunta.pergunta = pergunta;
        novaPergunta.adjetivo = escalaAdjetivo;
        novaPergunta.tipoPergunta = tipoPergunta;
        novaPergunta.opcoes = opcoes;

        resetForm();
        onAdd(novaPergunta);
    };

    const resetForm = () => {
        setPergunta('');
        setEscalaAdjetivo('');
        setNovaOpcao('');
        setPerguntaError('');
        setOpcoesError('');
        setEscalaError('');
        setOpcoes([]);
    };

  return (
    <Popup
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="popup">
            <div className="popup-top">
                <h2>Adicionar Pergunta</h2>
            </div>

            <form className="add-pergunta-form" onSubmit={handleSubmitAddPergunta}>
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

                <Field.Root invalid={!!perguntaError}>
                    <Field.Label className='input-label'>
                    Pergunta
                    </Field.Label>
                    <Input 
                    placeholder="Digite a pergunta" 
                    width="full" 
                    className='input' 
                    value={pergunta}
                    onChange={(e) => {
                        setPergunta(e.target.value);
                        setPerguntaError('');
                    }}
                    />
                    <Field.ErrorText fontSize="0.9rem">{perguntaError}</Field.ErrorText>
                </Field.Root>

                {tipoPergunta === 'escala' && (
                    <>
                    <Field.Root invalid={!!escalaError}>
                        <Field.Label className='input-label'>
                            Escala
                        </Field.Label>
                        <Input placeholder="Digite o adjetivo da escala de Likert" width="full" className='input' value={escalaAdjetivo} onChange={(e) => setEscalaAdjetivo(e.target.value)}/>
                        <Field.ErrorText fontSize="0.9rem">{escalaError}</Field.ErrorText>
                    </Field.Root>
                    </>
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

                    {/* Lista de opções adicionadas */}
                    {opcoes.length > 0 && (
                        <div className="pergunta-content">
                            <div className="opcoes-list">
                            {opcoes.map((opcao, index) => (
                                <div key={index} className="opcao-tag">
                                    {opcao.descricao} 
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

                <Button 
                    type="submit" 
                    width="full" 
                    className="button"
                    colorScheme="blue"
                    mt={4}
                >
                    Adicionar Pergunta
                </Button>
            </form>
        </div>
    </Popup>
  );
};

export default PopupNovaPergunta;
