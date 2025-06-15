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
      <button className="btn create">CRIAR CAMPANHA</button>
      <button className="btn delete">EXCLUIR CAMPANHA</button>
    </div>
  );
};

export default CampaignButtons;
