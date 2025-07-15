'use client'

import React from 'react'
import Link from 'next/link'
import './CampaignButtons.css'

const CampaignButtons: React.FC = () => {
  return (
    <div className='botoes-container'>
      <Link href="/create-campaign" className='btn create'>
        CRIAR CAMPANHA
      </Link>
      <Link href="/create-character" className='btn character'>
        CRIAR PERSONAGEM
      </Link>
      <button className='btn delete'>
        EXCLUIR CAMPANHA
      </button>
    </div>
  )
}

export default CampaignButtons
