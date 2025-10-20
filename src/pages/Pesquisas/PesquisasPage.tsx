import React from 'react';
import {Button} from "@chakra-ui/react"
import Pagecontainer from "@/components/props/PageContainerProps"
import "./PesquisasPage.scss";



const PesquisasPage = () => {

    return (
        <Pagecontainer>
            <div className="header-pesquisas">
                <h2 className="login-title">Insights</h2>
            </div>
            <div className='pesquisas-content'>
            </div>
        </Pagecontainer>
    );
};

export default PesquisasPage;