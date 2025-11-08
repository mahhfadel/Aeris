import React, { useState, useEffect } from 'react';
import { BsEmojiFrown, BsEmojiAstonished, BsEmojiNeutral, BsEmojiSmile, BsEmojiGrin} from "react-icons/bs";
import authService from '../../services/authService';
import {Button} from "@chakra-ui/react"
import "./ResponderPesquisaPage.scss";
import logo from '@/assets/Logo.svg';
import { useNavigate} from "react-router-dom";
import { MdOutlineExitToApp} from "react-icons/md"
import { RespostaItemRequest} from '../../types/response.types';
import { ErrorResponse } from '../../types/error.types';
import {PerguntaResponse, PesquisaResponse} from '@/types/pesquisa.types';
import pesquisaService from '../../services/pesquisaService';
import responseService from '../../services/responseService';
import { AxiosError } from 'axios';
import { useSearchParams } from "react-router-dom";
import DialogPopup from "@/components/Popup/DialogPopup"

const ResponderPesquisaPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [descritivaResponse, setDescritivaResponse] = useState('');
    const [error, setError] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectEscala, setSelectEscala] = useState<number | null>(null);
    const [selectOpcoes, setSelectOpcoes] = useState<number[]>([]);

    const [loading, setLoading] = useState(true);
    const [shouldSubmit, setShouldSubmit] = useState(false);

    const [isMessagemPopupOpen, setIsMessagemPopupOpen] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState('');
    const [isMessagemPopupOpenErro, setIsMessagemPopupOpenErro] = useState(false);
    const [mensagemPopupErro, setMensagemPopupErro] = useState('');

    const [perguntas, setPerguntas] = useState<PerguntaResponse[]>([]);
    const [respostas, setRespostas] = useState<RespostaItemRequest[]>([]);
    const [pesquisa, setPesquisa] = useState<PesquisaResponse | null>(null);

    useEffect(() => { 
        const fetchPesquisa = async () => {
            const id = Number(searchParams.get("id"));
            const response = await pesquisaService.getPesquisa(id);
            setPesquisa(response);
            loadPage(id);
        };

        fetchPesquisa();
    }, [searchParams]);

    useEffect(() => {
        if (shouldSubmit) {
            saveResposta();
            setShouldSubmit(false);
        }
    }, [respostas]);

    const loadPage = async (pesquisaId: number) => {
        if (!pesquisaId || isNaN(pesquisaId)) {
            console.error("ID inválido");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await pesquisaService.getAllPerguntas(pesquisaId);
            setPerguntas(response);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao buscar perguntas.';
            console.error('Erro:', errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const question = perguntas[currentQuestion];

    const validadeQuestions = () => {
        switch (question.tipoPergunta.descricao) {
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
                if(selectEscala == null){
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
        authService.logout();
        navigate("/login-colaborador");
    };

    const handleNext = () => {
        if(validadeQuestions()){
            if (currentQuestion < perguntas.length - 1) {
                adicionarLocalResponse()
                setCurrentQuestion(prev => prev + 1);
            }
        }
    };

    const adicionarLocalResponse = () => {
        let respostaEscalaTexto = "";
        let respostaOpcoesTexto: string[] = [];

        if (question.tipoPergunta.descricao === "escala" && selectEscala !== null) {
            const escalaLabels = [
                `Pouquíssimo ${question.adjetivo}`,
                `Pouco ${question.adjetivo}`,
                `${question.adjetivo}`,
                `Muito ${question.adjetivo}`,
                `Muitíssimo ${question.adjetivo}`,
            ];
            respostaEscalaTexto = escalaLabels[selectEscala];
        }

        if (question.tipoPergunta.descricao === "opcoes" && selectOpcoes.length > 0) {
            respostaOpcoesTexto = selectOpcoes.map(
                (index) => question.tipoPergunta.opcoes[index].descricao
            );
        }

        const novaResposta: RespostaItemRequest = {
            perguntaId: question.id,
            tipoPergunta: question.tipoPergunta.descricao,
            respostaDescritiva: descritivaResponse || "",
            respostaEscala: respostaEscalaTexto,
            respostaOpcoes: respostaOpcoesTexto,
        };

        setRespostas((prevRespostas) => [...prevRespostas, novaResposta]);

        setDescritivaResponse("");
        setSelectEscala(null);
        setSelectOpcoes([]);
    };


    const handleFinish = () => {
        if (validadeQuestions()) {
            adicionarLocalResponse();
            setShouldSubmit(true);
        }
    };

    const saveResposta = async () => {
        try {
            setLoading(true);
            await responseService.submeterRespostas(respostas);

            setMensagemPopup("Obrigada por responder a {pesquisa.nome}!")
            setIsMessagemPopupOpen(true)
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao submeter respostas.';

            setMensagemPopupErro(errorMessage)
            setIsMessagemPopupOpenErro(true)
            console.error('Erro:', errorMessage);
        } finally {
            setLoading(false);
        }
    }

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
    };

    const renderQuestion = () => {
        switch (question.tipoPergunta.descricao) {
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
                            Pouquíssimo {question.adjetivo}
                        </div>

                        <div key={1} className={`escala-tag-responder-pesquisa ${selectEscala === 1 ? 'select' : ''}`} onClick={() => setSelectEscala(1)}>
                            <BsEmojiAstonished className='emoji'/>
                            Pouco {question.adjetivo}
                        </div>

                        <div key={2} className={`escala-tag-responder-pesquisa ${selectEscala === 2 ? 'select' : ''}`} onClick={() => setSelectEscala(2)}>
                            <BsEmojiNeutral className='emoji'/>
                            {question.adjetivo}
                        </div>

                        <div key={3} className={`escala-tag-responder-pesquisa ${selectEscala === 3 ? 'select' : ''}`} onClick={() => setSelectEscala(3)}>
                            <BsEmojiSmile className='emoji'/>
                            Muito {question.adjetivo}
                        </div>

                        <div key={4} className={`escala-tag-responder-pesquisa ${selectEscala === 4 ? 'select' : ''}`}onClick={() => setSelectEscala(4)}>
                            <BsEmojiGrin className='emoji'/>
                            Muitíssimo {question.adjetivo}
                        </div>
                    </div>
            </div>
            );

        case 'opcoes':
            return (
                    <div className="options-responder-pesquisa">
                        {question.tipoPergunta.opcoes.map((opcao, index) => (
                            <div key={index} 
                                className={`opcao-tag ${selectOpcoes.includes(index) ? 'select' : ''}`}
                                onClick={() => toggleOpcao(index)}
                            >
                            {opcao.descricao} 
                            </div>
                        ))}
                    </div>

            );

        default:
            return null;
        }
    };

    if (loading) {
        return (
            <div>
                <div>Carregando...</div>
            </div>
        );
    }

    if (!perguntas) {
        return (
            <div>
                <div>Pesquisa não encontrada</div>
            </div>
        );
    }

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
                <p>{pesquisa.nome}</p>
                <h2>{question.pergunta}</h2>
                {renderQuestion()}
                {currentQuestion != perguntas.length - 1 && (
                <Button
                    onClick={handleNext}
                    className='button-render-next'
                >
                    Próxima
                </Button>
                )}

                {currentQuestion === perguntas.length - 1 && (
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
                {perguntas.map((_, index) => (
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

        <DialogPopup
            isOpen={isMessagemPopupOpen}
            onClose={() => handleLogout()}
            viewConfirmaButton={true}
            onConfirma={() => handleLogout()}
            viewCancelButton={false}
            mensagem={mensagemPopup}
        />

        <DialogPopup
            isOpen={isMessagemPopupOpenErro}
            onClose={() => setIsMessagemPopupOpenErro(false)}
            viewConfirmaButton={true}
            onConfirma={() => setIsMessagemPopupOpenErro(false)}
            viewCancelButton={false}
            mensagem={mensagemPopupErro}
        />
   
    </div>
  );
};

export default ResponderPesquisaPage;