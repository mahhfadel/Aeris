import React from "react";
import "./DialogPopup.scss";
import {Button} from "@chakra-ui/react"

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirma?: () => void;
  onCancel?: () => void;
  viewConfirmaButton: boolean;
  viewCancelButton: boolean;
  mensagem: string;
}

const DialogPopup: React.FC<PopupProps> = ({ isOpen, onClose, onConfirma, onCancel, viewConfirmaButton, viewCancelButton, mensagem }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-mensagem-overlay" onClick={onClose}>
      <div
        className="popup-mensagem-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-mensagem-body">
            {mensagem}
            
            <div className="botoes">
                {viewCancelButton && (
                    <Button className='btn-cancelar' onClick={() => onCancel()}>
                        Cancelar
                    </Button>
                )}

                {viewConfirmaButton && (
                    <Button className='btn-confirmar' onClick={() => onConfirma()}>
                        Ok
                    </Button>
                )}
                </div>
        </div>
      </div>
    </div>
  );
};

export default DialogPopup;
