import React, { useState } from 'react';
import { Field, Input, HStack, Button, Text, Link, NativeSelectRoot, NativeSelectField, Checkbox} from "@chakra-ui/react"
import logo from '@/assets/Logo.svg';
import  Popup from "@/components/Popup/Popup";
import "./LoginPage.scss";



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isPopupOpenTermosDeUso, setisPopupOpenTermosDeUso] = useState(false);

    const handleOpenTerms = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        setisPopupOpenTermosDeUso(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        alert('Login bem-sucedido!');
    };

    return (
        <div className='container-body'>
            <div className="container-logo">
                <img src={logo} alt="Logo da Aeris Plataforma de Pesquisa" className="logo" />
            </div>
            <div className='container-form'>
                <HStack as="form" width="full" className="senso-form" onSubmit={handleSubmit}>
                    <h2 className="login-title">Dados</h2>
                    <Field.Root invalid={!!emailError}>
                        <Field.Label className='input-label'>
                            Data de nascimento
                        </Field.Label>
                        <Input placeholder="00/00/0000" type="date" width="full" className='input' onChange={(e) => setEmail(e.target.value)}/>
                        <Field.ErrorText fontSize="0.9rem">{emailError}</Field.ErrorText>
                    </Field.Root>

                    <div className="input-container">
                        <label className="input-label">Identidade de Gênero</label>
                        <NativeSelectRoot>
                            <NativeSelectField className="input" placeholder="Selecione o tipo">
                            <option value="homem-cis">Homem cis</option>
                            <option value="homem-trans">Homem trans</option>
                            <option value="mulher-cis">Mulher cis</option>
                            <option value="mulher-trans">Mulher trans</option>
                            <option value="nao-binario">Não binário</option>
                            <option value="intersexo">Intersexo</option>
                            <option value="agenero">Agênero</option>
                            <option value="outro">Outro</option>
                            <option value="prefiro-nao-informar">Prefiro não informar</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </div>

                    <div className="input-container">
                        <label className="input-label">Orientação Sexual</label>
                        <NativeSelectRoot>
                            <NativeSelectField className="input" placeholder="Selecione o tipo">
                            <option value="heterossexual">Heterossexual</option>
                            <option value="homossexual">Homossexual</option>
                            <option value="bissexual">Bissexual</option>
                            <option value="pansexual">Pansexual</option>
                            <option value="assexual">Assexual</option>
                            <option value="outro">Outro</option>
                            <option value="prefiro-nao-informar">Prefiro não informar</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </div>

                    <div className="input-container">
                        <label className="input-label">Setor</label>
                        <NativeSelectRoot>
                            <NativeSelectField className="input" placeholder="Selecione o tipo">
                            <option value="opcao1">Opção 1</option>
                            <option value="opcao2">Opção 2</option>
                            <option value="opcao3">Opção 3</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </div>

                    <div className="input-container">
                        <label className="input-label">Cargo</label>
                        <NativeSelectRoot>
                            <NativeSelectField className="input" placeholder="Selecione o tipo">
                            <option value="opcao1">Opção 1</option>
                            <option value="opcao2">Opção 2</option>
                            <option value="opcao3">Opção 3</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </div>

                    <Text className='navegation-text'>
                        <Checkbox.Root
                                variant="solid" 
                                className='checkbox'>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label className='check-box-label'>
                                Aceito os {" "}
                                <Link href="#"onClick={handleOpenTerms} color="#002930" textDecoration="underline">
                                    termos de uso
                                </Link>
                            </Checkbox.Label>
                        </Checkbox.Root>
                    </Text>

                    <Button type="submit" width="full" className="button" onSubmit={handleSubmit}>
                        Confirmar
                    </Button>
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
                            com o objetivo de <strong>avaliar o clima organizacional e promover ações voltadas à diversidade, inclusão e igualdade de gênero</strong>
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
                            <strong>apresentados de maneira anonimizada</strong>, sem qualquer possibilidade de identificação individual dos participantes.
                        </p>

                        <h3>5. Consentimento e Direitos do Titular</h3>
                        <p>
                            Ao marcar a opção “Aceito os termos de uso”, o usuário <strong>autoriza o tratamento de seus dados pessoais</strong>
                            conforme as finalidades descritas neste termo, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
                            O participante poderá, a qualquer momento, <strong>solicitar a exclusão, correção ou acesso às informações fornecidas</strong>,
                            bastando entrar em contato com o responsável pela pesquisa.
                        </p>

                        <h3>6. Responsabilidade e Transparência</h3>
                        <p>
                            A organização responsável pela pesquisa compromete-se a <strong>manter a integridade, sigilo e transparência</strong> em todas as etapas
                            de coleta, armazenamento e uso dos dados, respeitando os princípios de boa-fé, finalidade, necessidade e proporcionalidade previstos na legislação.
                        </p>
                    </div>

            </Popup>
        </div>
    );
};

export default LoginPage;