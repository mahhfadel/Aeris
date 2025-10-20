import React from 'react';
import {Button} from "@chakra-ui/react"
import { MdOutlineAdd } from "react-icons/md";
import Pagecontainer from "@/components/props/PageContainerProps"
import Pesquisa from "@/components/Pesquisa/Pesquisa"
import { useNavigate } from 'react-router-dom';
import "./HomePage.scss";



const HomePage = () => {
    const navigate = useNavigate();

    const mockPesquisas = [
        { id: "1234", nome: "Pesquisa XYZ", data: "15/10/2025", respostas:'20', pessoas:'35'},
        { id: "5678", nome: "Pesquisa ABC", data: "03/03/2025", respostas:'11', pessoas:'15'},
        { id: "9123", nome: "Lorem Ipsum", data: "24/06/2025", respostas:'39', pessoas:'45'},
    ];

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
                {mockPesquisas.map((pesquisa) => (
                    <Pesquisa id={pesquisa.id} nome={pesquisa.nome} data={pesquisa.data} resposta={pesquisa.respostas} pessoas={pesquisa.pessoas}/>
                ))}
            </div>    
        </Pagecontainer>
    );
};

export default HomePage;