import React from 'react';
import './CampaignButtons.css';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700'],
});

const CampaignButtons: React.FC = () => {
  return (
    <div className="botoes-container">
      <input
        type="text"
        className="btn input-code"
        placeholder="CÓDIGO DE CONVITE"
      />
      <button className="btn create">ENTRAR NA SESSÃO</button>
      <button className="btn delete">SAIR DA CAMPANHA</button>
    </div>
  );
};

export default CampaignButtons;
