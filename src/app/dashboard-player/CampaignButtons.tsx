import React from 'react'
import './CampaignButtons.css'

const CampaignButtons: React.FC = () => {
	return (
		<div className='botoes-container'>
			<input type='text' className='btn input-code' placeholder='CÓDIGO DE CONVITE' />
			<button className='btn create'>ENTRAR NA SESSÃO</button>
			<button className='btn delete'>SAIR DA CAMPANHA</button>
		</div>
	)
}

export default CampaignButtons
