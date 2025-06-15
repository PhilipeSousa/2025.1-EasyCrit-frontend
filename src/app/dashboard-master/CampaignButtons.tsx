import React from 'react'
import './CampaignButtons.css'

const CampaignButtons: React.FC = () => {
	return (
		<div className='botoes-container'>
			<button className='btn create'>CRIAR CAMPANHA</button>
			<button className='btn delete'>EXCLUIR CAMPANHA</button>
		</div>
	)
}

export default CampaignButtons
