import React from "react";
import { VStack, Image } from "@chakra-ui/react";
import logo from "@/assets/undraw_clouds_bmtk.svg";
import "./AvisoVazio.scss";

interface PerguntaProps {
    nenhum: string;
    adicionar: boolean;
    instrucao?: string;
    botao?: string;
}


const AvisoVazio: React.FC<PerguntaProps> = ({ 
  nenhum,
  adicionar,
  instrucao,
  botao
}) => {
  return (
    <VStack className="avisoVazio" >
        <Image src={logo} alt="Clouds" className="imagem-vazio" />
        <h2>Ainda não há {nenhum} aqui</h2>
        {adicionar && (
          <p>{instrucao} no botão <span>"{botao}"</span> acima</p>
        )}
    </VStack>
  );
};

export default AvisoVazio;
