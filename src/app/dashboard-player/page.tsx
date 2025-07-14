'use client'

import React from 'react'
import './app.css'
import { Cinzel } from 'next/font/google'
import MainContent from './MainContent'
import CampaignButtons from './CampaignButtons'
import { useRouter } from 'next/navigation'

const cinzel = Cinzel({
	subsets: ['latin'],
	weight: ['700'],
})

const Page: React.FC = () => {
	const router = useRouter()

	const handleLogout = async () => {
		try {
			const res = await fetch('/api/logout', { method: 'POST' })
			if (res.ok) {
				router.push('/login')
			} else {
				alert('Erro ao deslogar')
			}
		} catch {
			alert('Erro ao conectar ao servidor')
		}
	}

	return (
		<div className='page-container'>
			{/* SIDE BAR */}
			<div className='sidebar'>
				<div className='logo-container'>
					<img src='/images/logo1.png' alt='Logo' className='logo' />
				</div>
			</div>

			{/* MAIN AND TOP */}
			<div className='main-and-topbar'>
				<div className='topbar'>
					<div className='topbar-left'>
						<img src='/images/group.png' alt='Ícone TopBar' className='topbar-icon' />
					</div>

					{/* H1 TOPBAR */}
					<div className='topbar-content'>
						<h2 className={`${cinzel.className}`}>DASHBOARD DO JOGADOR</h2>
					</div>

					{/* ADITIONAL BUTTONS */}
					<div className='topbar-right'>
						<button onClick={handleLogout} className='logout-button'>
							LOGOUT
						</button>
						<button className='avatar-button'>
							<img src='/images/profile.png' alt='Avatar do Usuário' className='avatar-image' />
						</button>
					</div>
				</div>
				<CampaignButtons />

				{/* MAIN CONTENT */}
				<MainContent />
			</div>
		</div>
	)
}

export default Page
