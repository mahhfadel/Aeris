import React, { useEffect, useState } from 'react';
import Pagecontainer from "@/components/props/PageContainerProps"
import "./PesquisasPage.scss";
import {DashboardResponse} from '@/types/dashboard.types';
import { Box } from '@chakra-ui/react';
import PieChartComponent from '@/components/Dashboard/PieChartComponent'
import SimpleBarChartComponent from '@/components/Dashboard/SimpleBarChartComponent'
import SingleValueComponent from '@/components/Dashboard/SingleValueComponent'
import dashboardService from '@/services/dashboardService';

interface State {
  dash: DashboardResponse[];
}

const PesquisasPage = () => {
    const [loading, setLoading] = useState(true);


    const [state, setState] = useState<State>({
        dash: []
    });

    const buscarDash = async () => {
        setLoading(true);

        try{
            const data = await dashboardService.dashGeral();
            setState({ dash: data});
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarDash();
    }, []);

    if (loading) {
        return (
            <Pagecontainer>
                <div>Carregando...</div>
            </Pagecontainer>
        );
    }


    return (
        <Pagecontainer>
            <div className="header-pesquisas">
                <h2 className="login-title">Insights</h2>
            </div>
            <div className='pesquisas-content'>
                <Box p={2}>
                    <Box 
                        display="grid" 
                        gridTemplateColumns="repeat(12, 1fr)"  // 12 colunas
                        gap={8}
                    >
                        {/*2 itens (6 colunas cada) */}
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[0]}/>
                        </Box>
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[1]}/>
                        </Box>
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[7]}/>
                        </Box>
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[8]}/>
                        </Box>
                        

                        {/*1 itens iguais (12 colunas cada) */}
                        <Box gridColumn="span 6">
                            <SimpleBarChartComponent data={state.dash[2]} showLegend={true} showDescription={true}/>
                        </Box>
                        <Box gridColumn="span 6">
                            <SimpleBarChartComponent data={state.dash[3]} showLegend={true} showDescription={true}/>
                        </Box>

                        {/*4 itens (3 colunas cada) */}
                        <Box gridColumn="span 4">
                            <PieChartComponent data={state.dash[6]} showLegend={true} showDescription={true}/>
                        </Box>
                        <Box gridColumn="span 4">
                            <PieChartComponent data={state.dash[5]} showLegend={true} showDescription={true}/>
                        </Box>
                        <Box gridColumn="span 4">
                            <PieChartComponent data={state.dash[4]} showLegend={true} showDescription={true}/>
                        </Box>

                        {/*4 itens (3 colunas cada) */}
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[9]}/>
                        </Box>
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[10]}/>
                        </Box>
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[11]}/>
                        </Box>
                        <Box gridColumn="span 3">
                            <SingleValueComponent data={state.dash[12]}/>
                        </Box>
                    </Box>
                </Box>
            </div> 
        </Pagecontainer>
    );
};

export default PesquisasPage;