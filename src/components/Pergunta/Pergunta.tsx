import React, { useState } from 'react';
import { MdEdit, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import './Pergunta.scss';

type PerguntaDescritiva = {
  id: number;
  titulo: string;
  tipo: 'descritiva';
};

type PerguntaEscala = {
  id: number;
  titulo: string;
  tipo: 'escala';
  escalaAdjetivo: string;
};

type PerguntaOpcoes = {
  id: number;
  titulo: string;
  tipo: 'opcoes';
  opcoes: string[];
};

type PerguntaData = PerguntaDescritiva | PerguntaEscala | PerguntaOpcoes;

interface PerguntaProps {
  pergunta: PerguntaData;
  onEdit?: (pergunta: PerguntaData) => void;
  defaultExpanded?: boolean;
}

const Pergunta: React.FC<PerguntaProps> = ({ 
  pergunta,
  onEdit,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const renderTipoLabel = () => {
    const labels = {
      descritiva: 'Descritiva',
      escala: 'Escala',
      opcoes: 'Opções'
    };
    return labels[pergunta.tipo];
  };

  const renderContent = () => {
    if (!isExpanded) return null;

    switch(pergunta.tipo) {
      case 'descritiva':
        return (
          <div className="pergunta-content">
            <div className="descricao-input"/>
          </div>
        );

      case 'escala':
        return (
          <div className="pergunta-content">
            <div className="escala-options">
                <div key={1} className="escala-tag">
                  Pouquíssimo {pergunta.escalaAdjetivo}
                </div>

                <div key={1} className="escala-tag">
                  Pouco {pergunta.escalaAdjetivo}
                </div>

                <div key={1} className="escala-tag">
                  {pergunta.escalaAdjetivo}
                </div>

                <div key={1} className="escala-tag">
                  Muito {pergunta.escalaAdjetivo}
                </div>

                <div key={1} className="escala-tag">
                  Muitíssimo {pergunta.escalaAdjetivo}
                </div>
            </div>
          </div>
        );

      case 'opcoes':
        return (
          <div className="pergunta-content">
            <div className="opcoes-list">
              {pergunta.opcoes.map((opcao, index) => (
                <div key={index} className="opcao-tag">
                  {opcao}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`pergunta ${isExpanded ? 'expanded' : ''}`}>
      <div className="pergunta-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="pergunta-titulo">{pergunta.titulo}</h3>
        <div className="pergunta-actions">
          <span className="pergunta-tipo">{renderTipoLabel()}</span>
          {isExpanded ? (
            <MdKeyboardArrowUp className="arrow-icon" />
          ) : (
            <MdKeyboardArrowDown className="arrow-icon" />
          )}
        </div>
      </div>

      {renderContent()}

      {isExpanded && (
        <button 
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(pergunta);
          }}
        >
          <MdEdit />
        </button>
      )}
    </div>
  );
};

export default Pergunta;