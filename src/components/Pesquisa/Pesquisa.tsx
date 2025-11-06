import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pesquisa.scss";

interface Pesquisa {
    id: number;
    nome: string;
    dataInicio: string;
    dataFim: string;
    resposta: number;
    pessoas: number;
}

const Pesquisa: React.FC<Pesquisa> = ({id, nome, dataInicio, dataFim, resposta, pessoas}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/gerenciar-pesquisa?id=${id}`);
    };

  return (
    <div className="pesquisa-card" onClick={handleClick}>
      <div className="pesquisa-info">
        <h3 className="pesquisa-nome">{nome}</h3>
        <p className="pesquisa-data">{dataInicio} - {dataFim}</p>
      </div>
      <div className="respostas">
        <p className="resposta-title">Respostas</p>
        <p className="resposta-data">{resposta}/{pessoas}</p>
      </div>
    </div>
  );
};

export default Pesquisa;
