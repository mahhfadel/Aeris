import React, {useEffect, useState } from 'react';
import {Button} from "@chakra-ui/react"
import { MdOutlineAdd } from "react-icons/md";
import Pagecontainer from "@/components/props/PageContainerProps"
import Pesquisa from "@/components/Pesquisa/Pesquisa"
import { useNavigate } from 'react-router-dom';
import "./HomePage.scss";
import { PesquisaResponse } from '../../types/pesquisa.types';
import pesquisaService from '../../services/pesquisaService';
import AvisoVazio from "@/components/AvisoVazio/AvisoVazio"

interface State {
  pesquisas: PesquisaResponse[];
}

const HomePage = () => {
    const navigate = useNavigate();

    const [state, setState] = useState<State>({
        pesquisas: []
    });

    useEffect(() => {
        buscarPesquisas();
    }, []);

    const { pesquisas} = state;

    const buscarPesquisas = async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const data = await pesquisaService.getAllPesquisas();
        setState({ pesquisas: data});
    };
        
    
    return (
        <Pagecontainer>
            <div className="header-home">
                <h2 className="login-title">Home</h2>
                <Button className='btn-nova-pesquisa' onClick={() => navigate(`/nova-pesquisa`)}>
                    <MdOutlineAdd />
                    Nova pesquisa
                </Button>
            </div>
            <div className='home-content'>
                {pesquisas.map((pesquisa) => (
                    <Pesquisa key={pesquisa.idPesquisa} id={pesquisa.idPesquisa} nome={pesquisa.nome} dataInicio={pesquisa.criadoEm}  dataFim={pesquisa.prazo} resposta={pesquisa.respondidos} pessoas={pesquisa.totalUsuarios}/>
                ))}

                {pesquisas.length == 0 && (
                    <AvisoVazio nenhum="nenhuma pesquisa" adicionar={true} instrucao= "Adicione novas pesquisas a plataforma" botao="Nova pesquisa"/>
                )}
            </div>    
        </Pagecontainer>
    );
};

export default HomePage;