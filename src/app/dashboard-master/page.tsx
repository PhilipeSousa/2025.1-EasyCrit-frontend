'use client'

import React, { useState } from 'react'
import './app.css'
import styles from './dashboard.module.css'
import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import useWebSocket from '@/hooks/useWebSocket'

// TODO: Substitua pelo caminho real do seu hook ou contexto de autenticação
// import { useAuth } from '@/contexts/AuthContext';
// TODO: Defina um tipo para o objeto de usuário retornado pelo seu hook de autenticação
// interface User {
//   id: number; // Ou string, dependendo do seu backend
//   // Outras propriedades do usuário...
// }

const cinzel = Cinzel({
	subsets: ['latin'],
	weight: ['700'],
})

const Box = () => {
	const campaigns = [
		{ logo: '/images/rocket.png', title: 'UMA ODISSÉIA NO ESPAÇO' },
		{ logo: '/images/spider.png', title: 'A FLOREsta RADIOATIVA' },
	]

	return (
		<div className={styles.boxContainer}>
			{' '}
			
			{campaigns.map(
				(
					{ logo, title },
					idx
				) => (
					<div key={idx} className={styles.card}>
						{' '}
						
						<div className={styles.cardHeader}>
							{' '}
							
							
							<Image src={logo} alt={`Logo ${idx + 1}`} width={40} height={40} />
							<span className={styles.cardTitle}>{title}</span> 
						</div>
						<div className={styles.cardContent}>
							{' '}
							
							<div className={styles.cardColumn}>
								{' '}
								
								<div className={styles.sectionTitle}>MESTRE</div> 
								<div className={styles.sectionTitle}>JOGADORES</div> 
								<div className={styles.playersGrid}>
									{' '}
									
									{[1, 2, 3, 4].map((i) => (
										<Image key={i} src='/images/circle.png' alt={`Jogador ${i}`} width={50} height={50} />
									))}
								</div>
							</div>
							<div className={styles.cardColumn}>
								{' '}
								
								<div className={styles.sectionTitleRight}>MAPA</div> 
								<Image src='/images/image.png' alt='Mapa' width={150} height={100} className={styles.mapImage} />{' '}
								
								<div className={styles.mapName}>NOME DO MAPA</div> 
								<div className={styles.sectionTitle}>ESTATISTICAS</div> 
								<div className={styles.statItem}>
									{' '}
									
									<Image src='/images/clock.png' alt='Tempo' width={25} height={25} />
									<span>00:00:00</span>
								</div>
								<div className={styles.divider}></div> 
								<div className={styles.statItem}>
									{' '}
									
									<Image src='/images/check.png' alt='Check' width={25} height={25} />
									<span>SESSÕES REALIZADAS</span>
								</div>
								<div className={styles.divider}></div> 
								<div className={styles.statItem}>
									{' '}
									
									<Image src='/images/calendar.png' alt='Calendário' width={25} height={25} />
									<span>00/00/0000</span>
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</div>
	)
}

const Page: React.FC = () => {
	const [inviteCode, setInviteCode] = useState('')
	const [websocketUrl, setWebsocketUrl] = useState<string | null>(null)
	const [messages, setMessages] = useState<unknown[]>([])
	const [isJoining, setIsJoining] = useState(false)
	const [joinError, setJoinError] = useState<string | null>(null)

	// TODO: Use seu hook ou contexto de autenticação real aqui para obter o usuário e o token
	// Exemplo:
	// const { user, token } = useAuth();
	// Substitua as linhas abaixo pelo uso do seu hook/contexto real
	const user: { id: number } | null = { id: 123 } // REMOVA esta linha e use o user real do seu auth context
	const token: string | null = 'seu_token_jwt_aqui' // REMOVA esta linha e use o token real do seu auth context

	const { isConnected, error, sendMessage, disconnect } = useWebSocket({
		url: websocketUrl,
		onMessage: (message) => {
			setMessages((prevMessages) => [...prevMessages, message])
		},
		onOpen: () => {
			setJoinError(null)
			// Opcional: Enviar uma mensagem inicial após a conexão
			// Use o user.id real aqui
			if (user?.id) {
				sendMessage({ type: 'user_connected', user_id: user.id })
			}
		},
		onClose: (_event) => {
			setWebsocketUrl(null)
		},
		onError: (_event) => {
		},
	})

	const handleJoinSession = async () => {
		if (!inviteCode.trim()) {
			alert('Por favor, insira um código de convite.')
			return
		}

		if (!user || !token) {
			alert('Você precisa estar logado para entrar em uma sessão.')
			// TODO: Redirecionar para a página de login se necessário
			// Exemplo com next/navigation:
			// import { useRouter } from 'next/navigation';
			// const router = useRouter();
			// router.push('/login');
			return
		}

		setIsJoining(true)
		setJoinError(null)

		const user_id = user.id

		try {
			const sessionApiPort = process.env.NEXT_PUBLIC_SESSION_PORT || '8081'
			const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
			const joinSessionUrl = `http://${apiHost}:${sessionApiPort}/sessions/join`

			const response = await fetch(joinSessionUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({ invite_code: inviteCode.trim(), user_id: user_id }),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.detail || `Erro HTTP ${response.status}: ${response.statusText}`)
			}

			const data = await response.json()
			const session_id = data.session_id

			if (!session_id) {
				throw new Error('Resposta do backend não contém session_id.')
			}

			// Agora que temos o session_id, construímos a URL do WebSocket e conectamos
			// O endpoint WebSocket é ws://{host}:{port}/ws/sessions/{session_id}/connect/{user_id}
			const wsUrl = `ws://${apiHost}:${sessionApiPort}/ws/sessions/${session_id}/connect/${user_id}`

			setWebsocketUrl(wsUrl)
		} catch (error: unknown) {
			let errorMessage = 'Ocorreu um erro desconhecido ao tentar entrar na sessão.'
			if (error instanceof Error) {
				errorMessage = error.message
			} else if (typeof error === 'string') {
				errorMessage = error
			}
			setJoinError(errorMessage)
			setWebsocketUrl(null)
		} finally {
			setIsJoining(false)
		}
	}

	const handleLeaveSession = () => {
		disconnect()
	}

	return (
		<div className='page-container'>
			{' '}
			
			{/* SIDE BAR */}
			<div className='sidebar'>
				{' '}
				
				<div className='logo-container'>
					{' '}
					<Image src='/images/logo1.png' alt='Logo' className='logo' width={180} height={180} />{' '}
					
				</div>
			</div>
			{/* MAIN AND TOP */}
			<div className='main-and-topbar'>
				{' '}
				
				<div className='topbar'>
					{' '}
					
					<div className='topbar-left'>
						{' '}
						
						
						<Image src='/images/group.png' alt='Ícone TopBar' className='topbar-icon' width={70} height={70} />{' '}
						
					</div>
					{/* H1 TOPBAR */}
					<div className='topbar-content'>
						{' '}
						
						<h2 className={`${cinzel.className}`}>DASHBOARD DO MESTRE</h2>
					</div>
					{/* Adicionar botão de logout se necessário */}
					{/* <button className={styles.logoutButton}>LOGOUT</button> */}
				</div>
				<div className='main-content'>
					{' '}
					
					<div className={styles.contentWrapper}>
						{' '}
						
						<div className={styles.sessionActions}>
							{' '}
							
							<input
								className={styles.sessionInput}
								placeholder='CÓDIGO DE CONVITE'
								value={inviteCode}
								onChange={(e) => setInviteCode(e.target.value)}
								disabled={isConnected || isJoining || !user}
							/>
							<div className={styles.sessionButtons}>
								{' '}
								
								
								<button
									className={styles.sessionButton}
									onClick={handleJoinSession}
									disabled={isConnected || isJoining || !user}
								>
									{isJoining ? 'ENTRANDO...' : isConnected ? 'CONECTADO' : 'ENTRAR NA SESSÃO'}
								</button>
								
								<button
									className={`${styles.sessionButton} ${styles.deleteButton}`}
									onClick={handleLeaveSession}
									disabled={!isConnected || isJoining}
								>
									SAIR DA CAMPANHA
								</button>
							</div>
							
							<div style={{ marginTop: '1rem', color: isConnected ? 'green' : 'red' }}>
								Status da Conexão WebSocket: {isConnected ? 'Conectado' : 'Desconectado'}
							</div>
							
							{error && <div style={{ color: 'red' }}>Erro WS: {error.type}</div>}
							
							{joinError && <div style={{ color: 'red' }}>Erro ao Entrar: {joinError}</div>}
							
							{!user && (
								<div style={{ color: 'orange', marginTop: '1rem' }}>
									Por favor, faça login para entrar em uma sessão.
								</div>
							)}
							
							<div
								style={{
									marginTop: '1rem',
									border: '1px solid #ccc',
									padding: '10px',
									maxHeight: '200px',
									overflowY: 'auto',
								}}>
								<h4>Mensagens Recebidas:</h4>
								{messages.map((msg, index) => (
									<p key={index}>{JSON.stringify(msg)}</p>
								))}
							</div>
						</div>
						<div className={styles.boxContainer}>
							{' '}
							
							<Box />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
