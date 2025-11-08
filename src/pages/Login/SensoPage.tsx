import React, { useState} from 'react';
import { Field, Input, HStack, Button, Text, Link, NativeSelectRoot, NativeSelectField, Checkbox} from "@chakra-ui/react"
import logo from '@/assets/Logo.svg';
import  Popup from "@/components/Popup/Popup";
import "./LoginPage.scss";
import usuarioService from '../../services/usuariosService';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/error.types';
import DialogPopup from "@/components/Popup/DialogPopup"
import { useNavigate} from "react-router-dom";
import authService from '@/services/authService';



const LoginPage = () => {
    const navigate = useNavigate();
    const [dataNascimento, setDataNascimento] = useState('');
    const [dataNascimentoError, setDataNascimentoError] = useState('');
    const [identidadeGenero, setIdentidadeGenero] = useState('');
    const [identidadeGeneroError, setIdentidadeGeneroError] = useState('');
    const [orientacaoSexual, setOrientacaoSexual] = useState('');
    const [orientacaoSexualError, setOrientacaoSexualError] = useState('');
    const [setor, setSetor] = useState('');
    const [setorError, setSetorError] = useState('');
    const [cargo, setCargo] = useState('');
    const [cargoError, setCargoError] = useState('');
    const [dataContratacao, setDataContratacao] = useState('');
    const [dataContratacaoError, setDataContratacaoError] = useState('');
    const [termos, setTermos] = useState(false);
    const [termosError, setTermosError] = useState('');
    const [isPopupOpenTermosDeUso, setisPopupOpenTermosDeUso] = useState(false);
    const [isMessagemPopupOpen, setIsMessagemPopupOpen] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState('');

    const handleOpenTerms = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        setisPopupOpenTermosDeUso(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setDataNascimentoError('');
        setIdentidadeGeneroError('');
        setOrientacaoSexualError('');
        setSetorError('');
        setCargoError('');
        setDataContratacaoError('');
        setTermosError('');

        if (!dataNascimento) {
            setDataNascimento('Data de nascimento não pode ser nulo');
            return
        }

        if (!identidadeGenero) {
            setIdentidadeGeneroError('Selecione um valor para identidade de gênero');
            return
        }

        if (!orientacaoSexual) {
            setOrientacaoSexualError('Selecione um valor para orientação sexual');
            return
        }

        if (!setor) {
            setSetorError('Selecione um valor para setor');
            return
        }

        if (!cargo) {
            setCargoError('Selecione um valor para cargo');
            return
        }

        if (!dataContratacao) {
            setDataContratacaoError('Data de contratação não pode ser nulo');
            return
        }

        if (!termos) {
            setTermosError('Você precisa aceitar os termos de uso para prosseguir');
            return
        }

        try {
            await usuarioService.responderOSenso(identidadeGenero,
                                                                    dataContratacao,
                                                                    dataNascimento,
                                                                    setor,
                                                                    cargo,
                                                                    orientacaoSexual,
                                                                    termos);
            
                const idPesquisa = authService.getCurrentUser().idPesquisa;
            navigate(`/responder-pesquisa?id=${idPesquisa}`);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = 
                axiosError.response?.data?.message || 
                'Erro ao responder o senso.';
            setMensagemPopup(errorMessage);
            setIsMessagemPopupOpen(true)
            console.error('Erro:', err);
        }
    };

    return (
        <div className='container-body'>
            <div className="container-logo">
                <img src={logo} alt="Logo da Aeris Plataforma de Pesquisa" className="logo" />
            </div>
            <div className='container-form'>
                <HStack as="form" width="full" className="senso-form" onSubmit={handleSubmit}>
                    <h2 className="login-title">Dados</h2>
                    <Field.Root invalid={!!dataNascimentoError}>
                        <Field.Label className='input-label'>
                            Data de nascimento
                        </Field.Label>
                        <Input placeholder="00/00/0000" type="date" width="full" className='input' onChange={(e) => setDataNascimento(e.target.value)}/>
                        <Field.ErrorText fontSize="0.9rem">{dataNascimentoError}</Field.ErrorText>
                    </Field.Root>

                    <div className="input-container">
                        <Field.Root invalid={!!identidadeGeneroError}>
                            <Field.Label className="input-label">Identidade de Gênero</Field.Label>
                            <NativeSelectRoot>
                                <NativeSelectField className="input" placeholder="Selecione o gênero" onChange={(e) => setIdentidadeGenero(e.target.value)}>
                                <option value="Homem cis">Homem cis</option>
                                <option value="Homem trans">Homem trans</option>
                                <option value="Mulher cis">Mulher cis</option>
                                <option value="Mulher trans">Mulher trans</option>
                                <option value="Não binario">Não binário</option>
                                <option value="Intersexo">Intersexo</option>
                                <option value="Agenero">Agênero</option>
                                <option value="Outro">Outro</option>
                                <option value="prefiro não informar">Prefiro não informar</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                            <Field.ErrorText fontSize="0.9rem">{identidadeGeneroError}</Field.ErrorText>
                        </Field.Root>
                    </div>

                    <div className="input-container">
                        <Field.Root invalid={!!orientacaoSexualError}>
                            <Field.Label className="input-label">Orientação Sexual</Field.Label>
                            <NativeSelectRoot>
                                <NativeSelectField className="input" placeholder="Selecione a orientação sexual" onChange={(e) => setOrientacaoSexual(e.target.value)}>
                                <option value="Heterossexual">Heterossexual</option>
                                <option value="Homossexual">Homossexual</option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Pansexual">Pansexual</option>
                                <option value="Assexual">Assexual</option>
                                <option value="Outro">Outro</option>
                                <option value="Prefiro não informar">Prefiro não informar</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                            <Field.ErrorText fontSize="0.9rem">{orientacaoSexualError}</Field.ErrorText>
                        </Field.Root>
                    </div>

                    <div className="input-container">
                        <Field.Root invalid={!!setorError}>
                            <Field.Label className="input-label">Setor</Field.Label>
                            <NativeSelectRoot>
                                <NativeSelectField className="input" placeholder="Selecione o setor" onChange={(e) => setSetor(e.target.value)}>
                                    <option value="Administrativo">Administrativo</option>
                                    <option value="Financeiro">Financeiro</option>
                                    <option value="Tecnologia da informação">Tecnologia da Informação</option>
                                    <option value="Recursos humanos">Recursos Humanos</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Vendas">Vendas</option>
                                    <option value="Logística">Logística</option>
                                    <option value="Jurídico">Jurídico</option>
                                    <option value="Comercial">Comercial</option>
                                    <option value="Produção">Produção</option>
                                    <option value="Planejamento estratégico">Planejamento Estratégico</option>
                                    <option value="Atendimento ao cliente">Atendimento ao Cliente</option>
                                    <option value="Compras">Compras</option>
                                    <option value="Manutenção">Manutenção</option>
                                    <option value="Qualidade">Qualidade</option>
                                    <option value="Pesquisa e desenvolvimento">Pesquisa e Desenvolvimento</option>
                                    <option value="Comunicação">Comunicação</option>
                                    <option value="Segurança do trabalho">Segurança do Trabalho</option>
                                    <option value="Sustentabilidade">Sustentabilidade</option>
                                    <option value="Expedição">Expedição</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                            <Field.ErrorText fontSize="0.9rem">{setorError}</Field.ErrorText>
                        </Field.Root>
                    </div>

                    <div className="input-container">
                        <Field.Root invalid={!!cargoError}>
                            <Field.Label className="input-label">Cargo</Field.Label>
                            <NativeSelectRoot>
                                <NativeSelectField className="input" placeholder="Selecione o cargo" onChange={(e) => setCargo(e.target.value)}>
                                <option value="Estagiário">Estagiário</option>
                                <option value="Assistente administrativo">Assistente Administrativo</option>
                                <option value="Analista financeiro">Analista Financeiro</option>
                                <option value="Analista de sistemas">Analista de Sistemas</option>
                                <option value="Engenheiro de software">Engenheiro de Software</option>
                                <option value="Coordenador de projetos">Coordenador de Projetos</option>
                                <option value="Gerente de marketing">Gerente de Marketing</option>
                                <option value="Supervisor de vendas">Supervisor de Vendas</option>
                                <option value="Diretor financeiro">Diretor Financeiro</option>
                                <option value="Presidente">Presidente</option>
                                <option value="Técnico de suporte">Técnico de Suporte</option>
                                <option value="Analista de rh">Analista de RH</option>
                                <option value="Designer gráfico">Designer Gráfico</option>
                                <option value="Desenvolvedor frontend">Desenvolvedor Frontend</option>
                                <option value="Desenvolvedor backend">Desenvolvedor Backend</option>
                                <option value="Arquiteto de soluções">Arquiteto de Soluções</option>
                                <option value="Analista de dados">Analista de Dados</option>
                                <option value="Cientista de dados">Cientista de Dados</option>
                                <option value="Coordenador de ti">Coordenador de TI</option>
                                <option value="Chefe de operações">Chefe de Operações</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                            <Field.ErrorText fontSize="0.9rem">{cargoError}</Field.ErrorText>
                        </Field.Root>
                    </div>

                    <Field.Root invalid={!!dataContratacaoError}>
                        <Field.Label className='input-label'>
                            Data de contratação
                        </Field.Label>
                        <Input placeholder="00/00/0000" type="date" width="full" className='input' onChange={(e) => setDataContratacao(e.target.value)}/>
                        <Field.ErrorText fontSize="0.9rem">{dataContratacaoError}</Field.ErrorText>
                    </Field.Root>

                    <Text className="navegation-text">
                        <Checkbox.Root
                            variant="solid"
                            className="checkbox"
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                setTermos(target.checked);
                            }}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label className="check-box-label">
                                Aceito os{" "}
                                <Link href="#" onClick={handleOpenTerms} color="#002930" textDecoration="underline">
                                    termos de uso
                                </Link>
                            </Checkbox.Label>
                        </Checkbox.Root>
                    </Text>


                    <Button type="submit" width="full" className="button" onSubmit={handleSubmit}>
                        Confirmar
                    </Button>
                    {termosError && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>{termosError}</span>
                    )}
                </HStack>
            </div>

            <Popup
                isOpen={isPopupOpenTermosDeUso}
                onClose={() => setisPopupOpenTermosDeUso(false)}>
                    <div className="termos-container">
                        <h2>Termos de Uso e Coleta de Dados Pessoais</h2>

                        <h3>1. Finalidade da Coleta</h3>
                        <p>
                            Os dados pessoais informados neste formulário serão utilizados <strong>exclusivamente para fins de análise interna</strong>,
                            com o objetivo de <strong>avaliar o clima organizacional e promover ações voltadas à diversidade, inclusão e igualdade de gênero </strong>
                            no ambiente corporativo. As informações coletadas têm caráter <strong>estatístico e confidencial</strong>,
                            não sendo utilizadas para fins comerciais, de marketing ou qualquer outra finalidade distinta das aqui descritas.
                        </p>

                        <h3>2. Dados Coletados</h3>
                        <p>Serão coletadas as seguintes informações:</p>
                        <ul>
                            <li>Data de nascimento</li>
                            <li>Identidade de gênero</li>
                            <li>Orientação sexual</li>
                            <li>Setor de atuação</li>
                            <li>Cargo ocupado</li>
                            <li>Data de contratação</li>
                        </ul>
                        <p>
                            Esses dados são necessários para <strong>análises demográficas e comparativas</strong> dentro das pesquisas organizacionais,
                            permitindo a geração de <strong>relatórios agregados e anônimos</strong>.
                        </p>

                        <h3>3. Armazenamento e Segurança</h3>
                        <p>
                            Todos os dados serão <strong>armazenados de forma segura</strong> em ambiente protegido, com acesso restrito apenas a usuários autorizados
                            e vinculados à gestão da pesquisa. São adotadas <strong>medidas técnicas e administrativas</strong> para prevenir acessos não autorizados,
                            vazamentos ou qualquer forma de tratamento inadequado.
                        </p>

                        <h3>4. Anonimização dos Dados</h3>
                        <p>
                            Os resultados das análises e relatórios produzidos a partir das respostas serão
                            <strong> apresentados de maneira anonimizada</strong>, sem qualquer possibilidade de identificação individual dos participantes.
                        </p>

                        <h3>5. Consentimento e Direitos do Titular</h3>
                        <p>
                            Ao marcar a opção “Aceito os termos de uso”, o usuário <strong>autoriza o tratamento de seus dados pessoais </strong>
                            conforme as finalidades descritas neste termo, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
                            O participante poderá, a qualquer momento, <strong>solicitar a exclusão, correção ou acesso às informações fornecidas</strong>,
                            bastando entrar em contato com o responsável pela pesquisa.
                        </p>

                        <h3>6. Responsabilidade e Transparência</h3>
                        <p>
                            A organização responsável pela pesquisa compromete-se a <strong>manter a integridade, sigilo e transparência</strong> em todas as etapas
                            de coleta, armazenamento e uso dos dados, respeitando os princípios de boa-fé, finalidade, necessidade e proporcionalidade previstos na legislação.
                        </p>

                        <h3>7. Comunicação e Envio de E-mails</h3>
                        <p>
                            Ao participar das pesquisas, o usuário concorda que o endereço de e-mail informado poderá ser utilizado para o 
                            <strong> envio de notificações relacionadas a novas pesquisas ou convites de participação</strong>.
                            Esses comunicados terão caráter exclusivamente informativo, não possuindo conteúdo publicitário,
                            e serão enviados de forma controlada e segura. O participante poderá, a qualquer momento, 
                            <strong>solicitar a interrupção do recebimento dessas comunicações</strong> por meio dos canais de contato disponibilizados pela organização.
                        </p>

                    </div>
            </Popup>

            <DialogPopup
                isOpen={isMessagemPopupOpen}
                onClose={() => setIsMessagemPopupOpen(false)}
                viewConfirmaButton={true}
                onConfirma={() => setIsMessagemPopupOpen(false)}
                viewCancelButton={false}
                mensagem={mensagemPopup}
            />
        </div>
    );
};

export default LoginPage;