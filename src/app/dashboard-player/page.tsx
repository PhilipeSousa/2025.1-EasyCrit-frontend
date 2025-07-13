'use client'

import React, { useState } from 'react' // Removido useEffect não utilizado
import './app.css' // Importar o CSS geral (classes globais)
import styles from './dashboard.module.css' // Importar o módulo CSS (classes locais)
import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import useWebSocket from '@/hooks/useWebSocket' // Importar o hook WebSocket

// TODO: Substitua pelo caminho real do seu hook ou contexto de autenticação
// import { useAuth } from '@/contexts/AuthContext';
// TODO: Defina um tipo para o objeto de usuário retornado pelo seu hook de autenticação
// interface User {
//   id: number; // Ou string, dependendo do seu backend
// }

const cinzel = Cinzel({
	subsets: ['latin'],
	weight: ['700'],
})

// Componente Box (mantido do seu código anterior, se necessário)
// Assumindo que Box usa classes de dashboard.module.css
const Box = () => {
	// Exemplo de como Box pode usar as classes do módulo CSS
	const campaigns = [
		{ logo: '/images/rocket.png', title: 'UMA ODISSÉIA NO ESPAÇO' },
		{ logo: '/images/spider.png', title: 'A FLOREsta RADIOATIVA' },
	]

	return (
		<div className={styles.boxContainer}>
			{' '}
			{/* Classe de dashboard.module.css */}
			{campaigns.map(
				(
					{ logo, title },
					idx // logo está sendo desestruturado aqui
				) => (
					<div key={idx} className={styles.card}>
						{' '}
						{/* Classe de dashboard.module.css */}
						<div className={styles.cardHeader}>
							{' '}
							{/* Classe de dashboard.module.css */}
							{/* Usar a variável logo */}
							<Image src={logo} alt={`Logo ${idx + 1}`} width={40} height={40} />
							<span className={styles.cardTitle}>{title}</span> {/* Classe de dashboard.module.css */}
						</div>
						<div className={styles.cardContent}>
							{' '}
							{/* Classe de dashboard.module.css */}
							<div className={styles.cardColumn}>
								{' '}
								{/* Classe de dashboard.module.css */}
								<div className={styles.sectionTitle}>MESTRE</div> {/* Classe de dashboard.module.css */}
								<div className={styles.sectionTitle}>JOGADORES</div> {/* Classe de dashboard.module.css */}
								<div className={styles.playersGrid}>
									{' '}
									{/* Classe de dashboard.module.css */}
									{[1, 2, 3, 4].map((i) => (
										<Image key={i} src='/images/circle.png' alt={`Jogador ${i}`} width={50} height={50} />
									))}
								</div>
							</div>
							<div className={styles.cardColumn}>
								{' '}
								{/* Classe de dashboard.module.css */}
								<div className={styles.sectionTitleRight}>MAPA</div> {/* Classe de dashboard.module.css */}
								<Image src='/images/image.png' alt='Mapa' width={150} height={100} className={styles.mapImage} />{' '}
								{/* Classe de dashboard.module.css */}
								<div className={styles.mapName}>NOME DO MAPA</div> {/* Classe de dashboard.module.css */}
								<div className={styles.sectionTitle}>ESTATISTICAS</div> {/* Classe de dashboard.module.css */}
								<div className={styles.statItem}>
									{' '}
									{/* Classe de dashboard.module.css */}
									<Image src='/images/clock.png' alt='Tempo' width={25} height={25} />
									<span>00:00:00</span>
								</div>
								<div className={styles.divider}></div> {/* Classe de dashboard.module.css */}
								<div className={styles.statItem}>
									{' '}
									{/* Classe de dashboard.module.css */}
									<Image src='/images/check.png' alt='Check' width={25} height={25} />
									<span>SESSÕES REALIZADAS</span>
								</div>
								<div className={styles.divider}></div> {/* Classe de dashboard.module.css */}
								<div className={styles.statItem}>
									{' '}
									{/* Classe de dashboard.module.css */}
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
	const [inviteCode, setInviteCode] = useState('') // Estado para o código de convite
	const [websocketUrl, setWebsocketUrl] = useState<string | null>(null) // Estado para a URL do WebSocket
	const [messages, setMessages] = useState<unknown[]>([]) // Corrigido: Usar unknown[] ou um tipo mais específico
	const [isJoining, setIsJoining] = useState(false) // Estado para controlar o loading do join
	const [joinError, setJoinError] = useState<string | null>(null) // Estado para erros ao entrar na sessão

	// TODO: Use seu hook ou contexto de autenticação real aqui para obter o usuário e o token
	// Exemplo:
	// const { user, token } = useAuth();
	// Substitua as linhas abaixo pelo uso do seu hook/contexto real
	const user: { id: number } | null = { id: 123 } // REMOVA esta linha e use o user real do seu auth context
	const token: string | null = 'seu_token_jwt_aqui' // REMOVA esta linha e use o token real do seu auth context

	// Usar o hook WebSocket com a URL dinâmica
	const { isConnected, error, sendMessage, disconnect } = useWebSocket({
		// Removido 'connect' não utilizado
		url: websocketUrl,
		onMessage: (message) => {
			// console.log('Mensagem recebida no componente Jogador:', message); // Removido console.log
			setMessages((prevMessages) => [...prevMessages, message]) // Adiciona a mensagem ao estado
		},
		onOpen: () => {
			// console.log('Conexão WebSocket aberta no componente Jogador.'); // Removido console.log
			setJoinError(null) // Limpa erro de join se a conexão WS for bem sucedida
			// Opcional: Enviar uma mensagem inicial após a conexão
			// Use o user.id real aqui
			if (user?.id) {
				sendMessage({ type: 'user_connected', user_id: user.id })
			}
		},
		onClose: (_event) => {
			// Adicionado _ para ignorar o parâmetro event
			// console.log('Conexão WebSocket fechada no componente Jogador.', _event); // Removido console.log
			setWebsocketUrl(null) // Resetar a URL para permitir nova conexão
		},
		onError: (_event) => {
			// Adicionado _ para ignorar o parâmetro event
			// console.error('Erro no WebSocket no componente Jogador:', _event); // Removido console.error
			// Lidar com o erro na UI
		},
	})

	// Função para lidar com o clique no botão "ENTRAR NA SESSÃO"
	const handleJoinSession = async () => {
		// Tornar a função assíncrona
		if (!inviteCode.trim()) {
			alert('Por favor, insira um código de convite.')
			return
		}

		// Verificar se o usuário está logado antes de tentar entrar na sessão
		if (!user || !token) {
			alert('Você precisa estar logado para entrar em uma sessão.')
			// TODO: Redirecionar para a página de login se necessário
			// Exemplo com next/navigation:
			// import { useRouter } from 'next/navigation';
			// const router = useRouter();
			// router.push('/login');
			return
		}

		setIsJoining(true) // Inicia o estado de loading
		setJoinError(null) // Limpa erros anteriores

		// Usar o ID do usuário logado real
		const user_id = user.id // Usando o ID do usuário obtido do contexto/hook

		try {
			// Construir a URL do endpoint HTTP do Session Manager para entrar na sessão
			const sessionApiPort = process.env.NEXT_PUBLIC_SESSION_PORT || '8081'
			// Use window.location.hostname para conectar ao mesmo host que o frontend está rodando
			const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
			// Assumindo que o endpoint para entrar na sessão via código de convite é POST /sessions/join
			const joinSessionUrl = `http://${apiHost}:${sessionApiPort}/sessions/join`

			// console.log('Tentando entrar na sessão via HTTP:', joinSessionUrl); // Removido console.log

			const response = await fetch(joinSessionUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Incluir token de autenticação no cabeçalho Authorization
					'Authorization': `Bearer ${token}`, // Usando o token obtido do contexto/hook
				},
				body: JSON.stringify({ invite_code: inviteCode.trim(), user_id: user_id }),
			})

			if (!response.ok) {
				// Lidar com erros HTTP (ex: 404 Not Found, 400 Bad Request, 401 Unauthorized, 403 Forbidden)
				const errorData = await response.json()
				throw new Error(errorData.detail || `Erro HTTP ${response.status}: ${response.statusText}`)
			}

			const data = await response.json()
			// Assumindo que a resposta contém o session_id
			const session_id = data.session_id

			if (!session_id) {
				throw new Error('Resposta do backend não contém session_id.')
			}

			// console.log('Entrou na sessão com sucesso. Session ID:', session_id); // Removido console.log

			// Agora que temos o session_id, construímos a URL do WebSocket e conectamos
			// O endpoint WebSocket é ws://{host}:{port}/ws/sessions/{session_id}/connect/{user_id}
			const wsUrl = `ws://${apiHost}:${sessionApiPort}/ws/sessions/${session_id}/connect/${user_id}` // Ajuste o caminho se necessário

			setWebsocketUrl(wsUrl) // Define a URL para iniciar a conexão via hook
		} catch (error: unknown) {
			// Alterado de Error para unknown
			// console.error('Erro ao entrar na sessão:', error); // Removido console.error
			// Exibir uma mensagem de erro amigável para o usuário
			let errorMessage = 'Ocorreu um erro desconhecido ao tentar entrar na sessão.'
			if (error instanceof Error) {
				errorMessage = error.message
			} else if (typeof error === 'string') {
				errorMessage = error
			}
			setJoinError(errorMessage)
			setWebsocketUrl(null) // Limpar a URL do WS para não tentar conectar automaticamente
		} finally {
			setIsJoining(false) // Finaliza o estado de loading
		}
	}

	// Função para lidar com o clique no botão "SAIR DA CAMPANHA" (desconectar)
	const handleLeaveSession = () => {
		disconnect() // Chama a função de desconexão do hook
	}

	return (
		<div className='page-container'>
			{' '}
			{/* Classe de app.css */}
			{/* SIDE BAR */}
			<div className='sidebar'>
				{' '}
				{/* Classe de app.css */}
				<div className='logo-container'>
					{' '}
					{/* Classe de app.css */}
					{/* Verifique o caminho da imagem */}
					<Image src='/images/logo1.png' alt='Logo' className='logo' width={180} height={180} />{' '}
					{/* Classe de app.css */}
				</div>
			</div>
			{/* MAIN AND TOP */}
			<div className='main-and-topbar'>
				{' '}
				{/* Classe de app.css */}
				<div className='topbar'>
					{' '}
					{/* Classe de app.css */}
					<div className='topbar-left'>
						{' '}
						{/* Classe de app.css */}
						{/* Verifique o caminho da imagem */}
						<Image src='/images/group.png' alt='Ícone TopBar' className='topbar-icon' width={70} height={70} />{' '}
						{/* Classe de app.css */}
					</div>
					{/* H1 TOPBAR */}
					<div className='topbar-content'>
						{' '}
						{/* Classe de app.css */}
						<h2 className={`${cinzel.className}`}>DASHBOARD DO JOGADOR</h2>
					</div>
					{/* Adicionar botão de logout se necessário */}
					{/* <button className={styles.logoutButton}>LOGOUT</button> */}
				</div>
				<div className='main-content'>
					{' '}
					{/* Classe de app.css */}
					<div className={styles.contentWrapper}>
						{' '}
						{/* Classe de dashboard.module.css */}
						<div className={styles.sessionActions}>
							{' '}
							{/* Classe de dashboard.module.css */}
							<input
								className={styles.sessionInput} // Classe de dashboard.module.css
								placeholder='CÓDIGO DE CONVITE'
								value={inviteCode}
								onChange={(e) => setInviteCode(e.target.value)}
								disabled={isConnected || isJoining || !user} // Desabilita se conectado, entrando, ou não logado
							/>
							<div className={styles.sessionButtons}>
								{' '}
								{/* Classe de dashboard.module.css */}
								{/* Botão para entrar na sessão (conectar WebSocket) */}
								<button
									className={styles.sessionButton} // Classe de dashboard.module.css
									onClick={handleJoinSession}
									disabled={isConnected || isJoining || !user} // Desabilita se já conectado, entrando, ou não logado
								>
									{isJoining ? 'ENTRANDO...' : isConnected ? 'CONECTADO' : 'ENTRAR NA SESSÃO'}
								</button>
								{/* Botão para sair da campanha (desconectar WebSocket) */}
								<button
									className={`${styles.sessionButton} ${styles.deleteButton}`} // Classes de dashboard.module.css
									onClick={handleLeaveSession}
									disabled={!isConnected || isJoining} // Desabilita se não conectado ou entrando
								>
									SAIR DA CAMPANHA
								</button>
							</div>
							{/* Exibir status da conexão e mensagens (para debug/demonstração) */}
							<div style={{ marginTop: '1rem', color: isConnected ? 'green' : 'red' }}>
								Status da Conexão WebSocket: {isConnected ? 'Conectado' : 'Desconectado'}
							</div>
							{/* Exibir erro de conexão WebSocket */}
							{error && <div style={{ color: 'red' }}>Erro WS: {error.type}</div>}
							{/* Exibir erro ao tentar entrar na sessão via HTTP */}
							{joinError && <div style={{ color: 'red' }}>Erro ao Entrar: {joinError}</div>}
							{/* Mensagem se o usuário não estiver logado */}
							{!user && (
								<div style={{ color: 'orange', marginTop: '1rem' }}>
									Por favor, faça login para entrar em uma sessão.
								</div>
							)}
							{/* Exibir mensagens recebidas (para debug/demonstração) */}
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
							{/* Classe de dashboard.module.css */}
							<Box />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
