import React, { useState } from 'react';
import { MdEdit, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import {PerguntaRequest, PerguntaResponse} from '@/types/pesquisa.types';
import './Pergunta.scss';

interface PerguntaProps {
  pergunta: PerguntaResponse;
  onEdit?: (pergunta: PerguntaRequest) => void;
  onRemove?: (id: number) => void;
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
    return labels[pergunta.tipoPergunta.descricao];
  };

  const renderContent = () => {
    if (!isExpanded) return null;

    switch(pergunta.tipoPergunta.descricao) {
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
                  Pouquíssimo {pergunta.adjetivo}
                </div>

                <div key={2} className="escala-tag">
                  Pouco {pergunta.adjetivo}
                </div>

                <div key={3} className="escala-tag">
                  {pergunta.adjetivo}
                </div>

                <div key={4} className="escala-tag">
                  Muito {pergunta.adjetivo}
                </div>

                <div key={5} className="escala-tag">
                  Muitíssimo {pergunta.adjetivo}
                </div>
            </div>
          </div>
        );

      case 'opcoes':
        return (
          <div className="pergunta-content">
            <div className="opcoes-list">
              {pergunta.tipoPergunta.opcoes.map((opcao, index) => (
                <div key={index} className="opcao-tag">
                  {opcao.descricao}
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
        <h3 className="pergunta-titulo">{pergunta.pergunta}</h3>
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
            onEdit?.({
              pergunta: pergunta.pergunta,
              adjetivo: pergunta.adjetivo,
              tipoPergunta: pergunta.tipoPergunta.descricao,
              opcoes: pergunta.tipoPergunta.opcoes ,
              id: pergunta.id,

            });
          }}
        >
          <MdEdit />
        </button>
      )}
    </div>
  );
};

export default Pergunta;