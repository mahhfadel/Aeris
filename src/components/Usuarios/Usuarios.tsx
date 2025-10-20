import React from "react";
import "./Usuarios.scss";

interface Usuarios {
    id: string;
    nome: string;
    email: string;
    respondidos: string;
    total: string;
}

const Usuarios: React.FC<Usuarios> = ({id, nome, email, respondidos, total}) => {
  return (
    <div className="pesquisa-card">
      <div className="pesquisa-info">
        <h3 className="pesquisa-nome">{nome}</h3>
        <p className="pesquisa-data">{email}</p>
      </div>
      <div className="respostas">
        <p className="resposta-title">Pendências</p>
        <p className="resposta-data">{respondidos}/{total}</p>
      </div>
    </div>
  );
};

export default Usuarios;
