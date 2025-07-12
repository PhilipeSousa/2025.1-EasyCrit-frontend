import React from 'react'
import './CampaignButtons.css'
import { useRouter } from 'next/navigation'


const CampaignButtons: React.FC = () => {

	const router = useRouter()
	const handleCreateCampaign = () => {
		router.push('/create-campaign')
	}

	return (
		<div className='botoes-container'>
			<button onClick={handleCreateCampaign}  className='btn create'>CRIAR CAMPANHA</button>
			<button className='btn delete'>EXCLUIR CAMPANHA</button>
		</div>
	)
}

export default CampaignButtons
