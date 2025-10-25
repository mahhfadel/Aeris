import React, { useState } from 'react';
import { BsEmojiFrown, BsEmojiAstonished, BsEmojiNeutral, BsEmojiSmile, BsEmojiGrin} from "react-icons/bs";
import {Button, Field} from "@chakra-ui/react"
import "./ResponderPesquisaPage.scss";
import logo from '@/assets/Logo.svg';
import { useNavigate} from "react-router-dom";
import { MdOutlineExitToApp} from "react-icons/md"

const ResponderPesquisaPage = () => {
    const navigate = useNavigate();
    const [descritivaResponse, setDescritivaResponse] = useState('');
    const [error, setError] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectEscala, setSelectEscala] = useState<number | null>(null);
    const [selectOpcoes, setSelectOpcoes] = useState<number[]>([]);

    const mockPerguntas =[
        {
            id: 1,
            titulo: "Como você avalia o ambiente de trabalho da empresa?",
            tipo: "descritiva",
        },
        {   
            id: 2,
            titulo: "Qual seu nível de satisfação com a liderança?",
            tipo: "escala",
            escalaAdjetivo: "Satisfeito"
        },
        {
            id: 3,
            titulo: "Quais benefícios você mais valoriza?",
            tipo: "opcoes",
            opcoes: [
            "Vale alimentação",
            "Plano de saúde",
            "Home office",
            "Vale transporte",
            ],
            multiplesEscolhas: true,
        },
    ];

  const question = mockPerguntas[currentQuestion];

    const validadeQuestions = () => {
        switch (question.tipo) {
            case 'descritiva':
                if(!descritivaResponse){
                    setError('Sua resposta não pode ser nula!');
                    return false;
                }

                if(descritivaResponse.length <= 10){
                    setError('Sua resposta precisa ter pelo menos 10 caracteres');
                    return false;
                }
                setError('');
                return true;
            case 'escala':
                if(!selectEscala){
                    setError('Selecione uma opção')
                    return false;
                }
                setError('');
                return true;
            case 'opcoes':
                if(selectOpcoes.length < 1){
                    setError('Selecione pelo menos uma opção')
                    return false;
                }
                setError('');
                return true;
        }
    };

    const handleLogout = () => {
        navigate("/login");
    };

    const handleNext = () => {
        if(validadeQuestions()){
            if (currentQuestion < mockPerguntas.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            }
        }
    };

    const handleFinish = () => {
        if(validadeQuestions()){
            console.log('finish')
            handleLogout()
        }
    };

    const toggleOpcao = (numero: number) => {
        setSelectOpcoes(prev => {
            const opcoes = prev || [];
            
            if (opcoes.includes(numero)) {
                setError('');
                return opcoes.filter(n => n !== numero);
            }
            
            if (opcoes.length >= 4) {
                setError('Você só pode selecionar 4 opções');
                return prev;
            }
            
            setError('');
            return [...opcoes, numero];
        });
        console.log(selectOpcoes)
    };

    const renderQuestion = () => {
        switch (question.tipo) {
        case 'descritiva':
            return (
                <div className='grid-question'>
                    <textarea
                        className="descritiva"
                        rows={4}
                        placeholder="Digite sua resposta aqui..."
                        onChange={(e) => setDescritivaResponse(e.target.value)}
                    />
                </div>
            );

        case 'escala':
            return (
                <div className='grid-question'>
                    <div className="escala-options-responder-pesquisa">
                        <div key={0} className={`escala-tag-responder-pesquisa ${selectEscala === 0 ? 'select' : ''}`} onClick={() => setSelectEscala(0)}>
                            <BsEmojiFrown className='emoji'/>
                            Pouquíssimo {question.escalaAdjetivo}
                        </div>

                        <div key={1} className={`escala-tag-responder-pesquisa ${selectEscala === 1 ? 'select' : ''}`} onClick={() => setSelectEscala(1)}>
                            <BsEmojiAstonished className='emoji'/>
                            Pouco {question.escalaAdjetivo}
                        </div>

                        <div key={2} className={`escala-tag-responder-pesquisa ${selectEscala === 2 ? 'select' : ''}`} onClick={() => setSelectEscala(2)}>
                            <BsEmojiNeutral className='emoji'/>
                            {question.escalaAdjetivo}
                        </div>

                        <div key={3} className={`escala-tag-responder-pesquisa ${selectEscala === 3 ? 'select' : ''}`} onClick={() => setSelectEscala(3)}>
                            <BsEmojiSmile className='emoji'/>
                            Muito {question.escalaAdjetivo}
                        </div>

                        <div key={4} className={`escala-tag-responder-pesquisa ${selectEscala === 4 ? 'select' : ''}`}onClick={() => setSelectEscala(4)}>
                            <BsEmojiGrin className='emoji'/>
                            Muitíssimo {question.escalaAdjetivo}
                        </div>
                    </div>
            </div>
            );

        case 'opcoes':
            return (
                    <div className="options-responder-pesquisa">
                        {question.opcoes.map((opcao, index) => (
                            <div key={index} 
                                className={`opcao-tag ${selectOpcoes.includes(index) ? 'select' : ''}`}
                                onClick={() => toggleOpcao(index)}
                            >
                            {opcao} 
                            </div>
                        ))}
                    </div>

            );

        default:
            return null;
        }
    };

  return (
    <div className='container-body-responder-pesquisa'>
        <div className='container-header'>
            <img src={logo} alt="Logo da Aeris Plataforma de Pesquisa" className='logo' />
            <Button className='logout'
            onClick={handleLogout}>
                <MdOutlineExitToApp className='exitLogo'/>
            </Button>
        </div>

        <div className='container-questions'>
            <div className='render-question'>
                <p>Pesquisa #001</p>
                <h2>{question.titulo}</h2>
                {renderQuestion()}
                {currentQuestion != mockPerguntas.length - 1 && (
                <Button
                    onClick={handleNext}
                    className='button-render-next'
                >
                    Próxima
                </Button>
                )}

                {currentQuestion === mockPerguntas.length - 1 && (
                <Button
                    onClick={handleFinish}
                    className='button-render-send'
                >
                    Enviar
                </Button>
                )}
                <p className='error'>{error}</p>
            </div>
            <div className='control-questions'>
                {mockPerguntas.map((_, index) => (
                    <Button
                        key={index}
                        // onClick={() => setCurrentQuestion(index)}
                        className={`current-question-control ${currentQuestion === index ? 'set' : ''}`}
                    >
                        {index+1}
                    </Button>
                ))}

            </div>
        </div>
   
    </div>
  );
};

export default ResponderPesquisaPage;